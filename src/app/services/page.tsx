import Link from 'next/link';

export const metadata = {
  title: 'サービス紹介',
};

export default function ServicesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-10 py-8 space-y-8">
      <h1 className="text-3xl font-bold mb-6">サービス紹介</h1>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">サービス概要</h2>
        <p>
          私、現役エンジニアによる 個別指導スタイル のIT家庭教師サービスです。
          学校の情報の授業対策から、プログラミングや最新AI技術まで、
          “理解できるまで寄り添う” をモットーにしています。
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">👨‍🏫 講師紹介</h2>
        <p>
          現役エンジニアが直接指導！<br />
          実際にシステム開発の現場で活躍しているプロが、あなたのレベルに合わせて丁寧にサポートします。
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">コース紹介（プラン比較表）</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 dark:border-gray-600 text-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-left">プラン</th>
                <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-left">料金（月額）</th>
                <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-left">内容</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 dark:border-gray-600 px-2 py-1 font-medium">
                  💻 オンラインお手軽コース
                </td>
                <td className="border border-gray-300 dark:border-gray-600 px-2 py-1">5,000円</td>
                <td className="border border-gray-300 dark:border-gray-600 px-2 py-1">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>💬 チャットで質問し放題</li>
                    <li>毎日 9:00〜22:00 まで受付中！</li>
                    <li>どんな小さな疑問でもお気軽にどうぞ。</li>
                    <li>今ホットなトレンドの配信もあるよ！</li>
                    <li>YouTube動画、TikTok動画でも、配信中</li>
                    <li>当日中に回答</li>
                    <li>噛み砕いた解説で何度でも質問OK</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-600 px-2 py-1 font-medium">
                  🏠 家庭訪問プラン
                </td>
                <td className="border border-gray-300 dark:border-gray-600 px-2 py-1">25,000円</td>
                <td className="border border-gray-300 dark:border-gray-600 px-2 py-1">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>月4回 × 3h、東京都内どこでも訪問</li>
                    <li>宿題や課題も一緒に解決</li>
                    <li>PCや教材を直接使って理解を深める</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-600 px-2 py-1 font-medium">
                  🏢 個別塾プラン
                </td>
                <td className="border border-gray-300 dark:border-gray-600 px-2 py-1">20,000円〜</td>
                <td className="border border-gray-300 dark:border-gray-600 px-2 py-1">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>レンタル会議室で月2回 × 3h</li>
                    <li>集中できる学習環境</li>
                    <li>進度に合わせたカリキュラム</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">受講までの流れ</h2>
        <ul className="space-y-4">
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
      </section>

      <div className="text-right">
        <Link href="/pricing" className="accent-text hover:underline transition-base">
          ご料金についてはこちら
        </Link>
      </div>
    </div>
  );
}

