import { GET } from '../works/route';

describe('GET /api/works', () => {
  it('returns markdown filenames', async () => {
    const res = await GET();
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data)).toBe(true);
    expect(data).toContain('line-traffic-design.md');
  });
});
