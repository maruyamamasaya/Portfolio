'use client';
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
    </div>
  );
}
