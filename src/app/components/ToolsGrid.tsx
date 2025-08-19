'use client';
import React, { useState } from 'react';
import ToolModal from './ToolModal';
import Image from 'next/image';

const tools = [
  {
    name: 'React',
    icon: '/images/React.png',
    description:
      'Reactはコンポーネント志向のUIライブラリで、宣言的なコードにより複雑なユーザーインターフェースを効率よく構築できます。仮想DOMを利用した高速なレンダリングと豊富なエコシステムを備えており、ウェブはもちろんネイティブアプリ開発にも応用可能です。多くのコミュニティが支えるモダンフロントエンドの定番技術です。',
  },
  {
    name: 'Next.js',
    icon: '/images/Nextjs.png',
    description:
      'Next.jsはReactをベースにしたフレームワークで、サーバーサイドレンダリングや静的サイト生成、APIルーティングなどを簡単に実装できます。高速なページ表示とSEO対策を両立し、大規模なWebサービス構築にも適しています。豊富なプラグインや設定の柔軟性があり、効率的な開発体験を提供します。',
  },
  {
    name: 'TypeScript',
    icon: '/images/TypeScript.png',
    description:
      'TypeScriptはMicrosoftが開発した型付け可能なJavaScriptのスーパーセットです。型定義によってコードの安全性が高まり、大規模な開発でもバグを減らせます。高度な型推論と豊富なエディタサポートにより保守性が向上し、既存のJavaScriptプロジェクトにも段階的に導入できるのが強みです。',
  },
  {
    name: 'Tailwind CSS',
    icon: '/images/TailwindCSS.png',
    description:
      'Tailwind CSSはユーティリティファーストなCSSフレームワークで、クラス名を直接HTMLに書き込むスタイルが特徴です。複雑なスタイルシートを持たずにデザインを組み立てられ、レスポンシブ対応も簡単です。カスタマイズの自由度が高く、デザインシステムの構築や開発スピードの向上に大きく貢献します。',
  },
  {
    name: 'Figma',
    icon: '/images/Figma.png',
    description:
      'Figmaはブラウザ上で動作するデザインツールで、複数人によるリアルタイム編集が可能です。プロトタイプの作成やコンポーネント管理がしやすく、デザイナーとエンジニアの協業をスムーズにします。コメント機能によるフィードバックも手軽で、無料プランでも多くの機能を利用できる点が魅力です。',
  },
];

export default function ToolsGrid() {
  const [activeTool, setActiveTool] = useState<(typeof tools)[number] | null>(
    null,
  );
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        利用ツール
      </h2>
      <div className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tools.map((tool) => (
          <button
            key={tool.name}
            onClick={() => setActiveTool(tool)}
            className="flex flex-col items-center rounded-lg p-4 w-full shadow bg-white dark:bg-gray-800 hover:shadow-lg hover:scale-105 transition-base hover:opacity-80"
          >
            <Image
              src={tool.icon}
              alt={tool.name}
              width={80}
              height={80}
              className="w-20 h-20 object-contain mb-2"
            />
            <p className="text-sm text-center">{tool.name}</p>
          </button>
        ))}
      </div>
      <ToolModal tool={activeTool} onClose={() => setActiveTool(null)} />
    </div>
  );
}
