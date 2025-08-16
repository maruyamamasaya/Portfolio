import { GET } from '../search-data/route';

describe('GET /api/search-data', () => {
  it('returns posts meta', async () => {
    const res = await GET();
    const data = await res.json();
    expect(Array.isArray(data.posts)).toBe(true);
    expect(data.posts.length).toBe(0);
  });
});
