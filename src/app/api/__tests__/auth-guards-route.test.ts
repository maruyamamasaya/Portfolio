import fs from 'fs/promises';
import path from 'path';
import { NextRequest } from 'next/server';

jest.mock('next/cache', () => ({
  revalidatePath: jest.fn(),
}));

import {
  POST as postsListPost,
} from '../posts/route';
import {
  DELETE as postsDelete,
  PUT as postsPut,
} from '../posts/[filename]/route';
import {
  POST as worksListPost,
} from '../works/route';
import {
  DELETE as worksDelete,
  PUT as worksPut,
} from '../works/[filename]/route';
import { POST as revalidatePost } from '../revalidate/route';

const AUTH_HEADER = `Basic ${Buffer.from('test:test').toString('base64')}`;

describe('認可ガード', () => {
  const oldUser = process.env.BASIC_AUTH_USERNAME;
  const oldPass = process.env.BASIC_AUTH_PASSWORD;
  const oldRevalidate = process.env.REVALIDATE_SECRET;

  beforeAll(() => {
    process.env.BASIC_AUTH_USERNAME = 'test';
    process.env.BASIC_AUTH_PASSWORD = 'test';
    process.env.REVALIDATE_SECRET = 'revalidate-token';
  });

  afterAll(() => {
    process.env.BASIC_AUTH_USERNAME = oldUser;
    process.env.BASIC_AUTH_PASSWORD = oldPass;
    process.env.REVALIDATE_SECRET = oldRevalidate;
  });

  const blogDir = path.join(process.cwd(), 'blog');
  const worksDir = path.join(process.cwd(), 'content', 'works');
  const slug = `auth-test-${Date.now()}`;
  const postFilename = `${slug}-post.md`;
  const workFilename = `${slug}-work.md`;

  const makeAuthReq = (init?: RequestInit) =>
    new NextRequest('http://localhost/api/revalidate', {
      ...init,
      headers: {
        ...(init?.headers ?? {}),
        authorization: AUTH_HEADER,
      },
    });

  const makeReq = (init?: RequestInit) =>
    new NextRequest('http://localhost/api/revalidate', init);

  it('posts POST は未認証で401', async () => {
    const req = makeReq({
      method: 'POST',
      body: JSON.stringify({ filename: postFilename, content: 'test' }),
    });
    const res = await postsListPost(req);
    expect(res.status).toBe(401);
  });

  it('posts POST は認証で200', async () => {
    const req = makeAuthReq({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filename: postFilename, content: '# test' }),
    });
    const res = await postsListPost(req);
    expect(res.status).toBe(200);
    await fs.unlink(path.join(blogDir, postFilename)).catch(() => undefined);
  });

  it('posts PUT は未認証で401', async () => {
    const req = makeReq({
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: '# test' }),
    });
    const res = await postsPut(req, { params: { filename: postFilename } });
    expect(res.status).toBe(401);
  });

  it('posts DELETE は未認証で401', async () => {
    const req = makeReq({ method: 'DELETE' });
    const res = await postsDelete(req, { params: { filename: postFilename } });
    expect(res.status).toBe(401);
  });

  it('posts PUT は認証で200', async () => {
    await postsListPost(
      makeAuthReq({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename: postFilename, content: '# before' }),
      }) as unknown as NextRequest,
    );
    const req = makeAuthReq({
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: '# after' }),
    });
    const res = await postsPut(req, { params: { filename: postFilename } });
    expect(res.status).toBe(200);
    await fs.unlink(path.join(blogDir, postFilename)).catch(() => undefined);
  });

  it('posts DELETE は認証で200', async () => {
    await fs.writeFile(path.join(blogDir, postFilename), '# before', 'utf8');
    const req = makeAuthReq({ method: 'DELETE' });
    const res = await postsDelete(req, { params: { filename: postFilename } });
    expect(res.status).toBe(200);
  });

  it('works POST は未認証で401', async () => {
    const req = makeReq({
      method: 'POST',
      body: JSON.stringify({ filename: workFilename, content: 'test' }),
    });
    const res = await worksListPost(req);
    expect(res.status).toBe(401);
  });

  it('works POST は認証で200', async () => {
    const req = makeAuthReq({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filename: workFilename, content: '# test' }),
    });
    const res = await worksListPost(req);
    expect(res.status).toBe(200);
    await fs.unlink(path.join(worksDir, workFilename)).catch(() => undefined);
  });

  it('works PUT は認証で200', async () => {
    await worksListPost(
      makeAuthReq({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename: workFilename, content: '# before' }),
      }) as unknown as NextRequest,
    );
    const req = makeAuthReq({
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: '# after' }),
    });
    const res = await worksPut(req, { params: { filename: workFilename } });
    expect(res.status).toBe(200);
    await fs.unlink(path.join(worksDir, workFilename)).catch(() => undefined);
  });

  it('works DELETE は認証で200', async () => {
    await fs.writeFile(path.join(worksDir, workFilename), '# before', 'utf8');
    const req = makeAuthReq({ method: 'DELETE' });
    const res = await worksDelete(req, { params: { filename: workFilename } });
    expect(res.status).toBe(200);
  });

  it('revalidate は未認証で401', async () => {
    const req = makeReq({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paths: ['/blog'] }),
    });
    const res = await revalidatePost(req);
    expect(res.status).toBe(401);
  });

  it('revalidate は認証で200', async () => {
    const req = makeAuthReq({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paths: ['/blog'] }),
    });
    const res = await revalidatePost(req);
    expect(res.status).toBe(200);
  });
});
