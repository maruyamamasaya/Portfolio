import Link from 'next/link';
import TutorHeroSection from '@/app/components/TutorHeroSection';
import { Mochiy_Pop_One } from 'next/font/google';

const mochiy = Mochiy_Pop_One({ weight: '400', subsets: ['latin'] });

export const metadata = {
  title: '家庭教師型パソコンスクール',
};

export default function TutorServicePage() {
  return (
    <div className={`${mochiy.className} max-w-5xl mx-auto px-4 sm:px-6 md:px-10 py-8 space-y-12`}>
      <TutorHeroSection />
      <section className="section-spacing text-center space-y-4">
        <h2 className="text-2xl font-bold text-tutor-pink">サービス概要</h2>
        <p>
          私たちは現役エンジニアによる個別指導スタイルのIT家庭教師サービスです。学校の情報の授業対策から、プログラミングや最新AI技術まで、
          “理解できるまで寄り添う”をモットーにしています。
        </p>
      </section>
      <section className="section-spacing space-y-4 text-center">
        <h2 className="text-2xl font-bold text-tutor-pink">👨‍🏫 講師紹介</h2>
        <p>
          現役エンジニアが直接指導！実際にシステム開発の現場で活躍しているプロが、あなたのレベルに合わせて丁寧にサポートします。
        </p>
      </section>
      <section className="section-spacing space-y-4">
        <h2 className="text-2xl font-bold text-center text-tutor-pink">コース紹介</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>基礎から始めるプログラミングコース</li>
          <li>Webサイト制作コース</li>
          <li>最新AI活用コース</li>
        </ul>
      </section>
      <section className="section-spacing space-y-4">
        <h2 className="text-2xl font-bold text-center text-tutor-pink">学べる内容例</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Python・JavaScriptの基礎</li>
          <li>HTML/CSSによるWeb制作</li>
          <li>AIチャットボットの作り方</li>
        </ul>
      </section>
      <section className="section-spacing space-y-4">
        <h2 className="text-2xl font-bold text-center text-tutor-pink">学習の流れ</h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>ヒアリングで目標設定</li>
          <li>オリジナルカリキュラム作成</li>
          <li>マンツーマンレッスン</li>
          <li>振り返りと次回プラン</li>
        </ol>
      </section>
      <section className="section-spacing space-y-4">
        <h2 className="text-2xl font-bold text-center text-tutor-pink">受講までの流れ</h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>お問い合わせ</li>
          <li>無料ガイダンス</li>
          <li>体験セッション</li>
          <li>正式お申し込み</li>
        </ol>
      </section>
      <section className="section-spacing space-y-4">
        <h2 className="text-2xl font-bold text-center text-tutor-pink">特徴</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>完全マンツーマン指導</li>
          <li>オンライン・訪問どちらも対応</li>
          <li>理解できるまで丁寧にサポート</li>
        </ul>
      </section>
      <section className="section-spacing space-y-4">
        <h2 className="text-2xl font-bold text-center text-tutor-pink">無料ガイダンス｜体験セッション</h2>
        <p className="text-center">
          まずは気軽に体験してみませんか？オンラインでの無料ガイダンスを実施しています。
        </p>
        <div className="text-center">
          <Link
            href="/contact/tutor"
            className="inline-block px-6 py-3 bg-tutor-pink text-white rounded-full shadow transition-base hover:bg-tutor-pink/90"
          >
            体験を申し込む
          </Link>
        </div>
      </section>
      <section className="section-spacing space-y-4">
        <h2 className="text-2xl font-bold text-center text-tutor-pink">家庭教師料金表</h2>
        <p className="text-center">
          詳しい料金は
          <Link href="/pricing/tutor" className="text-tutor-pink underline ml-1">
            こちら
          </Link>
          をご覧ください。
        </p>
      </section>
      <section className="section-spacing text-center">
        <Link
          href="/contact/tutor"
          className="inline-block px-8 py-3 bg-tutor-pink text-white rounded-full shadow transition-base hover:scale-105"
        >
          家庭教師に関するお問い合わせはこちら
        </Link>
      </section>
    </div>
  );
}

