"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import DarkModeToggle from './DarkModeToggle';
import Drawer from './Drawer';

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const navItems = [
    { href: '/about', label: 'プロフィール' },
    { href: '/works', label: 'Work' },
    { href: '/blog', label: 'ブログ' },
    { href: '/categories', label: 'カテゴリ' },
    { href: '/tags', label: 'タグ検索' },
  ];


  return (
    <header className="backdrop-blur-md bg-white/90 dark:bg-gray-900/90 shadow text-gray-900 dark:text-gray-100">
      <div className="container mx-auto flex items-center justify-between relative p-2">
        <h1 className="text-2xl font-digital font-bold flex items-center">
          <img
            src="/images/img1.svg"
            alt="Header Icon"
            className="w-8 h-8 mr-2 block dark:hidden"
          />
          <img
            src="/images/img2.svg"
            alt="Header Icon Dark"
            className="w-8 h-8 mr-2 hidden dark:block"
          />
          <Link href="/">でじサポ｜パソコン相談室</Link>
        </h1>
        <button
          className="sm:hidden flex flex-col items-center justify-center w-8 h-8"
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
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <form action="/search" method="get" className="hidden sm:block ml-4">
          <input
            type="text"
            name="q"
            placeholder="検索..."
            className="border rounded px-2 py-1 text-sm"
          />
        </form>
        <DarkModeToggle />
        <Drawer open={open} onClose={() => setOpen(false)}>
          <ul className="flex flex-col space-y-4 mt-8">
            {navItems.map(item => (
              <li key={item.href}>
                <Link href={item.href} onClick={() => setOpen(false)} className="block py-1">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <form action="/search" method="get" className="mt-4">
            <input
              type="text"
              name="q"
              placeholder="検索..."
              className="w-full border rounded px-2 py-1"
            />
          </form>
        </Drawer>
      </div>
      {/* Category links removed */}
    </header>
  );
}
