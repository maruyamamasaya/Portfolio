import fs from 'fs/promises';
import path from 'path';
import { POST } from '../upload-image/route';

const imagesDir = path.join(process.cwd(), 'public', 'images');

describe('POST /api/upload-image', () => {
  it('accepts valid PNG', async () => {
    const file = new File([Buffer.from('abc')], 'test.png', {
      type: 'image/png',
    });
    const form = new FormData();
    form.append('file', file);
    const req = new Request('http://localhost/api/upload-image', {
      method: 'POST',
      body: form,
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.ok).toBe(true);
    await fs.unlink(path.join(imagesDir, 'test.png'));
  });

  it('rejects invalid MIME type', async () => {
    const file = new File([Buffer.from('abc')], 'test.txt', {
      type: 'text/plain',
    });
    const form = new FormData();
    form.append('file', file);
    const req = new Request('http://localhost/api/upload-image', {
      method: 'POST',
      body: form,
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it('rejects too large file', async () => {
    const big = new Uint8Array(5 * 1024 * 1024 + 1);
    const file = new File([big], 'big.png', {
      type: 'image/png',
    });
    const form = new FormData();
    form.append('file', file);
    const req = new Request('http://localhost/api/upload-image', {
      method: 'POST',
      body: form,
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });
});
