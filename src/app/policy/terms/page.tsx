import BlogNavButtons from '../../components/BlogNavButtons';

export default function Terms() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <BlogNavButtons />
      <h1 className="text-3xl font-extrabold mb-6">利用規約</h1>

      <p className="mb-4">
        本ウェブサイト（以下、「当サイト」）は、運営者（以下、「当方」）が個人で運営しています。
        当サイトをご利用される前に、以下の利用規約をお読みいただき、同意のうえでご利用ください。
      </p>

      <h2 className="text-xl font-bold mt-6 mb-2">第1条（著作権）</h2>
      <p className="mb-4">
        当サイト内に掲載されているテキスト、画像、動画、コードなどすべてのコンテンツは、特に明記されている場合を除き、当方に帰属します。
        無断転載・無断使用・再配布・AI学習データへの流用などを一切禁止します。
        引用される場合は、出典を明示してください。
      </p>

      <h2 className="text-xl font-bold mt-6 mb-2">第2条（禁止事項）</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>当サイトのコンテンツを無断で複製・転用・販売する行為</li>
        <li>当サイトまたは第三者に不利益・損害を与える行為</li>
        <li>公序良俗に反する行為、法令に違反する行為</li>
        <li>不正アクセスやサイトの改ざん、サーバーへの過剰負荷行為</li>
      </ul>

      <h2 className="text-xl font-bold mt-6 mb-2">第3条（免責事項）</h2>
      <p className="mb-4">
        当サイトの情報は、可能な限り正確かつ最新の情報を提供するよう努めていますが、その正確性・安全性・完全性を保証するものではありません。
        情報の利用によって生じたあらゆる損害について、当方は一切の責任を負いません。
      </p>

      <h2 className="text-xl font-bold mt-6 mb-2">第4条（リンク）</h2>
      <p className="mb-4">
        当サイトへのリンクは原則自由ですが、公序良俗に反するサイト、違法な情報を含むサイトからのリンクはお断りします。
        また、外部リンク先の内容に関しては一切の責任を負いません。
      </p>

      <h2 className="text-xl font-bold mt-6 mb-2">第5条（改定）</h2>
      <p className="mb-4">
        本規約は、必要に応じて事前の予告なく変更・更新する場合があります。最新の規約は本ページにて随時ご確認ください。
      </p>

      <p className="text-sm text-gray-500 mt-6">制定日：2025年7月15日</p>
    </div>
  );
}
