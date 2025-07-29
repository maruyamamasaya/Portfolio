import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/lib/posts';
import TagBadge from './TagBadge';

interface Props {
  post: Post;
}

export default function PostCard({ post }: Props) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      {post.image && (
        <Image
          src={post.image}
          alt={post.title}
          width={64}
          height={64}
          className="w-16 h-16 object-cover rounded-lg border shadow-sm"
        />
      )}
      <div className="flex-1">
        <h3 className="text-lg font-bold leading-snug text-gray-800 dark:text-white group-hover:text-primary transition">
          {post.title}
        </h3>
        <p className="text-sm text-gray-500 mt-1">{post.date}</p>
        {post.tags && (
          <div className="mt-2 flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
