import BlogNavButtons from '../components/BlogNavButtons';
import Image from 'next/image';
import Link from 'next/link';

export default function Contact() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-10 py-8 space-y-8">
      <BlogNavButtons />
      <h1 className="text-3xl font-bold">Contact</h1>
      <p>お問い合わせ内容に応じて以下よりお選びください。</p>
      <div className="flex flex-col sm:flex-row flex-wrap gap-4">
        <Link
          href="/contact/business"
          className="relative block h-64 sm:w-[48%] group rounded-lg overflow-hidden"
        >
          <Image
            src="/images/LINEdevelop-200px.png"
            alt="LINE公式アカウント"
            fill
            className="object-cover"
            sizes="(min-width: 640px) 48vw, 100vw"
          />
          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 transition-base flex flex-col justify-center items-center p-4">
            <p className="text-lg font-bold text-white text-center">
              LINE公式アカウント
              <span className="accent-text block">法人向けお問い合わせ</span>
            </p>
          </div>
        </Link>
        <Link
          href="/contact/tutor"
          className="relative block h-64 sm:w-[48%] group rounded-lg overflow-hidden"
        >
          <Image
            src="/images/instagram-200px.png"
            alt="Instagram"
            fill
            className="object-cover"
            sizes="(min-width: 640px) 48vw, 100vw"
          />
          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 transition-base flex flex-col justify-center items-center p-4">
            <p className="text-lg font-bold text-white text-center">
              Instagram
              <span className="tutor-accent-text block">家庭教師に関するお問い合わせ</span>
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
