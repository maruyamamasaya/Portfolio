import { notFound } from 'next/navigation';
import { getAllTags, searchPosts } from '@/lib/posts';
import BlogNavButtons from '../../components/BlogNavButtons';
import HomePostCard from '../../components/HomePostCard';

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((tag) => ({ tag }));
}

export async function generateMetadata({
  params,
}: {
  params: { tag: string };
}) {
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
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <HomePostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
