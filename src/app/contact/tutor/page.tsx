import BlogNavButtons from '../../components/BlogNavButtons';
import CTASection from '../../components/CTASection';
import Image from 'next/image';

export const metadata = {
  title: '家庭教師お問い合わせ',
};

export default function TutorContactPage() {
  return (
    <div className="max-w-screen-lg mx-auto px-4 sm:px-6 md:px-10 py-8 space-y-4">
      <BlogNavButtons />
      <h1 className="text-2xl font-bold">家庭教師に関するお問い合わせ</h1>
      <p>IT家庭教師サービスについてのお問い合わせはこちらから。</p>
      <ul className="space-y-2">
        <li>
          <a
            href="#"
            className="inline-flex items-center space-x-2 hover:text-primary"
          >
            <Image
              src="/images/LINEdevelop-200px.png"
              alt="LINE公式アカウント"
              width={24}
              height={24}
              className="w-6 h-6"
            />
            <span>LINE公式アカウント</span>
          </a>
        </li>
        <li>
          <a
            href="https://www.instagram.com/digitalgoosesupport/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 hover:text-primary"
          >
            <Image
              src="/images/instagram-200px.png"
              alt="Instagram"
              width={24}
              height={24}
              className="w-6 h-6"
            />
            <span>Digi Goose 公式アカウント</span>
          </a>
        </li>
      </ul>
      <CTASection
        href="mailto:contact@freehackapp.com"
        label="\uD83D\uDCE9 体験や料金のご相談はこちら"
        title=""
      />
    </div>
  );
}

