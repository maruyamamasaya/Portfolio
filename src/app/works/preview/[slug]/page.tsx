import Link from 'next/link';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import markdownToHtml from '@/lib/markdownToHtml';
import {
  getWork,
  getWorkPublicationDate,
  getWorkPublicationState,
  WorkVisibilityOptions,
} from '@/lib/works';

export default async function WorkPreviewPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { secret?: string };
}) {
  const previewSecret =
    process.env.WORKS_PREVIEW_SECRET || process.env.REVALIDATE_SECRET || '';
  const authorization = headers().get('authorization');
  const username = process.env.BASIC_AUTH_USERNAME ?? '';
  const password = process.env.BASIC_AUTH_PASSWORD ?? '';
  const isBasicAuthed = (() => {
    if (!authorization) return false;
    const authValue = authorization.split(' ')[1];
    const [user, pwd] = atob(authValue).split(':');
    return user === username && pwd === password;
  })();

  if (!isBasicAuthed && (!previewSecret || searchParams.secret !== previewSecret)) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-10 py-16 text-center">
        <p className="text-sm text-slate-500">Unauthorized</p>
        <p className="text-sm">プレビュー権限が確認できませんでした。</p>
      </div>
    );
  }

  try {
    const options: WorkVisibilityOptions = {
      includeDraft: true,
      includeScheduled: true,
    };
    const work = await getWork(params.slug, options);
    const state = getWorkPublicationState(work);
    const dateLabel = getWorkPublicationDate(work) || '—';
    const { html } = await markdownToHtml(work.content);

    return (
      <article className="max-w-3xl mx-auto px-4 sm:px-6 md:px-10 py-10">
        <p className="text-xs uppercase tracking-[0.2em] text-amber-600">
          Works Preview
        </p>
        <h1 className="text-3xl font-semibold mt-2">{work.title}</h1>
        <p className="mt-2 text-sm text-slate-500">
          {dateLabel}
          {work.category ? ` / ${work.category}` : ''}
        </p>

        <p className="mt-2 text-sm text-amber-700">
          現在の状態:{' '}
          {state === 'draft' ? '下書き' : state === 'scheduled' ? '予約' : '公開'}
        </p>

        <div
          className="mt-6 prose prose-light dark:prose-dark"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <div className="mt-10 border-t pt-6">
          <Link href="/developer_edit" className="border-b border-current">
            エディターへ戻る
          </Link>
        </div>
      </article>
    );
  } catch {
    notFound();
  }
}
