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
    <form onSubmit={onSubmit} className="flex h-10">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="検索"
        className="h-full w-32 text-sm px-2 border rounded-l"
      />
      <button
        type="submit"
        aria-label="Search"
        className="h-full px-3 bg-primary text-white rounded-r"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-4 h-4"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </button>
    </form>
  );
}
