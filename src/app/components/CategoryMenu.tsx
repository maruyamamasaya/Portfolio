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
          className="flex items-center space-x-2 rounded min-h-[44px] min-w-[44px] px-3 py-2 w-full text-center hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary focus:ring-2 focus:ring-primary focus:outline-none transition-base"
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
                  className="block rounded min-h-[44px] min-w-[44px] px-3 py-2 w-full text-center hover:bg-gray-100 dark:hover:bg-gray-700 hover:underline focus:ring-2 focus:ring-primary focus:outline-none transition-base"
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
        className="inline-flex items-center space-x-1 rounded min-h-[44px] min-w-[44px] px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary focus:ring-2 focus:ring-primary focus:outline-none transition-base motion-safe:transition-transform motion-reduce:transition-none hover:scale-105"
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
                className="block rounded min-h-[44px] min-w-[44px] px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-2 focus:ring-primary focus:outline-none transition-base"
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
