import Link from 'next/link';
import { notFound } from 'next/navigation';
import markdownToHtml from '@/lib/markdownToHtml';
import { getWork, getSortedWorks } from '@/lib/works';

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
      <article className="max-w-3xl mx-auto px-4 sm:px-6 md:px-10 py-10">
        <Link href="/works" className="text-sm text-slate-500 border-b border-current">
          ← 制作実績へ戻る
        </Link>

        <p className="mt-4 text-xs uppercase tracking-[0.2em] text-slate-500">
          Portfolio Works
        </p>
        <h1 className="text-3xl font-semibold mt-2">{work.title}</h1>
        <p className="mt-2 text-sm text-slate-500">
          {work.publishedAt || work.date ? `${work.publishedAt || work.date}` : ''} {work.category ? ` / ${work.category}` : ''}
        </p>

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
                <li key={item.slug}>
                  <Link href={`/works/${item.slug}`} className="border-b border-current">
                    {item.title}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </article>
    );
  } catch {
    notFound();
  }
}
