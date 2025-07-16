import BlogNavButtons from '../components/BlogNavButtons';

export default function Contact() {
  return (
    <div>
      <BlogNavButtons />
      <h1 className="text-2xl font-bold mb-4">Contact</h1>
      <p>お問い合わせはメールでお願いします。</p>
      <p>
        <a href="mailto:contact@freehackapp.com" className="text-blue-600 hover:underline">
          contact@freehackapp.com
        </a>
      </p>
    </div>
  );
}
