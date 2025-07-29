import Link from 'next/link';

interface Props {
  title?: string;
  href?: string;
  label?: string;
}

export default function CTASection({
  title = 'お問い合わせはこちら',
  href = '/contact',
  label = 'お問い合わせ',
}: Props) {
  return (
    <section className="section-spacing text-center space-y-4">
      <h2 className="text-2xl font-bold">{title}</h2>
      <Link
        href={href}
        className="inline-block px-6 py-3 bg-primary text-white rounded shadow hover:bg-primary/80 transition-base"
      >
        {label}
      </Link>
    </section>
  );
}
