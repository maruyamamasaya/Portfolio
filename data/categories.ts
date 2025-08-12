export interface Category {
  slug: string;
  name: string;
  description: string;
  icon: string;
}

export const categories: Category[] = [
  {
    slug: 'pc-support',
    name: 'パソコントラブルサポート',
    description: '初心者向けのPC・スマホ問題の解決案内',
    icon: '💻',
  },
  {
    slug: 'ai-automation',
    name: 'AI・自動化活用',
    description: 'ChatGPT、LINE bot、業務効率化の導入支援',
    icon: '🤖',
  },
  {
    slug: 'ai-course',
    name: 'AI講座ブログ',
    description: 'AI講座に関する最新情報や活用事例',
    icon: '🧠',
  },
  {
    slug: 'network-wifi',
    name: 'ネット環境・Wi-Fi改善',
    description: '通信速度・接続設定・IPv6などの対処',
    icon: '📶',
  },
  {
    slug: 'digital-support',
    name: 'IT導入・デジタル支援',
    description: '個人店舗・小規模事業者向けのIT支援全般',
    icon: '🛠️',
  },
  {
    slug: 'design-support',
    name: 'デザイン・制作サポート',
    description: 'ロゴ・バナー・チラシ・SNSビジュアルの相談',
    icon: '🎨',
  },
  {
    slug: 'tool-guide',
    name: '便利ツール紹介・操作ガイド',
    description: 'Canva、Figma、Zapier、Notionなどの使い方',
    icon: '🧰',
  },
  {
    slug: 'faq',
    name: 'よくある質問（FAQ）集',
    description: '実際の相談ベースで蓄積されたノウハウ',
    icon: '❓',
  },
];
