export type ArrowColor = 'blue' | 'yellow' | 'gray';

const colorSrcMap: Record<ArrowColor, string> = {
  blue: '/images/arrow_blue.png',
  yellow: '/images/arrow_yellow.png',
  gray: '/images/arrow_gray.png',
};

export function getArrowSrc(color: ArrowColor): string {
  return colorSrcMap[color];
}
