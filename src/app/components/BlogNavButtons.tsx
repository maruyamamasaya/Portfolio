"use client";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function BlogNavButtons() {
  const router = useRouter();
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <button
        onClick={() => router.back()}
        className="px-3 py-1 bg-primary text-white rounded"
      >
        戻る
      </button>
      <Link href="/" className="px-3 py-1 bg-primary text-white rounded">
        ホーム
      </Link>
      <Link href="/blog" className="px-3 py-1 bg-primary text-white rounded">
        ブログトップ
      </Link>
      <span className="px-3 py-1 bg-gray-200 rounded text-gray-600">
        /developers_blog
      </span>
      <Link href="/art_blog" className="px-3 py-1 bg-primary text-white rounded">
        Art Blog
      </Link>
      <Link
        href="/artworks_blog"
        className="px-3 py-1 bg-primary text-white rounded"
      >
        Artworks
      </Link>
      <Link href="/tech_blog" className="px-3 py-1 bg-primary text-white rounded">
        Tech Blog
      </Link>
      <Link href="/repair_blog" className="px-3 py-1 bg-primary text-white rounded">
        Rescue Log
      </Link>
    </div>
  );
}
