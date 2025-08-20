import { getArrowSrc } from '@/app/components/arrowUtils';

describe('getArrowSrc', () => {
  it('returns yellow arrow path', () => {
    expect(getArrowSrc('yellow')).toBe('/images/arrow_yellow.png');
  });

  it('returns gray arrow path', () => {
    expect(getArrowSrc('gray')).toBe('/images/arrow_gray.png');
  });
});
