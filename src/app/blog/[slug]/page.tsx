import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import markdownToHtml from '@/lib/markdownToHtml';
import { getPost, getSortedPosts, getBacklinks } from '@/lib/posts';
import PostLayout from '@/app/components/PostLayout';
import getExcerpt from '@/lib/excerpt';
import LeftSidebar from '@/app/components/LeftSidebar';
import RightSidebar from '@/app/components/RightSidebar';
import BlogNavButtons from '@/app/components/BlogNavButtons';
import TableOfContents from '@/app/components/TableOfContents';
import ShareButtons from '@/app/components/ShareButtons';
import PrevNextLinks from '@/app/components/PrevNextLinks';
import RelatedPosts from '@/app/components/RelatedPosts';
import CodeCopyInit from '@/app/components/CodeCopyInit';

export async function generateStaticParams() {
  const posts = await getSortedPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const post = await getPost(params.slug);
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
      twitter: {
        card: 'summary_large_image',
      },
      other: { date: post.date, updated: post.updated, tags: post.tags },
    };
  } catch {
    return { title: 'Not Found' };
  }
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const posts = await getSortedPosts();
    const index = posts.findIndex((p) => p.slug === params.slug);
    const prev = index > 0 ? posts[index - 1] : undefined;
    const next = index < posts.length - 1 ? posts[index + 1] : undefined;
    const related = posts.filter((p) => p.slug !== params.slug).slice(0, 3);

    const post = await getPost(params.slug);
    const backlinks = await getBacklinks(params.slug);
    const { html, headings } = await markdownToHtml(post.content);
    return (
      <div className="blog-container">
        <BlogNavButtons />
        <PostLayout
          title={post.title}
          date={`著者: 管理者 / ${post.date}`}
          updated={post.updated}
          tags={post.tags}
          image={post.image}
          imageAlt={post.alt ?? post.slug}
          headings={headings}
        >
          <div dangerouslySetInnerHTML={{ __html: html }} />
          <ShareButtons title={post.title} />
          {backlinks.length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-bold mb-2">被リンク</h2>
              <ul className="list-disc pl-5">
                {backlinks.map((link) => (
                  <li key={link.slug}>
                    <Link href={`/blog/${link.slug}`}>{link.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </PostLayout>
        <PrevNextLinks prev={prev} next={next} />
        <RelatedPosts posts={related} />
        <LeftSidebar />
        <RightSidebar posts={posts} />
        <CodeCopyInit />
      </div>
    );
  } catch {
    notFound();
  }
}
