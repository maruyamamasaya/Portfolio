import Link from 'next/link';
import { categories } from '@/data/categories';
import BlogNavButtons from '../components/BlogNavButtons';

export default function CategoriesPage() {
  return (
    <div className="prose prose-light dark:prose-dark relative">
      <BlogNavButtons />
      <h1>Categories</h1>
      <ul className="grid gap-4 p-0 list-none">
        {categories.map(cat => (
          <li key={cat.slug} className="border rounded p-4 flex space-x-3">
            <span className="text-2xl">{cat.icon}</span>
            <div>
              <h2 className="m-0">
                <Link href={`/categories/${cat.slug}`} className="no-underline hover:underline">
                  {cat.name}
                </Link>
              </h2>
              <p className="m-0 text-sm">{cat.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
