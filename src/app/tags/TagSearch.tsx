"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Props {
  tags: string[];
}

export default function TagSearch({ tags }: Props) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const router = useRouter();

  useEffect(() => {
    const q = query.toLowerCase();
    if (!q) {
      setSuggestions([]);
      setActiveIndex(-1);
      return;
    }
    const matched = tags
      .filter(tag => tag.toLowerCase().includes(q))
      .sort(
        (a, b) =>
          a.toLowerCase().indexOf(q) - b.toLowerCase().indexOf(q)
      )
      .slice(0, 10);
    setSuggestions(matched);
    setActiveIndex(-1);
  }, [query, tags]);

  const selectTag = (tag: string) => {
    router.push(`/tags/${encodeURIComponent(tag)}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!suggestions.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex(i => (i + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex(i => (i - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0) {
        selectTag(suggestions[activeIndex]);
      }
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="タグを検索"
        value={query}
        onChange={e => setQuery(e.target.value)}
        onKeyDown={onKeyDown}
        className="border rounded px-2 py-1 w-full sm:w-64"
      />
      {query && (
        <ul className="absolute left-0 right-0 mt-1 bg-white border rounded shadow max-h-60 overflow-auto z-10">
          {suggestions.length ? (
            suggestions.map((tag, idx) => (
              <li
                key={tag}
                className={`px-2 py-1 cursor-pointer ${
                  idx === activeIndex ? "bg-primary/20" : ""
                }`}
                onMouseDown={() => selectTag(tag)}
              >
                {tag}
              </li>
            ))
          ) : (
            <li className="px-2 py-1 text-gray-500">一致するタグが見つかりません</li>
          )}
        </ul>
      )}
    </div>
  );
}
