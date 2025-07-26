'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Post } from '@/lib/posts';

interface Props {
  posts: Post[];
}

export default function RecommendedSlider({ posts }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (posts.length <= 1) return;
    const id = setInterval(() => {
      setIndex(i => (i + 1) % posts.length);
    }, 5000);
    return () => clearInterval(id);
  }, [posts.length]);

  return (
    <div className="relative w-full aspect-square overflow-hidden mb-4 lg:mb-0">
      {posts.map((post, i) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className={`absolute inset-0 motion-safe:transition-opacity motion-reduce:transition-none duration-300 ease-in-out ${
            i === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {post.image && (
            <img
              src={post.image}
              alt={post.title}
              width={400}
              height={400}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4 text-lg">
            {post.title}
          </div>
        </Link>
      ))}
    </div>
  );
}
