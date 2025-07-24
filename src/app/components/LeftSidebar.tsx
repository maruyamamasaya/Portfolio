import Link from 'next/link';
import Profile from './Profile';
import CategoryList from './CategoryList';

export default function LeftSidebar() {
  const navItems = [
    { href: '/', label: 'ホーム' },
    { href: '/about', label: 'プロフィール' },
    { href: '/works', label: 'Work' },
    { href: '/blog', label: 'ブログ' },
    { href: '/developers_blog', label: 'Dev Blog (開発日誌)' },
    { href: '/art_blog', label: 'Art Blog' },
    { href: '/artworks_blog', label: 'Artworks Blog' },
    { href: '/tech_blog', label: 'Tech Blog' },
    { href: '/repair_blog', label: 'Rescue Log' },
    { href: '/tags', label: 'タグ検索' },
    { href: '/contact', label: 'お問い合わせ' },
  ];

  return (
    <div className="space-y-4">
      <nav>
        <h3 className="font-bold mb-2">メニュー</h3>
        <ul className="space-y-1 text-sm">
          {navItems.map(item => (
            <li key={item.href}>
              <Link href={item.href} className="text-blue-600 hover:underline">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="widget">
        <Profile />
      </div>
      <div className="widget">
        <CategoryList />
      </div>
    </div>
  );
}
