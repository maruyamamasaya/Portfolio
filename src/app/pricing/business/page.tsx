import Link from 'next/link';

export const metadata = {
  title: 'ご料金',
};

export default function PricingPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-10 py-8 space-y-8">
      <h1 className="text-3xl font-bold mb-6">ご料金について</h1>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">法人向けプラン</h2>
        <p>ホームページ制作やシステム導入の料金目安です。</p>

        <div className="space-y-8">
          {/* LPサイト作成 */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">LPサイト作成</h3>
            <table className="w-full border-collapse border border-gray-300 dark:border-gray-600 text-sm">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-left">
                    サービス内容
                  </th>
                  <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-left">
                    サービスレベル（プランアップなど）
                  </th>
                  <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-left">
                    相場感
                  </th>
                  <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-left">
                    コスト
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 px-2 py-1 font-medium">
                    LPサイト作成（基本プラン）
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-2 py-1">
                    ページ作成（１ページにつき）
                    <br />
                    ＋保守・運用（メンテナンスなど）
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-2 py-1">
                    10万
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-2 py-1">
                    0円（顧客ドメイン取得要）
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 px-2 py-1 font-medium">
                    LPサイト作成（オプション）
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-2 py-1">
                    ＋サイト分析最適化
                    <br />
                    ＋詳細仕様（要件が多いなど）
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-2 py-1">
                    ＋月額10万
                    <br />
                    要相談
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-2 py-1"></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* HP作成 */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">HP作成</h3>
            <table className="w-full border-collapse border border-gray-300 dark:border-gray-600 text-sm">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-left">
                    サービス内容
                  </th>
                  <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-left">
                    サービスレベル（プランアップなど）
                  </th>
                  <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-left">
                    相場感
                  </th>
                  <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-left">
                    コスト
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 px-2 py-1 font-medium">
                    HP作成
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-2 py-1">
                    簡易ページ作成（１ページで完結する）
                    <br />
                    ＋保守・運用（メンテナンスなど）
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-2 py-1">
                    10万
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-2 py-1">
                    0円（顧客ドメイン取得要）
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 px-2 py-1 font-medium">
                    HP作成（大規模）
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-2 py-1">
                    企業規模の場合（アスバランHPくらい）
                    <br />
                    ＋詳細仕様
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-2 py-1">
                    30万
                    <br />
                    要相談
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-2 py-1">
                    0円（顧客ドメイン取得要）
                    <br />
                    要相談
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* LINE公式アカウント */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">LINE公式アカウント</h3>
            <table className="w-full border-collapse border border-gray-300 dark:border-gray-600 text-sm">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-left">
                    サービス内容
                  </th>
                  <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-left">
                    サービスレベル（プランアップなど）
                  </th>
                  <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-left">
                    相場感
                  </th>
                  <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-left">
                    コスト
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 px-2 py-1 font-medium">
                    LINE公式アカウント
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-2 py-1">
                    アカウント作成サポート・リッチメニュー作成・アンケート機能の実装
                    <br />
                    ＋保守・運用代行(一斉配信・ステップ配信・文章作成の代行
                    ※月4回まで）
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-2 py-1">
                    月額1万〜
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-2 py-1">
                    AWS従量課金による
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 px-2 py-1 font-medium">
                    LINE公式アカウント（オプション）
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-2 py-1">
                    ＋拡張機能（LINE用フォーム作成・簡易的な予約システム作成）
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-2 py-1">
                    ＋月額3万
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-2 py-1"></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* SNS運用・ショート動画 */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">SNS運用・ショート動画</h3>
            <table className="w-full border-collapse border border-gray-300 dark:border-gray-600 text-sm">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-left">
                    サービス内容
                  </th>
                  <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-left">
                    サービスレベル（プランアップなど）
                  </th>
                  <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-left">
                    相場感
                  </th>
                  <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-left">
                    コスト
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 px-2 py-1 font-medium">
                    ショート動画作成・リール作成
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-2 py-1">
                    市場調査・インプレッション増加可能なショート動画（〜30秒未満）の作成
                    <br />
                    ↑継続的な運用代行(投稿上限 月10件)
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-2 py-1">
                    1件5000円
                    <br />
                    月額5万〜
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-2 py-1">
                    0円
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 px-2 py-1 font-medium">
                    インスタ広告連携
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-2 py-1">
                    インスタ広告機能を使った商品のLPサイトの動線作り
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-2 py-1">
                    ＋10万（LPサイト作成込み）
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-2 py-1">
                    顧客側で広告費用を持つと0円
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* その他 */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">その他</h3>
            <table className="w-full border-collapse border border-gray-300 dark:border-gray-600 text-sm">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-left">
                    サービス内容
                  </th>
                  <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-left">
                    サービスレベル（プランアップなど）
                  </th>
                  <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-left">
                    相場感
                  </th>
                  <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-left">
                    コスト
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 px-2 py-1 font-medium">
                    プログラムの作成・提案
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-2 py-1"></td>
                  <td className="border border-gray-300 dark:border-gray-600 px-2 py-1">
                    1件 5000円
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-2 py-1"></td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 px-2 py-1 font-medium">
                    ロゴ作成・デザインの作成・バナー系の作成
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-2 py-1"></td>
                  <td className="border border-gray-300 dark:border-gray-600 px-2 py-1">
                    1件 5000円
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-2 py-1"></td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 px-2 py-1 font-medium">
                    簡単な文書作成
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-2 py-1"></td>
                  <td className="border border-gray-300 dark:border-gray-600 px-2 py-1">
                    1件 5000円
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-2 py-1"></td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 px-2 py-1 font-medium">
                    エクセル・ファイル整形・データ整理など
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-2 py-1"></td>
                  <td className="border border-gray-300 dark:border-gray-600 px-2 py-1">
                    1件 5000円
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-2 py-1"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <div className="text-right space-y-2">
        <Link
          href="/services"
          className="accent-text hover:underline transition-base block"
        >
          サービス紹介はこちら
        </Link>
        <Link
          href="/contact"
          className="accent-text hover:underline transition-base block"
        >
          お問い合わせはこちら
        </Link>
      </div>
    </div>
  );
}
