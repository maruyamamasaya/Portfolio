"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import DarkModeToggle from './DarkModeToggle';

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const navItems = [
    { href: '/about', label: 'プロフィール' },
    { href: '/works', label: 'Work' },
    { href: '/blog', label: 'ブログ' },
    { href: '/tags', label: 'タグ検索' },
  ];


  return (
    <header className="backdrop-blur-md bg-white/30 dark:bg-gray-800/30 shadow text-gray-800 dark:text-gray-200">
      <div className="container mx-auto flex items-center justify-between relative p-2">
        <h1 className="text-2xl font-digital font-bold flex items-center">
          <img
            src="/images/header_icon.png"
            alt="Header Icon"
            className="w-8 h-8 mr-2"
          />
          <Link href="/">でじサポ｜パソコン相談室</Link>
        </h1>
        <button
          className="sm:hidden flex flex-col items-center justify-center w-8 h-8"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className="block w-6 h-0.5 bg-white mb-1" />
          <span className="block w-6 h-0.5 bg-white mb-1" />
          <span className="block w-6 h-0.5 bg-white" />
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
        <DarkModeToggle />
        <nav className={`${open ? 'block' : 'hidden'} sm:hidden absolute top-full left-0 w-full bg-gradient-to-b from-primary via-primary to-secondary text-white`}>
          <ul className="flex flex-col p-4 space-y-2 text-sm">
            {navItems.map(item => (
              <li key={item.href}>
                <Link href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {/* Category links removed */}
    </header>
  );
}
