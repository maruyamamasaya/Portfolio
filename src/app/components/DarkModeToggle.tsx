'use client';
import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion';
import { useTheme } from './ThemeProvider';

export default function DarkModeToggle() {
  const { theme, toggleTheme } = useTheme();
  const reduce = useReducedMotion();

  return (
    <LazyMotion features={domAnimation}>
      <button
        onClick={toggleTheme}
        aria-label="Toggle dark mode"
        aria-pressed={theme === 'dark'}
        className="p-2 rounded-full text-xl bg-white/80 dark:bg-gray-700/80 hover:ring-2 ring-primary transition-base shadow backdrop-blur-md"
      >
        <m.span
          animate={reduce ? undefined : { rotate: theme === 'dark' ? 180 : 0 }}
          transition={reduce ? undefined : { duration: 0.3, ease: 'easeInOut' }}
          className="block"
        >
          {theme === 'dark' ? '\uD83C\uDF19' : '\u2600\uFE0F'}
        </m.span>
      </button>
    </LazyMotion>
  );
}
