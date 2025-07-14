import Link from 'next/link';
import { getSortedDevPosts } from '@/lib/devPosts';
import Calendar from '@/app/components/Calendar';

export default function BlogIndex() {
  const posts = getSortedDevPosts();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Developers Blog</h1>
      <div className="md:flex">
        <div className="md:w-3/4 main-content">
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
                  <span className="block text-sm text-gray-500">{post.date}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <aside className="md:w-1/4 md:pl-4 mt-4 md:mt-0 widget">
          <Calendar />
        </aside>
      </div>
    </div>
  );
}
