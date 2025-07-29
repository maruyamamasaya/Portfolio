'use client';
import { ReactNode, useEffect } from 'react';
import { AnimatePresence, LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion';

import { usePathname } from 'next/navigation';

let isFirstLoad = true;

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const disable = process.env.NEXT_PUBLIC_DISABLE_INITIAL_ANIMATION === 'true';
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!disable) {
      isFirstLoad = false;
    }
  }, [disable]);

  if (disable) {
    return <>{children}</>;
  }
  const initial = isFirstLoad ? false : { opacity: 0 };
  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence mode="wait" initial={false}>
        <m.div
          key={pathname}
          className="gpu-optimize"
          initial={reduce ? false : initial}
          animate={reduce ? undefined : { opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
          transition={reduce ? undefined : { duration: 0.3, ease: 'easeInOut' }}
        >
          {children}
        </m.div>
      </AnimatePresence>
    </LazyMotion>
  );
}
