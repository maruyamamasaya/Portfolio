import Link from 'next/link';

export default function HeroSection() {
  return (
    <section
      className="relative flex items-center justify-center sm:h-screen bg-center bg-cover sm:bg-fixed section-spacing"
      style={{ backgroundImage: 'url("/images/top.png")' }}
    >
      {/* 黒80%のシンプルなオーバーレイに変更 */}
      <div className="absolute inset-0 bg-black/80" />
      {/* Desktop-only activity policy text */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 hidden sm:block bg-black/50 p-4 rounded max-w-2xl text-white space-y-2">
        <h3 className="text-lg font-bold text-center">活動ポリシー</h3>
        <p className="text-sm text-center">
          「信頼される技術者であること」を最優先に、ユーザー視点での価値提供を心がけています。
          単なる知識提供や技術支援ではなく、本当に“役に立つ”体験を届けることを軸に活動しています。
        </p>
      </div>
      <div className="relative text-center space-y-4 bg-black/50 p-4 rounded">
        <h2 className="text-3xl font-bold text-balance text-white">
          テクノロジーで日々の煩雑業務を<span className="accent-text">スッキリ</span>解決！
        </h2>
        <p className="text-white">パソコンやIT活用のお悩みをサポートします。</p>
        <Link
          href="/contact"
          className="inline-block px-4 py-2 bg-primary text-white rounded shadow motion-safe:transition-transform motion-reduce:transition-none duration-300 ease-in-out hover:scale-105 transition-base"
        >
          お問い合わせ
        </Link>
      </div>
    </section>
  );
}
