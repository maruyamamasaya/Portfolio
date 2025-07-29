'use client';
import { forwardRef, ReactNode } from 'react';
import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion';


interface Props {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card = forwardRef<HTMLDivElement, Props>(({ children, className = '', onClick }, ref) => {
  const reduce = useReducedMotion();
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        ref={ref}
        whileHover={reduce ? undefined : { scale: 1.05 }}
        whileTap={reduce ? undefined : { scale: 0.95 }}
        className={`rounded-lg shadow-md p-4 bg-white dark:bg-gray-700 transition-base ${className}`}
        onClick={onClick}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
});
Card.displayName = 'Card';
export default Card;
