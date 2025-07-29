'use client';
import Link from 'next/link';
import { useState } from 'react';
import { getCategories } from '@/lib/categories';
import type { ReactNode } from 'react';

interface Props {
  icon: ReactNode;
  label: string;
  mobile?: boolean;
  onNavigate?: () => void;
}

export default function CategoryMenu({
  icon,
  label,
  mobile = false,
  onNavigate,
}: Props) {
  const categories = getCategories();
  const [open, setOpen] = useState(false);

  if (mobile) {
    return (
      <div>
        <button
          type="button"
          className="flex items-center space-x-2 py-1 hover:text-primary"
          onClick={() => setOpen(!open)}
        >
          {icon}
          <span>{label}</span>
        </button>
        {open && (
          <ul className="ml-6 mt-2 space-y-2">
            {categories.map((cat) => (
              <li key={cat.href}>
                <Link
                  href={cat.href}
                  onClick={() => {
                    onNavigate?.();
                    setOpen(false);
                  }}
                  className="block hover:underline"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <div className="relative" onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        onMouseEnter={() => setOpen(true)}
        onClick={() => setOpen(!open)}
        className="inline-flex items-center space-x-1 hover:text-primary motion-safe:transition-transform motion-reduce:transition-none duration-300 ease-in-out hover:scale-105"
      >
        {icon}
        <span>{label}</span>
      </button>
      {open && (
        <ul className="absolute left-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow z-10 text-sm whitespace-nowrap">
          {categories.map((cat) => (
            <li key={cat.href}>
              <Link
                href={cat.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
