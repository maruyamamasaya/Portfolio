import Link from 'next/link';
import { getAllTags } from '@/lib/posts';

export default function MoreTagsPage() {
  const tags = getAllTags();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Tags</h1>
      <ul className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <li key={tag} className="bg-blue-200 px-2 py-1 rounded-full text-sm shadow">
            <Link href={`/tags/${encodeURIComponent(tag)}`} className="hover:underline">
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
