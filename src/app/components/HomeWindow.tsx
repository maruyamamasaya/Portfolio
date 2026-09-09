import Link from 'next/link';
import { ComponentProps, ReactNode } from 'react';
import { Post } from '@/lib/posts';
import { siteConfig } from '@/config/site';
import CTASection from './CTASection';
import HomePostCard from './HomePostCard';

const selectedWorks = [
  {
    number: '01',
    field: 'LINE / SYSTEM DESIGN',
    title: '店舗の接客導線を、LINEの中に。',
    summary: 'LINE公式アカウントの立ち上げから、予約・注文・問い合わせの導線設計、自動応答までを一貫して支援。',
    contribution: ['企画', '情報設計', 'UIデザイン', '開発・運用'],
  },
  {
    number: '02',
    field: 'WEB / BRAND COMMUNICATION',
    title: '伝えたい価値を、迷わず届くサイトへ。',
    summary: '小規模事業者のサービスを整理し、WebサイトやLPとして形にするところから、公開後の改善まで担当。',
    contribution: ['要件整理', 'Webデザイン', '実装', '改善提案'],
  },
  {
    number: '03',
    field: 'AI / BUSINESS AUTOMATION',
    title: '繰り返し作業を、続けられる仕組みに。',
    summary: 'ChatGPTやAWSを組み合わせ、問い合わせ対応やデータ処理など、現場に合わせた小さな自動化を設計。',
    contribution: ['業務整理', '技術選定', 'プロトタイプ', '導入支援'],
  },
];

const capabilities = [
  ['01', 'Direction', '目的、課題、運用条件を整理し、作るべきものの輪郭を決めます。'],
  ['02', 'Design', '情報設計から画面・ビジュアルまで、伝わり方を一貫して設計します。'],
  ['03', 'Development', 'Web、LINE、AI、クラウドを組み合わせ、実際に使える形へ実装します。'],
  ['04', 'Operation', '公開して終わらず、使い方の説明や運用改善まで継続して支援します。'],
];

type HomeWindowProps = {
  posts: Post[];
  hero?: ReactNode;
  ctaProps?: ComponentProps<typeof CTASection>;
  showITSchoolSection?: boolean;
};

export default function HomeWindow({ posts, hero, ctaProps }: HomeWindowProps) {
  const latestPosts = posts.slice(0, 3);

  return (
    <div className="home-shell portfolio-home">
      {hero ?? (
        <section className="portfolio-hero" aria-labelledby="home-heading">
          <div className="portfolio-hero-topline">
            <p>MASAYA MARUYAMA / DIGITAL CREATOR</p>
            <p>TOKYO · JAPAN</p>
          </div>
          <div className="portfolio-hero-main">
            <p className="portfolio-hero-index">PORTFOLIO<br />2026</p>
            <div>
              <h1 id="home-heading">考える。<br />つくる。<br /><span>使える形にする。</span></h1>
              <p className="home-lead">Web、デザイン、AI活用を横断し、事業のアイデアを運用できる仕組みまで一人で形にします。</p>
              <div className="home-actions">
                <Link href="#selected-works" className="home-primary-button">制作領域を見る <span aria-hidden="true">↓</span></Link>
                <Link href={siteConfig.contact.business} className="home-text-link">仕事について相談する <span aria-hidden="true">↗</span></Link>
              </div>
            </div>
          </div>
          <div className="portfolio-hero-note"><span>企画</span><span>デザイン</span><span>開発</span><span>運用</span></div>
        </section>
      )}

      <section id="selected-works" className="portfolio-section" aria-labelledby="works-heading">
        <div className="portfolio-section-label"><p>SELECTED WORK</p><span>01 — 03</span></div>
        <div className="portfolio-section-title">
          <h2 id="works-heading">領域をまたいで、<br />課題をひとつずつ解く。</h2>
          <p>担当範囲を限定せず、相談から実装、運用まで必要な役割をつなぎます。</p>
        </div>
        <div className="portfolio-work-list">
          {selectedWorks.map((work) => (
            <article key={work.number} className="portfolio-work">
              <div className="portfolio-work-number">{work.number}</div>
              <div className="portfolio-work-body">
                <p>{work.field}</p><h3>{work.title}</h3><span>{work.summary}</span>
                <ul>{work.contribution.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
              <span className="portfolio-work-arrow" aria-hidden="true">↗</span>
            </article>
          ))}
        </div>
        <Link href="/works" className="home-inline-link">制作実績のページへ <span aria-hidden="true">→</span></Link>
      </section>

      <section className="portfolio-about" aria-labelledby="about-heading">
        <div className="portfolio-section-label"><p>ABOUT</p><span>SOLO CREATOR</span></div>
        <div className="portfolio-about-grid">
          <h2 id="about-heading">企画から運用まで、<br />話が途切れないものづくり。</h2>
          <div>
            <p>システム開発の経験を土台に、Web制作、デザイン、業務改善、情報発信まで活動領域を広げてきました。</p>
            <p>技術だけ、見た目だけで考えず、「誰が、いつ、どう使うか」まで含めて設計することを大切にしています。</p>
            <Link href="/about">プロフィールと経歴を見る <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <section className="portfolio-section" aria-labelledby="capabilities-heading">
        <div className="portfolio-section-label"><p>CAPABILITIES</p><span>01 — 04</span></div>
        <div className="portfolio-capabilities">
          <h2 id="capabilities-heading">できること</h2>
          <ol>{capabilities.map(([number, title, description]) => <li key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></li>)}</ol>
        </div>
      </section>

      <section className="portfolio-section" aria-labelledby="posts-heading">
        <div className="portfolio-section-label"><p>JOURNAL</p><Link href="/blog">ALL POSTS →</Link></div>
        <div className="portfolio-section-title"><h2 id="posts-heading">考えたこと、<br />試したこと。</h2></div>
        {latestPosts.length > 0 ? (
          <ul className="home-post-grid">{latestPosts.map((post) => <li key={post.slug}><HomePostCard post={post} /></li>)}</ul>
        ) : (
          <div className="home-empty-posts"><span>準備中</span><p>記事は現在、内容を見直しています。公開までしばらくお待ちください。</p></div>
        )}
      </section>

      {ctaProps ? <CTASection {...ctaProps} /> : (
        <section className="portfolio-contact" aria-labelledby="cta-heading">
          <p>LET&apos;S WORK TOGETHER</p><h2 id="cta-heading">一緒に、次の形を<br />考えませんか。</h2>
          <div><span>まだ要件が決まっていない段階でも大丈夫です。</span><Link href={siteConfig.contact.business}>相談してみる <span aria-hidden="true">↗</span></Link></div>
        </section>
      )}
    </div>
  );
}
