import Link from 'next/link';
import { Post } from '@/lib/posts';
import BlogNavButtons from '../components/BlogNavButtons';
import ScrollFadeIn from './ScrollFadeIn';
import Card from './Card';

interface Props {
  posts: Post[];
}

export default function HomeWindow({ posts }: Props) {
  return (
    <div className="m-4">
      <BlogNavButtons />
      <div className="mb-4" />
      <h2 className="text-xl font-semibold mb-4">Blog</h2>
      <ul className="space-y-4">
        {posts.map(post => (
          <ScrollFadeIn key={post.slug} as={Card} className="flex items-start space-x-2">
            {post.image && (
              <img src={post.image} alt="thumb" className="w-16 h-16 object-cover" />
            )}
            <div>
              <Link href={`/blog/${post.slug}`} className="text-primary hover:underline">
                {post.title}
              </Link>
              <span className="block text-sm text-gray-500">{post.date}</span>
            </div>
          </ScrollFadeIn>
        ))}
      </ul>
    </div>
  );
}
