"use client";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function BlogNavButtons() {
  const router = useRouter();
  return (
    <div className="flex space-x-2 mb-4">
      <button onClick={() => router.back()} className="win98-button">戻る</button>
      <Link href="/" className="win98-button">ホーム</Link>
      <Link href="/blog" className="win98-button">ブログトップ</Link>
    </div>
  );
}
