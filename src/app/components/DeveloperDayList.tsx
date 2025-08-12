'use client';

import React from 'react';

type PostItem = { name: string; title: string };

type Props = {
  date: string;
  posts: PostItem[];
  onOpen: (name: string) => void;
};

export default function DeveloperDayList({ date, posts, onOpen }: Props) {
  return (
    <div className="mt-4">
      <h2 className="font-bold mb-2">{date}</h2>
      {posts.length ? (
        <ul className="space-y-1">
          {posts.map((p) => (
            <li key={p.name}>
              <button
                className="accent-text underline transition-base"
                onClick={() => onOpen(p.name)}
              >
                {p.title || p.name}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">この日に記事はありません</p>
      )}
    </div>
  );
}
