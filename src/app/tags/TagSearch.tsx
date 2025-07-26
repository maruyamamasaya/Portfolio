"use client";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";

interface Props {
  tags: string[];
  onChange?: (selected: string[]) => void;
}

export default function TagSearch({ tags, onChange }: Props) {
  const [query, setQuery] = useState("");
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
        .filter(tag => tag.toLowerCase().includes(q))
        .sort(
          (a, b) =>
            a.toLowerCase().indexOf(q) - b.toLowerCase().indexOf(q)
        )
        .slice(0, 10);
      setSuggestions(matched);
      setActiveIndex(-1);
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timeout);
  }, [query, tags]);

  const selectTag = (tag: string) => {
    if (selected.includes(tag)) return;
    const next = [...selected, tag];
    setSelected(next);
    onChange?.(next);
  };

  const removeTag = (tag: string) => {
    const next = selected.filter(t => t !== tag);
    setSelected(next);
    onChange?.(next);
  };

  const clearTags = () => {
    setSelected([]);
    onChange?.([]);
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
        setQuery("");
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
          {isLoading ? (
            <li className="px-2 py-1">
              <Loader />
            </li>
          ) : suggestions.length ? (
            suggestions.map((tag, idx) => (
              <li
                key={tag}
                className={`px-2 py-1 cursor-pointer ${
                  idx === activeIndex ? "bg-primary/20" : ""
                }`}
                onMouseDown={() => {
                  selectTag(tag);
                  setQuery("");
                }}
              >
                {tag}
              </li>
            ))
          ) : (
            <li className="px-2 py-1 text-gray-500">一致するタグが見つかりません</li>
          )}
        </ul>
      )}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selected.map(tag => (
            <span
              key={tag}
              className="flex items-center bg-primary/20 rounded-full px-2 py-1 text-sm"
            >
              {tag}
              <button
                className="ml-1 text-gray-600 hover:text-gray-900"
                onClick={() => removeTag(tag)}
              >
                &times;
              </button>
            </span>
          ))}
          <button
            onClick={clearTags}
            className="px-2 py-1 bg-gray-200 rounded text-sm"
          >
            クリア
          </button>
        </div>
      )}
    </div>
  );
}
