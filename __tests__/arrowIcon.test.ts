import { getArrowSrc } from '@/app/components/arrowUtils';

describe('getArrowSrc', () => {
  it('returns yellow arrow path', () => {
    expect(getArrowSrc('yellow')).toBe('/images/arrow_yellow.png');
  });
});
