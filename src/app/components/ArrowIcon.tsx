import Image from 'next/image';
import { ArrowColor, getArrowSrc } from './arrowUtils';

export type ArrowDirection = 'left' | 'right';

interface ArrowIconProps {
  color: ArrowColor;
  direction?: ArrowDirection;
  className?: string;
  alt?: string;
}

export default function ArrowIcon({
  color,
  direction = 'right',
  className = '',
  alt = 'arrow',
}: ArrowIconProps) {
  const rotationClass = direction === 'left' ? 'rotate-180' : '';
  return (
    <Image
      src={getArrowSrc(color)}
      alt={alt}
      width={24}
      height={24}
      className={`${rotationClass} ${className}`.trim()}
    />
  );
}
