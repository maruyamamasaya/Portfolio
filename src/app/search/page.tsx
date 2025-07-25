import Link from 'next/link';
import { searchPosts } from '@/lib/posts';
import BlogNavButtons from '../components/BlogNavButtons';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search'
};

export default function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const query = searchParams.q ?? '';
  const results = query ? searchPosts(query) : [];
  return (
    <div>
      <BlogNavButtons />
      <h1 className="text-2xl font-bold mb-4">Search</h1>
      <form className="mb-4">
        <input
          type="text"
          name="q"
          placeholder="キーワード検索..."
          defaultValue={query}
          className="border rounded px-2 py-1 w-full sm:w-64"
        />
      </form>
      {query && (
        results.length ? (
          <ul className="space-y-4">
            {results.map(post => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="text-primary hover:underline">
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>該当する記事が見つかりませんでした。</p>
        )
      )}
    </div>
  );
}
