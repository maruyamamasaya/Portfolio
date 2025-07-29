'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import DarkModeToggle from './DarkModeToggle';
import Drawer from './Drawer';
import SearchBar from './SearchBar';

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
    <header className="backdrop-blur-md bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700 shadow text-gray-900 dark:text-gray-100">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 bg-white dark:bg-gray-800 text-blue-600 p-2 rounded"
      >
        Skip to content
      </a>
      <div className="container mx-auto flex items-center justify-between relative p-2">
        <h1 className="text-2xl font-digital font-bold flex items-center">
          <Image
            src="/images/img1.svg"
            alt="Light mode logo"
            width={32}
            height={32}
            className="w-8 h-8 mr-2 block dark:hidden"
          />
          <Image
            src="/images/img2.svg"
            alt="Dark mode logo"
            width={32}
            height={32}
            className="w-8 h-8 mr-2 hidden dark:block"
          />
          <Link href="/">でじサポ｜パソコン相談室</Link>
        </h1>
        <button
          className="sm:hidden flex flex-col items-center justify-center w-10 h-10 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className="block w-6 h-0.5 bg-gray-800 dark:bg-gray-200 mb-1" />
          <span className="block w-6 h-0.5 bg-gray-800 dark:bg-gray-200 mb-1" />
          <span className="block w-6 h-0.5 bg-gray-800 dark:bg-gray-200" />
        </button>
        <nav className="hidden sm:block">
          <ul className="flex space-x-4 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex items-center space-x-1 hover:text-primary motion-safe:transition-transform motion-reduce:transition-none duration-300 ease-in-out hover:scale-105"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="hidden sm:block ml-4 w-48">
          <SearchBar showHistory={false} />
        </div>
        <DarkModeToggle />
        <Drawer open={open} onClose={() => setOpen(false)}>
          <ul className="flex flex-col space-y-4 mt-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center space-x-2 py-1 hover:text-primary"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <SearchBar showHistory={false} />
          </div>
        </Drawer>
      </div>
      {/* Category links removed */}
    </header>
  );
}
