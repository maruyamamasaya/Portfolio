import Link from 'next/link';
import { Post } from '@/lib/posts';

interface Props {
  posts: Post[];
}

export default function RecentPosts({ posts }: Props) {
  return (
    <div className="ai-log-frame">
      <h3 className="ai-log-title">:: RECENT POSTS LOG ::</h3>
      <ul className="ai-log-list">
        {posts.slice(0, 5).map((post, index) => (
          <li key={post.slug} className="ai-log-item">
            <span className="ai-log-index">[#{index + 1}]</span>{' '}
            <Link href={`/blog/${post.slug}`} className="ai-log-link">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
