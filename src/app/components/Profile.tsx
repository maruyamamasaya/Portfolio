"use client";
import Link from 'next/link';

export default function Profile() {

  return (
    <div>
      <h3 className="font-bold mb-2 text-lg sm:text-xl">プロフィール</h3>
      <p className="text-sm sm:text-base mb-2">独立系エンジニア兼クリエイター。</p>
      <Link href="/about" className="underline text-sm sm:text-base">
        詳しく見る
      </Link>

    </div>
  );
}
