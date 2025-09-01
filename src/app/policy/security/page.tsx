import BlogNavButtons from '../../components/BlogNavButtons';

export default function Security() {
  return (
    <div className="max-w-screen-lg mx-auto px-4 sm:px-6 md:px-10 py-8">
      <BlogNavButtons />
      <h1 className="text-3xl font-extrabold mb-6">情報セキュリティ基本方針</h1>

      <p className="mb-4">
        本ウェブサイト（以下、「当サイト」）では、情報資産を適切に保護し、
        利用者の信頼に応えるため、以下のとおり情報セキュリティ基本方針を定めます。
      </p>

      <h2 className="text-xl font-bold mt-6 mb-2">1. 目的</h2>
      <p className="mb-4">
        当サイトは、情報資産を事故・災害・不正アクセスなどの脅威から守り、
        安全かつ適正に取り扱うことを目的とします。
      </p>

      <h2 className="text-xl font-bold mt-6 mb-2">2. 管理体制</h2>
      <p className="mb-4">
        情報セキュリティを管理する責任者を配置し、社内規程の整備と運用状況の点検を行います。
      </p>

      <h2 className="text-xl font-bold mt-6 mb-2">3. 教育・啓発</h2>
      <p className="mb-4">
        全ての関係者に対して情報セキュリティに関する教育・啓発活動を実施し、
        意識向上を図ります。
      </p>

      <h2 className="text-xl font-bold mt-6 mb-2">4. 事故への対応</h2>
      <p className="mb-4">
        情報セキュリティに関する事故が発生した場合には、速やかに原因を究明し、
        被害の拡大防止と再発防止に努めます。
      </p>

      <h2 className="text-xl font-bold mt-6 mb-2">5. 継続的な改善</h2>
      <p className="mb-4">
        社会的要請や技術の進歩に応じて、本方針および関連規程を見直し、
        情報セキュリティの維持・向上に努めます。
      </p>

      <p className="text-sm text-gray-500 mt-6">制定日：2025年7月15日</p>
    </div>
  );
}
