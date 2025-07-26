'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Post } from '@/lib/posts';
import TagSearch from './TagSearch';

interface Props {
  tags: string[];
  posts: Post[];
}

export default function TagFilter({ tags, posts }: Props) {
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts);

  const handleChange = (selected: string[]) => {
    if (selected.length === 0) {
      setFilteredPosts(posts);
      return;
    }
    setFilteredPosts(
      posts.filter(p => selected.every(t => p.tags?.includes(t)))
    );
  };

  return (
    <div>
      <TagSearch tags={tags} onChange={handleChange} />
      <ul className="mt-4 space-y-4">
        {filteredPosts.map(post => (
          <li key={post.slug} className="border-b pb-4 flex items-start space-x-2">
            {post.image && (
              <img src={post.image} alt="thumb" className="w-16 h-16 object-cover" />
            )}
            <div>
              <Link href={`/blog/${post.slug}`} className="text-primary hover:underline">
                {post.title}
              </Link>
              <span className="block text-sm text-gray-500">
                {post.date}
                {post.updated && ` (更新: ${post.updated})`}
              </span>
              {post.tags && (
                <span className="block text-xs text-gray-600 space-x-1">
                  {post.tags.map(tag => (
                    <Link
                      key={tag}
                      href={`/tags/${encodeURIComponent(tag)}`}
                      className="hover:underline"
                    >
                      #{tag}
                    </Link>
                  ))}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
