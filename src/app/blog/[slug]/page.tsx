import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import markdownToHtml from '@/lib/markdownToHtml';
import { getPost, getSortedPosts, getBacklinks } from '@/lib/posts';
import LeftSidebar from '@/app/components/LeftSidebar';
import RightSidebar from '@/app/components/RightSidebar';
import BlogNavButtons from '@/app/components/BlogNavButtons';

export async function generateStaticParams() {
  const posts = getSortedPosts();
  return posts.map(post => ({ slug: post.slug }));
}

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  try {
    const post = getPost(params.slug);
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
    const post = getPost(params.slug);
    const backlinks = getBacklinks(params.slug);
    const { html, headings } = await markdownToHtml(post.content);
    return (
      <div className="blog-container">
        <BlogNavButtons />
        <div className="md:flex">
          <aside className="md:w-1/4 md:pr-4 mb-4 md:mb-0">
            <LeftSidebar />
          </aside>
          <article className="prose md:w-2/4 md:pr-4 main-content">
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
          {backlinks.length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-bold mb-2">被リンク</h2>
              <ul className="list-disc pl-5">
                {backlinks.map(link => (
                  <li key={link.slug}>
                    <Link href={`/blog/${link.slug}`}>{link.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </article>
          <aside className="md:w-1/4 md:pl-4 mt-4 md:mt-0">
            <RightSidebar posts={getSortedPosts()} headings={headings} />
          </aside>
        </div>
      </div>
    );
  } catch {
    notFound();
  }
}
