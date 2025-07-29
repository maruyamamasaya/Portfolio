'use client';
import { ReactNode } from 'react';
import LazyMotionWrapper, { motion, AnimatePresence } from './LazyMotionWrapper';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Drawer({ open, onClose, children }: DrawerProps) {
  return (
    <LazyMotionWrapper>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              onClick={onClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="fixed top-0 left-0 bottom-0 w-64 bg-white dark:bg-gray-700 z-50 p-4"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
            >
              {children}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </LazyMotionWrapper>
  );
}
