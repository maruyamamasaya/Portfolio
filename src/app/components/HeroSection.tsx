import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="mb-6 sm:mb-12 mt-0 sm:mt-12">
      {/* Mobile layout: image first, text below */}
        <div className="sm:hidden space-y-2">
          <div className="mx-[5px]">
            <img
              src="/images/top.png"
              alt=""
              className="w-full aspect-square object-cover"
            />
          </div>
        <div className="text-center space-y-2">
          <h2 className="text-xl font-bold text-balance">
            テクノロジーで日々の煩雑業務を<span className="accent-text">スッキリ</span>解決！
          </h2>
          <p className="text-sm">パソコンやIT活用のお悩みをサポートします。</p>
          <Link
            href="/contact"
            className="inline-block px-4 py-2 bg-primary text-white rounded shadow motion-safe:transition-transform motion-reduce:transition-none duration-300 ease-in-out hover:scale-105 transition-base"
          >
            お問い合わせ
          </Link>
        </div>
      </div>
      {/* Desktop layout retains overlay on background */}
      <div
        className="relative hidden sm:flex items-center justify-center h-[80vh] bg-center bg-cover sm:bg-fixed"
        style={{ backgroundImage: 'url("/images/top.png")' }}
      >
        {/* 黒80%のシンプルなオーバーレイに変更 */}
        <div className="absolute inset-0 bg-black/80" />
        <div className="relative text-center space-y-4 bg-black/50 p-4 rounded">
          <h2 className="text-3xl font-bold text-balance text-white">
            テクノロジーで日々の煩雑業務を<span className="accent-text">スッキリ</span>解決！
          </h2>
          <p className="text-white">パソコンやIT活用のお悩みをサポートします。</p>
          {/* Desktop-only activity policy text placed above contact */}
          <div className="hidden sm:block text-xs text-white space-y-1">
            <h3 className="font-bold text-center">活動ポリシー</h3>
            <p className="text-center">
              「信頼される技術者であること」を最優先に、ユーザー視点での価値提供を心がけています。<br>
              単なる知識提供や技術支援ではなく、本当に“役に立つ”体験を届けることを軸に活動しています。
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-block px-4 py-2 bg-primary text-white rounded shadow motion-safe:transition-transform motion-reduce:transition-none duration-300 ease-in-out hover:scale-105 transition-base"
          >
            お問い合わせ
          </Link>
        </div>
      </div>
    </section>
  );
}
