import Link from 'next/link';
import React from 'react';

export const metadata = {
  title: '個別塾プラン',
};

export default function SchoolPlanPage() {
  return (
    <div className="space-y-4 p-4">
      <h1 className="text-2xl font-bold">個別塾プラン</h1>
      <p>
        集中できる学習スペースで、講師とマンツーマンで学べるスタンダードなプランです。
        友達と一緒に参加することもでき、互いに刺激し合いながら理解を深められます。
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li>レンタル会議室で月2回 × 3h</li>
        <li>集中できる学習環境</li>
        <li>進度に合わせたカリキュラム</li>
        <li>最新の教材や機器を使った実践的なレッスン</li>
        <li>面談を通じて学習状況を定期的にフィードバック</li>
      </ul>
      <p>
        教室ならではの緊張感と達成感を味わいながら、効率よくスキルアップを目指しましょう。
      </p>
      <Link href="/" className="inline-block px-4 py-2 bg-primary text-white rounded">
        ホームに戻る
      </Link>
    </div>
  );
}

