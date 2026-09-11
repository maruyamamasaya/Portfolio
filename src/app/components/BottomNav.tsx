'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();
  const navItems = [
    {
      href: '/',
      label: 'ホーム',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 22V12h6v10" />
        </svg>
      ),
    },
    {
      href: '/about',
      label: 'プロフィール',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 20v-1c0-2.21 3.58-4 8-4s8 1.79 8 4v1" />
        </svg>
      ),
    },
    {
      href: '/works',
      label: 'Work',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18v13H3z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
        </svg>
      ),
    },
    {
      href: '/services',
      label: 'サービス紹介',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      ),
    },
    {
      href: '/blog',
      label: 'ブログ',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h7v16H4zM13 4h7v16h-7z" />
        </svg>
      ),
    },
  ];

  return (
    <nav
      className="hd:hidden fixed bottom-0 inset-x-0 z-50 border-t bg-[#081028]/80 backdrop-blur-xl"
      style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
    >
      <ul className="flex justify-around">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`flex flex-col items-center py-2 text-xs transition-base ${
                pathname === item.href ? 'text-[#8ea9ff]' : 'text-slate-400'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

