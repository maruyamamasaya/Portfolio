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
      className="lux-card portfolio-glass group block overflow-hidden"
    >
      {post.image && (
        <div className="relative w-full aspect-[1280/670]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      )}
        <div className="p-4 sm:p-5">
          <h3 className="text-sm font-bold leading-snug text-slate-100 group-hover:text-[#9cb7ff] transition">
            {post.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">{post.date}</p>
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
