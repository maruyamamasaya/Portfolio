import Link from 'next/link';
import { Post } from '@/lib/posts';
import Card from './Card';
import TagBadge from './TagBadge';

interface Props {
  post: Post;
}

export default function PostCard({ post }: Props) {
  return (
    <Card className="p-0 overflow-hidden hover:shadow-lg">
      <Link href={`/blog/${post.slug}`} className="block">
        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-40 object-cover"
          />
        )}
        <div className="p-4 space-y-1">
          <h3 className="font-semibold">{post.title}</h3>
          <span className="text-sm text-gray-500">{post.date}</span>
          {post.tags && (
            <div className="flex flex-wrap gap-1 text-xs">
              {post.tags.slice(0, 3).map(tag => (
                <TagBadge key={tag} tag={tag} />
              ))}
            </div>
          )}
        </div>
      </Link>
    </Card>
  );
}
