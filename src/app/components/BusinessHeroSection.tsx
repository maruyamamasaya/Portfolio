import Image from 'next/image';
import Link from 'next/link';

export default function BusinessHeroSection() {
  return (
    <section className="mb-6 sm:mb-12 mt-0 sm:mt-12">
      {/* Mobile layout */}
      <div className="sm:hidden space-y-2">
        <div className="mx-[5px]">
          <Image
            src="/images/top.png"
            alt=""
            width={1000}
            height={1000}
            className="w-full aspect-square object-cover"
          />
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-xl font-bold text-balance">
            最新AIから業務効率まで、幅広くお任せ
              <span className="accent-text-bright block">テクニカル法人サポート</span>
          </h2>
          <p className="text-sm">現役エンジニアがIT活用を伴走支援します。</p>
          <Link
            href="/contact/business"
            className="inline-block px-4 py-2 bg-primary text-white rounded shadow motion-safe:transition-transform motion-reduce:transition-none duration-300 ease-in-out hover:scale-105 transition-base"
          >
            法人向けお問い合わせ
          </Link>
        </div>
      </div>
      {/* Desktop layout */}
      <div
        className="relative hidden sm:flex items-center justify-center h-[80vh] bg-center bg-cover sm:bg-fixed"
        style={{ backgroundImage: 'url("/images/top.png")' }}
      >
        <div className="absolute inset-0 bg-black/80" />
        <div className="relative text-center space-y-4 bg-black/50 p-4 rounded">
          <h2 className="text-3xl font-bold text-balance text-white">
            最新AIから業務効率まで、幅広くお任せ
              <span className="accent-text-bright block">テクニカル法人サポート</span>
          </h2>
          <p className="text-white">現役エンジニアがIT活用を伴走支援します。</p>
          <Link
            href="/contact/business"
            className="inline-block px-4 py-2 bg-primary text-white rounded shadow motion-safe:transition-transform motion-reduce:transition-none duration-300 ease-in-out hover:scale-105 transition-base"
          >
            法人向けお問い合わせ
          </Link>
        </div>
      </div>
    </section>
  );
}
