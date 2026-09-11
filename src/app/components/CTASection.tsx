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
        className="inline-block px-8 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-[#708cff] to-[#45c5ff] hover:from-[#5d7af7] hover:to-[#3db4e8] transition-base"
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
