import { getSortedDevPosts, getDevPost } from '../devPosts';
import { FileNotFoundError } from '../errors';

describe('devPosts utilities', () => {
  it('getSortedDevPosts returns posts sorted by date desc', async () => {
    const posts = await getSortedDevPosts();
    expect(posts[0].slug).toBe('dev-sample-post');
  });

  it('getDevPost returns post data', async () => {
    const post = await getDevPost('dev-sample-post');
    expect(post.title).toContain('メタタグ');
  });

  it('getDevPost throws FileNotFoundError for missing file', async () => {
    await expect(getDevPost('missing-post')).rejects.toBeInstanceOf(
      FileNotFoundError,
    );
  });
});
