export interface Category {
  slug: string;
  name: string;
  description: string;
  icon: string;
}

export const categories: Category[] = [
  {
    slug: 'ai-tools',
    name: 'AIツール',
    description: 'AIを活用した便利なツール',
    icon: '💡',
  },
  {
    slug: 'dev-tools',
    name: '開発ツール',
    description: '開発に役立つサービスやライブラリ',
    icon: '🛠️',
  },
  {
    slug: 'design',
    name: 'デザイン',
    description: 'デザインに関するノウハウやツール',
    icon: '🎨',
  },
];
