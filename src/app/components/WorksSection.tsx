import ImageSlider from './ImageSlider';

const works = [
  {
    title: 'LINE公式アカウント',
    images: [
      '/images/line-intro/1.png',
      '/images/line-intro/2.png',
      '/images/line-intro/3.png',
    ],
  },
  {
    title: '予約システム導入',
    images: [
      '/images/yoyaku-intro/1.png',
      '/images/yoyaku-intro/2.png',
      '/images/yoyaku-intro/3.png',
    ],
  },
  {
    title: 'デザイン制作',
    images: ['/images/img5.svg', '/images/img1.svg', '/images/img2.svg'],
  },
];

export default function WorksSection() {
  return (
    <section className="section-spacing">
      <h2 className="text-2xl font-bold mb-4">実績・導入事例</h2>
      <p className="mb-4">
        小さなお店や個人で頑張る皆さまに寄り添うサポートを
        <br />
        「誰に相談していいかわからない」そんな声に応える、現場に強いIT・デザイン支援をご提供しています。
      </p>
      <div className="grid w-full gap-8 md:grid-cols-3">
        {works.map((work, i) => (
          <div key={i} className="space-y-2">
            <h3 className="font-semibold">{work.title}</h3>
            <ImageSlider images={work.images} />
          </div>
        ))}
      </div>
    </section>
  );
}
