import Link from 'next/link';
import { searchPosts, Post } from '@/lib/posts';
import BlogNavButtons from '../components/BlogNavButtons';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search'
};

export default function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const query = searchParams.q ?? '';
  const results: Post[] = query ? searchPosts(query) : [];

  const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const highlight = (text: string) => {
    if (!query) return text;
    const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={i} className="bg-primary/20">{part}</mark>
      ) : (
        part
      )
    );
  };
  const getExcerpt = (content: string, length = 80) => {
    const plain = content
      .replace(/```[\s\S]*?```/g, '')
      .replace(/`[^`]*`/g, '')
      .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
      .replace(/\[[^\]]*\]\([^)]*\)/g, '')
      .replace(/[>#*_]/g, '')
      .replace(/\n+/g, ' ')
      .trim();
    return plain.slice(0, length);
  };

  return (
    <div>
      <BlogNavButtons />
      <h1 className="text-2xl font-bold mb-4">Search</h1>
      <form className="mb-4">
        <input
          type="text"
          name="q"
          placeholder="キーワードを入力"
          defaultValue={query}
          className="border rounded px-2 py-1 w-full sm:w-64"
        />
      </form>
      {query && (
        results.length ? (
          <ul className="space-y-4">
            {results.map(post => (
              <li
                key={post.slug}
                className="flex space-x-4 p-2 bg-white dark:bg-gray-800 rounded shadow"
              >
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-24 h-24 object-cover flex-shrink-0 rounded"
                  />
                )}
                <div className="flex-1 space-y-1">
                  <Link href={`/blog/${post.slug}`} className="text-primary hover:underline">
                    {highlight(post.title)}
                  </Link>
                  <div className="text-sm text-gray-500">
                    {post.date}
                    {post.category && ` / ${post.category}`}
                  </div>
                  <p className="text-sm">
                    {highlight(getExcerpt(post.content))}...
                  </p>
                </div>
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
