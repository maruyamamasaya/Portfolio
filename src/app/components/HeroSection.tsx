import Link from 'next/link';
import HeroAnimation from './HeroAnimation';

export default function HeroSection() {
  return (
    <section className="flex flex-col md:flex-row items-center mb-12">
      <div className="md:w-1/2 space-y-4">
        <h2 className="text-3xl font-bold text-balance">
          分からないを<span className="text-primary">分かる</span>に変える
        </h2>
        <p>パソコンやIT活用のお悩みをサポートします。</p>
        <Link href="/contact" className="inline-block px-4 py-2 bg-primary text-white rounded">
          お問い合わせ
        </Link>
      </div>
      <div className="md:w-1/2 mt-6 md:mt-0">
        <HeroAnimation />
      </div>
    </section>
  );
}
