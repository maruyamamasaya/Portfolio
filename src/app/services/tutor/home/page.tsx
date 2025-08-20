import React from 'react';

export const metadata = {
  title: '家庭訪問プラン',
};

export default function HomePlanPage() {
  return (
    <div className="space-y-4 p-4">
      <h1 className="text-2xl font-bold">🏠 家庭訪問プラン</h1>
      <ul className="list-disc pl-5 space-y-2">
        <li>月4回 × 3h、東京都内どこでも訪問</li>
        <li>宿題や課題も一緒に解決</li>
        <li>PCや教材を直接使って理解を深める</li>
      </ul>
    </div>
  );
}

