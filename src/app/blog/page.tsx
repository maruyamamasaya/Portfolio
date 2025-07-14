import Link from 'next/link';
import { getSortedPosts } from '@/lib/posts';
import Calendar from '@/app/components/Calendar';
import Profile from '@/app/components/Profile';
import CategoryList from '@/app/components/CategoryList';
import RecentPosts from '@/app/components/RecentPosts';
import TodayMessage from '@/app/components/TodayMessage';

export default function BlogIndex() {
  const posts = getSortedPosts();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Blog</h1>
      <div className="md:flex">
        <div className="md:w-3/4 main-content">
          <ul className="space-y-4">
            {posts.map(post => (
              <li key={post.slug} className="border-b pb-4 flex items-start space-x-2">
                {post.image && (
                  <img src={post.image} alt="thumb" className="w-16 h-16 object-cover" />
                )}
                <div>
                  <Link href={`/blog/${post.slug}`}
                    className="text-blue-600 hover:underline">
                    {post.title}
                  </Link>
                  <span className="block text-sm text-gray-500">
                    {post.date}
                    {post.updated && ` (更新: ${post.updated})`}
                  </span>
                  {post.tags && (
                    <span className="block text-xs text-gray-600 space-x-1">
                      {post.tags.map(tag => (
                        <Link
                          key={tag}
                          href={`/tags/${encodeURIComponent(tag)}`}
                          className="hover:underline"
                        >
                          #{tag}
                        </Link>
                      ))}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <aside className="md:w-1/4 md:pl-4 mt-4 md:mt-0 space-y-4">
          <div className="widget">
            <Profile />
          </div>
          <div className="widget">
            <CategoryList />
          </div>
          <div className="widget">
            <RecentPosts posts={posts} />
          </div>
          <div className="widget">
            <TodayMessage />
          </div>
          <div className="widget">
            <Calendar />
          </div>
        </aside>
      </div>
    </div>
  );
}
