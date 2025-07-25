import Link from 'next/link';

export default function HeroSection() {
  return (
    <section
      className="relative flex items-center justify-center h-screen bg-center bg-cover bg-fixed mb-12"
      style={{ backgroundImage: "url('/images/img1.svg')" }}
    >
      <div className="text-center space-y-4 bg-black bg-opacity-50 p-4 rounded">
        <h2 className="text-3xl font-bold text-balance text-white">
          分からないを<span className="text-primary">分かる</span>に変える
        </h2>
        <p className="text-white">パソコンやIT活用のお悩みをサポートします。</p>
        <Link href="/contact" className="inline-block px-4 py-2 bg-primary text-white rounded">
          お問い合わせ
        </Link>
      </div>
    </section>
  );
}
