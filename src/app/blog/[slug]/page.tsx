import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import markdownToHtml from '@/lib/markdownToHtml';
import { getPost, getSortedPosts, getBacklinks } from '@/lib/posts';
import LeftSidebar from '@/app/components/LeftSidebar';
import RightSidebar from '@/app/components/RightSidebar';
import BlogNavButtons from '@/app/components/BlogNavButtons';
import TableOfContents from '@/app/components/TableOfContents';
import ShareButtons from '@/app/components/ShareButtons';
import PrevNextLinks from '@/app/components/PrevNextLinks';
import RelatedPosts from '@/app/components/RelatedPosts';

export async function generateStaticParams() {
  const posts = await getSortedPosts();
  return posts.map(post => ({ slug: post.slug }));
}

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  try {
    const post = await getPost(params.slug);
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
    const posts = await getSortedPosts();
    const index = posts.findIndex(p => p.slug === params.slug);
    const prev = index > 0 ? posts[index - 1] : undefined;
    const next = index < posts.length - 1 ? posts[index + 1] : undefined;
    const related = posts.filter(p => p.slug !== params.slug).slice(0, 3);

    const post = await getPost(params.slug);
    const backlinks = await getBacklinks(params.slug);
    const { html, headings } = await markdownToHtml(post.content);
    return (
      <div className="blog-container">
        <BlogNavButtons />
        <article className="prose prose-light dark:prose-dark main-content">
          {post.image && (
            <img src={post.image} alt={post.alt ?? post.slug} className="mb-4" />
          )}
          {headings && headings.length > 0 && (
            <TableOfContents headings={headings} />
          )}
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{post.title}</h1>
          <p className="text-sm text-gray-500 mb-4">著者: 管理者 / {post.date}{post.updated && ` (更新: ${post.updated})`}</p>
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
          <ShareButtons title={post.title} />
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
        <PrevNextLinks prev={prev} next={next} />
        <RelatedPosts posts={related} />
        <section className="space-y-4">
          <LeftSidebar />
          <RightSidebar posts={posts} />
        </section>
      </div>
    );
  } catch {
    notFound();
  }
}
