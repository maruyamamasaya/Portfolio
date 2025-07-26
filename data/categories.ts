export interface Category {
  slug: string;
  name: string;
  description: string;
  icon: string;
}

export const categories: Category[] = [
  {
    slug: 'ai',
    name: 'AI活用',
    description: 'AIを活用した記事やツールの紹介',
    icon: '🤖',
  },
  {
    slug: 'tutorial',
    name: 'チュートリアル',
    description: '手順解説や Tips をまとめた記事',
    icon: '📑',
  },
  {
    slug: 'meta',
    name: 'メタ情報',
    description: 'ブログ運営などメタ的な内容',
    icon: '📝',
  },
  {
    slug: 'dev',
    name: '開発',
    description: '開発者向けの技術情報',
    icon: '🛠️',
  },
];
