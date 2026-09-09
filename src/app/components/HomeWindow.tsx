import Image from 'next/image';
import Link from 'next/link';
import { Post } from '@/lib/posts';
import { siteAssets, siteConfig } from '@/config/site';
import HomePostCard from './HomePostCard';
import CTASection from './CTASection';
import { ComponentProps, ReactNode } from 'react';

const services = [
  { number: '01', title: 'Web制作・改善', description: '目的と更新方法を整理し、運用を続けられるWebサイトを設計・制作します。', image: siteAssets.service.web },
  { number: '02', title: '業務改善・AI活用', description: '日々の手作業を見直し、小さく試せる自動化から導入を支援します。', image: siteAssets.service.automation },
  { number: '03', title: 'IT導入・伴走支援', description: 'ツール選定、初期設定、操作説明まで、現場に合わせて伴走します。', image: siteAssets.service.support },
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
    <div className="home-shell">
      {hero ?? <section className="home-hero" aria-labelledby="home-heading">
        <div className="home-hero-copy">
          <p className="home-eyebrow">DESIGN · DEVELOP · SUPPORT</p>
          <h1 id="home-heading">事業の「わからない」を、<br /><span>動く仕組み</span>に変える。</h1>
          <p className="home-lead">小さな事業のWeb制作、業務改善、AI活用を、相談から運用まで一人の担当者が支援します。</p>
          <div className="home-actions">
            <Link href={siteConfig.contact.business} className="home-primary-button">相談内容を送る <span aria-hidden="true">↗</span></Link>
            <Link href="/services" className="home-text-link">支援内容を見る <span aria-hidden="true">→</span></Link>
          </div>
        </div>
        <div className="home-hero-panel" aria-label="支援の進め方">
          <p className="home-panel-label">ONE STOP SUPPORT</p>
          <ol>
            <li><span>01</span><strong>相談する</strong><small>課題と現在地を整理</small></li>
            <li><span>02</span><strong>小さく作る</strong><small>必要な範囲から着手</small></li>
            <li><span>03</span><strong>育てる</strong><small>運用しながら改善</small></li>
          </ol>
        </div>
      </section>}

      <section className="home-section" aria-labelledby="services-heading">
        <div className="home-section-heading">
          <p>WHAT I DO</p>
          <h2 id="services-heading">必要なところから、ちょうどよく。</h2>
          <span>作ること自体ではなく、仕事が前へ進む状態をゴールにします。</span>
        </div>
        <div className="home-service-grid">
          {services.map((service) => (
            <article key={service.number} className="home-service-card">
              <div className="home-service-image"><Image src={service.image} alt="" width={320} height={200} /></div>
              <p>{service.number}</p><h3>{service.title}</h3><span>{service.description}</span>
            </article>
          ))}
        </div>
        <Link href="/pricing/business" className="home-inline-link">法人向け料金の目安を見る <span aria-hidden="true">→</span></Link>
      </section>

      <section className="home-proof" aria-labelledby="approach-heading">
        <div><p className="home-eyebrow">HOW I WORK</p><h2 id="approach-heading">窓口をひとつに、<br />判断を速く。</h2></div>
        <div className="home-proof-copy">
          <p>企画、デザイン、実装、運用支援を分断せずに進めます。専門用語を並べるのではなく、選択肢と理由を共有しながら、次に取る行動を明確にします。</p>
          <Link href="/about">Digi Gooseについて <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="home-section" aria-labelledby="posts-heading">
        <div className="home-section-heading home-section-heading-row">
          <div><p>JOURNAL</p><h2 id="posts-heading">実務に役立つメモ</h2></div>
          <Link href="/blog">すべての記事 <span aria-hidden="true">→</span></Link>
        </div>
        {latestPosts.length > 0 ? (
          <ul className="home-post-grid">{latestPosts.map((post) => <li key={post.slug}><HomePostCard post={post} /></li>)}</ul>
        ) : (
          <div className="home-empty-posts"><span>準備中</span><p>記事は現在、内容を見直しています。公開までしばらくお待ちください。</p></div>
        )}
      </section>

      {ctaProps ? <CTASection {...ctaProps} /> : <section className="home-cta" aria-labelledby="cta-heading">
        <p>CONTACT</p><h2 id="cta-heading">まだ言葉になっていない相談でも大丈夫です。</h2>
        <span>状況を伺い、必要なことと、今はしなくてよいことを一緒に整理します。</span>
        <Link href={siteConfig.contact.business}>相談してみる <span aria-hidden="true">↗</span></Link>
      </section>}
    </div>
  );
}
