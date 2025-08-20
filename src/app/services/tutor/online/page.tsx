import React from 'react';

export const metadata = {
  title: 'オンラインお手軽コース',
};

export default function OnlineCoursePage() {
  return (
    <div className="space-y-4 p-4">
      <h1 className="text-2xl font-bold">💻 オンラインお手軽コース</h1>
      <ul className="list-disc pl-5 space-y-2">
        <li>💬 チャットで質問し放題</li>
        <li>毎日 9:00〜22:00 まで受付中！</li>
        <li>どんな小さな疑問でもお気軽にどうぞ。</li>
        <li>今ホットなトレンドの配信もあるよ！</li>
        <li>YouTube動画、TikTok動画でも、配信中</li>
        <li>当日中に回答</li>
        <li>噛み砕いた解説で何度でも質問OK</li>
      </ul>
    </div>
  );
}

