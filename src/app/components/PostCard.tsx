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
      className="group block bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg transition-shadow duration-300 transition-base overflow-hidden sm:flex sm:p-4 sm:gap-4"
    >
      {post.image && (
        <Image
          src={post.image}
          alt={post.title}
          width={400}
          height={200}
          className="w-full h-40 object-cover sm:w-32 sm:h-[67px] sm:flex-shrink-0"
        />
      )}
      <div className="p-4 sm:p-0 flex-1">
        <h3 className="text-sm sm:text-lg font-bold leading-snug text-gray-800 dark:text-white group-hover:text-primary transition">
          {post.title}
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">{post.date}</p>
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
