import { notFound } from 'next/navigation';
import Link from 'next/link';
import markdownToHtml from '@/lib/markdownToHtml';
import { getDevPost, getSortedDevPosts } from '@/lib/devPosts';
import TableOfContents from '@/app/components/TableOfContents';
import BlogNavButtons from '@/app/components/BlogNavButtons';
import CodeCopyInit from '@/app/components/CodeCopyInit';
import PostLayout from '@/app/components/PostLayout';
import getExcerpt from '@/lib/excerpt';

export async function generateStaticParams() {
  const posts = await getSortedDevPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const post = await getDevPost(params.slug);
    const description = getExcerpt(post.content);
    return {
      title: post.title,
      description,
      openGraph: {
        title: post.title,
        description,
        type: 'article',
        images: post.image ? [post.image] : undefined,
      },
      twitter: { card: 'summary_large_image' },
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
        <PostLayout
          title={post.title}
          date={post.date}
          updated={post.updated}
          tags={post.tags}
          image={post.image}
          imageAlt={`Eyecatch for ${post.title}`}
          headings={headings}
        >
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </PostLayout>
        <CodeCopyInit />
      </div>
    );
  } catch {
    notFound();
  }
}
