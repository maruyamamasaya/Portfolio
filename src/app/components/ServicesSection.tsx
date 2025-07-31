import Image from 'next/image';

const services = [
  {
    title: 'サイト制作',
    desc: 'WordPressや静的サイト制作',
    icon: '/images/sitecreate-img.jpg',
  },
  {
    title: 'デザイン',
    desc: 'ロゴやバナー作成',
    icon: '/images/desing-img.jpg',
  },
  {
    title: 'ITサポート',
    desc: '導入・運用支援',
    icon: '/images/support-img.jpg',
  },
];

const serviceTable = [
  {
    category: 'サイト制作',
    content:
      'WordPressや静的サイトなど、目的に合ったホームページを提案・構築します。',
  },
  {
    category: 'デザイン',
    content: 'ロゴ、バナー、チラシなどのビジュアル制作もお任せください。',
  },
  {
    category: 'ITサポート',
    content: 'パソコンや業務システムの導入・設定・運用まで幅広く対応します。',
  },
  {
    category: 'SNS運用支援',
    content:
      'LINE公式アカウントの開設・配信サポート、Instagramの企画運用も対応可能です。',
  },
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
            <Image
              src={s.icon}
              alt={s.title}
              width={400}
              height={300}
              className="w-full h-auto max-w-[400px] mb-2 object-contain"
            />
            <h3 className="font-semibold">{s.title}</h3>
            <p className="text-sm">{s.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full border-collapse shadow rounded-lg overflow-hidden text-sm">
          <thead>
            <tr className="font-bold bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
              <th className="p-4 text-left w-2/5">サービスカテゴリ</th>
              <th className="p-4 text-left w-3/5">内容</th>
            </tr>
          </thead>
          <tbody>
            {serviceTable.map((row, i) => (
              <tr
                key={row.category}
                className={
                  i % 2 === 0
                    ? 'bg-white dark:bg-gray-800'
                    : 'bg-gray-50 dark:bg-gray-700'
                }
              >
                <td className="p-4 w-2/5">{row.category}</td>
                <td className="p-4 w-3/5">{row.content}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
