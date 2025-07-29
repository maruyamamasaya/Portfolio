import { getCategory } from '../categories';

describe('getCategory', () => {
  it('returns category for slug pc-support', () => {
    const cat = getCategory('pc-support');
    expect(cat).toEqual({
      slug: 'pc-support',
      name: 'パソコントラブルサポート',
      description: '初心者向けのPC・スマホ問題の解決案内',
      icon: '💻',
    });
  });
});
