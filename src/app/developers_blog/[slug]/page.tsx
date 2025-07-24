import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import markdownToHtml from '@/lib/markdownToHtml';
import { getDevPost, getSortedDevPosts } from '@/lib/devPosts';
import TableOfContents from '@/app/components/TableOfContents';
import BlogNavButtons from '@/app/components/BlogNavButtons';

export async function generateStaticParams() {
  const posts = getSortedDevPosts();
  return posts.map(post => ({ slug: post.slug }));
}

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  try {
    const post = getDevPost(params.slug);
    return {
      title: post.title,
      other: { date: post.date, updated: post.updated, tags: post.tags },
      robots: { index: false, follow: false }
    };
  } catch {
    return { title: 'Not Found', robots: { index: false, follow: false } };
  }
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  try {
    const post = getDevPost(params.slug);
    const { html, headings } = await markdownToHtml(post.content);
    return (
      <div className="blog-container">
        <BlogNavButtons />
        <div className="md:flex">
        <article className="prose md:flex-1 md:pr-4 main-content">
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
        <aside className="md:w-1/5 md:pl-4 mt-4 md:mt-0 space-y-4">
          <div className="widget">
            <TableOfContents headings={headings} />
          </div>
        </aside>
        </div>
      </div>
    );
  } catch {
    notFound();
  }
}
