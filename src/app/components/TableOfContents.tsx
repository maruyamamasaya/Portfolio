'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  if (!headings || headings.length === 0) return null;
  const [activeId, setActiveId] = useState('');
  const levels = ['pl-0 text-base', 'pl-4 text-sm', 'pl-8 text-xs'];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -70% 0px' },
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  return (
    <aside
      className="mb-6 rounded-lg p-4 bg-gray-100 dark:bg-gray-700 dark:text-gray-100"
    >
      <h3 className="font-bold mb-2">目次</h3>
      <ul className="list-none m-0 p-0 space-y-1">
        {headings.map((h) => (
          <li
            key={h.id}
            className={`${levels[h.level - 1] || levels[levels.length - 1]} py-1`}
          >
            <Link
              href={`#${h.id}`}
              className={`accent-text hover:underline focus:underline ${
                activeId === h.id ? 'font-bold' : ''
              }`}
            >
              {h.text}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
