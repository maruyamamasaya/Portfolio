import Image from 'next/image';
import Link from 'next/link';

interface Props {
  className?: string;
}

export default function ITSchoolSection({ className = '' }: Props) {
  const courses = [
    {
      name: '💻 オンラインお手軽コース',
      price: '月額5,000円',
      details: [
        'チャットで質問し放題',
        '毎日 9:00〜22:00 まで受付中！',
        'どんな小さな疑問でもお気軽にどうぞ。',
        '今ホットなトレンドの配信もあるよ！',
        'YouTube動画、TikTok動画でも、配信中',
        '当日中に回答',
        '噛み砕いた解説で何度でも質問OK',
      ],
    },
    {
      name: '🏠 家庭訪問プラン',
      price: '月額25,000円',
      details: ['月4回 × 3h、東京都内どこでも訪問', '宿題や課題も一緒に解決', 'PCや教材を直接使って理解を深める'],
    },
    {
      name: '🏢 個別塾プラン',
      price: '月額20,000円〜',
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
    <section
      className={`section-spacing space-y-12 bg-pink-50 dark:bg-gray-800 rounded-lg p-8 ${className}`}
    >
      {/* ファーストビュー */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-pink-700">
          ITが“わかる”と、世界が広がる！
        </h2>
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
          className="inline-block px-6 py-3 bg-pink-500 text-white rounded shadow hover:bg-pink-400 transition-base"
        >
          無料体験に申し込む
        </Link>
      </div>

      {/* サービス概要 */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-center text-pink-700">サービス概要</h3>
        <p className="text-center">
          私たちは現役エンジニアによる 個別指導スタイル のIT家庭教師サービスです。<br className="hidden sm:block" />
          学校の情報の授業対策から、プログラミングや最新AI技術まで、
          “理解できるまで寄り添う” をモットーにしています。
        </p>
      </div>

      {/* 講師紹介 */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-center">👨‍🏫 講師紹介</h3>
        <p className="text-center">
          現役エンジニアが直接指導！<br className="hidden sm:block" />
          実際にシステム開発の現場で活躍しているプロが、あなたのレベルに合わせて丁寧にサポートします。
        </p>
      </div>

      {/* コース紹介 */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-center text-pink-700">コース紹介</h3>
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

      {/* 受講までの流れ */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-center">受講までの流れ</h3>
        <ul className="space-y-4 max-w-xl mx-auto">
          <li className="flex items-start gap-2">
            <span>🗣️</span>
            <div>
              <p className="font-medium">オンラインで簡単ヒアリング</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                学びたいことや目標を気軽にお話しください。（ビデオ通話・お電話どちらもOK）
              </p>
            </div>
          </li>
          <li className="flex items-start gap-2">
            <span>📋</span>
            <div>
              <p className="font-medium">あなただけの学習カルテ作成</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                スキルや目的に合わせたオリジナルの学習プランをご提案します。
              </p>
            </div>
          </li>
          <li className="flex items-start gap-2">
            <span>🎓</span>
            <div>
              <p className="font-medium">無料体験授業</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                実際に授業を受けて、学びやすさを体感してください。
              </p>
            </div>
          </li>
          <li className="flex items-start gap-2">
            <span>🚀</span>
            <div>
              <p className="font-medium">継続受講へ</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                体験後にご興味を持っていただければ、そのまま継続して学んでいただけます。
              </p>
            </div>
          </li>
        </ul>
      </div>

      {/* 特徴 */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-center text-pink-700">特徴</h3>
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
        <h3 className="text-2xl font-bold text-center text-pink-700">学べる内容例</h3>
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
        <h3 className="text-2xl font-bold text-center text-pink-700">お客様の声</h3>
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
      <div className="text-center space-y-8">
        {/* ヒーローヘッダー */}
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-pink-700">
            無料ガイダンス｜体験セッション
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            まずは情報系コースを体験する
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            無料体験プログラムに申し込みたい
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            各コースの受講料金一覧が知りたい
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            IT講座の講師や内容について詳しく知りたい
          </p>
        </div>

        {/* アクションエリア */}
        <div className="flex flex-col items-center space-y-4">
          <Link
            href="/contact?type=guidance"
            className="px-6 py-3 bg-purple-600 text-white rounded-full shadow transition transform hover:bg-purple-700 hover:scale-105"
          >
            無料ガイダンス
          </Link>
          <Link
            href="/contact?type=session"
            className="px-6 py-3 bg-secondary text-black rounded-full shadow transition transform hover:bg-gray-300 hover:scale-105"
          >
            体験セッション
          </Link>
          <Link
            href="/pricing"
            className="text-sm text-gray-600 hover:text-gray-800 hover:underline transition"
          >
            受講料金一覧
          </Link>
        </div>

        <p className="text-sm">
          <Link href="/contact" className="accent-text hover:underline transition">
            コースに関するお問い合わせはこちら
          </Link>
        </p>
      </div>
    </section>
  );
}

