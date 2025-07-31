import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-800 text-white mt-8 text-sm border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <h2 className="font-semibold mb-2 sr-only">ナビゲーション</h2>
          <ul className="space-y-1">
            <li>
            <Link href="/" className="transition-base">ホーム</Link>
            </li>
            <li>
            <Link href="/about" className="transition-base">プロフィール</Link>
            </li>
            <li>
            <Link href="/works" className="transition-base">Work</Link>
            </li>
            <li>
            <Link href="/blog" className="transition-base">ブログ</Link>
            </li>
            <li>
            <Link href="/contact" className="transition-base">お問い合わせ</Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold mb-2 sr-only">ポリシー</h2>
          <ul className="space-y-1">
            <li>
              <Link href="/policy/terms" className="transition-base">利用規約</Link>
            </li>
            <li>
              <Link href="/policy/privacy" className="transition-base">プライバシーポリシー</Link>
            </li>
            <li>
              <Link href="/policy/copyright" className="transition-base">著作権について</Link>
            </li>
            <li>
              <Link href="/policy/law" className="transition-base">特定商取引法に基づく表記</Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold mb-2 sr-only">SNS</h2>
          <ul className="space-y-1">
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 hover:text-yellow-300 transition-base"
              >
                <Image
                  src="/images/instagram-200px.png"
                  alt="Instagram"
                  width={20}
                  height={20}
                  className="w-4 h-4"
                />
                <span>Instagram</span>
              </a>
            </li>
            <li>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 hover:text-yellow-300 transition-base"
              >
                <Image
                  src="/images/X.png"
                  alt="X"
                  width={20}
                  height={20}
                  className="w-4 h-4"
                />
                <span>X</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 hover:text-yellow-300 transition-base"
              >
                <Image
                  src="/images/tiktok-200px.png"
                  alt="TikTok"
                  width={20}
                  height={20}
                  className="w-4 h-4"
                />
                <span>TikTok</span>
              </a>
            </li>
            <li>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 hover:text-yellow-300 transition-base"
              >
                <Image
                  src="/images/youtube-200px.png"
                  alt="YouTube"
                  width={20}
                  height={20}
                  className="w-4 h-4"
                />
                <span>YouTube</span>
              </a>
            </li>
            <li>
              <a
                href="https://note.com/freelancehack"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 hover:text-yellow-300 transition-base"
              >
                <Image
                  src="/images/note.png"
                  alt="note"
                  width={20}
                  height={20}
                  className="w-4 h-4"
                />
                <span>note</span>
              </a>
            </li>
            <li>
              <a
                href="https://lin.ee/21wyOGD"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 hover:text-yellow-300 transition-base"
              >
                <Image
                  src="/images/LINEdevelop-200px.png"
                  alt="LINE公式アカウント"
                  width={20}
                  height={20}
                  className="w-4 h-4"
                />
                <span>LINE公式アカウント</span>
              </a>
            </li>
            <li>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 hover:text-yellow-300 transition-base"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M12 .5C5.4.5 0 6 0 12.6c0 5 3.2 9.2 7.6 10.7.6.1.8-.3.8-.6v-2c-3 0-3.6-1.4-3.6-1.4-.5-1-1.2-1.3-1.2-1.3-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.4 1 3 .8.1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.4 1.2-3.2-.2-.4-.6-1.6.1-3.2 0 0 1-.3 3.3 1.2 1-.3 2-.4 3-.4s2 .1 3 .4c2.3-1.5 3.3-1.2 3.3-1.2.7 1.6.3 2.8.1 3.2.7.8 1.2 1.9 1.2 3.2 0 4.5-2.7 5.5-5.3 5.8.4.4.7.9.7 1.7v2.3c0 .3.2.7.8.6A11.8 11.8 0 0024 12.6C24 6 18.6.5 12 .5z" />
                </svg>
                <span>GitHub</span>
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold mb-2 sr-only">お問い合わせ</h2>
          <Link href="/contact" className="hover:underline transition-base">
            お問い合わせフォーム
          </Link>
        </div>
      </div>
      <div className="bg-gray-900 text-center py-4 text-xs flex items-center justify-center space-x-2">
        <Image
          src="/images/footer_icon.png"
          alt="Footer logo"
          width={24}
          height={24}
          className="w-6 h-6"
        />
        <span>&copy; 2025 でじサポ｜パソコン相談室</span>
      </div>
    </footer>
  );
}
