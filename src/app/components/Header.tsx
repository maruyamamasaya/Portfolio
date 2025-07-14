"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const navItems = [
    { href: '/about', label: 'プロフィール' },
    { href: '/works', label: '実績' },
    { href: '/blog', label: 'ブログ' },
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
      {pathname === '/' && (
        <div className="bg-gradient-to-r from-blue-800 via-blue-600 to-blue-800">
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
    </header>
  );
}
