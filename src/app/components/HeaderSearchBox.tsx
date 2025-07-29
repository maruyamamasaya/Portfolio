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
    <form onSubmit={onSubmit} className="">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="検索"
        className="w-32 text-sm px-2 py-1 border rounded"
      />
    </form>
  );
}
