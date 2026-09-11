import BlogNavButtons from '../components/BlogNavButtons';
import Image from 'next/image';
import Link from 'next/link';
import SectionEnvironment from '../components/visual/SectionEnvironment';

export default function Contact() {
  return (
    <SectionEnvironment as="div" space="contact" className="max-w-5xl mx-auto px-4 sm:px-6 md:px-10 py-10 space-y-8">
      <BlogNavButtons />
      <h1 className="text-3xl font-bold">Contact</h1>
      <p className="text-slate-300">お問い合わせ内容に応じて以下よりお選びください。</p>
      <div className="flex flex-col sm:flex-row flex-wrap gap-4">
        <Link
          href="/contact/business"
          className="relative block h-64 sm:w-[48%] group rounded-2xl overflow-hidden portfolio-glass focus-ring vfx-trigger"
          data-ripple="true"
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
          className="relative block h-64 sm:w-[48%] group rounded-2xl overflow-hidden portfolio-glass focus-ring vfx-trigger"
          data-ripple="true"
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
    </SectionEnvironment>
  );
}
