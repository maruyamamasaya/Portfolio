import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'サービス紹介',
};

export default function ServicesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-10 py-8 space-y-8">
      <h1 className="text-3xl font-bold">サービス紹介</h1>
      <div className="flex flex-col sm:flex-row flex-wrap gap-4">
        <Link
          href="/services/business"
          className="relative block h-64 sm:w-[48%] group rounded-lg overflow-hidden"
        >
          <Image
            src="/images/top.png"
            alt=""
            fill
            className="object-cover"
            sizes="(min-width: 640px) 48vw, 100vw"
          />
          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 transition-base flex flex-col justify-center items-center p-4">
            <p className="text-lg font-bold text-white text-center">
              最新AIから業務効率まで、幅広くお任せ
              <span className="accent-text block">テクニカル法人サポート</span>
            </p>
          </div>
        </Link>
        <Link
          href="/services/tutor"
          className="relative block h-64 sm:w-[48%] group rounded-lg overflow-hidden"
        >
          <Image
            src="/images/tutor.jpeg"
            alt=""
            fill
            className="object-cover"
            sizes="(min-width: 640px) 48vw, 100vw"
          />
          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 transition-base flex flex-col justify-center items-center p-4">
            <p className="text-lg font-bold text-white text-center">
              中高生の「できた！」を育てる、
              <span className="accent-text block">家庭教師型パソコンスクール</span>
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
