import React from 'react';
import Image from 'next/image';

type MediaItem = {
  icon: string;
  title: string;
  description: string;
  href: string;
  /**
   * Optional size for the icon in pixels. When not provided, defaults to 32.
   */
  iconSize?: number;
};

interface Props {
  items: MediaItem[];
}

export default function MediaCardGrid({ items }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {items.map((item) => (
        <div
          key={item.href}
          className="rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-5 bg-white dark:bg-gray-800 hover:shadow-lg transition"
        >
          {item.icon.startsWith('/') ? (
            <Image
              src={item.icon}
              alt={item.title}
              width={item.iconSize ?? 32}
              height={item.iconSize ?? 32}
              className="mb-2 rounded-full"
              style={{
                width: item.iconSize ?? 32,
                height: item.iconSize ?? 32,
              }}
            />
          ) : (
            <div className="text-4xl mb-2">{item.icon}</div>
          )}
          <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
            {item.description}
          </p>
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 text-primary hover:underline text-sm"
          >
            チャンネルを見る
          </a>
        </div>
      ))}
    </div>
  );
}
