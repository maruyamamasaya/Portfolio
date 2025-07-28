import { getCategory } from '../categories';

describe('getCategory', () => {
  it('returns category for slug ai', () => {
    const cat = getCategory('ai');
    expect(cat).toEqual({
      slug: 'ai',
      name: 'AI活用',
      description: 'AIを活用した記事やツールの紹介',
      icon: '🤖'
    });
  });
});
