import { notFound } from 'next/navigation';
import markdownToHtml from '@/lib/markdownToHtml';
import { getPost, getSortedPosts } from '@/lib/posts';

export async function generateStaticParams() {
  const posts = getSortedPosts();
  return posts.map(post => ({ slug: post.slug }));
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  try {
    const post = getPost(params.slug);
    const html = await markdownToHtml(post.content);
    return (
      <article className="prose">
        <h1>{post.title}</h1>
        <p className="text-sm text-gray-500">{post.date}</p>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    );
  } catch {
    notFound();
  }
}
