import BlogNavButtons from '../../components/BlogNavButtons';

export default function CopyrightPolicy() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <BlogNavButtons />
      <h1 className="text-3xl font-extrabold mb-6">著作権について</h1>

      <p className="mb-4">
        当サイト（以下「本サイト」）に掲載されているすべてのコンテンツ（文章、画像、映像、音声、プログラム、レイアウト、デザイン等）は、
        特に明記されている場合を除き、運営者に著作権が帰属します。
      </p>

      <h2 className="text-xl font-bold mt-6 mb-2">1. 無断使用の禁止</h2>
      <p className="mb-4">
        著作権法に基づき、当サイトのコンテンツの無断転載、複製、改変、翻訳、再配布、販売、AI学習データへの使用、その他の二次利用を固く禁じます。
        違反が判明した場合、法的措置を講じる場合があります。
      </p>

      <h2 className="text-xl font-bold mt-6 mb-2">2. 引用について</h2>
      <p className="mb-4">
        著作権法第32条に基づき、適切な引用の範囲内であれば利用可能です。引用にあたっては以下の条件を満たす必要があります：
      </p>
      <ul className="list-disc ml-6 mb-4">
        <li>引用部分が明確に区別されていること</li>
        <li>出典として本サイト名と該当ページURLを明示すること</li>
        <li>引用が主ではなく、自身の主張が主体となっていること</li>
      </ul>

      <h2 className="text-xl font-bold mt-6 mb-2">3. 権利侵害への対応</h2>
      <p className="mb-4">
        本サイトの内容に関して、著作権侵害・肖像権侵害などの問題があると判断される場合は、
        お手数ですが以下のお問い合わせ窓口までご連絡ください。速やかに調査・対応いたします。
      </p>

      <h2 className="text-xl font-bold mt-6 mb-2">4. 著作権侵害への対処</h2>
      <p className="mb-4">
        本サイトのコンテンツが無断で転載・悪用されていることを発見した場合、
        プロバイダ責任制限法に基づき、該当コンテンツの削除申請、Google
        DMCA申請、 および法的措置を含めた厳正な対応を行います。
      </p>

      <p className="text-sm text-gray-500 mt-6">制定日：2025年7月15日</p>
    </div>
  );
}
