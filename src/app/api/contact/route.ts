import { NextResponse } from 'next/server';

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
    const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: CONTACT_EMAIL }] }],
        from: { email: CONTACT_EMAIL },
        reply_to: { email },
        subject,
        content: [
          { type: 'text/plain', value: content },
          { type: 'text/html', value: htmlContent },
        ],
      }),
    });

    if (!res.ok) {
      console.error('SendGrid error', res.status);
      return NextResponse.json(
        { error: 'メール送信に失敗しました。' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('メール送信に失敗しました。', err);
    return NextResponse.json(
      { error: 'メール送信に失敗しました。' },
      { status: 500 }
    );
  }
}

