export const runtime = 'nodejs'; // Edge runtime is prohibited
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { loadEnvConfig } from '@next/env';
import { recordAuditEvent } from '@/lib/audit';

// Ensure environment variables from .env are loaded when running via PM2 or other process managers
loadEnvConfig(process.cwd());

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
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';
  const requestId = req.headers.get('x-request-id') ?? undefined;

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
    recordAuditEvent({
      action: 'contact.submit',
      outcome: 'deny',
      status: 400,
      ip,
      requestId,
      reason: 'honeypot',
    });
    return NextResponse.json(
      { error: '不正なリクエストです。' },
      { status: 400 }
    );
  }

  if (!name || !email) {
    recordAuditEvent({
      action: 'contact.submit',
      outcome: 'deny',
      status: 400,
      ip,
      requestId,
      reason: 'missing_required_fields',
    });
    return NextResponse.json(
      { error: '名前とメールアドレスは必須です。' },
      { status: 400 }
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    recordAuditEvent({
      action: 'contact.submit',
      outcome: 'deny',
      status: 400,
      ip,
      requestId,
      reason: 'invalid_email',
    });
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
    recordAuditEvent({
      action: 'contact.submit',
      outcome: 'deny',
      status: 400,
      ip,
      requestId,
      reason: 'payload_too_long',
    });
    return NextResponse.json(
      { error: '入力が長すぎます。' },
      { status: 400 }
    );
  }

  if (rateLimit(ip)) {
    recordAuditEvent({
      action: 'contact.submit',
      outcome: 'deny',
      status: 429,
      ip,
      requestId,
      reason: 'rate_limited',
    });
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

  const region =
    process.env.AWS_SES_REGION ??
    process.env.AWS_REGION ??
    process.env.AWS_DEFAULT_REGION;
  const accessKeyId =
    process.env.AWS_SES_ACCESS_KEY_ID ?? process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey =
    process.env.AWS_SES_SECRET_ACCESS_KEY ?? process.env.AWS_SECRET_ACCESS_KEY;

  console.log('[contact API] env sources', {
    regionVar: process.env.AWS_SES_REGION
      ? 'AWS_SES_REGION'
      : process.env.AWS_REGION
      ? 'AWS_REGION'
      : process.env.AWS_DEFAULT_REGION
      ? 'AWS_DEFAULT_REGION'
      : 'NONE',
    keyVar: process.env.AWS_SES_ACCESS_KEY_ID
      ? 'AWS_SES_ACCESS_KEY_ID'
      : process.env.AWS_ACCESS_KEY_ID
      ? 'AWS_ACCESS_KEY_ID'
      : 'NONE',
    secVar: process.env.AWS_SES_SECRET_ACCESS_KEY
      ? 'AWS_SES_SECRET_ACCESS_KEY'
      : process.env.AWS_SECRET_ACCESS_KEY
      ? 'AWS_SECRET_ACCESS_KEY'
      : 'NONE',
  });

  if (!region || !accessKeyId || !secretAccessKey) {
    recordAuditEvent({
      action: 'contact.submit',
      outcome: 'error',
      status: 500,
      ip,
      requestId,
      reason: 'missing_env',
    });
    console.error('[contact API] env missing', {
      hasRegion: !!region,
      hasId: !!accessKeyId,
      hasSecret: !!secretAccessKey,
    });
    return NextResponse.json(
      { error: 'メール送信に失敗しました。' },
      { status: 500 }
    );
  }

  const ses = new SESClient({
    region,
    credentials: { accessKeyId, secretAccessKey },
  });

  try {
    const cmd = new SendEmailCommand({
      Source: CONTACT_EMAIL,
      Destination: { ToAddresses: [CONTACT_EMAIL] },
      ReplyToAddresses: [email],
      Message: {
        Subject: { Data: `【お問い合わせ】${name} さんより`, Charset: 'UTF-8' },
        Body: {
          Text: { Data: content, Charset: 'UTF-8' },
          Html: { Data: htmlContent, Charset: 'UTF-8' },
        },
      },
    });
    const res = await ses.send(cmd);
    recordAuditEvent({
      action: 'contact.submit',
      outcome: 'success',
      status: 200,
      ip,
      requestId,
      reason: `message_id:${res.MessageId ?? 'none'}`,
    });
    console.log('[contact API] success', res.MessageId);
    return NextResponse.json({ success: true, messageId: res.MessageId ?? null });
  } catch (e: any) {
    recordAuditEvent({
      action: 'contact.submit',
      outcome: 'error',
      status: 500,
      ip,
      requestId,
      reason: e?.name ? `${e.name}:${e.message}` : 'send_failed',
    });
    console.error('[contact API] send failed', {
      name: e?.name,
      message: e?.message,
    });
    return NextResponse.json(
      { error: 'メール送信に失敗しました。' },
      { status: 500 }
    );
  }
}
