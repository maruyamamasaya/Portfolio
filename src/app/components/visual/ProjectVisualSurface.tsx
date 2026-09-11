'use client';

import { CSSProperties, ReactNode } from 'react';
import { ProjectVisualColor, useVisualEnvironment } from './VisualEnvironmentContext';

type Props = {
  children: ReactNode;
  color: ProjectVisualColor;
  className?: string;
  style?: CSSProperties;
};

export default function ProjectVisualSurface({ children, color, className = '', style }: Props) {
  const { setCurrentProjectColor, resetProjectColor } = useVisualEnvironment();

  return (
    <div
      className={className}
      style={style}
      onPointerEnter={() => setCurrentProjectColor(color)}
      onPointerLeave={resetProjectColor}
      onFocusCapture={() => setCurrentProjectColor(color)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) resetProjectColor();
      }}
    >
      {children}
    </div>
  );
}
