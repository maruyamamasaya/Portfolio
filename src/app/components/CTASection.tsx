import Link from 'next/link';

interface Props {
  title?: string;
  href?: string;
  label?: string;
  showBusinessLinks?: boolean;
}

export default function CTASection({
  title = 'お問い合わせはこちら',
  href = '/contact',
  label = 'お問い合わせ',
  showBusinessLinks = false,
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
      {showBusinessLinks && (
        <div className="space-y-2">
          <Link
            href="/pricing/business"
            className="accent-text hover:underline transition-base block"
          >
            法人向け料金表
          </Link>
          <Link
            href="/contact/business"
            className="accent-text hover:underline transition-base block"
          >
            法人向けお問い合わせはこちら
          </Link>
        </div>
      )}
    </section>
  );
}
