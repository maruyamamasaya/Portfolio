import Image from 'next/image';
import Link from 'next/link';

export default function ITSchoolSection() {
  const courses = [
    {
      name: '💻 オンラインお手軽コース',
      price: '5,000円',
      details: ['チャットで質問し放題', '当日中に回答', '噛み砕いた解説で何度でも質問OK'],
    },
    {
      name: '🏠 家庭訪問プラン',
      price: '25,000円',
      details: ['月4回 × 3h、東京都内どこでも訪問', '宿題や課題も一緒に解決', 'PCや教材を直接使って理解を深める'],
    },
    {
      name: '🏢 個別塾プラン',
      price: '20,000円〜',
      details: ['レンタル会議室で月2回 × 3h', '集中できる学習環境', '進度に合わせたカリキュラム'],
    },
  ];

  const features = [
    '現役エンジニアが指導',
    'どんな疑問も「わかるまで」対応',
    'オンライン・訪問・会議室から選べる柔軟プラン',
    '無料体験から安心スタート',
  ];

  const topics = [
    '学校の情報の授業（表計算・プレゼン・プログラミング基礎）',
    'Web制作（HTML / CSS / JavaScript）',
    'Python入門、AI基礎（ChatGPTや最新AI技術の仕組み）',
    'セキュリティやネットの仕組み',
  ];

  const testimonials = [
    {
      text: '学校の授業がスムーズに理解できるようになりました！',
      author: '高1男子',
    },
    {
      text: '将来エンジニアを目指したい気持ちが強くなりました',
      author: '中3女子',
    },
  ];

  return (
    <section className="section-spacing space-y-12">
      {/* ファーストビュー */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold">ITが“わかる”と、世界が広がる！</h2>
        <p className="text-lg">
          学校の授業から最先端技術まで。わからないを“できる！”に変える
        </p>
        <Image
          src="/images/img1.svg"
          alt="中高生がパソコンを学ぶ様子"
          width={800}
          height={400}
          className="w-full h-auto max-w-3xl mx-auto rounded"
        />
        <Link
          href="/contact"
          className="inline-block px-6 py-3 bg-primary text-white rounded shadow hover:bg-primary/80 transition-base"
        >
          無料体験に申し込む
        </Link>
      </div>

      {/* サービス概要 */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-center">サービス概要</h3>
        <p className="text-center">
          私たちは現役エンジニアによる 個別指導スタイル のIT家庭教師サービスです。<br className="hidden sm:block" />
          学校の情報の授業対策から、プログラミングや最新AI技術まで、
          “理解できるまで寄り添う” をモットーにしています。
        </p>
      </div>

      {/* コース紹介 */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-center">コース紹介</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse shadow rounded-lg overflow-hidden text-sm">
            <thead>
              <tr className="font-bold bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
                <th className="p-4 text-left w-1/4">プラン</th>
                <th className="p-4 text-left w-1/4">料金（月額）</th>
                <th className="p-4 text-left w-2/4">内容</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, i) => (
                <tr
                  key={course.name}
                  className={
                    i % 2 === 0
                      ? 'bg-white dark:bg-gray-800'
                      : 'bg-gray-50 dark:bg-gray-700'
                  }
                >
                  <td className="p-4">{course.name}</td>
                  <td className="p-4">{course.price}</td>
                  <td className="p-4">
                    <ul className="space-y-1">
                      {course.details.map((d) => (
                        <li key={d}>・{d}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 特徴 */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-center">特徴</h3>
        <ul className="space-y-2 max-w-2xl mx-auto">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-2">
              <span>✅</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 学べる内容 */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-center">学べる内容例</h3>
        <ul className="space-y-2 max-w-2xl mx-auto">
          {topics.map((t) => (
            <li key={t} className="flex items-start gap-2">
              <span>💡</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* お客様の声 */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-center">お客様の声</h3>
        <ul className="space-y-4 max-w-2xl mx-auto">
          {testimonials.map((t) => (
            <li key={t.author} className="p-4 bg-white dark:bg-gray-700 rounded shadow">
              <p className="mb-2">「{t.text}」</p>
              <p className="text-right text-sm">（{t.author}）</p>
            </li>
          ))}
        </ul>
      </div>

      {/* 体験申し込み */}
      <div className="text-center space-y-4">
        <h3 className="text-2xl font-bold">まずは無料体験から！</h3>
        <p>オンラインでの簡単ヒアリング → カルテ作成 → 体験授業</p>
        <Link
          href="/contact"
          className="inline-block px-6 py-3 bg-primary text-white rounded shadow hover:bg-primary/80 transition-base"
        >
          無料体験に申し込む
        </Link>
      </div>
    </section>
  );
}

