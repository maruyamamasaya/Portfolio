import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CSSProperties } from 'react';
import markdownToHtml from '@/lib/markdownToHtml';
import {
  getWork,
  getWorkPublicationDate,
  getWorkPublicationState,
  getSortedWorks,
} from '@/lib/works';
import SectionEnvironment from '@/app/components/visual/SectionEnvironment';
import ProjectVisualSurface from '@/app/components/visual/ProjectVisualSurface';

export async function generateStaticParams() {
  const works = await getSortedWorks();
  return works.map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const work = await getWork(params.slug);
    return {
      title: work.title,
      description: work.summary,
      openGraph: {
        title: work.title,
        description: work.summary,
        type: 'article',
        images: work.image ? [work.image] : undefined,
      },
      twitter: {
        card: 'summary_large_image',
      },
    };
  } catch {
    return {
      title: 'Not Found',
    };
  }
}

export default async function WorkPage({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const allWorks = await getSortedWorks();
    const work = await getWork(params.slug);
    const { html } = await markdownToHtml(work.content);

    return (
      <SectionEnvironment as="div" space="works" className="portfolio-work-page">
        <ProjectVisualSurface
          className="vfx-project-field"
          color={{
            accentColor: work.accentColor ?? '#88b0ff',
            secondaryColor: work.secondaryColor,
            glowColor: work.glowColor,
          }}
          style={{
            '--project-accent': work.accentColor ?? 'var(--vfx-project-accent)',
            '--project-accent-2': work.secondaryColor ?? 'var(--vfx-project-secondary)',
            '--project-glow': work.glowColor ?? 'var(--vfx-project-glow)',
          } as CSSProperties}
        >
      <article className="portfolio-glass max-w-3xl mx-auto px-4 sm:px-6 md:px-10 py-10 vfx-project-card">
        <Link href="/works" className="text-sm text-slate-500 border-b border-current">
          ← 制作実績へ戻る
        </Link>

        <p className="mt-4 text-xs uppercase tracking-[0.2em] text-slate-500">
          Portfolio Works
        </p>
        <h1 className="text-3xl font-semibold mt-2">{work.title}</h1>
        <p className="mt-2 text-sm text-slate-500">
          {`公開日: ${getWorkPublicationDate(work) || '—'}`}
          {work.category ? ` / ${work.category}` : ''}
          {(() => {
            const state = getWorkPublicationState(work);
            if (state === 'scheduled') return ' / 公開予定';
            if (state === 'draft') return ' / 下書き';
            return '';
          })()}
        </p>
        <div className="mt-2">
          <Link
            href={`/developer_edit?target=works&file=${encodeURIComponent(`${work.slug}.md`)}`}
            className="text-sm border-b border-current"
          >
            管理画面で編集
          </Link>
        </div>

        {work.tags?.length ? (
          <ul className="mt-3 flex flex-wrap gap-2">
            {work.tags.map((tag) => (
              <li
                key={tag}
                className="text-xs rounded-full border border-slate-300 dark:border-slate-700 px-3 py-1 text-slate-600 dark:text-slate-300"
              >
                {tag}
              </li>
            ))}
          </ul>
        ) : null}

        <div
          className="mt-6 prose prose-light dark:prose-dark"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <div className="mt-10 border-t pt-6">
          <h2 className="text-sm uppercase tracking-[0.15em] text-slate-500 mb-3">
            他の制作実績
          </h2>
          <ul className="space-y-2 text-sm">
            {allWorks
              .filter((item) => item.slug !== work.slug)
              .slice(0, 6)
              .map((item) => (
                <li key={item.slug} className="space-y-1">
                  <div className="flex items-center justify-between gap-3">
                    <Link href={`/works/${item.slug}`} className="border-b border-current">
                      {item.title}
                    </Link>
                    <Link
                      href={`/developer_edit?target=works&file=${encodeURIComponent(
                        `${item.slug}.md`,
                      )}`}
                      className="text-xs border-b border-current shrink-0"
                    >
                      編集
                    </Link>
                  </div>
                  <p className="text-xs text-slate-500">
                    {(() => {
                      const state = getWorkPublicationState(item);
                      if (state === 'scheduled') return '公開予定';
                      if (state === 'draft') return '下書き';
                      return '公開中';
                    })()}
                    {` / ${item.category ?? ''}`}
                    {item.publishedAt || item.date ? ` / ${item.publishedAt || item.date}` : ''}
                  </p>
                </li>
              ))}
          </ul>
        </div>
      </article>
        </ProjectVisualSurface>
      </SectionEnvironment>
    );
  } catch {
    notFound();
  }
}
