import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200 mt-8 text-sm">
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <h2 className="font-semibold mb-2">Navigation</h2>
          <ul className="space-y-1">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/works">Works</Link></li>
            <li><Link href="/blog">Journal</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold mb-2">Policy</h2>
          <ul className="space-y-1">
            <li><Link href="/policy/terms">利用規約</Link></li>
            <li><Link href="/policy/privacy">プライバシーポリシー</Link></li>
            <li><Link href="/policy/copyright">著作権について</Link></li>
            <li><Link href="/policy/law">特定商取引法に基づく表記</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold mb-2">Follow</h2>
          <ul className="space-y-1">
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer">YouTube</a></li>
            <li><a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a></li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold mb-2">Contact</h2>
          <Link href="/contact" className="hover:underline">お問い合わせフォーム</Link>
        </div>
      </div>
      <div className="bg-gray-900 text-center py-4 text-xs">&copy; 2025 My Portfolio</div>
    </footer>
  );
}
