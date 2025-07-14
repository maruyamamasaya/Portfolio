import Link from 'next/link';

export default function CategoryList() {
  const categories = [
    { name: 'おすすめ記事', href: '/recommend' },
    { name: 'NEWS', href: '/news' },
    { name: 'PHOTO', href: '/photo' },
    { name: 'PROFILE', href: '/profile' },
    { name: 'STORE', href: '/store' },
  ];

  return (
    <div>
      <h3 className="font-bold mb-2">カテゴリー</h3>
      <ul className="space-y-1 text-sm">
        {categories.map(cat => (
          <li key={cat.href}>
            <Link href={cat.href} className="text-blue-600 hover:underline">
              {cat.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
