import Link from 'next/link';

export default function Profile() {
  return (
    <div>
      <h3 className="font-bold mb-2">プロフィール</h3>
      <p className="text-sm mb-2">独立系エンジニア兼クリエイター。</p>
      <Link href="/about" className="text-blue-600 hover:underline text-sm">
        詳しく見る
      </Link>
    </div>
  );
}
