import Link from 'next/link';
import { getSortedDevPosts } from '@/lib/devPosts';
import Calendar from '@/app/components/Calendar';
import BlogNavButtons from '../components/BlogNavButtons';

export default function BlogIndex() {
  const posts = getSortedDevPosts();
  return (
    <div className="blog-container">
      <BlogNavButtons />
      <h1 className="text-2xl font-bold mb-4">Developers Blog</h1>
      <div className="md:flex">
        <div className="md:flex-1 main-content">
          <ul className="space-y-4">
            {posts.map(post => (
              <li key={post.slug} className="border-b pb-4 flex items-start space-x-2">
                {post.image && (
                  <img src={post.image} alt="thumb" className="w-16 h-16 object-cover" />
                )}
                <div>
                  <Link href={`/developers_blog/${post.slug}`}
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
        <aside className="md:w-1/5 md:pl-4 mt-4 md:mt-0 widget">
          <Calendar />
        </aside>
      </div>
    </div>
  );
}
