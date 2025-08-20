import Link from 'next/link';

export const metadata = {
  title: 'お問い合わせ完了',
};

export default function ContactCompletePage() {
  return (
    <div className="max-w-screen-lg mx-auto px-4 sm:px-6 md:px-10 py-8 space-y-4 text-center">
      <h1 className="text-2xl font-bold">送信が完了しました</h1>
      <p>お問い合わせありがとうございます。確認次第ご連絡いたします。</p>
      <Link
        href="/"
        className="inline-block px-4 py-2 bg-primary text-white rounded"
      >
        ホームに戻る
      </Link>
    </div>
  );
}
