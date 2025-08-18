'use client';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
const DarkModeToggle = dynamic(() => import('./DarkModeToggle'), {
  ssr: false,
});
import HeaderSearchBox from './HeaderSearchBox';

type NavItem = {
  href: string;
  label: string;
  icon: JSX.Element;
};

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
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
  const services = [
    { href: '/services', label: 'サービス一覧' },
    { href: '/pricing', label: '料金' },
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
              <li className="relative group">
                <div className="inline-flex items-center space-x-1 rounded min-h-[44px] min-w-[44px] px-2 py-1 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary transition-colors duration-200">
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
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                  <span>サービス紹介</span>
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
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                <div className="absolute left-0 mt-2 w-40 rounded-md bg-white dark:bg-gray-800 shadow-lg opacity-0 invisible group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 translate-y-1 transition-all duration-200">
                  {services.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex items-center space-x-2 ml-2">
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
              <li>
                <button
                  onClick={() => setServiceOpen((prev) => !prev)}
                  className="flex w-full items-center justify-between rounded px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <span>サービス紹介</span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`w-4 h-4 transform transition-transform ${serviceOpen ? 'rotate-180' : ''}`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <AnimatePresence>
                  {serviceOpen && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4 mt-1 space-y-1"
                    >
                      {services.map((s) => (
                        <li key={s.href}>
                          <Link
                            href={s.href}
                            className="block rounded px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {s.label}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
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
