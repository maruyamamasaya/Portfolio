import Link from 'next/link';

export const metadata = {
  title: 'ご料金',
};

type Row = {
  service: string;
  price: string;
  benefits: string;
};

function SectionTable({
  title,
  note,
  rows,
}: {
  title: string;
  note?: string;
  rows: Row[];
}) {
  return (
    <section className="space-y-3">
      <h3 className="text-xl font-semibold">{title}</h3>
      {note && <p className="text-sm text-gray-600">{note}</p>}

      {/* PC: 3列テーブル / SP: カード表示 */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm border-separate border-spacing-0 rounded-xl overflow-hidden">
          <thead className="sticky top-0 z-10">
            <tr className="bg-white/60 backdrop-blur supports-[backdrop-filter]:bg-white/50">
              <th className="text-left font-medium px-4 py-3 border-b">サービス</th>
              <th className="text-left font-medium px-4 py-3 border-b w-40">費用感</th>
              <th className="text-left font-medium px-4 py-3 border-b">期待できること</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {rows.map((r, i) => (
              <tr
                key={i}
                className="bg-white/70 hover:bg-white transition-colors"
              >
                <td className="align-top px-4 py-3 font-medium">{r.service}</td>
                <td className="align-top px-4 py-3 whitespace-nowrap">{r.price}</td>
                <td className="align-top px-4 py-3 text-gray-700">{r.benefits}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {rows.map((r, i) => (
          <div
            key={i}
            className="rounded-xl border bg-white/80 p-4 shadow-sm"
          >
            <div className="font-semibold text-base">{r.service}</div>
            <div className="mt-1 text-sm">
              <span className="inline-block rounded-full border px-2 py-0.5">
                {r.price}
              </span>
            </div>
            <div className="mt-2 text-sm text-gray-700 leading-relaxed">
              {r.benefits}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function PricingPage() {
  const lpRows: Row[] = [
    {
      service: 'LPサイト作成（基本プラン）',
      price: '10万円 / 1ページ〜',
      benefits:
        '商品/サービスの要点を絞った1枚構成。CTA設計・ファーストビュー作成・問い合わせ導線までを最短で用意。',
    },
    {
      service: 'LP最適化・運用拡張（オプション）',
      price: '＋月額10万円〜（要件により変動）',
      benefits:
        '簡易解析とABテストでCVR改善。要件追加（セクション追加、FAQ、計測タグ整備等）にも対応。',
    },
  ];

  const hpRows: Row[] = [
    {
      service: 'HP作成（シンプル）',
      price: '10万円〜',
      benefits:
        '1ページ完結型の会社/店舗紹介。基本コンテンツ（概要・メニュー/サービス・アクセス・問い合わせ）を整備。',
    },
    {
      service: 'HP作成（大規模・企業向け）',
      price: '30万円〜（要相談）',
      benefits:
        '複数ページ・詳細要件に対応。情報設計、採用情報、ブログ機能、ニュース更新など中長期運用を前提に構築。',
    },
  ];

  const lineRows: Row[] = [
    {
      service: 'LINE公式アカウント 初期構築＋運用代行',
      price: '月額1万円〜',
      benefits:
        'アカウント開設、リッチメニュー作成、アンケート実装。月4回までの一斉配信/ステップ配信・原稿作成を代行。',
    },
    {
      service: 'LINE拡張（フォーム/予約の簡易自動化）',
      price: '＋月額3万円〜',
      benefits:
        'LINE上での簡易フォーム、予約受付の自動化で手作業を削減。来店前コミュニケーションの整流化に寄与。',
    },
  ];

  const snsRows: Row[] = [
    {
      service: 'ショート動画/リール作成 ＋ 運用',
      price: '制作：1本5,000円／運用：月額5万円〜（最大10本目安）',
      benefits:
        '市場調査にもとづく30秒前後の動画を継続制作。視認性と保存率を意識したテンプレ＋カスタムで伸ばす土台を構築。',
    },
    {
      service: 'インスタ広告とLP連携',
      price: '10万円（LP作成込み）＋ 広告費実費',
      benefits:
        '広告からLPまでの導線設計。計測タグ整備と初期最適化で、流入〜CVまでの摩擦を低減。',
    },
  ];

  const otherRows: Row[] = [
    {
      service: 'プログラム作成・小規模スクリプト提案',
      price: '1件 5,000円〜',
      benefits:
        '単純作業の自動化やデータ整形などを小さく素早く。まずは“困りごと”をヒアリングして最短の打ち手を提示。',
    },
    {
      service: 'ロゴ・デザイン・バナー制作',
      price: '1件 5,000円〜',
      benefits:
        'ブランドトーンに合わせた軽量なビジュアル制作。SNSやLPで使い回せる前提のサイズ/比率で納品。',
    },
    {
      service: '文章作成（お知らせ/店内掲示/ガイドなど）',
      price: '1件 5,000円〜',
      benefits:
        '伝わる日本語に整形。現場での運用を想定したテンプレ化や差し替えやすいレイアウトを提案。',
    },
    {
      service: 'Excel/ファイル整形・データ整理',
      price: '1件 5,000円〜',
      benefits:
        '既存データのクリーニング、簡易関数の導入、集計シート化で、日常業務の“迷い時間”を削減。',
    },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-10 py-10 space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold">ご料金について</h1>
        <p className="text-gray-600">
          目安の「費用感」と、導入後に「期待できること」を３列でまとめました。
          具体的な要件・ページ数・運用方針により前後します。
        </p>
      </header>

      <section className="space-y-8">
        <h2 className="text-2xl font-semibold">法人向けプラン</h2>

        <SectionTable
          title="LPサイト作成"
          note="ドメイン/サーバーはお客様ご用意 or ご相談可。運用/最適化のご依頼で継続改善まで伴走します。"
          rows={lpRows}
        />

        <SectionTable
          title="HP作成"
          note="小規模から大規模まで対応。情報設計と運用設計をセットで整えます。"
          rows={hpRows}
        />

        <SectionTable
          title="LINE公式アカウント"
          note="Messaging API等の技術要素は必要に応じて段階導入。まずは配信設計から。"
          rows={lineRows}
        />

        <SectionTable
          title="SNS運用・ショート動画"
          note="“続けられる仕組み”を重視。テンプレ＋カスタムのハイブリッドでスピード運用。"
          rows={snsRows}
        />

        <SectionTable
          title="その他"
          rows={otherRows}
        />
      </section>

      <footer className="text-right space-y-2">
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
      </footer>
    </div>
  );
}
