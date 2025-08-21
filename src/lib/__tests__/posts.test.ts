import { getSortedPosts, getPost, getPostsByTag } from '../posts';
import { FileNotFoundError } from '../errors';

describe('posts utilities', () => {
  it('getSortedPosts returns an array of posts', async () => {
    const posts = await getSortedPosts();
    expect(Array.isArray(posts)).toBe(true);
  });

  it('getPost throws FileNotFoundError for missing file', async () => {
    await expect(getPost('missing-post')).rejects.toBeInstanceOf(
      FileNotFoundError,
    );
  });

  it('getPostsByTag returns an array when filtered by tag', async () => {
    const tag = 'AI';
    const posts = await getPostsByTag(tag);
    expect(Array.isArray(posts)).toBe(true);
  });
});
