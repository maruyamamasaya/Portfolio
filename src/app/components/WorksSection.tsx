import ImageSlider from './ImageSlider';

const works = [
  {
    title: 'LINE公式アカウント',
    images: ['/image/img1.svg', '/image/img2.svg', '/image/img3.svg'],
  },
  {
    title: '予約システム導入',
    images: ['/image/img3.svg', '/image/img4.svg', '/image/img5.svg'],
  },
  {
    title: 'デザイン制作',
    images: ['/image/img5.svg', '/image/img1.svg', '/image/img2.svg'],
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
      <div className="grid gap-8 md:grid-cols-3">
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
