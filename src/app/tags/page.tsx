import Link from 'next/link';
import { getAllTags } from '@/lib/posts';
import BlogNavButtons from '../components/BlogNavButtons';

export default function TagsPage() {
  const tags = getAllTags();
  const displayTags = tags.slice(0, 30);
  const hasMore = tags.length > 30;
  return (
    <div>
      <BlogNavButtons />
      <h1 className="text-2xl font-bold mb-4">Tags</h1>
      <ul className="flex flex-wrap gap-2">
        {displayTags.map(tag => (
          <li key={tag} className="bg-blue-200 px-2 py-1 rounded-full text-sm shadow">
            <Link href={`/tags/${encodeURIComponent(tag)}`} className="hover:underline">
              {tag}
            </Link>
          </li>
        ))}
      </ul>
      {hasMore && (
        <div className="mt-4">
          <Link href="/tags/more" className="text-blue-600 hover:underline">
            もっと見る
          </Link>
        </div>
      )}
    </div>
  );
}
