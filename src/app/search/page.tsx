import Link from 'next/link';
import { searchPosts, getSortedPosts, Post } from '@/lib/posts';
import BlogNavButtons from '../components/BlogNavButtons';
import { Metadata } from 'next';
import SearchBar from '../components/SearchBar';
import TagBadge from '../components/TagBadge';

export const metadata: Metadata = {
  title: 'Search'
};

export default function SearchPage({
  searchParams
}: {
  searchParams: { q?: string; category?: string; tag?: string | string[] };
}) {
  const query = searchParams.q ?? '';
  const category = searchParams.category ?? '';
  const tagParam = searchParams.tag;
  const tags: string[] = tagParam
    ? Array.isArray(tagParam)
      ? tagParam.map(t => decodeURIComponent(t))
      : [decodeURIComponent(tagParam)]
    : [];

  let results: Post[] = query || category || tags.length
    ? searchPosts(query)
    : getSortedPosts();

  if (category) {
    results = results.filter(p => p.category === category);
  }
  if (tags.length) {
    results = results.filter(p =>
      p.tags?.some(t => tags.includes(t))
    );
  }

  const hasFilter = query !== '' || category !== '' || tags.length > 0;

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

      {tags.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-2">
          {tags.map(tag => (
            <span key={tag} className="bg-primary/20 px-2 py-1 rounded text-sm">
              <Link href={`/tags/${encodeURIComponent(tag)}`}>#{tag}</Link>
            </span>
          ))}
        </div>
      )}

      <SearchBar className="mb-4" />

      {hasFilter && (
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
                  {post.tags && (
                    <div className="flex flex-wrap gap-1 text-xs">
                      {post.tags.slice(0, 3).map(tag => (
                        <TagBadge key={tag} tag={tag} />
                      ))}
                    </div>
                  )}
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
