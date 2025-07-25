import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="mb-12 text-center">
      <h2 className="text-2xl font-bold mb-4">お問い合わせはこちら</h2>
      <Link href="/contact" className="px-6 py-3 bg-primary text-white rounded">
        お問い合わせ
      </Link>
    </section>
  );
}
