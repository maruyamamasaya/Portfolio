import Link from 'next/link';
import { getSortedPosts } from '@/lib/artPosts';
import LeftSidebar from '@/app/components/LeftSidebar';
import BlogNavButtons from '@/app/components/BlogNavButtons';
import './styles/win7.css';

export default function BlogIndex() {
  const posts = getSortedPosts();
  return (
    <div className="blog-container win7-container">
      <BlogNavButtons />
      <h1 className="text-2xl font-bold mb-4">Art Blog</h1>
      <div className="md:flex">
        <aside className="md:w-1/5 md:pr-4 mb-4 md:mb-0 win7-sidebar">
          <LeftSidebar />
        </aside>
        <div className="md:flex-1 win7-main">
          <ul className="space-y-4">
            {posts.map(post => (
              <li key={post.slug} className="border-b pb-4 flex items-start space-x-2">
                {post.image && (
                  <img src={post.image} alt="thumb" className="w-16 h-16 object-cover" />
                )}
                <div>
                  <Link href={`/art_blog/${post.slug}`}
                    className="text-primary hover:underline">
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
      </div>
    </div>
  );
}
