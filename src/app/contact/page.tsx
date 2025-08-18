import BlogNavButtons from '../components/BlogNavButtons';
import Image from 'next/image';
import Link from 'next/link';

export default function Contact() {
  return (
    <div className="max-w-screen-lg mx-auto px-4 sm:px-6 md:px-10 py-8 space-y-4">
      <BlogNavButtons />
      <h1 className="text-2xl font-bold">Contact</h1>
      <p>お問い合わせ内容に応じて以下よりお選びください。</p>
      <ul className="space-y-2">
        <li>
          <Link
            href="/contact/business"
            className="inline-flex items-center space-x-2 hover:text-primary"
          >
            <Image
              src="/images/LINEdevelop-200px.png"
              alt="LINE公式アカウント"
              width={24}
              height={24}
              className="w-6 h-6"
            />
            <span>法人向けお問い合わせ</span>
          </Link>
        </li>
        <li>
          <Link
            href="/contact/tutor"
            className="inline-flex items-center space-x-2 hover:text-primary"
          >
            <Image
              src="/images/instagram-200px.png"
              alt="Instagram"
              width={24}
              height={24}
              className="w-6 h-6"
            />
            <span>家庭教師に関するお問い合わせ</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
