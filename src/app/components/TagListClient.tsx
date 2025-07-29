'use client';
import { useState } from 'react';
import TagButton from './TagButton';

interface Props {
  tagCounts: { tag: string; count: number }[];
}

export default function TagListClient({ tagCounts }: Props) {
  const max = tagCounts[0]?.count || 1;
  const getSizeClass = (count: number) => {
    const ratio = count / max;
    if (ratio > 0.66) return 'text-lg';
    if (ratio > 0.33) return 'text-base';
    return 'text-sm';
  };
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold">タグ一覧</h3>
        <button
          className="sm:hidden text-primary underline text-sm"
          onClick={() => setOpen(!open)}
        >
          {open ? '閉じる' : '開く'}
        </button>
      </div>
      <div className={`${open ? 'flex' : 'hidden'} sm:flex flex-wrap gap-2`}>
        {tagCounts.map(({ tag, count }) => (
          <TagButton key={tag} label={tag} sizeClass={getSizeClass(count)} />
        ))}
      </div>
    </div>
  );
}
