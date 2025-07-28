'use client';
import { useState } from 'react';
import Link from 'next/link';
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
          className="mb-2 h-12 px-4 bg-primary text-white rounded-xl shadow-md w-full sm:w-auto"
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
                className="bg-primary/20 px-3 py-2 sm:px-2 sm:py-1 rounded-full text-base sm:text-sm shadow"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <ul className="mt-4 space-y-4">
          {filteredPosts.map((post) => (
            <li
              key={post.slug}
              className="flex items-start space-x-4 p-4 bg-white dark:bg-gray-700 rounded-xl shadow-md animate-fadeInUp"
            >
              {post.image && (
                <img
                  src={post.image}
                  alt={`Thumbnail for ${post.title}`}
                  className="w-16 h-16 object-cover"
                />
              )}
              <div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="accent-text hover:underline"
                >
                  {post.title}
                </Link>
                <span className="block text-sm text-gray-500">
                  {post.date}
                  {post.updated && ` (更新: ${post.updated})`}
                </span>
                {post.tags && (
                  <span className="block text-xs text-gray-600 space-x-1">
                    {post.tags.slice(0, 3).map((tag) => (
                      <TagBadge key={tag} tag={tag} />
                    ))}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
