import Link from 'next/link';
import Image from 'next/image';
import { searchPosts, getSortedPosts, Post } from '@/lib/posts';
import BlogNavButtons from '../components/BlogNavButtons';
import type { Metadata } from 'next';
import SearchBar from '../components/SearchBar';
import TagBadge from '../components/TagBadge';
import ScrollFadeIn from '../components/ScrollFadeIn';

export const metadata: Metadata = {
  title: 'Search',
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string; category?: string; tag?: string | string[] };
}) {
  const query = searchParams.q ?? '';
  const category = searchParams.category ?? '';
  const tagParam = searchParams.tag;
  const tagString = Array.isArray(tagParam)
    ? tagParam.join(',')
    : tagParam ?? '';
  const tags = tagString
    ? tagString.split(',').map((t) => decodeURIComponent(t))
    : [];

  let results: Post[] =
    query || category || tags.length
      ? await searchPosts(query)
      : await getSortedPosts();

  if (category) {
    results = results.filter((p) => p.category === category);
  }
  if (tags.length) {
    results = results.filter((p) => p.tags?.some((t) => tags.includes(t)));
  }

  const hasFilter = query !== '' || category !== '' || tags.length > 0;

  const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const highlight = (text: string) => {
    if (!query) return text;
    const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={i} className="bg-primary/20">
          {part}
        </mark>
      ) : (
        part
      ),
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
          {tags.map((tag) => (
            <span key={tag} className="bg-primary/20 px-2 py-1 rounded text-sm">
              <Link href={`/tags/${encodeURIComponent(tag)}`}>#{tag}</Link>
            </span>
          ))}
        </div>
      )}

      <SearchBar className="mb-4" />

      {hasFilter &&
        (results.length ? (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((post, idx) => (
              <ScrollFadeIn
                key={post.slug}
                as="li"
                delay={idx * 50}
                className="group flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                {post.image && (
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={80}
                    height={80}
                    className="w-20 h-20 object-cover rounded-lg border shadow-sm"
                  />
                )}
                <div className="flex-1">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-lg font-bold text-gray-800 dark:text-white group-hover:text-primary transition"
                  >
                    {highlight(post.title)}
                  </Link>
                  <p className="text-sm text-gray-500 mt-1">
                    {post.date}
                    {post.category && ` / ${post.category}`}
                  </p>
                  <p className="text-sm">
                    {highlight(getExcerpt(post.content))}...
                  </p>
                  {post.tags && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <TagBadge key={tag} tag={tag} />
                      ))}
                    </div>
                  )}
                </div>
              </ScrollFadeIn>
            ))}
          </ul>
        ) : (
          <p>該当する記事が見つかりませんでした。</p>
        ))}
    </div>
  );
}
