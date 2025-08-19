import Link from 'next/link';
import { getCategories } from '@/lib/categories';

export default function CategoryList() {
  const categories = getCategories();

  return (
    <div>
      <h3 className="font-bold mb-2">カテゴリー</h3>
      <ul className="flex flex-wrap gap-2 text-sm">
        {categories.map((cat) => (
          <li key={cat.href}>
            <Link
              href={cat.href}
              className="flex items-center gap-1 rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-1 accent-text hover:bg-gray-200 dark:hover:bg-gray-700 transition-base"
            >
              <span className="text-base">{cat.icon}</span>
              {cat.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
