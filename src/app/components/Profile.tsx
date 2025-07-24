import Link from 'next/link';

export default function Profile() {
  return (
    <div className="max-w-[1011px] mx-auto p-4 rounded-lg shadow-md bg-gradient-to-r from-[#8ed1fc] to-[#9b51e0] text-white">
      <h3 className="font-bold mb-2 text-lg sm:text-xl">プロフィール</h3>
      <p className="text-sm sm:text-base mb-2">独立系エンジニア兼クリエイター。</p>
      <Link href="/about" className="underline text-sm sm:text-base">
        詳しく見る
      </Link>
      <ul className="mt-4 space-y-1 text-sm sm:text-base">
        <li>
          <span className="text-gray-200">/developers_blog</span>
          : 制作過程や開発メモをまとめます。
        </li>
        <li>
          <Link href="/art_blog" className="underline">
            Art Blog
          </Link>
          : 個人アーティストとしての活動記録。
        </li>
        <li>
          <Link href="/artworks_blog" className="underline">
            Artworks
          </Link>
          : 作品展示ギャラリー。
        </li>
        <li>
          <Link href="/tech_blog" className="underline">
            Tech Blog
          </Link>
          : 最近のテック事情を解説。
        </li>
        <li>
          <Link href="/repair_blog" className="underline">
            Rescue Log
          </Link>
          : パソコンやゲーム機の修理記録。
        </li>
      </ul>
    </div>
  );
}
