import Link from 'next/link';
import { categories } from '../../../data/categories';


export default function CategoriesPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold border-b pb-2 mb-6">Categories</h1>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 list-none p-0">
        {categories.map((cat) => (
          <li
            key={cat.slug}
            className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 hover:shadow-lg transition"
          >
            <span className="text-3xl text-gray-500 dark:text-gray-300">
              {cat.icon}
            </span>
            <h2 className="text-lg font-bold mb-1">
              <Link
                href={`/categories/${cat.slug}`}
                className="hover:text-primary"
              >
                {cat.name}
              </Link>
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-snug">
              {cat.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
