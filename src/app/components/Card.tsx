'use client';
import { forwardRef, ReactNode } from 'react';
import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion';


interface Props {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  disableHover?: boolean;
}

const Card = forwardRef<HTMLDivElement, Props>(
  ({ children, className = '', onClick, disableHover = false }, ref) => {
    const reduce = useReducedMotion();
    const hover = reduce || disableHover ? undefined : { scale: 1.05 };
    const tap = reduce || disableHover ? undefined : { scale: 0.95 };
    return (
      <LazyMotion features={domAnimation}>
        <m.div
          ref={ref}
          whileHover={hover}
          whileTap={tap}
          className={`rounded-lg shadow-md p-4 bg-white dark:bg-gray-700 transition-base ${className}`}
          onClick={onClick}
        >
          {children}
        </m.div>
      </LazyMotion>
    );
  },
);
Card.displayName = 'Card';
export default Card;
