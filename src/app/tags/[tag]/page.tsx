import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import { getAllTags, searchPosts } from '@/lib/posts';
import BlogNavButtons from '../../components/BlogNavButtons';
import TagBadge from '../../components/TagBadge';

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((tag) => ({ tag }));
}

export async function generateMetadata({
  params,
}: {
  params: { tag: string };
}): Promise<Metadata> {
  const decodedTag = decodeURIComponent(params.tag);
  return { title: `Tag: ${decodedTag}` };
}

export default async function TagPage({
  params,
  searchParams,
}: {
  params: { tag: string };
  searchParams: { q?: string };
}) {
  const decodedTag = decodeURIComponent(params.tag);
  const query = searchParams.q ?? '';
  const posts = await searchPosts(query, [decodedTag]);
  if (!posts.length) {
    notFound();
  }
  return (
    <div>
      <BlogNavButtons />
      <h1 className="text-2xl font-bold mb-4">Tag: {decodedTag}</h1>
      <ul className="grid gap-4 sm:grid-cols-2">
        {posts.map((post) => (
          <li
            key={post.slug}
            className="group flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            {post.image && (
              <Image
                src={post.image}
                alt={`Thumbnail for ${post.title}`}
                width={64}
                height={64}
                className="w-16 h-16 object-cover rounded-lg border shadow-sm"
              />
            )}
            <div className="flex-1">
              <Link
                href={`/blog/${post.slug}`}
                className="text-lg font-bold text-gray-800 dark:text-white group-hover:text-primary transition"
              >
                {post.title}
              </Link>
              <p className="text-sm text-gray-500 mt-1">
                {post.date}
                {post.updated && ` (更新: ${post.updated})`}
              </p>
              {post.tags && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {post.tags.slice(0, 3).map((tag) => (
                    <TagBadge key={tag} tag={tag} />
                  ))}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
