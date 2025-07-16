import BlogNavButtons from '../components/BlogNavButtons';

export default function Contact() {
  return (
    <div>
      <BlogNavButtons />
      <h1 className="text-2xl font-bold mb-4">Contact</h1>
      <p>お問い合わせはメールでお願いします。</p>
      <p>
        contact＊freehackapp.com
        <br />
        <span className="text-sm text-gray-500">
          ※メール送信の際は＊を@に置き換えてください
        </span>
      </p>
    </div>
  );
}
