"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface PostMeta {
  slug: string;
  title: string;
  category?: string;
  tags?: string[];
}

interface Props {
  className?: string;
}

export default function SearchBar({ className }: Props) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState<PostMeta[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [category, setCategory] = useState("");
  const [tag, setTag] = useState("");
  const [suggestions, setSuggestions] = useState<PostMeta[]>([]);
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/search-data")
      .then(res => res.json())
      .then((data) => {
        setPosts(data.posts);
        setCategories(data.categories);
        setTags(data.tags);
      });
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("searchHistory");
    if (stored) setHistory(JSON.parse(stored));
  }, []);

  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    const q = query.toLowerCase();
    setSuggestions(
      posts.filter(p => p.title.toLowerCase().includes(q)).slice(0, 5)
    );
  }, [query, posts]);

  const runSearch = (q: string) => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (category) params.set("category", category);
    if (tag) params.set("tag", tag);
    router.push(`/search?${params.toString()}`);
    if (q) {
      const next = [q, ...history.filter(h => h !== q)].slice(0, 5);
      setHistory(next);
      localStorage.setItem("searchHistory", JSON.stringify(next));
    }
  };

  return (
    <div className={`relative ${className ?? ""}`.trim()}>
      <form
        onSubmit={e => {
          e.preventDefault();
          runSearch(query);
        }}
        className="space-y-2"
      >
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="キーワードを入力"
          className="border rounded px-2 py-1 w-full"
        />
        {suggestions.length > 0 && (
          <ul className="absolute left-0 right-0 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded shadow mt-1 z-10 max-h-60 overflow-auto">
            {suggestions.map(s => (
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
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="border rounded px-2 py-1 flex-1"
            >
              <option value="">すべてのカテゴリ</option>
              {categories.map(c => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          )}
          {tags.length > 0 && (
            <select
              value={tag}
              onChange={e => setTag(e.target.value)}
              className="border rounded px-2 py-1 flex-1"
            >
              <option value="">すべてのタグ</option>
              {tags.map(t => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          )}
        </div>
      </form>
      {history.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2 text-sm">
          {history.map(h => (
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
  );
}
