'use client';
import { forwardRef, ReactNode } from 'react';
import LazyMotionWrapper, { motion } from './LazyMotionWrapper';

interface Props {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card = forwardRef<HTMLDivElement, Props>(({
  children,
  className = '',
  onClick,
}, ref) => (
  <LazyMotionWrapper>
    <motion.div
      ref={ref}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`rounded-lg shadow-md p-4 bg-white dark:bg-gray-700 ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  </LazyMotionWrapper>
));
Card.displayName = 'Card';
export default Card;
