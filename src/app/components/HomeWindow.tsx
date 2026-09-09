import Link from 'next/link';
import { ComponentProps, ReactNode } from 'react';
import { Post } from '@/lib/posts';
import { siteConfig } from '@/config/site';
import CTASection from './CTASection';
import HomePostCard from './HomePostCard';

const selectedWorks = [
  {
    number: '01',
    field: 'WEB / PRODUCT DESIGN',
    title: '目的に即した導線設計。',
    summary: '相談から公開まで続く、実務の流れを壊さない形で体験を設計しました。',
    contribution: ['企画', '情報設計', 'デザイン', '開発'],
  },
  {
    number: '02',
    field: 'SERVICE EXPERIENCE',
    title: '価値を、ひと目で伝える構成。',
    summary: '情報の優先順位を整え、見た人が次の行動に進みやすい掲載順を設計します。',
    contribution: ['要件整理', '編集方針', 'コンテンツ設計', '改善提案'],
  },
  {
    number: '03',
    field: 'AI / AUTOMATION',
    title: '作業の反復を、再利用可能な仕組みに。',
    summary: '個別対応を残しつつ、運用・更新の再現性を高める接続部を組み込みます。',
    contribution: ['要件整理', '技術選定', '試験実装', '運用設計'],
  },
];

const capabilities = [
  ['01', 'Direction', '目的、受け手、運用条件を定義して設計へ落とします。'],
  ['02', 'Composition', '情報の重さを整えて、迷わない導線にします。'],
  ['03', 'Production', 'Webと業務設計を接続し、実装で成立する体験を作ります。'],
  ['04', 'Care', '公開後の更新が続くよう、編集観点も同時に設計します。'],
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
            <p className="portfolio-hero-index">PORTFOLIO<br />ARCHIVE</p>
            <div>
              <h1 id="home-heading">
                考える。<br />
                描く。<br />
                <span>届ける。</span>
              </h1>
              <p className="home-lead">
                作品と知見が積み上がる場として、制作実績と Journal を同じ文脈で見える化しています。
              </p>
              <div className="home-actions">
                <Link href="#selected-works" className="home-primary-button">
                  制作実績を見る <span aria-hidden="true">↓</span>
                </Link>
                <Link href="/blog" className="home-text-link">
                  Journalを読む <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="portfolio-hero-note">
            <span>Digital Craft</span>
            <span>Project Framing</span>
            <span>Editorial Thinking</span>
            <span>Long-term Care</span>
          </div>
        </section>
      )}

      <section id="selected-works" className="portfolio-section" aria-labelledby="works-heading">
        <div className="portfolio-section-label">
          <p>SELECTED WORK</p>
          <span>01 — 03</span>
        </div>
        <div className="portfolio-section-title">
          <h2 id="works-heading">
            役割を寄せるのではなく、<br />
            意図を揃えて制作します。
          </h2>
          <p>制作実績を読み解く順番を、見る人が自然に追える導線で設計しています。</p>
        </div>
        <div className="portfolio-work-list">
          {selectedWorks.map((work) => (
            <article key={work.number} className="portfolio-work">
              <div className="portfolio-work-number">{work.number}</div>
              <div className="portfolio-work-body">
                <p>{work.field}</p>
                <h3>{work.title}</h3>
                <span>{work.summary}</span>
                <ul>{work.contribution.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
              <span className="portfolio-work-arrow" aria-hidden="true">↗</span>
            </article>
          ))}
        </div>
        <Link href="/works" className="home-inline-link">
          制作実績の詳細ページへ <span aria-hidden="true">→</span>
        </Link>
      </section>

      <section className="portfolio-about" aria-labelledby="about-heading">
        <div className="portfolio-section-label">
          <p>ABOUT</p>
          <span>PORTFOLIO CURATOR</span>
        </div>
        <div className="portfolio-about-grid">
          <h2 id="about-heading">
            作品の意図を明確にし、<br />
            伝わるかたちへ接続します。
          </h2>
          <div>
            <p>Web、デザイン、AI活用を横断し、実案件の中で価値が増える導線を作ることを重視しています。</p>
            <p>「必要な人に、必要なタイミングで、必要な情報が届く」状態を目標に運用設計まで見据えています。</p>
            <Link href="/about">
              プロフィールを見る <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="portfolio-section" aria-labelledby="capabilities-heading">
        <div className="portfolio-section-label">
          <p>WORKFLOW</p>
          <span>01 — 04</span>
        </div>
        <div className="portfolio-capabilities">
          <h2 id="capabilities-heading">やること</h2>
          <ol>
            {capabilities.map(([number, title, description]) => (
              <li key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="portfolio-section" aria-labelledby="posts-heading">
        <div className="portfolio-section-label">
          <p>JOURNAL</p>
          <Link href="/blog">ALL POSTS →</Link>
        </div>
        <div className="portfolio-section-title">
          <h2 id="posts-heading">
            思考の断片を、<br />
            実務の言葉に変える。
          </h2>
        </div>
        {latestPosts.length > 0 ? (
          <ul className="home-post-grid">
            {latestPosts.map((post) => (
              <li key={post.slug}>
                <HomePostCard post={post} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="home-empty-posts">
            <span>準備中</span>
            <p>記事は編集と見せ方を整え中です。</p>
          </div>
        )}
      </section>

      {ctaProps ? (
        <CTASection {...ctaProps} />
      ) : (
        <section className="portfolio-contact" aria-labelledby="cta-heading">
          <p>LET&apos;S WORK TOGETHER</p>
          <h2 id="cta-heading">
            見ることで、<br />
            想像が進む。
          </h2>
          <div>
            <span>作品ページの見せ方や構成の整理について、まずは小さく相談してください。</span>
            <Link href={siteConfig.contact.general}>コンタクトを取る <span aria-hidden="true">↗</span></Link>
          </div>
        </section>
      )}
    </div>
  );
}
