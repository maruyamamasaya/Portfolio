import Link from 'next/link';
import { getCategories } from '@/lib/categories';

export default function CategoryList() {
  const categories = getCategories();

  return (
    <div>
      <h3 className="font-bold mb-2">カテゴリー</h3>
      <ul className="space-y-1 text-sm">
        {categories.map((cat) => (
          <li key={cat.href}>
            <Link href={cat.href} className="accent-text hover:underline transition-base">
              {cat.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
