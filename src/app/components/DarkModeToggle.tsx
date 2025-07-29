'use client';
import LazyMotionWrapper, { motion } from './LazyMotionWrapper';
import { useTheme } from './ThemeProvider';

export default function DarkModeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <LazyMotionWrapper>
      <button
        onClick={toggleTheme}
        aria-label="Toggle dark mode"
        aria-pressed={theme === 'dark'}
        className="p-2 rounded-full text-xl bg-white/80 dark:bg-gray-700/80 hover:ring-2 ring-primary transition shadow backdrop-blur-md"
      >
        <motion.span
          animate={{ rotate: theme === 'dark' ? 180 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="block"
        >
          {theme === 'dark' ? '\uD83C\uDF19' : '\u2600\uFE0F'}
        </motion.span>
      </button>
    </LazyMotionWrapper>
  );
}
