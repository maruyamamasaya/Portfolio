'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/lib/posts';
import TagSearch from './TagSearch';
import Loader from '../components/Loader';
import TagBadge from '../components/TagBadge';

interface Props {
  tags: string[];
  posts: Post[];
}

export default function TagFilter({ tags, posts }: Props) {
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const popularTags = tags.slice(0, 5);
  const isCollapsible = tags.length > 20;

  const handleChange = (selected: string[]) => {
    setIsLoading(true);
    setTimeout(() => {
      if (selected.length === 0) {
        setFilteredPosts(posts);
        setIsLoading(false);
        return;
      }
      setFilteredPosts(
        posts.filter((p) => selected.every((t) => p.tags?.includes(t))),
      );
      setIsLoading(false);
    }, 300);
  };

  return (
    <div>
      {isCollapsible && (
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="mb-2 h-12 px-4 bg-primary text-white rounded-xl shadow-md w-full sm:w-auto transition-base hover:bg-primary/90 active:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {showFilter ? 'フィルターを閉じる' : 'フィルターを開く'}
        </button>
      )}
      {(!isCollapsible || showFilter) && (
        <div className="mb-2">
          <TagSearch tags={tags} onChange={handleChange} />
        </div>
      )}
      {isLoading ? (
        <Loader />
      ) : filteredPosts.length === 0 ? (
        <div className="text-center text-gray-500 mt-4">
          <p className="text-base">😕 該当するタグが見つかりませんでした。</p>
          <div className="flex justify-center flex-wrap gap-2 mt-2">
            {popularTags.map((tag) => (
              <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className="bg-primary/20 px-3 py-1 rounded-full text-sm font-medium shadow inline-flex items-center transition-base"
            >
              {tag}
            </Link>
            ))}
          </div>
        </div>
      ) : (
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {filteredPosts.map((post) => (
            <li
              key={post.slug}
              className="group flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {post.image && (
                <Image
                  src={post.image}
                  alt={`Thumbnail for ${post.title}`}
                  width={80}
                  height={80}
                  className="w-20 h-20 object-cover rounded-lg border shadow-sm"
                />
              )}
              <div className="flex-1">
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-lg font-bold text-gray-800 dark:text-white group-hover:text-primary transition-base"
                >
                  {post.title}
                </Link>
                <p className="text-sm text-gray-500 mt-1">
                  {post.date}
                  {post.updated && ` (更新: ${post.updated})`}
                </p>
                {post.tags && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <TagBadge key={tag} tag={tag} />
                    ))}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
