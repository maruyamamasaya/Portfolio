import React from 'react';

export const metadata = {
  title: '個別塾プラン',
};

export default function SchoolPlanPage() {
  return (
    <div className="space-y-4 p-4">
      <h1 className="text-2xl font-bold">個別塾プラン</h1>
      <ul className="list-disc pl-5 space-y-2">
        <li>レンタル会議室で月2回 × 3h</li>
        <li>集中できる学習環境</li>
        <li>進度に合わせたカリキュラム</li>
      </ul>
    </div>
  );
}

