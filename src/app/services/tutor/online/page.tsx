import Link from 'next/link';
import React from 'react';

export const metadata = {
  title: 'オンラインお手軽コース',
};

export default function OnlineCoursePage() {
  return (
    <div className="space-y-4 p-4">
      <h1 className="text-2xl font-bold">💻 オンラインお手軽コース</h1>
      <p>
        自宅からでもプロのサポートを受けられる、忙しい方にぴったりのプランです。
        ビデオ通話やチャットを活用し、分からないところをその場で解決できます。
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li>💬 チャットで質問し放題</li>
        <li>毎日 9:00〜22:00 まで受付中！</li>
        <li>どんな小さな疑問でもお気軽にどうぞ。</li>
        <li>今ホットなトレンドの配信もあるよ！</li>
        <li>YouTube動画、TikTok動画でも、配信中</li>
        <li>当日中に回答</li>
        <li>噛み砕いた解説で何度でも質問OK</li>
      </ul>
      <p>
        オンライン環境さえあれば、全国どこからでも参加可能です。定期的なライブ配信や資料提供で、継続的な学習をサポートします。
      </p>
      <Link href="/" className="inline-block px-4 py-2 bg-primary text-white rounded">
        ホームに戻る
      </Link>
    </div>
  );
}

