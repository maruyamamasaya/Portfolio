import { NextResponse } from 'next/server';
import crypto from 'crypto';

export const runtime = 'nodejs'; // Edge runtime is prohibited

const CONTACT_EMAIL = 'digi.goose.contact@gmail.com';
const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX = 5;
const requests = new Map<string, { count: number; time: number }>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = requests.get(ip);
  if (!entry || now - entry.time > RATE_LIMIT_WINDOW) {
    requests.set(ip, { count: 1, time: now });
    return false;
  }
  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }
  entry.count += 1;
  return false;
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function sha256(msg: string) {
  return crypto.createHash('sha256').update(msg).digest('hex');
}

function hmac(key: Buffer | string, msg: string): Buffer;
function hmac(
  key: Buffer | string,
  msg: string,
  encoding: BufferEncoding
): string;
function hmac(
  key: Buffer | string,
  msg: string,
  encoding?: BufferEncoding
): Buffer | string {
  return crypto.createHmac('sha256', key).update(msg).digest(encoding);
}

function getSignatureKey(key: string, dateStamp: string, region: string, service: string) {
  const kDate = hmac('AWS4' + key, dateStamp);
  const kRegion = hmac(kDate, region);
  const kService = hmac(kRegion, service);
  return hmac(kService, 'aws4_request');
}

async function sendEmailSES({
  subject,
  content,
  htmlContent,
  replyTo,
}: {
  subject: string;
  content: string;
  htmlContent: string;
  replyTo: string;
}) {
  const region = process.env.AWS_REGION;
  const accessKey = process.env.AWS_ACCESS_KEY_ID;
  const secretKey = process.env.AWS_SECRET_ACCESS_KEY;

  if (!region || !accessKey || !secretKey) {
    throw new Error('AWS SES credentials are not set');
  }

  const host = `email.${region}.amazonaws.com`;
  const endpoint = `https://${host}/v2/email/outbound-emails`;

  const body = JSON.stringify({
    FromEmailAddress: CONTACT_EMAIL,
    Destination: { ToAddresses: [CONTACT_EMAIL] },
    ReplyToAddresses: [replyTo],
    Content: {
      Simple: {
        Subject: { Data: subject },
        Body: {
          Text: { Data: content },
          Html: { Data: htmlContent },
        },
      },
    },
  });

  const now = new Date();
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '') + 'Z';
  const dateStamp = amzDate.slice(0, 8);
  const payloadHash = sha256(body);
  const canonicalHeaders =
    'content-type:application/json\n' +
    `host:${host}\n` +
    `x-amz-content-sha256:${payloadHash}\n` +
    `x-amz-date:${amzDate}\n`;
  const signedHeaders =
    'content-type;host;x-amz-content-sha256;x-amz-date';
  const canonicalRequest =
    'POST\n/v2/email/outbound-emails\n\n' +
    `${canonicalHeaders}\n${signedHeaders}\n${payloadHash}`;
  const algorithm = 'AWS4-HMAC-SHA256';
  const credentialScope = `${dateStamp}/${region}/ses/aws4_request`;
  const stringToSign =
    `${algorithm}\n${amzDate}\n${credentialScope}\n${sha256(canonicalRequest)}`;
  const signingKey = getSignatureKey(secretKey, dateStamp, region, 'ses');
  const signature = hmac(signingKey, stringToSign, 'hex');
  const authorization =
    `${algorithm} Credential=${accessKey}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Amz-Date': amzDate,
      'X-Amz-Content-Sha256': payloadHash,
      Authorization: authorization,
    },
    body,
  });

  if (!res.ok) {
    throw new Error(`SES responded with ${res.status}`);
  }
}

interface ContactRequest {
  subject?: string;
  name?: string;
  email?: string;
  inquiry?: string;
  desired?: string;
  consultation?: string;
  message?: string;
  website?: string; // honeypot
}

export async function POST(req: Request) {
  const {
    subject = 'お問い合わせ',
    name,
    email,
    inquiry = '',
    desired = '',
    consultation = '',
    message = '',
    website = '',
  }: ContactRequest = await req.json();

  if (website) {
    return NextResponse.json(
      { error: '不正なリクエストです。' },
      { status: 400 }
    );
  }

  if (!name || !email) {
    return NextResponse.json(
      { error: '名前とメールアドレスは必須です。' },
      { status: 400 }
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { error: 'メールアドレスの形式が正しくありません。' },
      { status: 400 }
    );
  }

  if (
    name.length > 100 ||
    email.length > 200 ||
    inquiry.length > 1000 ||
    desired.length > 1000 ||
    consultation.length > 1000 ||
    message.length > 1000
  ) {
    return NextResponse.json(
      { error: '入力が長すぎます。' },
      { status: 400 }
    );
  }

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';
  if (rateLimit(ip)) {
    return NextResponse.json(
      { error: 'しばらくしてからお試しください。' },
      { status: 429 }
    );
  }

  const lines: string[] = [
    `名前: ${name}`,
    `メールアドレス: ${email}`,
  ];
  if (inquiry) lines.push(`お問い合わせ内容: ${inquiry}`);
  if (desired) lines.push(`受講したい内容: ${desired}`);
  if (consultation) lines.push(`無料のご相談内容: ${consultation}`);
  if (message) lines.push(`ご相談内容: ${message}`);
  const content = lines.join('\n');
  const htmlContent = lines
    .map((line) => `<p>${escapeHtml(line)}</p>`)
    .join('');

  try {
    await sendEmailSES({
      subject,
      content,
      htmlContent,
      replyTo: email,
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('メール送信に失敗しました。', err);
    return NextResponse.json(
      { error: 'メール送信に失敗しました。' },
      { status: 500 }
    );
  }
}
