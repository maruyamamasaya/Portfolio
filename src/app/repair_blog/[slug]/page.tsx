import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import markdownToHtml from '@/lib/markdownToHtml';
import { getRepairPost, getSortedRepairPosts } from '@/lib/repairPosts';
import LeftSidebar from '@/app/components/LeftSidebar';
import RightSidebar from '@/app/components/RightSidebar';
import BlogNavButtons from '@/app/components/BlogNavButtons';

export async function generateStaticParams() {
  const posts = getSortedRepairPosts();
  return posts.map(post => ({ slug: post.slug }));
}

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  try {
    const post = getRepairPost(params.slug);
    return {
      title: post.title,
      other: { date: post.date, updated: post.updated, tags: post.tags }
    };
  } catch {
    return { title: 'Not Found' };
  }
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  try {
    const post = getRepairPost(params.slug);
    const { html, headings } = await markdownToHtml(post.content);
    return (
      <div className="blog-container">
        <BlogNavButtons />
        <article className="prose main-content">
            {post.image && (
              <img src={post.image} alt="eyecatch" className="mb-4" />
            )}
            <h1>{post.title}</h1>
            <p className="text-sm text-gray-500">
              {post.date}
              {post.updated && ` (更新: ${post.updated})`}
            </p>
            {post.tags && (
              <ul className="flex space-x-2 text-xs mb-2">
                {post.tags.map(tag => (
                  <li key={tag} className="bg-gray-200 px-2 py-1 rounded">
                    <Link href={`/tags/${encodeURIComponent(tag)}`}>{tag}</Link>
                  </li>
                ))}
              </ul>
            )}
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </article>
        <section className="space-y-4">
          <LeftSidebar />
          <RightSidebar posts={getSortedRepairPosts()} headings={headings} />
        </section>
      </div>
    );
  } catch {
    notFound();
  }
}
