import { NextResponse } from 'next/server';
import crypto from 'crypto';

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

function sha256(value: string) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function hmac(key: crypto.BinaryLike, value: string) {
  return crypto.createHmac('sha256', key).update(value).digest();
}

function getSignatureKey(
  key: string,
  dateStamp: string,
  region: string,
  service: string
) {
  const kDate = hmac('AWS4' + key, dateStamp);
  const kRegion = hmac(kDate, region);
  const kService = hmac(kRegion, service);
  return hmac(kService, 'aws4_request');
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
  let body: ContactRequest;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: '無効なリクエストです。' },
      { status: 400 }
    );
  }
  const {
    subject = 'お問い合わせ',
    name,
    email,
    inquiry = '',
    desired = '',
    consultation = '',
    message = '',
    website = '',
  } = body;

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
    const region = process.env.AWS_SES_REGION;
    const accessKeyId = process.env.AWS_SES_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SES_SECRET_ACCESS_KEY;
    if (!region || !accessKeyId || !secretAccessKey) {
      console.error('AWS SES environment variables are not set');
      return NextResponse.json(
        { error: 'サーバーの設定に問題があります。' },
        { status: 500 }
      );
    }

    const host = `email.${region}.amazonaws.com`;
    const path = '/v2/email/outbound-emails';
    const bodyJson = JSON.stringify({
      FromEmailAddress: CONTACT_EMAIL,
      Destination: { ToAddresses: [CONTACT_EMAIL] },
      ReplyToAddresses: [email],
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
    const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '');
    const dateStamp = amzDate.slice(0, 8);
    const canonicalHeaders = `content-type:application/json\nhost:${host}\nx-amz-date:${amzDate}\n`;
    const signedHeaders = 'content-type;host;x-amz-date';
    const payloadHash = sha256(bodyJson);
    const canonicalRequest = `POST\n${path}\n\n${canonicalHeaders}\n${signedHeaders}\n${payloadHash}`;
    const credentialScope = `${dateStamp}/${region}/ses/aws4_request`;
    const stringToSign = `AWS4-HMAC-SHA256\n${amzDate}\n${credentialScope}\n${sha256(canonicalRequest)}`;
    const signingKey = getSignatureKey(
      secretAccessKey,
      dateStamp,
      region,
      'ses'
    );
    const signature = hmac(signingKey, stringToSign).toString('hex');
    const authorization =
      `AWS4-HMAC-SHA256 Credential=${accessKeyId}/${credentialScope}, ` +
      `SignedHeaders=${signedHeaders}, Signature=${signature}`;

    const res = await fetch(`https://${host}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Amz-Date': amzDate,
        Authorization: authorization,
      },
      body: bodyJson,
    });

    if (!res.ok) {
      console.error('SES error', res.status);
      return NextResponse.json(
        { error: 'メール送信に失敗しました。' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('メール送信に失敗しました。', (err as Error).message);
    return NextResponse.json(
      { error: 'メール送信に失敗しました。' },
      { status: 500 }
    );
  }
}

