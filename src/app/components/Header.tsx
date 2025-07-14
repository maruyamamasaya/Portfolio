"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/works', label: 'Works' },
    { href: '/blog', label: 'Journal' },
    { href: '/contact', label: 'Contact' },
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
        <nav>
          <ul className="flex space-x-4 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {/* Category links removed */}
    </header>
  );
}
