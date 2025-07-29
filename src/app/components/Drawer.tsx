'use client';
import { ReactNode, useEffect } from 'react';
import {
  LazyMotion,
  domAnimation,
  m,
  AnimatePresence,
  useReducedMotion,
} from 'framer-motion';


interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Drawer({ open, onClose, children }: DrawerProps) {
  useEffect(() => {
    if (open) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [open]);
  const reduce = useReducedMotion();
  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {open && (
          <>
            <m.div
              className="fixed inset-0 bg-black/40 z-50 transition-base"
              onClick={onClose}
              initial={{ opacity: 0 }}
              animate={reduce ? undefined : { opacity: 1 }}
              exit={reduce ? undefined : { opacity: 0 }}
            />
            <m.div
              className="fixed top-0 left-0 bottom-0 w-64 bg-white dark:bg-gray-700 z-60 p-4 transition-base"
              initial={{ x: '-100%' }}
              animate={reduce ? undefined : { x: 0 }}
              exit={reduce ? undefined : { x: '-100%' }}
              transition={reduce ? undefined : { type: 'tween', duration: 0.3, ease: 'easeInOut' }}
            >
              {children}
            </m.div>
          </>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}
