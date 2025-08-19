import Link from 'next/link';

export const metadata = {
  title: '送信完了',
};

export default function ContactThanksPage() {
  return (
    <div className="max-w-screen-lg mx-auto px-4 sm:px-6 md:px-10 py-8 space-y-4 text-center">
      <h1 className="text-2xl font-bold">送信完了</h1>
      <p>フォーム送信ありがとうございました。</p>
      <Link href="/" className="inline-block px-4 py-2 bg-primary text-white rounded">
        TOPに戻る
      </Link>
    </div>
  );
}
