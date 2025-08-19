import Link from 'next/link';
import { getCategories } from '@/lib/categories';

export default function CategoryList() {
  const categories = getCategories();

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">カテゴリー</h3>
      <ul className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <li key={cat.href}>
            <Link
              href={cat.href}
              className="block px-3 py-1 text-sm font-medium text-white rounded-full bg-gradient-to-r from-primary to-blue-500 shadow-sm hover:shadow-md transition-base"
            >
              {cat.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
