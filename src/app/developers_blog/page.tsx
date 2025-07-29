import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { getSortedDevPosts } from '@/lib/devPosts';
import BlogNavButtons from '../components/BlogNavButtons';
import TagBadge from '../components/TagBadge';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
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
            {posts.map((post) => (
              <li
                key={post.slug}
                className="group flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                {post.image && (
                  <Image
                    src={post.image}
                    alt={`Thumbnail for ${post.title}`}
                    width={64}
                    height={64}
                    className="w-16 h-16 object-cover rounded-lg border shadow-sm"
                  />
                )}
                <div className="flex-1">
                  <span className="text-gray-800 dark:text-white font-bold">
                    /developers_blog/{post.slug}
                  </span>
                  <p className="text-sm text-gray-500 mt-1 dark:text-gray-300">
                    {post.date}
                    {post.updated && ` (更新: ${post.updated})`}
                  </p>
                  {post.tags && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <TagBadge key={tag} tag={tag} />
                      ))}
                    </div>
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
