import Link from 'next/link';
import { getAllTags } from '@/lib/posts';
import BlogNavButtons from '../components/BlogNavButtons';

export default function TagsPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q?.toLowerCase() ?? '';
  const tags = getAllTags();
  const filteredTags = query
    ? tags.filter(tag => tag.toLowerCase().includes(query))
    : tags;
  const displayTags = filteredTags.slice(0, 30);
  const hasMore = filteredTags.length > 30;
  return (
    <div>
      <BlogNavButtons />
      <h1 className="text-2xl font-bold mb-4">Tags</h1>
      <form className="mb-4 flex">
        <input
          type="text"
          name="q"
          placeholder="タグを検索"
          defaultValue={query}
          className="border rounded px-2 py-1 w-full sm:w-64"
        />
        <button
          type="submit"
          className="ml-2 px-3 py-1 bg-primary text-white rounded"
        >
          検索
        </button>
      </form>
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
