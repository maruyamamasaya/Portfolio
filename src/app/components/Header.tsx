"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/works', label: 'Works' },
    { href: '/blog', label: 'Journal' },
    { href: '/contact', label: 'Contact' },
  ];

  const categories = [
    { href: '/recommend', label: 'おすすめ記事' },
    { href: '/news', label: 'NEWS' },
    { href: '/photo', label: 'PHOTO' },
    { href: '/profile', label: 'PROFILE' },
    { href: '/store', label: 'STORE' },
  ];

  return (
    <header className="bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700 text-white shadow border-b-4 border-yellow-300">
      <div className="container mx-auto p-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center">
          <img
            src="/images/header_icon.png"
            alt="Header Icon"
            className="w-8 h-8 mr-2"
          />
          <Link href="/">My Portfolio</Link>
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
      </div>
      {pathname === '/' && (
        <div className="hidden sm:block bg-gradient-to-r from-blue-800 via-blue-600 to-blue-800">
          <div className="container mx-auto py-2">
            <ul className="flex space-x-4 text-sm justify-center">
              {categories.map((cat) => (
                <li key={cat.href}>
                  <Link href={cat.href}>{cat.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {open && (
        <nav className="sm:hidden bg-gradient-to-r from-blue-800 via-blue-600 to-blue-800">
          <ul className="flex flex-col space-y-2 p-4 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              </li>
            ))}
            {pathname === '/' &&
              categories.map((cat) => (
                <li key={cat.href}>
                  <Link href={cat.href} onClick={() => setOpen(false)}>
                    {cat.label}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
