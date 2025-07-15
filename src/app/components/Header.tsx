"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const navItems = [
    { href: '/about', label: 'プロフィール' },
    { href: '/works', label: '実績' },
    { href: '/blog', label: 'ブログ' },
    { href: '/tags', label: 'タグ検索' },
  ];


  return (
    <header className="bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700 text-white shadow border-b-4 border-yellow-300">
      <div className="container mx-auto p-4 flex items-center justify-between relative">
        <h1 className="text-2xl font-bold flex items-center">
          <img
            src="/images/header_icon.png"
            alt="Header Icon"
            className="w-8 h-8 mr-2"
          />
          <Link href="/">電脳幻境プロジェクト</Link>
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
        <nav className={`${open ? 'block' : 'hidden'} sm:hidden absolute top-full left-0 w-full bg-blue-700 text-white`}> 
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
