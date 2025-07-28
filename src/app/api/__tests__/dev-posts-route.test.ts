import { GET } from '../dev-posts/route';

describe('GET /api/dev-posts', () => {
  it('returns dev post filenames', async () => {
    const res = await GET();
    const data = await res.json();
    expect(data).toContain('dev-sample-post.md');
  });
});
