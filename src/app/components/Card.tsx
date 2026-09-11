'use client';
import { forwardRef } from 'react';
import { HTMLMotionProps, LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion';


type Props = Omit<HTMLMotionProps<'div'>, 'ref'> & {
  disableHover?: boolean;
};

const Card = forwardRef<HTMLDivElement, Props>(
  ({ children, className = '', disableHover = false, ...props }, ref) => {
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
          {...props}
        >
          {children}
        </m.div>
      </LazyMotion>
    );
  },
);
Card.displayName = 'Card';
export default Card;
