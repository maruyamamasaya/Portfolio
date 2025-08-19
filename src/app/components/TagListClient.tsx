'use client';
import { useState } from 'react';
import TagButton from './TagButton';

interface Props {
  tagCounts: { tag: string; count: number }[];
  initialOpen?: boolean;
}

export default function TagListClient({ tagCounts, initialOpen = true }: Props) {
  const max = tagCounts[0]?.count || 1;
  const getSizeClass = (count: number) => {
    const ratio = count / max;
    if (ratio > 0.66) return 'text-lg';
    if (ratio > 0.33) return 'text-base';
    return 'text-sm';
  };
  const [open, setOpen] = useState(initialOpen);
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <h3 className="font-bold">タグ一覧</h3>
        <button
          aria-label="タグ一覧の開閉"
          className="text-primary border border-gray-300 dark:border-gray-600 rounded w-6 h-6 flex items-center justify-center text-lg leading-none transition-base"
          onClick={() => setOpen(!open)}
        >
          {open ? '−' : '＋'}
        </button>
      </div>
      <div className={`${open ? 'flex' : 'hidden'} flex-wrap gap-2`}>
        {tagCounts.map(({ tag, count }) => (
          <TagButton key={tag} label={tag} sizeClass={getSizeClass(count)} />
        ))}
      </div>
    </div>
  );
}
