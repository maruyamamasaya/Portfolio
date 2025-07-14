import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import markdownToHtml from '@/lib/markdownToHtml';
import { getPost, getSortedPosts } from '@/lib/posts';
import Calendar from '@/app/components/Calendar';
import Profile from '@/app/components/Profile';
import CategoryList from '@/app/components/CategoryList';
import RecentPosts from '@/app/components/RecentPosts';
import TodayMessage from '@/app/components/TodayMessage';

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
      other: { date: post.date }
    };
  } catch {
    return { title: 'Not Found' };
  }
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  try {
    const post = getPost(params.slug);
    const html = await markdownToHtml(post.content);
    return (
      <div className="md:flex">
        <article className="prose md:w-3/4 md:pr-4 main-content">
          {post.image && (
            <img src={post.image} alt="eyecatch" className="mb-4" />
          )}
          <h1>{post.title}</h1>
          <p className="text-sm text-gray-500">{post.date}</p>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </article>
        <aside className="md:w-1/4 mt-4 md:mt-0 space-y-4">
          <div className="widget">
            <Profile />
          </div>
          <div className="widget">
            <CategoryList />
          </div>
          <div className="widget">
            <RecentPosts posts={getSortedPosts()} />
          </div>
          <div className="widget">
            <TodayMessage />
          </div>
          <div className="widget">
            <Calendar />
          </div>
        </aside>
      </div>
    );
  } catch {
    notFound();
  }
}
