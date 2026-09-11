import Link from 'next/link';
import Image from 'next/image';
import { CSSProperties } from 'react';
import { getSortedWorks, getWorkPublicationState, getWorkPublicationDate } from '@/lib/works';
import Card from '../components/Card';
import ScrollFadeIn from '../components/ScrollFadeIn';
import SectionEnvironment from '../components/visual/SectionEnvironment';

export default async function Works() {
  const works = await getSortedWorks();

  return (
    <SectionEnvironment as="div" space="works" className="portfolio-work-page">
      <header className="mb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Portfolio Works</p>
        <h1 className="mt-2 text-4xl sm:text-5xl">制作実績</h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-slate-500">
          依頼の背景と解決の経路を、作品として見える化しました。  
          まずはこの一覧で方向性をご確認ください。
        </p>
      </header>

      <section className="portfolio-list-spacious">
        {works.map((work) => {
          const state = getWorkPublicationState(work);
          const stateLabel =
            state === 'draft'
              ? '非公開（下書き）'
              : state === 'scheduled'
                ? '公開予定'
                : '公開中';
          const stateClass = 'state-badge';
          const badgeStyle =
            state === 'published'
              ? ({
                  color: '#bbf7d0',
                  borderColor: 'rgba(74, 222, 128, 0.55)',
                  backgroundColor: 'rgba(22, 101, 52, 0.22)',
                } as CSSProperties)
              : ({
                  color: '#fde68a',
                  borderColor: 'rgba(251, 191, 36, 0.48)',
                  backgroundColor: 'rgba(120, 53, 15, 0.2)',
                } as CSSProperties);

          const projectStyle = {
            '--project-accent': work.accentColor ?? 'var(--vfx-project-accent)',
            '--project-accent-2': work.secondaryColor ?? 'var(--vfx-project-secondary)',
            '--project-glow': work.glowColor ?? 'var(--vfx-project-glow)',
          } satisfies Partial<Record<string, string>> as CSSProperties;

          return (
            <ScrollFadeIn key={work.slug} as="article" delay={80} className="vfx-ripple-target">
              <Card
                className="portfolio-glass group p-0 overflow-hidden space-y-4 vfx-project-card"
                style={projectStyle}
                data-ripple="true"
              >
                <Link href={`/works/${work.slug}`} className="block">
                  {(() => {
                    const image = work.image ?? '/images/img1.svg';
                    const alt = work.alt ?? `${work.title}のバナー`;
                    return (
                      <Image
                        src={image}
                        alt={alt}
                        width={900}
                        height={560}
                        className="w-full h-auto rounded-[1.4rem] object-cover"
                      />
                    );
                  })()}
                </Link>
                <div className="space-y-3 px-4 pb-4">
                  <div className="flex items-center flex-wrap gap-2 pt-2">
                    <span className="text-xs uppercase tracking-[0.15em] text-slate-200/90">
                      公開日：{getWorkPublicationDate(work) || '—'}
                    </span>
                    <span className={stateClass} style={badgeStyle}>
                      {stateLabel}
                    </span>
                  </div>
                  <Link
                    href={`/works/${work.slug}`}
                    className="text-xl sm:text-2xl font-semibold leading-tight text-white vfx-trigger"
                  >
                    {work.title}
                  </Link>
                  <p className="text-sm sm:text-base leading-8 text-slate-300">
                    {work.summary}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {work.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="lux-chip"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </ScrollFadeIn>
          );
        })}
      </section>

      <section className="mt-12">
        <Card className="space-y-4">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">More</p>
          <h2 className="text-2xl font-semibold">過去の制作と、これから進める作品</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            実制作だけでなく、Journal と連動して更新内容を蓄積できる構成を次のフェーズで整えます。
          </p>
          <div className="flex gap-4">
            <Link href="/blog" className="text-sm border-b border-current">
              Journalを見る
            </Link>
            <Link href="/about" className="text-sm border-b border-current">
              プロフィールを見る
            </Link>
            <Link href="/contact" className="text-sm border-b border-current">
              お問い合わせ
            </Link>
          </div>
        </Card>
      </section>
    </SectionEnvironment>
  );
}
