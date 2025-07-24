import Link from 'next/link';
import { Metadata } from 'next';
import { getSortedDevPosts } from '@/lib/devPosts';
import BlogNavButtons from '../components/BlogNavButtons';

export const metadata: Metadata = {
  robots: { index: false, follow: false }
};

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
                  <span className="text-gray-800">
                    /developers_blog/{post.slug}
                  </span>
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
