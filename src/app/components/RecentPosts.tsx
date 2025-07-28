import Link from 'next/link';
import { Post } from '@/lib/posts';

interface Props {
  posts: Post[];
}

export default function RecentPosts({ posts }: Props) {
  return (
    <div>
      <h3 className="font-bold mb-2">最近の投稿</h3>
      <ul className="space-y-1 text-sm">
        {posts.slice(0, 5).map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="accent-text hover:underline"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
