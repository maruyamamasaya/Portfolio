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
    const hover = reduce || disableHover ? undefined : { scale: 1.01, y: -3 };
    const tap = reduce || disableHover ? undefined : { scale: 0.95 };
    return (
      <LazyMotion features={domAnimation}>
        <m.div
          ref={ref}
          whileHover={hover}
          whileTap={tap}
          className={`lux-card p-5 ${className}`}
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
