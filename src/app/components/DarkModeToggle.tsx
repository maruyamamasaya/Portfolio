'use client';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeProvider';

export default function DarkModeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      aria-pressed={theme === 'dark'}
      className="ml-2 p-2 rounded-full bg-white/50 dark:bg-gray-700/50 backdrop-blur-md"
    >
      <motion.span
        animate={{ rotate: theme === 'dark' ? 180 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="block"
      >
        {theme === 'dark' ? '\uD83C\uDF19' : '\u2600\uFE0F'}
      </motion.span>
    </button>
  );
}
