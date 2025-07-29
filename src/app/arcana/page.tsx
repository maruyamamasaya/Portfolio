import ScrollFadeIn from '../components/ScrollFadeIn';
import ArcanaCarouselList from '../components/ArcanaCarouselList';
import Image from 'next/image';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';

export const metadata = {
  title: 'アルカナ公式 TCGカード 特設ページ',
} satisfies Metadata;

interface Step {
  title: string;
  description: ReactNode;
  image: string;
}

const steps: Step[] = [
  {
    title: 'キャラクターを選びましょう',
    description: (
      <>
        <p>まずは、好きな属性やイラストのキャラクターを3枚選んでください。</p>
        <ul className="list-disc ml-6 space-y-1">
          <li><span title="防御に優れ、安定した戦い方が可能" className="text-blue-600">💧 青</span></li>
          <li><span title="攻撃力が高く、積極的に攻めるスタイル" className="text-red-600">🔥 赤</span></li>
          <li><span title="状況に応じた柔軟な対応が可能" className="text-yellow-700">🪨 地</span></li>
          <li><span title="特殊な戦法でトリッキーな勝利も可能" className="text-yellow-500">✨ 光</span></li>
          <li><span title="相手にプレッシャーを与える持久戦型" className="text-purple-600">🌑 闇</span></li>
        </ul>
      </>
    ),
    image: '/images/arcana/arcanacard00001.svg',
  },
  {
    title: '装飾カードを6枚選択',
    description: (
      <>
        <p>装飾カードは、同じ属性のキャラクターにのみ装着可能です。</p>
        <p>戦略の中心となる重要な選択なので、じっくり選びましょう。</p>
        <p className="text-sm">※装飾カードは対戦中に使い切ると、勝利条件にはなりません。</p>
      </>
    ),
    image: '/images/arcana/arcanacard00002.svg',
  },
  {
    title: 'アルカナカードを14枚選びます',
    description: (
      <>
        <p>両プレイヤーは、アルカナ数が書かれたカードを14枚ずつ選びます。</p>
        <ul className="list-disc ml-6 space-y-1">
          <li>同じ数字は最大4枚まで選択可能</li>
          <li>合計で5種類以上の異なる数字を含める必要があります</li>
        </ul>
      </>
    ),
    image: '/images/arcana/arcanacard00003.svg',
  },
  {
    title: '先攻・後攻を決定',
    description: <p>ランダムまたはプレイヤー間の合意で順番を決定します。</p>,
    image: '/images/arcana/arcanacard00004.svg',
  },
  {
    title: 'バトル開始前：コインを3枚積む儀式',
    description: <p>この儀式をもって、対戦が正式に始まります。</p>,
    image: '/images/arcana/arcanacard00005.svg',
  },
  {
    title: 'キャラの配置と装飾アクション',
    description: (
      <>
        <p>先攻プレイヤーが攻撃キャラを場に出します。</p>
        <p>後攻プレイヤーは、それを受ける防御キャラを出します。</p>
        <p>それぞれ、対応する装飾カードで支援することができます。</p>
      </>
    ),
    image: '/images/arcana/arcanacard00006.svg',
  },
  {
    title: 'アルカナ対決！',
    description: (
      <>
        <p>アルカナをシャッフルし、山札の一番上を引きます。</p>
        <p>数値に基づいて、攻撃・防御の結果が決まります。</p>
        <p>さらに、特定属性の特殊効果が発動する場合もあります：</p>
        <ul className="list-disc ml-6 space-y-1">
          <li><span className="text-yellow-500">✨ 光</span>：特殊効果で形勢逆転も</li>
          <li><span className="text-purple-600">🌑 闇</span>：相手の手札を破壊できる可能性も</li>
        </ul>
      </>
    ),
    image: '/images/arcana/arcanacard00007.svg',
  },
  {
    title: '使用済みカードの管理',
    description: (
      <p>
        使用した装飾カード・破壊されたキャラ・使い切ったアルカナは再使用不可となり、ゲームから除外されます。
      </p>
    ),
    image: '/images/arcana/arcanacard00008.svg',
  },
  {
    title: '後攻プレイヤーのターンに移行',
    description: <p>先ほどと同様に、攻防を交代して進行します。</p>,
    image: '/images/arcana/arcanacard00009.svg',
  },
  {
    title: '戦闘の特記事項',
    description: (
      <ul className="list-disc ml-6 space-y-1">
        <li>攻撃に失敗しても、攻撃キャラは場に残ります</li>
        <li>防御が成功しても、相手キャラは破壊されません</li>
        <li>防御成功時は、次のターンでキャラ交代が可能です</li>
      </ul>
    ),
    image: '/images/arcana/arcanacard00010.svg',
  },
];

export default function ArcanaPage() {
  return (
    <div
      className="relative min-h-screen py-8 bg-center bg-cover"
      style={{ backgroundImage: 'url(/images/arcana/background.svg)' }}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative max-w-4xl mx-auto space-y-12 px-4">
        <header className="text-center space-y-2 text-white">
          <h1 className="text-3xl font-extrabold font-serif">
            アルカナ公式 TCGカード 特設ページ
          </h1>
          <p>神秘的なカードが紡ぐ戦略バトルの世界をご紹介します。</p>
        </header>
        <ArcanaCarouselList />
        <div className="bg-white/90 rounded-lg shadow p-4 space-y-12 text-gray-800 dark:text-gray-200">
          {steps.map((step, i) => (
            <ScrollFadeIn key={i} as="section" className="space-y-4 py-8">
              <div className="flex items-center space-x-4">
                <span className="w-10 h-10 rounded-full bg-blue-900 text-white flex items-center justify-center text-lg font-bold">
                  {i + 1}
                </span>
                <h2 className="text-2xl font-bold font-serif">{step.title}</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4 items-center">
                <Image
                  src={step.image}
                  alt={`Step ${i + 1}`}
                  width={500}
                  height={300}
                  className="w-full h-auto rounded shadow"
                />
                <div className="leading-relaxed space-y-2">{step.description}</div>
              </div>
            </ScrollFadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}

