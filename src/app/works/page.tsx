import BlogNavButtons from '../components/BlogNavButtons';

export default function Works() {
  return (
    <div>
      <BlogNavButtons />
      <h1 className="text-2xl font-bold mb-4">Work</h1>
      <p>制作実績を紹介します。</p>
      <p className="mt-4">
        ご依頼はこちらまで。WEB制作やデザイン作成など、お気軽にご相談ください：
        contact＊freehackapp.com
        <br />
        <span className="text-sm text-gray-500">
          ※メール送信の際は＊を@に置き換えてください
        </span>
      </p>
    </div>
  );
}
