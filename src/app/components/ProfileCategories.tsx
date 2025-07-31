import ThumbSlider, { Slide } from './ThumbSlider';

interface Category {
  title: string;
  desc: string;
  slides: Slide[];
}

const categories: Category[] = [
  {
    title: 'LINE公式アカウント',
    desc: 'リッチメニューやクーポン配信など店舗別にカスタマイズ。',
    slides: [
      {
        src: '/images/line-intro/1.png',
        caption: 'LINEリッチメニュー：店舗別カスタマイズ対応',
      },
      { src: '/images/line-intro/2.png', caption: '友だち追加クーポン' },
      { src: '/images/line-intro/3.png', caption: '自動応答チャット' },
    ],
  },
  {
    title: '予約システム導入',
    desc: '小規模から大規模まで柔軟にサポート。',
    slides: [
      { src: '/images/yoyaku-intro/1.png', caption: '予約画面カスタム' },
      { src: '/images/yoyaku-intro/2.png', caption: '多店舗管理機能' },
      { src: '/images/yoyaku-intro/3.png', caption: 'データ分析レポート' },
    ],
  },
  {
    title: 'デザイン制作',
    desc: 'ロゴ・バナー・印刷物まで幅広く対応。',
    slides: [
      { src: '/images/desing-intro/1.png', caption: 'ブランドロゴ提案' },
      { src: '/images/desing-intro/2.png', caption: 'バナー広告デザイン' },
      { src: '/images/desing-intro/3.png', caption: '名刺・チラシ制作' },
    ],
  },
];

export default function ProfileCategories() {
  return (
    <section className="space-y-12 mt-8">
      {categories.map((cat) => (
        <div key={cat.title} className="space-y-2">
          <h2 className="text-xl font-bold">{cat.title}</h2>
          <p className="text-sm">{cat.desc}</p>
          <ThumbSlider slides={cat.slides} />
        </div>
      ))}
    </section>
  );
}
