import ImageSlider from './ImageSlider';

const works = [
  {
    title: 'LINE公式アカウント',
    images: [
      '/images/line-intro/1.png',
      '/images/line-intro/2.png',
      '/images/line-intro/3.png',
    ],
    caption: (
      <>
        アカウントの新規立ち上げから、導線設計・プロフィール構築・リッチメニューやチャット応答の自動化まで、目的に合わせて一括対応します。
        <br />
        飲食店様、エステサロン、小売店、写真スタジオなど、各店舗の雰囲気や業種に合わせたデザイン・シナリオ設計を行ってきました。
        <br />
        過去には、<span className="text-red-500">東京タワー様の公式アカウント</span>のデザインも担当しています。
      </>
    ),
  },
  {
    title: '予約アプリ導入（LINE連携）',
    images: [
      '/images/yoyaku-intro/1.png',
      '/images/yoyaku-intro/2.png',
      '/images/yoyaku-intro/3.png',
    ],
    caption: (
      <>
        LINE公式アカウントと連動する予約アプリの構築・導入支援も可能です。
        <br />
        飲食店、エステ、写真スタジオなど、業種ごとに異なるフローに対応し、LINE上から簡単に予約完結できる仕組みをご提案します。
        <br />
        カレンダー連携、リマインド通知、スタッフ別対応など、店舗運営に即した予約システムをオリジナルで構築します。
      </>
    ),
  },
  {
    title: 'デザイン制作',
    images: [
      '/images/design-intro/1.png',
      '/images/design-intro/2.png',
      '/images/design-intro/3.png',
    ],
    caption: (
      <>
        店舗やブランドの世界観に合わせて、LINEリッチメニュー・プロフィール画像・予約画面などのビジュアルをトータルでデザインします。
        <br />
        かわいい・高級感・シンプル・ポップなど、ジャンルやターゲットに応じた最適なトーンを提案し、手に取りたくなるような魅せ方を意識しています。
        <br />
        飲食・エステ・小売・写真スタジオなど、業種ごとの「らしさ」を引き出すことを大切にしています。
      </>
    ),
  },
];

export default function WorksSection() {
  return (
    <section className="section-spacing">
      <h2 className="text-2xl font-bold">実績・導入事例</h2>
      <p className="mb-5 text-base leading-7">
        小さなお店や個人で頑張る皆さまに寄り添うサポートを
        <br />
        「誰に相談していいかわからない」そんな声に応える、現場に強いIT・デザイン支援をご提供しています。
      </p>
      <div className="portfolio-grid-tight w-full md:grid-cols-3 max-w-5xl mx-auto">
        {works.map((work) => (
          <article key={work.title} className="lux-card p-6 space-y-4">
            <h3 className="font-semibold text-lg">{work.title}</h3>
            <ImageSlider images={work.images} />
            <p className="speech-bubble">{work.caption}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
