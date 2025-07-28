import Link from 'next/link';
import { Metadata } from 'next';
import { getSortedDevPosts } from '@/lib/devPosts';
import BlogNavButtons from '../components/BlogNavButtons';
import TagBadge from '../components/TagBadge';

export const metadata: Metadata = {
  robots: { index: false, follow: false }
};

export default async function BlogIndex() {
  const posts = await getSortedDevPosts();
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
                  <img
                    src={post.image}
                    alt={`Thumbnail for ${post.title}`}
                    className="w-16 h-16 object-cover"
                  />
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
                      {post.tags.slice(0, 3).map(tag => (
                        <TagBadge key={tag} tag={tag} />
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
