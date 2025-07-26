import Link from 'next/link';
import { getAllTags } from '@/lib/posts';
import BlogNavButtons from '../components/BlogNavButtons';
import TagSearch from './TagSearch';

export default function TagsPage() {
  const tags = getAllTags();
  const displayTags = tags.slice(0, 30);
  const hasMore = tags.length > 30;
  return (
    <div>
      <BlogNavButtons />
      <h1 className="text-2xl font-bold mb-4">Tags</h1>
      <div className="mb-4">
        <TagSearch tags={tags} />
      </div>
      <ul className="flex flex-wrap gap-2">
        {displayTags.map(tag => (
          <li
            key={tag}
            className="bg-primary/20 px-3 py-2 sm:px-2 sm:py-1 rounded-full text-base sm:text-sm shadow"
          >
            <Link href={`/tags/${encodeURIComponent(tag)}`} className="hover:underline">
              {tag}
            </Link>
          </li>
        ))}
      </ul>
      {hasMore && (
        <div className="mt-4">
          <Link href="/tags/more" className="text-primary hover:underline">
            もっと見る
          </Link>
        </div>
      )}
    </div>
  );
}
