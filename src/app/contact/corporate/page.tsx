import BlogNavButtons from '../../components/BlogNavButtons';
import CTASection from '../../components/CTASection';

export default function CorporateContact() {
  return (
    <div className="max-w-screen-lg mx-auto px-4 sm:px-6 md:px-10 py-8 space-y-4">
      <BlogNavButtons />
      <h1 className="text-2xl font-bold">法人向けコースお問い合わせ</h1>
      <p>法人企業様のコースに関するお問い合わせは、メールでお願いします。</p>
      <CTASection href="mailto:contact@freehackapp.com" label="\uD83D\uDCE9 メールで問い合わせる" title="" />
    </div>
  );
}
