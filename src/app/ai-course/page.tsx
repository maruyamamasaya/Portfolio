import Image from 'next/image';
import Link from 'next/link';
import ScrollFadeIn from '../components/ScrollFadeIn';
import Card from '../components/Card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI講座 | でじサポ',
};

export default function AICoursePage() {
  const steps = [
    {
      title: 'ステップ1：ChatGPTと“話す”練習',
      points: ['プロンプトの基本', '文章改善・要約'],
      image: '/images/img1.svg',
    },
    {
      title: 'ステップ2：画像生成とデザイン',
      points: ['SNS用バナー生成', '無料ツール活用術'],
      image: '/images/img2.svg',
    },
    {
      title: 'ステップ3：AI × 自動化テクニック',
      points: ['定型業務を一発解決', 'ノーコード連携'],
      image: '/images/img3.svg',
    },
    {
      title: 'ステップ4：あなた専用AIの作り方',
      points: ['LINE Bot作成', 'スライド自動生成'],
      image: '/images/img4.svg',
    },
  ];

  const examples = [
    {
      title: 'EC運営が3倍の売上に',
      desc: 'AIで商品説明と在庫管理を自動化',
      image: '/images/img2.svg',
    },
    {
      title: 'レポート作成が3分で完了',
      desc: 'ChatGPTが秘書代わり',
      image: '/images/img3.svg',
    },
    {
      title: '家族全員で学習に活用',
      desc: '受験勉強にも役立つと好評',
      image: '/images/img5.svg',
    },
  ];

  const faqs = [
    { q: '本当に初心者でも大丈夫？', a: '名前しか知らない方にこそ最適です。' },
    {
      q: 'どんな人が受講していますか？',
      a: '主婦からフリーランスまで幅広い層です。',
    },
    {
      q: 'どんなAIを使うんですか？',
      a: 'ChatGPTやDALL·E、Canva、Zapierなどを実践的に扱います。',
    },
  ];

  return (
    <div className="space-y-16">
      {/* 1. HERO */}
      <section
        className="relative flex items-center justify-center h-[70vh] text-center bg-center bg-cover bg-fixed"
        style={{ backgroundImage: 'url("/images/aikouza-top.png")' }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative space-y-4 text-white p-4 max-w-xl">
          <h1 className="text-3xl font-extrabold text-balance">
            AIの波に乗り遅れていませんか？
          </h1>
          <p>
            今こそ、“使う側”から“使いこなす側”へ。ChatGPTや画像生成、作業
            自動化まで、まとめて学べる環境を整えました。
          </p>
          <p>
            1日15分の短い学習でも、毎日の仕事や勉強が大きく変わる。その
            実感を、多くの受講生が手にしています。
          </p>
          <Link
            href="/contact"
            className="inline-block px-6 py-3 bg-primary rounded shadow"
          >
            今すぐAI講座を体験する
          </Link>
        </div>
      </section>

      {/* 2. なぜ今AIを学ぶのか */}
      <ScrollFadeIn className="max-w-screen-lg mx-auto space-y-4 px-4 sm:px-6 md:px-10">
        <h2 className="text-2xl font-bold">なぜ今、AIを学ぶべきなのか？</h2>
        <ul className="list-disc ml-5 space-y-1">
          <li>AIに仕事が奪われると聞いて不安…</li>
          <li>何から始めればいいのか分からない…</li>
          <li>“知らない”だけで取り残される時代へ</li>
        </ul>
        <p>
          こうした悩みは、誰もが感じているものです。AIに詳しくなくて
          も、今学び始めるだけで十分追いつけます。必要なのは「理解でき
          る日本語での解説」と、すぐに試せる実例だけ。本講座ではその両
          方を用意しました。
        </p>
      </ScrollFadeIn>

      {/* 3. 未来のスキル＝AI活用力 */}
      <ScrollFadeIn className="max-w-screen-lg mx-auto space-y-3 px-4 sm:px-6 md:px-10">
        <h2 className="text-2xl font-bold">未来のスキル＝AI活用力</h2>
        <p>
          ChatGPT・画像生成・自動化など、実務に直結するスキルを一気に
          身につけられるのが本講座の特徴です。単なる解説だけではなく、
          すぐに手を動かせるワークを通じて学ぶことで、吸収が早まります。
        </p>
        <p>
          仕事も学習も、AIを味方にするだけで大きく変わります。自分
          の作業を代行するだけでなく、新たな発想や表現力を引き出す
          クリエイティブな武器にもなるでしょう。
        </p>
      </ScrollFadeIn>

      {/* 4. この講座で得られること */}
      <ScrollFadeIn className="max-w-screen-lg mx-auto px-4 sm:px-6 md:px-10 space-y-1">
        <h2 className="text-2xl font-bold">この講座で得られること</h2>
        <ul className="list-disc ml-5 space-y-1">
          <li>メール・企画書の自動生成で時短</li>
          <li>CanvaやMidjourneyでのデザイン自動化</li>
          <li>スプレッドシート連携でレポート自動作成</li>
          <li>何を質問すればよいか迷わなくなる</li>
        </ul>
        <p className="mt-2">
          これらの機能は一度覚えてしまえば一生ものの財産になります。
          作業時間を短縮することで生まれる余裕を、新しいアイデアやビ
          ジネス展開に振り向けてください。
        </p>
      </ScrollFadeIn>

      {/* 受講者の声 */}
      <ScrollFadeIn className="max-w-screen-lg mx-auto px-4 sm:px-6 md:px-10 space-y-4">
        <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <span className="absolute -top-3 left-4 text-2xl text-primary">📣</span>
          <h2 className="text-xl font-bold mb-4 text-center">受講者の声</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 text-right">
            ─ 企画職（20代・男性）
          </p>
          <p className="text-base leading-relaxed text-gray-700 dark:text-gray-200 whitespace-pre-line border-l-4 border-primary pl-4">
            最初は“話題のAI”くらいの認識でしたが、今では毎日の業務に欠かせない相棒です。\n\n商品説明のドラフト作成、定例会の議事録、自動返信メールの文面など、細かく時間を取られていたタスクが、ChatGPTのおかげで数分で完了するようになりました。\n\n特に驚いたのは「Zapier × ChatGPT」を使った業務フローの自動化。ノーコードで構築できるので、プログラミング知識ゼロでも本格的な仕組みが作れました。\n\n今では、資料作成・データ整理・社内問い合わせ対応などをAIが一部代行してくれています。業務効率が上がっただけでなく、自分の時間を“考える仕事”に充てられるようになったのが、一番の成果です。
          </p>
        </div>
      </ScrollFadeIn>

      {/* 5. コンテンツ構成（4STEP） */}
      <ScrollFadeIn className="w-full max-w-none p-4 sm:px-6 md:px-10 space-y-4">
        <h2 className="text-2xl font-bold">4STEPカリキュラム</h2>
        <div className="grid gap-4 md:grid-cols-4">
          {steps.map((s, i) => (
            <Card key={i} className="space-y-2 text-center">
              <Image
                src={s.image}
                alt={s.title}
                width={300}
                height={200}
                className="mx-auto"
              />
              <h3 className="font-semibold text-sm">{s.title}</h3>
              <ul className="list-disc ml-5 text-xs space-y-1">
                {s.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </ScrollFadeIn>

      {/* 6. AIで変わる現実の例 */}
      <ScrollFadeIn className="w-full max-w-none p-4 sm:px-6 md:px-10 space-y-4">
        <h2 className="text-2xl font-bold">AIで変わる現実の例</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {examples.map((ex, i) => (
            <Card key={i} className="space-y-2">
              <Image
                src={ex.image}
                alt={ex.title}
                width={400}
                height={250}
                className="w-full h-auto rounded"
              />
              <h3 className="font-semibold">{ex.title}</h3>
              <p className="text-sm">{ex.desc}</p>
            </Card>
          ))}
        </div>
        <p className="text-sm">
          受講生の多くは、最初は半信半疑で学び始めました。しかし
          今では「もっと早く知りたかった」と口をそろえます。小さな
          成功体験が積み重なり、大きな自信へと変わる瞬間をあなたも
          体感してください。
        </p>
      </ScrollFadeIn>

      {/* 7. サポート＆受講環境 */}
      <ScrollFadeIn className="max-w-screen-lg mx-auto px-4 sm:px-6 md:px-10 space-y-1">
        <h2 className="text-2xl font-bold">サポート＆受講環境</h2>
        <ul className="list-disc ml-5 space-y-1">
          <li>スマホだけでもOK、全レッスン動画付き</li>
          <li>質問し放題のLINEサポート</li>
          <li>挫折しないステップ式設計</li>
          <li>月1回のライブ勉強会あり</li>
        </ul>
        <p className="mt-2">
          初心者がつまずきやすいポイントを丁寧にフォローします。わから
          ないことがあれば、いつでも気軽に質問できる環境です。学習の
          モチベーションを維持する仕組みも豊富に用意しています。
        </p>
      </ScrollFadeIn>


      {/* 9. よくある質問 */}
      <ScrollFadeIn className="max-w-screen-lg mx-auto px-4 sm:px-6 md:px-10 space-y-4">
        <h2 className="text-2xl font-bold">よくある質問</h2>
        <ul className="space-y-2">
          {faqs.map((f, i) => (
            <li key={i} className="border rounded">
              <details className="p-2">
                <summary className="cursor-pointer font-semibold">
                  {f.q}
                </summary>
                <p className="mt-1 text-sm">{f.a}</p>
              </details>
            </li>
          ))}
        </ul>
        <p className="text-sm mt-2">
          ここに掲載されていない疑問点も、受講前に遠慮なくお問い合わせ
          ください。あなたの状況に合わせた活用例を提案させていただき ます。
        </p>
      </ScrollFadeIn>

      {/* 10. CTA */}
      <ScrollFadeIn className="text-center space-y-4 p-4">
        <h2 className="text-2xl font-bold">未来を変える一歩を</h2>
        <p>
          今日から始めることで、半年後には確実に変化を実感できます。
          迷っている時間はもったいない。まずは無料体験で、AIの力を自
          分の目で確かめてみてください。
        </p>
        <p>今だけ特典：ChatGPTの使い方完全ガイドPDFを無料プレゼント！</p>
        <Link
          href="/contact"
          className="inline-block px-6 py-3 bg-primary rounded shadow"
        >
          今すぐ無料で始める
        </Link>
      </ScrollFadeIn>
    </div>
  );
}
