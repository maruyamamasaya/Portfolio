import BlogNavButtons from '../../components/BlogNavButtons';

export default function Privacy() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <BlogNavButtons />
      <h1 className="text-3xl font-extrabold mb-6">プライバシーポリシー</h1>

      <p className="mb-4">
        本ウェブサイト（以下、「当サイト」）では、利用者の個人情報を適切に保護・管理するため、
        以下のとおりプライバシーポリシー（以下、「本ポリシー」）を定めます。
      </p>

      <h2 className="text-xl font-bold mt-6 mb-2">1. 個人情報の定義</h2>
      <p className="mb-4">
        「個人情報」とは、氏名、メールアドレス、住所、電話番号など、特定の個人を識別できる情報を指します。
        また、ユーザーIDやパスワード、ログイン履歴、購買履歴などもこれに含まれます。
      </p>

      <h2 className="text-xl font-bold mt-6 mb-2">2. 個人情報の収集方法</h2>
      <p className="mb-4">
        当サイトでは、以下のような場面でユーザーから個人情報を取得する場合があります：
      </p>
      <ul className="list-disc ml-6 mb-4">
        <li>お問い合わせフォームの利用時</li>
        <li>アカウント登録・ログイン時</li>
        <li>ショップでの商品購入・決済時</li>
        <li>サービスへのコメント投稿やレビュー投稿時</li>
      </ul>

      <h2 className="text-xl font-bold mt-6 mb-2">3. 利用目的</h2>
      <p className="mb-4">
        取得した個人情報は、以下の目的にのみ使用いたします：
      </p>
      <ul className="list-disc ml-6 mb-4">
        <li>お問い合わせ対応</li>
        <li>会員サービスの提供および本人確認</li>
        <li>商品やサービスの発送・提供</li>
        <li>利用状況の分析や機能改善</li>
        <li>重要なお知らせや規約変更等の通知</li>
      </ul>

      <h2 className="text-xl font-bold mt-6 mb-2">4. 第三者提供について</h2>
      <p className="mb-4">
        当方は、法令に基づく場合を除き、ご本人の同意なく個人情報を第三者に提供することはありません。
      </p>

      <h2 className="text-xl font-bold mt-6 mb-2">5. 外部サービスとの連携</h2>
      <p className="mb-4">
        本サイトでは、以下の外部サービスを使用する場合があります：
      </p>
      <ul className="list-disc ml-6 mb-4">
        <li>Google Analytics（アクセス解析）</li>
        <li>Stripe、PayPal 等の決済代行サービス</li>
        <li>ログイン認証（Google、Apple IDなど）</li>
      </ul>
      <p className="mb-4">
        各サービスのプライバシーポリシーについては、各社の公式サイトをご参照ください。
      </p>

      <h2 className="text-xl font-bold mt-6 mb-2">6. Cookieの使用について</h2>
      <p className="mb-4">
        当サイトでは、ユーザー体験向上やアクセス解析のため、Cookie（クッキー）を使用する場合があります。
        Cookieの使用に同意した上でサイトをご利用ください。ブラウザ設定により無効にすることも可能です。
      </p>

      <h2 className="text-xl font-bold mt-6 mb-2">
        7. 個人情報の管理と安全対策
      </h2>
      <p className="mb-4">
        取得した情報は、適切なセキュリティ対策のもと、外部からの不正アクセスや漏洩を防止します。
        万一、情報漏洩等が発生した場合には、速やかに報告・対応いたします。
      </p>

      <h2 className="text-xl font-bold mt-6 mb-2">
        8. 個人情報の開示・訂正・削除
      </h2>
      <p className="mb-4">
        ご本人からの個人情報に関する開示・訂正・削除等のご希望には、合理的な範囲で速やかに対応いたします。
        ご希望の際は、下記のお問い合わせ窓口までご連絡ください。
      </p>

      <h2 className="text-xl font-bold mt-6 mb-2">9. 改定について</h2>
      <p className="mb-4">
        本ポリシーは、法令変更やサービス内容の変更に応じて、予告なく改定する場合があります。
        最新のプライバシーポリシーは本ページにて随時ご確認ください。
      </p>

      <h2 className="text-xl font-bold mt-6 mb-2">10. お問い合わせ</h2>
      <p className="mb-4">
        本ポリシーに関するお問い合わせは、以下のフォームまたはメールアドレスよりご連絡ください：
        <br />
        <a
          href="mailto:contact@freehackapp.com"
          className="accent-text hover:underline"
        >
          contact@freehackapp.com
        </a>
      </p>

      <p className="text-sm text-gray-500 mt-6">制定日：2025年7月15日</p>
    </div>
  );
}
