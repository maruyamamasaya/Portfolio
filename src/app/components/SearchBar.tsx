'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface PostMeta {
  slug: string;
  title: string;
  category: string;
  tags?: string[];
}

interface Props {
  className?: string;
  showHistory?: boolean;
}

export default function SearchBar({ className, showHistory = true }: Props) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [posts, setPosts] = useState<PostMeta[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [category, setCategory] = useState('');
  const [tag, setTag] = useState('');
  const [suggestions, setSuggestions] = useState<PostMeta[]>([]);
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    fetch('/api/search-data')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.posts);
        setCategories(data.categories);
        setTags(data.tags);
      });
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('searchHistory');
    if (stored) setHistory(JSON.parse(stored));
  }, []);

  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    const q = query.toLowerCase();
    setSuggestions(
      posts.filter((p) => p.title.toLowerCase().includes(q)).slice(0, 5),
    );
  }, [query, posts]);

  const runSearch = (q?: string) => {
    const keyword = q ?? query;
    const params = new URLSearchParams();
    if (keyword) params.set('q', keyword);
    if (category) params.set('category', category);
    if (tag) params.set('tag', tag);
    router.push(`/search?${params.toString()}`);
    if (keyword) {
      const next = [keyword, ...history.filter((h) => h !== keyword)].slice(0, 5);
      setHistory(next);
      localStorage.setItem('searchHistory', JSON.stringify(next));
    }
  };

  return (
    <div className={`relative ${className ?? ''}`.trim()}>
      {/* desktop search form */}
      <div className="hidden sm:block">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            runSearch();
          }}
          className="space-y-2"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border rounded px-2 py-1 w-full"
          />
          {suggestions.length > 0 && (
            <ul className="absolute left-0 right-0 bg-white dark:bg-gray-700 border dark:border-gray-700 rounded shadow mt-1 z-10 max-h-60 overflow-auto">
              {suggestions.map((s) => (
                <li
                  key={s.slug}
                  className="px-2 py-1 cursor-pointer hover:bg-primary/20"
                  onMouseDown={() => {
                    setQuery(s.title);
                    runSearch(s.title);
                  }}
                >
                  {s.title}
                </li>
              ))}
            </ul>
          )}
          <div className="flex space-x-2">
            {categories.length > 0 && (
              <select
                aria-label="カテゴリ"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border rounded px-2 py-1 flex-1"
              >
                <option value="">すべてのカテゴリ</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            )}
            {tags.length > 0 && (
              <select
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="border rounded px-2 py-1 flex-1"
              >
                <option value="">すべてのタグ</option>
                {tags.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            )}
            <button
              type="submit"
              className="px-2 py-1 bg-primary text-white rounded"
            >
              検索
            </button>
          </div>
        </form>
        {showHistory && history.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2 text-sm">
            {history.map((h) => (
              <button
                key={h}
                className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded"
                onClick={() => runSearch(h)}
              >
                {h}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* mobile trigger button */}
      <div className="sm:hidden">
        {!mobileOpen ? (
          <button
            type="button"
            aria-label="Search"
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded border border-gray-300 dark:border-gray-600"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-5 h-5"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        ) : (
          <>
            <div
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setMobileOpen(false)}
            />
            <div className="fixed inset-x-0 top-0 bg-white dark:bg-gray-700 p-2 shadow z-50">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                runSearch();
                setMobileOpen(false);
              }}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="border rounded px-2 py-1 flex-1"
                />
                <button
                  type="submit"
                  className="px-2 py-1 bg-primary text-white rounded"
                >
                  検索
                </button>
                <button
                  type="button"
                  aria-label="Close search"
                  onClick={() => setMobileOpen(false)}
                  className="p-2 text-2xl"
                >
                  ×
                </button>
              </div>
              {suggestions.length > 0 && (
                <ul className="bg-white dark:bg-gray-700 border dark:border-gray-700 rounded shadow mt-1 z-10 max-h-60 overflow-auto">
                  {suggestions.map((s) => (
                    <li
                      key={s.slug}
                      className="px-2 py-1 cursor-pointer hover:bg-primary/20"
                      onMouseDown={() => {
                        setQuery(s.title);
                        runSearch(s.title);
                        setMobileOpen(false);
                      }}
                    >
                      {s.title}
                    </li>
                  ))}
                </ul>
              )}
            </form>
          </div>
        </>
        )}
      </div>
    </div>
  );
}
