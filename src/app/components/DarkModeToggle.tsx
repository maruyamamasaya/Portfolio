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
      className="p-2 rounded-full text-xl bg-white/70 dark:bg-gray-700/70 hover:ring-2 ring-primary transition backdrop-blur-md"
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
