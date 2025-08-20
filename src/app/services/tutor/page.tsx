import Link from 'next/link';
import Image from 'next/image';
import Card from '@/app/components/Card';
import ProfileCardBlog from '@/app/components/ProfileCardBlog';
import TutorHeroSection from '@/app/components/TutorHeroSection';
import FlowArrow from '@/app/components/FlowArrow';
import { Mochiy_Pop_One } from 'next/font/google';

const mochiy = Mochiy_Pop_One({ weight: '400', subsets: ['latin'] });

export const metadata = {
  title: '家庭教師型パソコンスクール',
};

export default function TutorServicePage() {
  return (
    <div className={mochiy.className}>
      <TutorHeroSection />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-10 py-8 space-y-12">
        <section className="grid gap-6">
          <Card className="flex flex-col items-center text-center space-y-4">
            <h2 className="text-2xl font-semibold text-pink-600">
              サービス概要
            </h2>
            <p>
              私たちは現役エンジニアによる
              <span className="font-semibold">個別指導スタイル</span>
              のIT家庭教師サービスです。
              <br />
              学校の情報の授業対策から、プログラミングや最新AI技術まで、
              <br />
              <span className="font-semibold">“理解できるまで寄り添う”</span>
              をモットーにしています。
            </p>
          </Card>
          <Card className="flex flex-col items-center space-y-4">
            <h2 className="text-2xl font-semibold text-center text-pink-600">
              👨‍🏫 講師紹介
            </h2>
            <p className="text-center">
              現役エンジニアが直接指導！実際にシステム開発の現場で活躍しているプロが、
              <br />
              あなたのレベルに合わせて丁寧にサポートします。
            </p>
            <ProfileCardBlog />
          </Card>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-center text-pink-600">
            コース紹介
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="p-4 bg-white rounded shadow space-y-2">
              <h3 className="font-semibold text-center">
                オンラインお手軽コース
              </h3>
              <p className="text-sm text-center">
                チャットで質問し放題。毎日9:00〜22:00まで受付中。
              </p>
              <div className="text-center">
                <Link href="/services/tutor/online" className="text-pink-600 underline">
                  詳しく見る
                </Link>
              </div>
            </div>
            <div className="p-4 bg-white rounded shadow space-y-2">
              <h3 className="font-semibold text-center">家庭訪問プラン</h3>
              <p className="text-sm text-center">
                月4回×3h、東京都内どこでも訪問。宿題や課題も一緒に解決。
              </p>
              <div className="text-center">
                <Link href="/services/tutor/home" className="text-pink-600 underline">
                  詳しく見る
                </Link>
              </div>
            </div>
            <div className="p-4 bg-white rounded shadow space-y-2">
              <h3 className="font-semibold text-center">個別塾プラン</h3>
              <p className="text-sm text-center">
                レンタル会議室で月2回×3h。集中できる学習環境。
              </p>
              <div className="text-center">
                <Link href="/services/tutor/school" className="text-pink-600 underline">
                  詳しく見る
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-center text-pink-600">
            受講までの流れ
          </h2>
          <ol className="flex flex-col md:flex-row items-center gap-4 md:gap-4 md:overflow-x-auto md:pb-4 md:snap-x md:snap-mandatory">
            <li className="flex flex-col items-center text-center bg-white p-6 rounded shadow w-full md:w-[28rem] space-y-2 flex-shrink-0 md:snap-start">
              <Image
                src="/images/flow0tutor01.png"
                alt="オンラインで簡単ヒアリング"
                width={448}
                height={299}
                className="w-[320px] h-auto md:w-[28rem]"
              />
              <p className="font-semibold">オンラインで簡単ヒアリング</p>
              <p className="text-sm">
                学びたいことや目標を気軽にお話しください。（ビデオ通話・お電話どちらもOK）
              </p>
            </li>
            <li className="hidden md:block flex-shrink-0">
              <FlowArrow />
            </li>
            <li className="flex flex-col items-center text-center bg-white p-6 rounded shadow w-full md:w-[28rem] space-y-2 flex-shrink-0 md:snap-start">
              <Image
                src="/images/flow0tutor02.png"
                alt="あなただけの学習カルテ作成"
                width={448}
                height={299}
                className="w-[320px] h-auto md:w-[28rem]"
              />
              <p className="font-semibold">あなただけの学習カルテ作成</p>
              <p className="text-sm">
                スキルや目的に合わせたオリジナルの学習プランをご提案します。
              </p>
            </li>
            <li className="hidden md:block flex-shrink-0">
              <FlowArrow />
            </li>
            <li className="flex flex-col items-center text-center bg-white p-6 rounded shadow w-full md:w-[28rem] space-y-2 flex-shrink-0 md:snap-start">
              <Image
                src="/images/flow0tutor03.png"
                alt="無料体験授業"
                width={448}
                height={299}
                className="w-[320px] h-auto md:w-[28rem]"
              />
              <p className="font-semibold">無料体験授業</p>
              <p className="text-sm">
                実際に授業を受けて、学びやすさを体感してください。
              </p>
            </li>
            <li className="hidden md:block flex-shrink-0">
              <FlowArrow />
            </li>
            <li className="flex flex-col items-center text-center bg-white p-6 rounded shadow w-full md:w-[28rem] space-y-2 flex-shrink-0 md:snap-start">
              <Image
                src="/images/flow0tutor04.png"
                alt="継続受講へ"
                width={448}
                height={299}
                className="w-[320px] h-auto md:w-[28rem]"
              />
              <p className="font-semibold">継続受講へ</p>
              <p className="text-sm">
                体験後にご興味を持っていただければ、そのまま継続して学んでいただけます。
              </p>
            </li>
          </ol>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-center text-pink-600">
            特徴
          </h2>
          <ol className="flex flex-col md:flex-row items-center gap-4 md:gap-4 md:overflow-x-auto md:pb-4 md:snap-x md:snap-mandatory">
            <li className="flex flex-col items-center text-center bg-white p-6 rounded shadow w-full md:w-[26rem] space-y-2 flex-shrink-0 md:snap-start">
              <Image
                src="/images/features0tutor01.png"
                alt="現役エンジニアが指導"
                width={192}
                height={192}
                className="w-36 h-36 md:w-48 md:h-48"
              />
              <p className="font-semibold">現役エンジニアが指導</p>
            </li>
            <li className="hidden md:block text-3xl flex-shrink-0">➜</li>
            <li className="flex flex-col items-center text-center bg-white p-6 rounded shadow w-full md:w-[26rem] space-y-2 flex-shrink-0 md:snap-start">
              <Image
                src="/images/features0tutor02.png"
                alt="どんな疑問も「わかるまで」対応"
                width={192}
                height={192}
                className="w-36 h-36 md:w-48 md:h-48"
              />
              <p className="font-semibold">どんな疑問も「わかるまで」対応</p>
            </li>
            <li className="hidden md:block text-3xl flex-shrink-0">➜</li>
            <li className="flex flex-col items-center text-center bg-white p-6 rounded shadow w-full md:w-[26rem] space-y-2 flex-shrink-0 md:snap-start">
              <Image
                src="/images/features0tutor03.png"
                alt="オンライン・訪問・会議室から選べる柔軟プラン"
                width={192}
                height={192}
                className="w-36 h-36 md:w-48 md:h-48"
              />
              <p className="font-semibold">
                オンライン・訪問・会議室から選べる柔軟プラン
              </p>
            </li>
            <li className="hidden md:block text-3xl flex-shrink-0">➜</li>
            <li className="flex flex-col items-center text-center bg-white p-6 rounded shadow w-full md:w-[26rem] space-y-2 flex-shrink-0 md:snap-start">
              <Image
                src="/images/features0tutor04.png"
                alt="無料体験から安心スタート"
                width={192}
                height={192}
                className="w-36 h-36 md:w-48 md:h-48"
              />
              <p className="font-semibold">無料体験から安心スタート</p>
            </li>
          </ol>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-center text-pink-600">
            学べる内容例
          </h2>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <span>💡</span>
              <span>
                学校の情報の授業（表計算・プレゼン・プログラミング基礎）
              </span>
            </li>
            <li className="flex items-center gap-2">
              <span>💡</span>
              <span>Web制作（HTML / CSS / JavaScript）</span>
            </li>
            <li className="flex items-center gap-2">
              <span>💡</span>
              <span>Python入門、AI基礎（ChatGPTや最新AI技術の仕組み）</span>
            </li>
            <li className="flex items-center gap-2">
              <span>💡</span>
              <span>セキュリティやネットの仕組み</span>
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-center text-pink-600">
            お客様の声
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="p-4 bg-white rounded shadow space-y-2 text-center">
              <Image
                src="/images/student01.jpeg"
                alt="高1男子"
                width={180}
                height={180}
                className="mx-auto rounded-full"
              />
              <p className="font-semibold">高1男子</p>
              <p className="text-sm">
                「学校の授業がスムーズに理解できるようになりました！」
              </p>
            </div>
            <div className="p-4 bg-white rounded shadow space-y-2 text-center">
              <Image
                src="/images/student02.jpeg"
                alt="中3女子"
                width={180}
                height={180}
                className="mx-auto rounded-full"
              />
              <p className="font-semibold">中3女子</p>
              <p className="text-sm">
                「将来エンジニアを目指したい気持ちが強くなりました」
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4 text-center">
          <h2 className="text-2xl font-semibold text-pink-600">
            無料ガイダンス｜体験セッション
          </h2>
          <p>まずは情報系コースを体験する</p>
          <div className="flex flex-col items-center space-y-2">
            <Link
              href="/contact/tutor"
              className="inline-block px-6 py-3 bg-pink-500 text-white rounded-full shadow transition-base hover:bg-pink-600"
            >
              無料体験プログラムに申し込みたい
            </Link>
            <Link href="/pricing/tutor" className="text-pink-600 underline">
              各コースの受講料金一覧が知りたい
            </Link>
            <Link href="/contact/tutor" className="text-pink-600 underline">
              IT講座の講師や内容について詳しく知りたい
            </Link>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-center">
            💬 チャットで質問し放題
          </h3>
          <p className="text-center">
            毎日 9:00〜22:00 まで受付中！どんな小さな疑問でもお気軽にどうぞ。
          </p>
        </section>

        <section className="text-center">
          <Link
            href="/contact/tutor"
            className="inline-block px-8 py-3 bg-primary text-white rounded-full shadow transition-base hover:scale-105"
          >
            家庭教師に関するお問い合わせはこちら
          </Link>
        </section>
      </div>
    </div>
  );
}
