import Link from 'next/link';
import SearchBar from './SearchBar';

export default function HeroSection() {
  return (
    <section
      className="relative flex items-center justify-center h-screen bg-center bg-cover bg-fixed mb-12"
      style={{ backgroundImage: 'url("/images/img3.svg")' }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/50 via-purple-500/50 to-pink-500/50" />
      <div className="relative text-center space-y-4 bg-black/50 p-4 rounded">
        <h2 className="text-3xl font-bold text-balance text-white">
          分からないを<span className="accent-text">分かる</span>に変える
        </h2>
        <p className="text-white">パソコンやIT活用のお悩みをサポートします。</p>
        <Link
          href="/contact"
          className="inline-block px-4 py-2 bg-primary text-white rounded shadow motion-safe:transition-transform motion-reduce:transition-none duration-300 ease-in-out hover:scale-105"
        >
          お問い合わせ
        </Link>
        <SearchBar className="flex justify-center" />
      </div>
    </section>
  );
}
