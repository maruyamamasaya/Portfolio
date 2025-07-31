

import BlogNavButtons from '../components/BlogNavButtons';
import ScrollFadeIn from '../components/ScrollFadeIn';
import CTASection from '../components/CTASection';
import ToolsGrid from '../components/ToolsGrid';
import SkillsGrid from '../components/SkillsGrid';

export const metadata = {
  title: 'About',
};

export default function About() {
  return (
    <ScrollFadeIn className="max-w-screen-md mx-auto px-4 sm:px-6 md:px-8 py-8 space-y-8">
      <BlogNavButtons />
      <h1 className="text-3xl font-extrabold mb-6">プロフィール</h1>

      {/* プロフィール */}
      <section className="space-y-4 text-base leading-relaxed">
        <p>
          このサイトでは、エンジニアリングとクリエイティブの両面から学びになる情報
          を発信しています。Web 制作の知見やデザイン手法、マーケティングなど幅広い
          テーマを扱い、実践的なノウハウを共有することを目的としています。
        </p>
        <p>
          運営者は独立系エンジニアとしてシステム開発やサイト構築を行う傍ら、音楽や
          デザインといった創作活動にも取り組んでいます。制作事例やブログ記事を通じ
          て、学びの楽しさを伝えていきます。
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-bold">開発技術</h2>
        <ToolsGrid />
        <SkillsGrid />
      </section>

      <CTASection href="/contact" label="\u2709\uFE0F お問い合わせ" />
    </ScrollFadeIn>
  );
}
