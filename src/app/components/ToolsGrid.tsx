import React from 'react';

const tools = [
  {
    name: 'React',
    icon: '⚛️',
    description:
      'React（リアクト）は、ユーザーインターフェース（UI）を作るJavaScriptライブラリ。\n🔧 簡単にいうと…\nReactは「部品を組み合わせてWeb画面を作る道具」です。',
  },
  {
    name: 'Next.js',
    icon: '🧭',
    description:
      'Next.js（ネクストジェイエス）\n🔧 簡単にいうと…\n→ Reactで「本格的なWebサイトやアプリ」を作るための最強ツールセット。\n🚀 もっと具体的にいうと…\nNext.jsは Reactを使ったWebアプリ開発をもっと簡単・高速・便利にするためのフレームワーク です。\nReact単体では足りない「ルーティング」「SEO対応」「表示の高速化」などが全部まとめて使えるようになります。',
  },
  {
    name: 'Tailwind CSS',
    icon: '🌀',
    description:
      'Tailwind CSS\n🔧 簡単にいうと…\n→ クラス名を使って、HTMLに直接デザインをつけられるCSSの魔法道具。\n例：<div class="text-red-500 bg-white p-4">\nデザインのルールが統一され、速くきれいなUIが作れる\n最近のReact/Next.js開発では定番',
  },
  {
    name: 'Figma',
    icon: '🎨',
    description:
      'Figma\n🔧 簡単にいうと…\n→ ブラウザで動くデザインツール。UI/UXデザインのGoogleドキュメント的存在。\nデザイナーとエンジニアが同時に見ながら作業できる\nワイヤーフレーム、プロトタイプ、UIデザインに超便利\n無料プランでも十分使える',
  },
  {
    name: 'Adobe Creative Cloud (Photoshop / Illustrator / XD)',
    icon: '🅰️',
    description:
      'Adobe Creative Cloud\n🔧 簡単にいうと…\n→ プロ向けの画像・映像・デザイン制作ソフトの詰め合わせセット。\nPhotoshop：画像編集の王様（合成・レタッチなど）\nIllustrator：ロゴやアイコン、ベクターグラフィックに最適\nXD：UIデザイン・プロトタイピングに特化（Figmaに近い）',
  },
  {
    name: 'Canva',
    icon: '🖼️',
    description:
      'Canva\n🔧 簡単にいうと…\n→ 誰でもプロっぽいデザインが作れる「おしゃれ画像メーカー」。\nチラシ、SNS投稿、名刺、資料…何でもテンプレ付きで作れる\nドラッグ＆ドロップで直感的に操作\nチームでの共有も楽',
  },
  {
    name: 'Zapier',
    icon: '⚡',
    description:
      'Zapier\n🔧 簡単にいうと…\n→ いろんなWebサービス同士を自動でつなげる「ロボット配線サービス」。\n例：Gmailに届いたメールを自動でSlackに通知\nノーコードで設定可能（プログラム不要）\n海外ツールとの相性が良い',
  },
  {
    name: 'Make.com',
    icon: '🔗',
    description:
      'Make.com（旧Integromat）\n🔧 簡単にいうと…\n→ Zapierよりも複雑な「自動化フロー」が作れるロボ職人ツール。\n条件分岐やループ処理などもOK\n日本語対応も進んできている\nAPI連携が強力で開発者向き',
  },
  {
    name: 'LINE公式アカウント (Messaging API / Bot)',
    icon: '💬',
    description:
      'LINE公式アカウント（Messaging API / Bot）\n🔧 簡単にいうと…\n→ LINEでお店やサービスの自動応答Botや通知を送れる仕組み。\n予約確認、リマインド、クーポン送信など\nMessaging APIで個別にメッセージ操作可能\nFlex Message（カルーセル表示）も活用できる',
  },
  {
    name: 'OpenAI GPT (ChatGPT API / Assistant)',
    icon: '🤖',
    description:
      'OpenAI GPT（ChatGPT API / Assistant）\n🔧 簡単にいうと…\n→ 会話・要約・生成・分類…何でもできる「AIの頭脳」を使えるAPI。\n独自のチャットBotやLINE連携にも使える\n自然な対話や文章生成が得意\n「Assistant API」は記憶やツール操作もできる次世代モデル',
  },
  {
    name: 'Google Apps Script',
    icon: '📄',
    description:
      'Google Apps Script（GAS）\n🔧 簡単にいうと…\n→ GoogleスプレッドシートやGmailを自動操作する「Google公式のミニプログラム」。\nJavaScriptライクな文法\n定期実行やフォーム応答処理に便利\n無料・インストール不要・すぐ動く',
  },
  {
    name: 'Notion / Slack 連携ツール',
    icon: '📘',
    description:
      'Notion / Slack 連携ツール\n🔧 簡単にいうと…\n→ NotionやSlackを、他のサービスと連携してもっと便利にする自動化ツール。\n例：Notionに書いたタスクをSlackに通知\nChatGPTやZapier/Makeと組み合わせることで、業務効率化が爆速\nノーコードでも設定可、開発者ならAPIで自由自在',
  },
];

export default function ToolsGrid() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        利用ツール
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tools.map((tool) => (
          <div key={tool.name} className="relative group">
            <div
              className="rounded-lg p-4 shadow bg-white dark:bg-gray-800 text-center hover:shadow-lg hover:scale-105 transition"
              tabIndex={0}
            >
              <div className="text-2xl mb-2">{tool.icon}</div>
              <p className="text-sm">{tool.name}</p>
            </div>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden w-56 p-2 text-xs text-white bg-gray-700 rounded shadow-lg group-hover:block group-focus:block whitespace-pre-line">
              {tool.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
