'use client';
import { useState, useEffect } from 'react';
import Loader from '../components/Loader';

interface Props {
  tags: string[];
  onChange?: (selected: string[]) => void;
}

export default function TagSearch({ tags, onChange }: Props) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => {
      const q = query.toLowerCase();
      if (!q) {
        setSuggestions([]);
        setActiveIndex(-1);
        setIsLoading(false);
        return;
      }
      const matched = tags
        .filter((tag) => tag.toLowerCase().includes(q))
        .sort((a, b) => a.toLowerCase().indexOf(q) - b.toLowerCase().indexOf(q))
        .slice(0, 10);
      setSuggestions(matched);
      setActiveIndex(-1);
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timeout);
  }, [query, tags]);

  const selectTag = (tag: string) => {
    if (!tags.includes(tag) || selected.includes(tag)) return;
    const next = [...selected, tag];
    setSelected(next);
    onChange?.(next);
  };

  const removeTag = (tag: string) => {
    const next = selected.filter((t) => t !== tag);
    setSelected(next);
    onChange?.(next);
  };

  const clearTags = () => {
    setSelected([]);
    onChange?.([]);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!suggestions.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0) {
        selectTag(suggestions[activeIndex]);
        setQuery('');
      }
    }
  };

  const handleSearch = () => {
    if (query && tags.includes(query)) {
      selectTag(query);
      setQuery('');
    }
  };

  return (
    <div className="relative">
      <div className="flex w-full rounded-xl shadow-md overflow-hidden">
        <input
          type="text"
          placeholder="タグを検索"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          className="border-r border-gray-300 dark:border-gray-600 px-3 h-12 flex-grow w-full focus:outline-none dark:bg-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
        />
        <button
          onClick={handleSearch}
          className="h-12 px-4 bg-primary text-white font-medium min-w-[4rem] transition-base hover:bg-primary/90 active:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          検索
        </button>
      </div>
      {query && (
        <ul className="absolute left-0 right-0 mt-1 bg-white dark:bg-gray-800 border dark:border-gray-600 rounded-xl shadow-md max-h-60 overflow-auto z-10 animate-fadeInUp dark:text-gray-100">
          {isLoading ? (
            <li className="px-3 py-2">
              <Loader />
            </li>
          ) : suggestions.length ? (
            suggestions.map((tag, idx) => (
              <li
                key={tag}
                className={`px-3 py-2 text-center cursor-pointer transition-base hover:bg-primary/10 active:bg-primary/20 focus:bg-primary/20 focus:outline-none ${
                  idx === activeIndex ? 'bg-primary/20' : ''
                } dark:text-gray-100 h-11 min-w-11 flex items-center justify-center`}
                onMouseDown={() => {
                  selectTag(tag);
                  setQuery('');
                }}
              >
                {tag}
              </li>
            ))
          ) : (
            <li className="px-3 py-2 text-gray-500 dark:text-gray-400 text-center h-11 min-w-11 flex items-center justify-center">
              一致するタグが見つかりません
            </li>
          )}
        </ul>
      )}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {selected.map((tag) => (
            <span
              key={tag}
              className="flex items-center bg-primary/20 dark:bg-primary/30 rounded-full px-3 py-1 text-sm font-medium shadow dark:text-gray-100"
            >
              {tag}
              <button
                className="ml-1 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
                onClick={() => removeTag(tag)}
              >
                &times;
              </button>
            </span>
          ))}
          <button
            onClick={clearTags}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm font-medium dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            クリア
          </button>
        </div>
      )}
    </div>
  );
}
