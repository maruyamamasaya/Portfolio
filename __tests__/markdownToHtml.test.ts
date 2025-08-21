jest.mock('@/lib/posts', () => ({
  getPost: jest.fn(async (slug: string) => {
    if (slug === '20250821001') {
      return {
        slug,
        title: 'テスト投稿',
        date: '2024-01-01',
        image: '/images/img1.svg',
        category: '',
        content: '',
      };
    }
    throw new Error('not found');
  }),
}));

import markdownToHtml from '@/lib/markdownToHtml';

describe('markdownToHtml', () => {
  it('ブログカード記法をリンクカードに変換する', async () => {
    const { html } = await markdownToHtml('参照:[[20250821001]]');
    expect(html).toContain('<a href="/blog/20250821001"');
    expect(html).toContain('テスト投稿');
    expect(html).toContain('/images/img1.svg');
  });
});
