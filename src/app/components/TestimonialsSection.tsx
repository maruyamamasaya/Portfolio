import Image from 'next/image';

const testimonials = [
  {
    name: 'S様（飲食店オーナー）',
    comment:
      'メニュー表のデザインからInstagram運用の相談まで、トータルでサポートしてもらえて助かりました。日々の発信が楽しくなりました！',
    avatar: '/images/client-food.png',
  },
  {
    name: 'A様（エステサロン経営）',
    comment:
      'ホームページとLINE公式アカウントの連携をお願いしました。予約もスムーズになって、お客様の反応も良くなりました。',
    avatar: '/images/client-salon.png',
  },
  {
    name: 'S様（カフェ経営）',
    comment:
      'デザインのセンスが素敵で、ロゴやショップカードもお願いして本当によかったです。対応も丁寧で安心できました。',
    avatar: '/images/client-cafe.png',
  },
  {
    name: 'A様（美容系フリーランス）',
    comment:
      'ITが苦手だった私でも、ステップごとに分かりやすく説明してもらえました。サイト制作もスムーズに進んで感謝しています。',
    avatar: '/images/client-biyo.png',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="section-spacing">
      <h2 className="text-2xl font-bold mb-4">お客様の声</h2>
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="flex-shrink-0 w-64 p-4 bg-white dark:bg-gray-700 rounded shadow"
          >
            <div className="flex items-center space-x-2 mb-2">
              <Image
                src={t.avatar}
                alt={t.name}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full"
              />
              <span className="font-semibold text-sm">{t.name}</span>
            </div>
            <p className="text-sm">{t.comment}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
