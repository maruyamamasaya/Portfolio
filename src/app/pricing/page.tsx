import Link from 'next/link';

export const metadata = {
  title: 'ご料金',
};

export default function PricingPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-10 py-8 space-y-8">
      <h1 className="text-3xl font-bold mb-6">ご料金について</h1>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">法人向けプラン</h2>
        <p>ホームページ制作やシステム導入の料金目安です。</p>
        <ul className="list-disc pl-5">
          <li>初期費用: ¥XXX,XXX〜</li>
          <li>月額サポート: ¥XX,XXX〜</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">個別塾向けプラン</h2>
        <p>小中高生向けの個別指導塾様向け料金です。</p>
        <ul className="list-disc pl-5">
          <li>1コマ(60分): ¥X,XXX〜</li>
          <li>入会金: ¥X,XXX</li>
        </ul>
      </section>

      <div className="text-right">
        <Link href="/contact" className="accent-text hover:underline transition-base">
          お問い合わせはこちら
        </Link>
      </div>
    </div>
  );
}
