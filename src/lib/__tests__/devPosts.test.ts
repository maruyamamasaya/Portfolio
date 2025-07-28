import { getSortedDevPosts, getDevPost } from '../devPosts';

describe('devPosts utilities', () => {
  it('getSortedDevPosts returns posts sorted by date desc', () => {
    const posts = getSortedDevPosts();
    expect(posts[0].slug).toBe('dev-sample-post');
  });

  it('getDevPost returns post data', () => {
    const post = getDevPost('dev-sample-post');
    expect(post.title).toContain('メタタグ');
  });
});
