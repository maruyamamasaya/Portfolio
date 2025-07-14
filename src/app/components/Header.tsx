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

  const categories = [
    { href: '/recommend', label: 'おすすめ記事' },
    { href: '/news', label: 'NEWS' },
    { href: '/photo', label: 'PHOTO' },
    { href: '/profile', label: 'PROFILE' },
    { href: '/store', label: 'STORE' },
  ];

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow">
      <div className="container mx-auto p-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">
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
        <div className="bg-gradient-to-r from-blue-700 to-purple-700">
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
