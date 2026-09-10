import { NextRequest } from 'next/server';
import { POST } from '../contact/route';

const sendMock = jest.fn();

jest.mock('@aws-sdk/client-ses', () => ({
  SESClient: jest.fn(() => ({ send: sendMock })),
  SendEmailCommand: jest.fn((input) => input),
}));

const makeReq = (body: Record<string, string>, ip = '1.2.3.4') =>
  new NextRequest('http://localhost/api/contact', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-forwarded-for': ip,
    },
    body: JSON.stringify(body),
  });

describe('POST /api/contact', () => {
  const prevRegion = process.env.AWS_SES_REGION;
  const prevAccess = process.env.AWS_SES_ACCESS_KEY_ID;
  const prevSecret = process.env.AWS_SES_SECRET_ACCESS_KEY;
  let auditLogSpy: jest.SpyInstance;

  beforeEach(() => {
    process.env.AWS_SES_REGION = 'us-east-1';
    process.env.AWS_SES_ACCESS_KEY_ID = 'test-id';
    process.env.AWS_SES_SECRET_ACCESS_KEY = 'test-secret';
    sendMock.mockReset();
    sendMock.mockResolvedValue({ MessageId: 'mid-1' });
    auditLogSpy = jest.spyOn(console, 'info').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterAll(() => {
    process.env.AWS_SES_REGION = prevRegion;
    process.env.AWS_SES_ACCESS_KEY_ID = prevAccess;
    process.env.AWS_SES_SECRET_ACCESS_KEY = prevSecret;
  });

  it('お問い合わせは必須項目欠損で400', async () => {
    const res = await POST(
      makeReq({
        subject: '件名',
        email: '',
        message: 'test',
      }),
    );
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBe('名前とメールアドレスは必須です。');
    expect(auditLogSpy).toHaveBeenCalled();
  });

  it('お問い合わせは正常に送信されたら200', async () => {
    const res = await POST(
      makeReq({
        name: 'taro',
        email: 'taro@example.com',
        message: 'テスト',
      }),
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.messageId).toBe('mid-1');
    expect(auditLogSpy).toHaveBeenCalledWith(
      '[audit]',
      expect.stringContaining('"action":"contact.submit"'),
    );
  });

  it('お問い合わせレート制限が超過すると429', async () => {
    const ip = `2.0.0.${Date.now() % 250}`;
    await POST(
      makeReq(
        {
          name: 'user',
          email: 'user@example.com',
          message: 'a',
        },
        ip,
      ),
    );
    await POST(makeReq({ name: 'user', email: 'user@example.com', message: 'a' }, ip));
    await POST(makeReq({ name: 'user', email: 'user@example.com', message: 'a' }, ip));
    await POST(makeReq({ name: 'user', email: 'user@example.com', message: 'a' }, ip));
    await POST(makeReq({ name: 'user', email: 'user@example.com', message: 'a' }, ip));
    const res = await POST(makeReq({ name: 'user', email: 'user@example.com', message: 'a' }, ip));

    expect(res.status).toBe(429);
    const body = await res.json();
    expect(body.error).toBe('しばらくしてからお試しください。');
  });
});
