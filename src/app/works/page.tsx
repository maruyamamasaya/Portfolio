import Link from 'next/link';
import Image from 'next/image';
import { getSortedWorks, getWorkPublicationState, getWorkPublicationDate } from '@/lib/works';
import Card from '../components/Card';

export default async function Works() {
  const works = await getSortedWorks();

  return (
    <div className="portfolio-work-page max-w-5xl mx-auto px-4 sm:px-6 md:px-10 py-10">
      <header className="mb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Portfolio Works</p>
        <h1 className="text-3xl font-semibold tracking-tight mt-2">制作実績</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
          依頼の背景と解決の経路を、作品として見える化しました。  
          まずはこの一覧で方向性をご確認ください。
        </p>
      </header>

      <section className="grid gap-5 sm:grid-cols-2">
        {works.map((work) => (
          <Card key={work.slug} className="space-y-3">
            <Link href={`/works/${work.slug}`} className="block">
            {(() => {
              const image = work.image ?? '/images/img1.svg';
              const alt = work.alt ?? `${work.title}のバナー`;
              return (
                <Image
                  src={image}
                  alt={alt}
                  width={720}
                  height={450}
                  className="w-full h-auto rounded-lg object-cover"
                />
              );
            })()}
            </Link>
            <div className="flex items-center flex-wrap gap-2">
              <span className="text-xs uppercase tracking-[0.15em] text-slate-500">
                {getWorkPublicationDate(work) || '—'}
              </span>
              <span
                className={`text-xs rounded-full px-2 py-0.5 ${
                  getWorkPublicationState(work) === 'published'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-amber-100 text-amber-700'
                }`}
              >
                {(() => {
                  const state = getWorkPublicationState(work);
                  if (state === 'draft') return '下書き';
                  if (state === 'scheduled') return '予約';
                  return '公開';
                })()}
              </span>
            </div>
            <Link href={`/works/${work.slug}`} className="text-xl font-semibold leading-tight">
              {work.title}
            </Link>
            <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
              {work.summary}
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {work.tags?.map((tag) => (
                <span
                  key={tag}
                  className="text-xs rounded-full border border-slate-300 dark:border-slate-700 px-3 py-1 text-slate-600 dark:text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Card>
        ))}
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
    </div>
  );
}
