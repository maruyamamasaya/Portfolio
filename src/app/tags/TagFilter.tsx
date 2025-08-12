'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Post } from '@/lib/posts';
import TagSearch from './TagSearch';
import Loader from '../components/Loader';
import HomePostCard from '../components/HomePostCard';

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
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <HomePostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
