import Link from 'next/link';
import React from 'react';

export const metadata = {
  title: '家庭訪問プラン',
};

export default function HomePlanPage() {
  return (
    <div className="space-y-4 p-4">
      <h1 className="text-2xl font-bold">🏠 家庭訪問プラン</h1>
      <p>
        講師がご自宅に伺い、学習環境を整えながら丁寧にサポートするプランです。
        小さなお子さまでも安心して受講でき、保護者の方との連携もスムーズに行えます。
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li>月4回 × 3h、東京都内どこでも訪問</li>
        <li>宿題や課題も一緒に解決</li>
        <li>PCや教材を直接使って理解を深める</li>
        <li>ご家庭のペースに合わせた柔軟なカリキュラム</li>
        <li>対面ならではのコミュニケーションで安心感アップ</li>
      </ul>
      <p>
        ご自宅で落ち着いて学べるため、移動の負担もありません。学習状況に合わせたフィードバックで、確かな成長を実感できます。
      </p>
      <Link href="/" className="inline-block px-4 py-2 bg-primary text-white rounded">
        ホームに戻る
      </Link>
    </div>
  );
}

