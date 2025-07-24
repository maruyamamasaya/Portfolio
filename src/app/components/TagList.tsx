import Link from 'next/link';
import { getAllTags } from '@/lib/posts';

export default function TagList() {
  const tags = getAllTags();
  return (
    <div>
      <h3 className="font-bold mb-2">タグ</h3>
      <ul className="flex flex-wrap gap-1 text-sm">
        {tags.map(tag => (
          <li key={tag}>
            <Link href={`/tags/${encodeURIComponent(tag)}`} className="text-primary hover:underline">
              #{tag}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
