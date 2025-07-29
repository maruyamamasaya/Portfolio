import Link from 'next/link';
import { getTagCounts } from '@/lib/posts';
import BlogNavButtons from '../../components/BlogNavButtons';

export default async function MoreTagsPage() {
  const tagCounts = await getTagCounts();
  return (
    <div>
      <BlogNavButtons />
      <h1 className="text-2xl font-bold mb-4">All Tags</h1>
      <ul className="flex flex-wrap gap-4">
        {tagCounts.map(({ tag }) => (
          <li
            key={tag}
            className="bg-primary/20 px-3 py-2 sm:px-2 sm:py-1 rounded-full text-base sm:text-sm shadow-md inline-flex items-center justify-center h-11 min-w-11"
          >
            <Link href={`/tags/${encodeURIComponent(tag)}`} className="hover:underline">
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
