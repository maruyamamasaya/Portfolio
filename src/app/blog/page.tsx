import Link from 'next/link';
import { getSortedPosts } from '@/lib/posts';

export default function BlogIndex() {
  const posts = getSortedPosts();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Blog</h1>
      <ul className="space-y-2">
        {posts.map(post => (
          <li key={post.slug} className="border-b pb-2">
            <Link href={`/blog/${post.slug}`}
              className="text-blue-600 hover:underline">
              {post.title}
            </Link>
            <span className="ml-2 text-sm text-gray-500">{post.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
