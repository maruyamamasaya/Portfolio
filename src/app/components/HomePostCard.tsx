import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/lib/posts';
import TagBadge from './TagBadge';

interface Props {
  post: Post;
}

export default function HomePostCard({ post }: Props) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block p-4 bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg transition-shadow duration-300 transition-base"
    >
      {post.image && (
        <Image
          src={post.image}
          alt={post.title}
          width={400}
          height={200}
          className="w-full h-40 object-cover rounded-lg mb-2 border shadow-sm"
        />
      )}
      <h3 className="text-base font-bold leading-snug text-gray-800 dark:text-white group-hover:text-primary transition">
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
    </Link>
  );
}
