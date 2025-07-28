const testimonials = [
  {
    name: '山田様',
    comment: '丁寧なサポートで助かりました。',
    avatar: '/images/img1.svg',
  },
  {
    name: '佐藤様',
    comment: 'サイト制作がスムーズでした。',
    avatar: '/images/img2.svg',
  },
  {
    name: '鈴木様',
    comment: 'またお願いしたいです。',
    avatar: '/images/img3.svg',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="section-spacing">
      <h2 className="text-2xl font-bold mb-4">お客様の声</h2>
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-64 p-4 bg-white dark:bg-gray-700 rounded shadow"
          >
            <div className="flex items-center space-x-2 mb-2">
              <img
                src={t.avatar}
                alt={t.name}
                className="w-8 h-8 rounded-full"
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
