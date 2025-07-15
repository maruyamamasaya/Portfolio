import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700 text-white mt-8 text-sm border-t-4 border-yellow-300">
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <h2 className="font-semibold mb-2 sr-only">ナビゲーション</h2>
          <ul className="space-y-1">
            <li><Link href="/">ホーム</Link></li>
            <li><Link href="/about">プロフィール</Link></li>
            <li><Link href="/works">Works</Link></li>
            <li><Link href="/blog">ブログ</Link></li>
            <li><Link href="/contact">お問い合わせ</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold mb-2 sr-only">ポリシー</h2>
          <ul className="space-y-1">
            <li><Link href="/policy/terms">利用規約</Link></li>
            <li><Link href="/policy/privacy">プライバシーポリシー</Link></li>
            <li><Link href="/policy/copyright">著作権について</Link></li>
            <li><Link href="/policy/law">特定商取引法に基づく表記</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold mb-2 sr-only">SNS</h2>
          <ul className="space-y-1">
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://x.com" target="_blank" rel="noopener noreferrer">X</a></li>
            <li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer">YouTube</a></li>
            <li><a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a></li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold mb-2 sr-only">お問い合わせ</h2>
          <Link href="/contact" className="hover:underline">お問い合わせフォーム</Link>
        </div>
      </div>
      <div className="bg-gray-900 text-center py-4 text-xs flex items-center justify-center space-x-2">
        <img
          src="/images/footer_icon.png"
          alt="Footer Icon"
          className="w-6 h-6"
        />
        <span>&copy; 2025 電脳幻境プロジェクト</span>
      </div>
    </footer>
  );
}
