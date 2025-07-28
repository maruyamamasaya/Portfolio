import { getSortedDevPosts, getDevPost } from '../devPosts';

describe('devPosts utilities', () => {
  it('getSortedDevPosts returns posts sorted by date desc', async () => {
    const posts = await getSortedDevPosts();
    expect(posts[0].slug).toBe('dev-sample-post');
  });

  it('getDevPost returns post data', async () => {
    const slug = 'dev-sample-post';
    const post = await getDevPost(slug);
    expect(post.title).toContain('メタタグ');
  });

  it('getDevPost throws for missing file', async () => {
    await expect(getDevPost('missing-post')).rejects.toThrow('Dev post not found');
  });
});
