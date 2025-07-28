import { getSortedPosts, getPost, getPostsByTag } from '../posts';

describe('posts utilities', () => {
  it('getSortedPosts returns posts sorted by date desc', async () => {
    const posts = await getSortedPosts();
    expect(posts[0].slug).toBe('ai-one-day-web');
    expect(posts[1].slug).toBe('article-template');
  });

  it('getPost returns correct post data', async () => {
    const post = await getPost('meta-sample-post');
    expect(post.title).toBe('メタタグサンプル');
    expect(post.tags).toContain('メタタグ');
  });

  it('getPostsByTag returns posts with specified tag', async () => {
    const posts = await getPostsByTag('AI');
    expect(posts.some((p) => p.slug === 'ai-one-day-web')).toBe(true);
  });
});
