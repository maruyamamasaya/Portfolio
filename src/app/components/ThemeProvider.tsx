'use client';
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

export type Theme = 'light' | 'dark';
interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}
const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null;
    const system = window.matchMedia('(prefers-color-scheme: dark)');
    if (stored) {
      setTheme(stored);
    } else if (system.matches) {
      setTheme('dark');
    }
    const listener = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };
    system.addEventListener('change', listener);
    return () => system.removeEventListener('change', listener);
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove(
      theme === 'dark' ? 'light' : 'dark',
    );
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
