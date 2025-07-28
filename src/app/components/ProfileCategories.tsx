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
      { src: '/images/img1.svg', caption: 'LINEリッチメニュー：店舗別カスタマイズ対応' },
      { src: '/images/img2.svg', caption: '友だち追加クーポン' },
      { src: '/images/img3.svg', caption: '自動応答チャット' },
    ],
  },
  {
    title: '予約システム導入',
    desc: '小規模から大規模まで柔軟にサポート。',
    slides: [
      { src: '/images/img3.svg', caption: '予約画面カスタム' },
      { src: '/images/img4.svg', caption: '多店舗管理機能' },
      { src: '/images/img5.svg', caption: 'データ分析レポート' },
    ],
  },
  {
    title: 'デザイン制作',
    desc: 'ロゴ・バナー・印刷物まで幅広く対応。',
    slides: [
      { src: '/images/img5.svg', caption: 'ブランドロゴ提案' },
      { src: '/images/img1.svg', caption: 'バナー広告デザイン' },
      { src: '/images/img2.svg', caption: '名刺・チラシ制作' },
    ],
  },
  {
    title: 'モバイルオーダー',
    desc: 'AWSとLINE APIで実現する飲食店向け注文システム。',
    slides: [
      { src: '/images/img1.svg', caption: 'ChatGPT連携注文受付' },
      { src: '/images/img4.svg', caption: 'キッチン管理画面' },
      { src: '/images/img2.svg', caption: 'データ分析にも対応' },
    ],
  },
];

export default function ProfileCategories() {
  return (
    <section className="space-y-12 mt-8">
      {categories.map(cat => (
        <div key={cat.title} className="space-y-2">
          <h2 className="text-xl font-bold">{cat.title}</h2>
          <p className="text-sm">{cat.desc}</p>
          <ThumbSlider slides={cat.slides} />
        </div>
      ))}
    </section>
  );
}
