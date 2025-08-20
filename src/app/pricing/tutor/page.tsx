import Image from 'next/image';
import { Fragment } from 'react';
import ArrowIcon from '@/app/components/ArrowIcon';

export const metadata = {
  title: '家庭教師料金表',
};

export default function TutorPricingPage() {
  const flowSteps = [
    {
      src: '/images/flow0tutor01.png',
      alt: 'オンラインで簡単ヒアリング',
      title: 'オンラインで簡単ヒアリング',
      description:
        '学びたいことや目標を気軽にお話しください。（ビデオ通話・お電話どちらもOK）',
    },
    {
      src: '/images/flow0tutor02.png',
      alt: 'あなただけの学習カルテ作成',
      title: 'あなただけの学習カルテ作成',
      description:
        'スキルや目的に合わせたオリジナルの学習プランをご提案します。',
    },
    {
      src: '/images/flow0tutor03.png',
      alt: '無料体験授業',
      title: '無料体験授業',
      description: '実際に授業を受けて、学びやすさを体感してください。',
    },
    {
      src: '/images/flow0tutor04.png',
      alt: '継続受講へ',
      title: '継続受講へ',
      description:
        '体験後にご興味を持っていただければ、そのまま継続して学んでいただけます。',
    },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-10 py-8 space-y-8">
      <h1 className="text-3xl font-bold mb-6">家庭教師料金表</h1>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">コース紹介（プラン比較表）</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 dark:border-gray-600 text-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-left">
                  プラン
                </th>
                <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-left">
                  料金（月額）
                </th>
                <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-left">
                  内容
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 dark:border-gray-600 px-2 py-1 font-medium">
                  💻 オンラインお手軽コース
                </td>
                <td className="border border-gray-300 dark:border-gray-600 px-2 py-1">
                  月額5,000円
                </td>
                <td className="border border-gray-300 dark:border-gray-600 px-2 py-1">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>💬 チャットで質問し放題</li>
                    <li>毎日 9:00〜22:00 まで受付中！</li>
                    <li>どんな小さな疑問でもお気軽にどうぞ。</li>
                    <li>今ホットなトレンドの配信もあるよ！</li>
                    <li>YouTube動画、TikTok動画でも、配信中</li>
                    <li>当日中に回答</li>
                    <li>噛み砕いた解説で何度でも質問OK</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-600 px-2 py-1 font-medium">
                  🏠 家庭訪問プラン
                </td>
                <td className="border border-gray-300 dark:border-gray-600 px-2 py-1">
                  月額25,000円
                </td>
                <td className="border border-gray-300 dark:border-gray-600 px-2 py-1">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>月4回 × 3h、東京都内どこでも訪問</li>
                    <li>宿題や課題も一緒に解決</li>
                    <li>PCや教材を直接使って理解を深める</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-600 px-2 py-1 font-medium">
                  🏢 個別塾プラン
                </td>
                <td className="border border-gray-300 dark:border-gray-600 px-2 py-1">
                  月額20,000円〜
                </td>
                <td className="border border-gray-300 dark:border-gray-600 px-2 py-1">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>レンタル会議室で月2回 × 3h</li>
                    <li>集中できる学習環境</li>
                    <li>進度に合わせたカリキュラム</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">受講までの流れ</h2>
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-4 md:overflow-x-auto md:pb-4 md:snap-x md:snap-mandatory">
          {flowSteps.map((step, idx) => (
            <Fragment key={idx}>
                <div className="w-full max-w-md p-6 bg-white dark:bg-gray-700 rounded shadow flex-shrink-0 md:w-80 md:snap-start">
                <Image
                  src={step.src}
                  alt={step.alt}
                  width={480}
                  height={320}
                  className="w-full h-auto rounded"
                />
                <h3 className="mt-2 font-medium">{step.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {step.description}
                </p>
              </div>
              {idx < flowSteps.length - 1 && (
                <div className="md:flex-shrink-0 flex flex-col items-center">
                  <ArrowIcon
                    color="gray"
                    className="hidden md:block"
                    alt="arrow"
                  />
                  <ArrowIcon
                    color="gray"
                    className="md:hidden rotate-90"
                    alt="arrow"
                  />
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </section>
    </div>
  );
}

