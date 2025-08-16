import { GET } from '../posts/route';

describe('GET /api/posts', () => {
  it('returns markdown filenames', async () => {
    const res = await GET();
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBe(0);
  });
});
