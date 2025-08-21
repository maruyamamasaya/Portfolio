import Image from 'next/image';
import Link from 'next/link';
import CourseCard from './CourseCard';

interface Props {
  className?: string;
}

export default function ITSchoolSection({ className = '' }: Props) {
  const courses = [
    {
      title: 'オンラインお手軽コース',
      short: 'Online',
      description:
        'チャットで質問し放題。毎日9:00〜22:00まで受付中。',
      href: '/services/tutor/online',
      image: '/images/tutor.jpeg',
    },
    {
      title: '家庭訪問プラン',
      short: 'Home',
      description:
        '月4回×3h、東京都内どこでも訪問。宿題や課題も一緒に解決。',
      href: '/services/tutor/home',
      image: '/images/course02.jpeg',
    },
    {
      title: '個別塾プラン',
      short: 'School',
      description:
        'レンタル会議室で月2回×3h。集中できる学習環境。',
      href: '/services/tutor/school',
      image: '/images/course03.jpeg',
    },
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
      avatar: '/images/student01.jpeg',
    },
    {
      text: '将来エンジニアを目指したい気持ちが強くなりました',
      author: '中3女子',
      avatar: '/images/student02.jpeg',
    },
  ];

  return (
    <section
      className={`section-spacing space-y-12 bg-pink-50 dark:bg-gray-800 rounded-lg p-8 ${className}`}
    >
      {/* ファーストビュー */}
      <div className="mb-6 sm:mb-12 mt-0 sm:mt-12">
        {/* Mobile layout: image first, text below */}
        <div className="sm:hidden space-y-4">
          <div className="mx-[5px]">
            <Image
              src="/images/tutor.jpeg"
              alt="中高生がパソコンを学ぶ様子"
              width={1000}
              height={1000}
              className="w-full aspect-square object-cover rounded"
            />
          </div>
          <div className="text-center space-y-2">
            <h2 className="text-xl font-bold text-pink-700">
              ITが“わかる”と、世界が広がる！
            </h2>
            <p className="text-sm">
              学校の授業から最先端技術まで。わからないを“できる！”に変える
            </p>
            <p className="text-sm">
              「分からない」を「分かる」に変える──現役エンジニアによる 個別指導スタイル のIT家庭教師サービスです。
            </p>
            <Link
              href="/contact"
              className="inline-block px-4 py-2 bg-pink-500 text-white rounded shadow motion-safe:transition-transform motion-reduce:transition-none duration-300 ease-in-out hover:scale-105 transition-base"
            >
              無料体験に申し込む
            </Link>
          </div>
        </div>
        {/* Desktop layout retains overlay on background */}
        <div
          className="relative hidden sm:flex items-center justify-center h-[80vh] bg-center bg-cover sm:bg-fixed"
          style={{ backgroundImage: 'url("/images/tutor.jpeg")' }}
        >
          <div className="absolute inset-0 bg-black/80" />
          <div className="relative text-center space-y-4 bg-black/50 p-4 rounded">
            <h2 className="text-3xl font-bold text-white">
              ITが“わかる”と、世界が広がる！
            </h2>
            <p className="text-white">
              学校の授業から最先端技術まで。わからないを“できる！”に変える
            </p>
            <p className="text-white">
              「分からない」を「分かる」に変える──現役エンジニアによる 個別指導スタイル のIT家庭教師サービスです。
            </p>
            <Link
              href="/contact"
              className="inline-block px-4 py-2 bg-pink-500 text-white rounded shadow motion-safe:transition-transform motion-reduce:transition-none duration-300 ease-in-out hover:scale-105 transition-base"
            >
              無料体験に申し込む
            </Link>
          </div>
        </div>
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
          <ul className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.title} {...course} />
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
        <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {testimonials.map((t) => (
            <div
              key={t.author}
              className="p-4 bg-white dark:bg-gray-700 rounded shadow space-y-2 text-center"
            >
              <Image
                src={t.avatar}
                alt={t.author}
                width={180}
                height={180}
                className="mx-auto rounded-full"
              />
              <p className="font-bold">{t.author}</p>
              <p className="text-sm">「{t.text}」</p>
            </div>
          ))}
        </div>
      </div>

      
    </section>
  );
}

