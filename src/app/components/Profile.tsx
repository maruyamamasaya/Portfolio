"use client";
import { useState } from 'react';
import Link from 'next/link';

const items = [
  {
    href: '/developers_blog',
    label: '/developers_blog',
    desc: '制作過程や開発メモをまとめます。',
  },
  { href: '/art_blog', label: 'Art Blog', desc: '個人アーティストとしての活動記録。' },
  { href: '/artworks_blog', label: 'Artworks', desc: '作品展示ギャラリー。' },
  { href: '/tech_blog', label: 'Tech Blog', desc: '最近のテック事情を解説。' },
  { href: '/repair_blog', label: 'Rescue Log', desc: 'パソコンやゲーム機の修理記録。' },
];
export default function Profile() {
  const [message, setMessage] = useState('');

  return (
    <div>
      <h3 className="font-bold mb-2 text-lg sm:text-xl">プロフィール</h3>
      <p className="text-sm sm:text-base mb-2">独立系エンジニア兼クリエイター。</p>
      <Link href="/about" className="underline text-sm sm:text-base">
        詳しく見る
      </Link>
      <p className="h-6 mt-3 text-xs sm:text-sm text-yellow-200">{message}</p>
      <ul className="mt-2 space-y-1 text-sm sm:text-base">
        {items.map(item => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="underline hover:text-gray-200"
              onMouseEnter={() => setMessage(item.desc)}
              onMouseLeave={() => setMessage('')}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
