'use client';

import { CSSProperties, ReactNode, useEffect, useRef } from 'react';
import { VisualSpace, useVisualEnvironment } from './VisualEnvironmentContext';

type Props = {
  children: ReactNode;
  space: VisualSpace;
  className?: string;
  id?: string;
  as?: 'section' | 'div' | 'article';
  style?: CSSProperties;
};

export default function SectionEnvironment({
  children,
  space,
  className = '',
  id,
  as: Component = 'section',
  style,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const { setCurrentSpace } = useVisualEnvironment();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onIntersect = ([entry]: IntersectionObserverEntry[]) => {
      if (entry?.isIntersecting) {
        setCurrentSpace(space);
      }
    };
    const io = new IntersectionObserver(onIntersect, {
      threshold: 0.35,
      rootMargin: '-20% 0px -35% 0px',
    });

    io.observe(el);
    return () => {
      io.disconnect();
    };
  }, [space, setCurrentSpace]);

  const Element = Component as unknown as 'section';

  return (
    <Element ref={ref} id={id} className={className} data-visual-space={space} style={style}>
      {children}
    </Element>
  );
}
