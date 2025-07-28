'use client';
import { ReactNode, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

let isFirstLoad = true;

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const disable = process.env.NEXT_PUBLIC_DISABLE_INITIAL_ANIMATION === 'true';
  if (disable) {
    return <>{children}</>;
  }
  useEffect(() => {
    isFirstLoad = false;
  }, []);
  const initial = isFirstLoad ? false : { opacity: 0 };
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        className="gpu-optimize"
        initial={initial}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
