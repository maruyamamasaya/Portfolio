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
                    <li>チャットで質問し放題</li>
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

      <div className="text-right">
        <Link href="/pricing" className="accent-text hover:underline transition-base">
          ご料金についてはこちら
        </Link>
      </div>
    </div>
  );
}

