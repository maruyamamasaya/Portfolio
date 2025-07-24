import Link from 'next/link';

export default function Profile() {
  return (
    <div>
      <h3 className="font-bold mb-2">プロフィール</h3>
      <p className="text-sm mb-2">独立系エンジニア兼クリエイター。</p>
      <Link href="/about" className="text-blue-600 hover:underline text-sm">
        詳しく見る
      </Link>
      <ul className="mt-4 space-y-1 text-sm">
        <li>
          <span className="text-gray-600">/developers_blog</span>
          : 制作過程や開発メモをまとめます。
        </li>
        <li>
          <Link href="/art_blog" className="text-blue-600 hover:underline">
            Art Blog
          </Link>
          : 個人アーティストとしての活動記録。
        </li>
        <li>
          <Link href="/artworks_blog" className="text-blue-600 hover:underline">
            Artworks
          </Link>
          : 作品展示ギャラリー。
        </li>
        <li>
          <Link href="/tech_blog" className="text-blue-600 hover:underline">
            Tech Blog
          </Link>
          : 最近のテック事情を解説。
        </li>
        <li>
          <Link href="/repair_blog" className="text-blue-600 hover:underline">
            Rescue Log
          </Link>
          : パソコンやゲーム機の修理記録。
        </li>
      </ul>
    </div>
  );
}
