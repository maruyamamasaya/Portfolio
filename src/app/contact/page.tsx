import BlogNavButtons from '../components/BlogNavButtons';
import CTASection from '../components/CTASection';

export default function Contact() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-4">
      <BlogNavButtons />
      <h1 className="text-2xl font-bold">Contact</h1>
      <p>お問い合わせはメールでお願いします。</p>
      <CTASection
        href="mailto:contact@freehackapp.com"
        label="\uD83D\uDCE9 お仕事のご相談はこちら"
        title=""
      />
    </div>
  );
}
