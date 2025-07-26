"use client";
import Link from 'next/link';

export default function Profile() {
  return (
    <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
      <img
        src="/images/img1.svg"
        alt="ユーザーアイコン"
        className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 rounded-full object-cover"
      />
      <div>
        <h3 className="font-bold mb-2 text-lg sm:text-xl">プロフィール</h3>
        <p className="text-sm sm:text-base mb-2">独立系エンジニア兼クリエイター。</p>
        <Link href="/about" className="underline text-sm sm:text-base">
          詳しく見る
        </Link>
      </div>
    </div>
  );
}
