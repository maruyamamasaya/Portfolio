'use client';
import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';

export default function HeaderSearchBox() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery('');
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex overflow-hidden rounded border border-gray-300 dark:border-gray-600"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="検索"
        className="w-48 h-10 text-sm px-3 bg-transparent focus:outline-none"
      />
      <button
        type="submit"
        aria-label="Search"
        className="flex items-center justify-center px-3 h-10 bg-primary text-white"
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
    </form>
  );
}
