import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getAllTags, searchPosts } from '@/lib/posts';
import BlogNavButtons from '../../components/BlogNavButtons';
import TagBadge from '../../components/TagBadge';

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map(tag => ({ tag }));
}

export async function generateMetadata({ params }: { params: { tag: string } }): Promise<Metadata> {
  const decodedTag = decodeURIComponent(params.tag);
  return { title: `Tag: ${decodedTag}` };
}

export default async function TagPage({
  params,
  searchParams
}: {
  params: { tag: string };
  searchParams: { q?: string }
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
      <ul className="space-y-4">
        {posts.map(post => (
          <li key={post.slug} className="flex items-start space-x-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md animate-fadeInUp">
            {post.image && (
              <img src={post.image} alt="thumb" className="w-16 h-16 object-cover" />
            )}
            <div>
              <Link href={`/blog/${post.slug}`} className="accent-text hover:underline">
                {post.title}
              </Link>
              <span className="block text-sm text-gray-500">
                {post.date}
                {post.updated && ` (更新: ${post.updated})`}
              </span>
              {post.tags && (
                <span className="block text-xs text-gray-600 space-x-1">
                  {post.tags.slice(0, 3).map(tag => (
                    <TagBadge key={tag} tag={tag} />
                  ))}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
