import BlogNavButtons from '../components/BlogNavButtons';

export default function Works() {
  return (
    <div>
      <BlogNavButtons />
      <h1 className="text-2xl font-bold mb-4">Work</h1>
      <p>制作実績を紹介します。</p>
      <p className="mt-4">
        ご依頼はこちらまで。WEB制作やデザイン作成など、お気軽にご相談ください：
        <a href="mailto:contact@freehackapp.com" className="text-blue-600 hover:underline">
          contact@freehackapp.com
        </a>
      </p>
    </div>
  );
}
