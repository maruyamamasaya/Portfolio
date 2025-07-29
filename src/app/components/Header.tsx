'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import DarkModeToggle from './DarkModeToggle';
import Drawer from './Drawer';
import HeaderSearchBox from './HeaderSearchBox';

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const navItems = [
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
      href: '/ai-course',
      label: 'AI講座',
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-4 h-4"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M8 12h8M12 8v8" />
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
    {
      href: '/categories',
      label: 'カテゴリ',
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-4 h-4"
        >
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
        </svg>
      ),
    },
    {
      href: '/tags',
      label: 'タグ検索',
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
            d="M3 12l9 9 9-9-9-9-9 9z"
          />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
    },
  ];

  return (
    <header className="backdrop-blur-sm bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700 shadow text-gray-900 dark:text-gray-100">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 bg-white dark:bg-gray-800 text-blue-600 p-2 rounded"
      >
        Skip to content
      </a>
      <div className="container mx-auto flex items-center relative p-1">
        <h1 className="text-xl font-digital font-bold flex items-center">
          <Link href="/">
            <Image
              src="/images/header_icon.png"
              alt="パソコン相談ならお任せ"
              width={48}
              height={48}
              className="w-12 h-12"
            />
          </Link>
        </h1>
        <div className="ml-2">
          <HeaderSearchBox />
        </div>
        <div className="border-l border-gray-300 pl-4 flex-1">
          <nav className="hidden sm:flex justify-center">
            <ul className="flex gap-3 md:gap-4 text-sm">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex items-center space-x-1 rounded min-h-[44px] min-w-[44px] px-2 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary focus:ring-2 focus:ring-primary focus:outline-none transition-all duration-200 motion-safe:transition-transform motion-reduce:transition-none hover:scale-105"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="flex items-center space-x-2 ml-2">
          <DarkModeToggle />
          <button
            className="sm:hidden flex flex-col items-center justify-center w-10 h-10 p-2 rounded focus:ring-2 focus:outline-none"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <span className="block w-6 h-0.5 bg-gray-800 dark:bg-gray-200 mb-1" />
            <span className="block w-6 h-0.5 bg-gray-800 dark:bg-gray-200 mb-1" />
            <span className="block w-6 h-0.5 bg-gray-800 dark:bg-gray-200" />
          </button>
        </div>
        <Drawer open={open} onClose={() => setOpen(false)}>
          <ul className="flex flex-col space-y-4 mt-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center space-x-2 rounded min-h-[44px] min-w-[44px] px-3 py-2 w-full text-center hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary focus:ring-2 focus:ring-primary focus:outline-none transition-all duration-200"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Drawer>
      </div>
      {/* Category links removed */}
    </header>
  );
}
