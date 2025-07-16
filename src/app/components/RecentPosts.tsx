import Link from 'next/link';
import { Post } from '@/lib/posts';

interface Props {
  posts: Post[];
}

export default function RecentPosts({ posts }: Props) {
  return (
    <div className="bg-black bg-opacity-50 p-5 rounded-xl shadow-lg backdrop-blur border border-neon max-w-md">
      <h3 className="text-neon text-base font-semibold mb-4 tracking-wider">⌬ 新着記事</h3>
      <ul className="space-y-3">
        {posts.slice(0, 5).map(post => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="block px-3 py-2 rounded-md bg-gray-900 hover:bg-neon hover:text-black transition-all duration-300 shadow-sm"
            >
              <span className="text-sm font-medium">{post.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
