import Link from 'next/link';
import { getAllTags } from '@/lib/posts';

export default function TagsPage() {
  const tags = getAllTags();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Tags</h1>
      <ul className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <li key={tag} className="bg-gray-200 px-2 py-1 rounded text-sm">
            <Link href={`/tags/${encodeURIComponent(tag)}`} className="hover:underline">
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
