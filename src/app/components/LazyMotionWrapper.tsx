'use client';
import { ReactNode } from 'react';
import { LazyMotion, domAnimation, m, AnimatePresence } from 'framer-motion';

export const motion = m;
export { AnimatePresence };

export default function LazyMotionWrapper({ children }: { children: ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}
