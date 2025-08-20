'use client';

import Image from 'next/image';
import { useTheme } from './ThemeProvider';

interface FlowArrowProps {
  className?: string;
  alt?: string;
}

export default function FlowArrow({ className = '', alt = 'arrow' }: FlowArrowProps) {
  const { theme } = useTheme();
  const src =
    theme === 'dark'
      ? '/images/arrow50x300bluedark.png'
      : '/images/arrow50x300pinklight.png';
  return <Image src={src} alt={alt} width={50} height={300} className={className} />;
}

