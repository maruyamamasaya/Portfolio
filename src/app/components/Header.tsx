'use client';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
const DarkModeToggle = dynamic(() => import('./DarkModeToggle'), {
  ssr: false,
});
import HeaderSearchBox from './HeaderSearchBox';

type NavItem = {
  href: string;
  label: string;
  icon: ReactNode;
};

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems: NavItem[] = [
    {
      href: '/',
      label: 'ホーム',
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 22V12h6v10"
          />
        </svg>
      ),
    },
    {
      href: '/about',
      label: 'プロフィール',
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 20v-1c0-2.21 3.58-4 8-4s8 1.79 8 4v1"
          />
        </svg>
      ),
    },
    {
      href: '/works',
      label: 'Work',
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 7h18v13H3z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2"
          />
        </svg>
      ),
    },
    {
      href: '/blog',
      label: 'ブログ',
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 4h7v16H4zM13 4h7v16h-7z"
          />
        </svg>
      ),
    },
  ];
  return (
    <header className="backdrop-blur-sm bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 border-b border-gray-200 dark:border-gray-700 shadow text-gray-900 dark:text-gray-100">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 bg-white dark:bg-gray-800 text-blue-600 p-2 rounded"
      >
        Skip to content
      </a>
      <div className="container mx-auto flex items-center relative p-1">
        <h1 className="text-xl font-display font-bold flex items-center">
          <Link href="/">
            <Image
              src="/images/headericon-light.png"
              alt="パソコン相談ならお任せ"
              width={144}
              height={48}
              className="w-36 h-12 dark:hidden"
            />
            <Image
              src="/images/headericon-dark.png"
              alt="パソコン相談ならお任せ"
              width={144}
              height={48}
              className="w-36 h-12 hidden dark:block"
            />
          </Link>
        </h1>
        <div className="hd:border-l hd:border-gray-300 hd:pl-4 hd:flex-1">
          <nav className="hidden hd:flex justify-center">
            <ul className="flex gap-3 md:gap-4 text-sm items-center">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`inline-flex items-center space-x-1 rounded min-h-[44px] min-w-[44px] px-2 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary focus:ring-2 focus:ring-primary focus:outline-none transition-colors duration-200 ${isActive ? 'text-primary font-semibold' : ''}`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
        <div className="flex items-center space-x-2 ml-auto">
          <div className="hidden hd:block">
            <HeaderSearchBox />
          </div>
          <DarkModeToggle />
          <button
            className="hd:hidden p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="メニュー"
          >
            {isMenuOpen ? (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="hd:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-md"
          >
            <ul className="flex flex-col p-4 space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block rounded px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="hd:hidden">
                <HeaderSearchBox />
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
