import Image from 'next/image';

const services = [
  {
    title: 'サイト制作',
    desc: 'WordPressや静的サイト制作',
    icon: '/images/img1.svg',
  },
  { title: 'デザイン', desc: 'ロゴやバナー作成', icon: '/images/img2.svg' },
  { title: 'ITサポート', desc: '導入・運用支援', icon: '/images/img3.svg' },
];

export default function ServicesSection() {
  return (
    <section className="section-spacing">
      <h2 className="text-2xl font-bold mb-4">サービス紹介</h2>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {services.map((s) => (
          <div
            key={s.title}
            className="p-4 bg-white dark:bg-gray-700 rounded shadow flex flex-col items-center text-center"
          >
            <Image src={s.icon} alt={s.title} width={64} height={64} className="w-16 h-16 mb-2" />
            <h3 className="font-semibold">{s.title}</h3>
            <p className="text-sm">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
