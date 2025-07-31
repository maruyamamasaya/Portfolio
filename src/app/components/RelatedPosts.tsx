import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/lib/posts';

export default function RelatedPosts({ posts }: { posts: Post[] }) {
  if (!posts.length) return null;
  return (
    <div className="my-8">
      <h3 className="font-bold mb-2">関連記事</h3>
      <ul className="grid gap-4 md:grid-cols-3">
        {posts.map((post) => (
          <li
            key={post.slug}
            className="border rounded overflow-hidden bg-white dark:bg-gray-700"
          >
            <Link href={`/blog/${post.slug}`}>
              {post.image && (
                <Image
                  src={post.image}
                  alt={post.title}
                  width={256}
                  height={134}
                  className="w-full h-[134px] object-cover"
                />
              )}
              <div className="p-2 text-sm">{post.title}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
