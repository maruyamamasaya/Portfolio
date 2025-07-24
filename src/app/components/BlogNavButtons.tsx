"use client";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function BlogNavButtons() {
  const router = useRouter();
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <button onClick={() => router.back()} className="win98-button">戻る</button>
      <Link href="/" className="win98-button">ホーム</Link>
      <Link href="/blog" className="win98-button">ブログトップ</Link>
      <span className="win98-button text-gray-600">/developers_blog</span>
      <Link href="/art_blog" className="win98-button">Art Blog</Link>
      <Link href="/artworks_blog" className="win98-button">Artworks</Link>
      <Link href="/tech_blog" className="win98-button">Tech Blog</Link>
      <Link href="/repair_blog" className="win98-button">Rescue Log</Link>
    </div>
  );
}
