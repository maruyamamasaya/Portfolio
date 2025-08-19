import Link from 'next/link';

export const metadata = {
  title: 'サービス紹介',
};

export default function ServicesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-10 py-8 space-y-8">
      <h1 className="text-3xl font-bold">サービス紹介</h1>
      <ul className="space-y-4">
        <li>
          <Link
            href="/services/business"
            className="accent-text hover:underline transition-base"
          >
            最新AIから業務効率まで、幅広くお任せ テクニカル法人サポート
          </Link>
        </li>
        <li>
          <Link
            href="/services/tutor"
            className="accent-text hover:underline transition-base"
          >
            中高生の「できた！」を育てる、家庭教師型パソコンスクール
          </Link>
        </li>
      </ul>
    </div>
  );
}
