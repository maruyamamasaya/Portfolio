'use client';
import React from 'react';

const introText =
  'AWSを基盤としたWebサイト・業務システムの構築を中心に、幅広い分野で実務経験を積んできました。予約システムやレンタル管理サイトの開発から、飲食チェーン向けサイト運用やSEO対策、LINE Messaging APIによるチャットボット開発まで対応可能です。基本情報技術者をはじめとする資格を活かし、インフラ知識を交えた柔軟な提案・構築を行います。スクレイピングやHTMLメール、LP制作など実務で使えるコーディングも多数経験しています。';

const levelGuide = '★★★＝実務上級 / ★★＝実務経験あり';

const categories = [
  {
    title: 'Frontend',
    skills: [
      {
        name: 'React',
        icon: '⚛️',
        level: '★★★',
        desc: '3年以上の実務経験。コンポーネント設計と状態管理に精通。',
      },
      {
        name: 'Next.js',
        icon: '🧭',
        level: '★★★',
        desc: '2年以上利用。SSRと静的生成で高速サイトを構築。',
      },
      {
        name: 'TypeScript',
        icon: '📝',
        level: '★★★',
        desc: '3年以上使用。型安全な開発の基盤として採用。',
      },
      {
        name: 'Tailwind CSS',
        icon: '🌀',
        level: '★★★',
        desc: '効率的なUI開発を実現。デザインシステム構築が得意。',
      },
    ],
  },
  {
    title: 'Backend',
    skills: [
      {
        name: 'Node.js',
        icon: '🟢',
        level: '★★',
        desc: 'API開発で2年以上使用。非同期処理の最適化を経験。',
      },
      {
        name: 'Express',
        icon: '🚂',
        level: '★★',
        desc: 'REST APIを複数構築し小規模サービスで運用。',
      },
      {
        name: 'Firebase',
        icon: '🔥',
        level: '★★',
        desc: '認証とDBを活用したモバイルバックエンドを構築。',
      },
      {
        name: 'Supabase',
        icon: '🍋',
        level: '★',
        desc: '個人開発で導入。Postgres連携を実践中。',
      },
    ],
  },
  {
    title: 'Design',
    skills: [
      {
        name: 'Figma',
        icon: '🎨',
        level: '★★★',
        desc: 'ワイヤーフレームからUIデザインまで一貫して対応。',
      },
      {
        name: 'Illustrator',
        icon: '✒️',
        level: '★★',
        desc: 'ロゴ制作などベクターデザインに活用。',
      },
      {
        name: 'Photoshop',
        icon: '🖌️',
        level: '★★',
        desc: '画像加工やバナー作成を得意とする。',
      },
    ],
  },
  {
    title: 'Tools',
    skills: [
      {
        name: 'Git',
        icon: '🌱',
        level: '★★★',
        desc: '7年以上使用。チーム開発の運用整備も担当。',
      },
      {
        name: 'GitHub',
        icon: '🐱',
        level: '★★★',
        desc: 'Issue管理やCI/CD連携を含むフローを構築。',
      },
      {
        name: 'Docker',
        icon: '🐳',
        level: '★',
        desc: '開発環境のコンテナ化を実施中。',
      },
      {
        name: 'VSCode',
        icon: '🖥️',
        level: '★★★',
        desc: '主要IDEとして拡張機能による効率化を実践。',
      },
    ],
  },
];

export default function SkillsGrid() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">スキルセット</h2>
      <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
        {introText}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400">{levelGuide}</p>
      {categories.map((category) => (
        <div key={category.title} className="space-y-2">
          <h3 className="text-lg font-semibold">{category.title}</h3>
          <div className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {category.skills.map((skill) => (
              <div
                key={skill.name}
                className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
              >
                <div className="text-4xl mb-2">{skill.icon}</div>
                <p className="font-bold text-sm mb-1">{skill.name}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                  {skill.level}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 text-center whitespace-pre-line">
                  {skill.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
