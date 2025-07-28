import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import markdownToHtml from '@/lib/markdownToHtml';
import { getDevPost, getSortedDevPosts } from '@/lib/devPosts';
import TableOfContents from '@/app/components/TableOfContents';
import BlogNavButtons from '@/app/components/BlogNavButtons';
import CodeCopyInit from '@/app/components/CodeCopyInit';

export async function generateStaticParams() {
  const posts = await getSortedDevPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const post = await getDevPost(params.slug);
    return {
      title: post.title,
      other: { date: post.date, updated: post.updated, tags: post.tags },
      robots: { index: false, follow: false },
    };
  } catch {
    return { title: 'Not Found', robots: { index: false, follow: false } };
  }
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const post = await getDevPost(params.slug);
    const { html, headings } = await markdownToHtml(post.content);
    return (
      <div className="blog-container">
        <BlogNavButtons />
        <article className="prose prose-light dark:prose-dark main-content">
          {post.image && (
            <img
              src={post.image}
              alt={`Eyecatch for ${post.title}`}
              className="mb-4"
            />
          )}
          {headings && headings.length > 0 && (
            <TableOfContents headings={headings} />
          )}
          <h1>{post.title}</h1>
          <p className="text-sm text-gray-500">
            {post.date}
            {post.updated && ` (更新: ${post.updated})`}
          </p>
          {post.tags && (
            <ul className="flex space-x-2 text-xs mb-2">
              {post.tags.map((tag) => (
                <li key={tag} className="bg-gray-200 px-2 py-1 rounded">
                  <Link href={`/tags/${encodeURIComponent(tag)}`}>{tag}</Link>
                </li>
              ))}
            </ul>
          )}
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </article>
        <CodeCopyInit />
      </div>
    );
  } catch {
    notFound();
  }
}
