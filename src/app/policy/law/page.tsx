import BlogNavButtons from '../../components/BlogNavButtons';

export default function Law() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <BlogNavButtons />
      <h1 className="text-3xl font-extrabold mb-6">特定商取引法に基づく表記</h1>

      <dl className="space-y-4">
        <div>
          <dt className="font-bold">販売事業者名</dt>
          <dd>（個人の場合）非公開</dd>
        </div>
        <div>
          <dt className="font-bold">運営責任者</dt>
          <dd>同上</dd>
        </div>
        <div>
          <dt className="font-bold">所在地</dt>
          <dd>東京都〇〇区〇〇〇〇 ※ご請求に応じて遅滞なく開示いたします</dd>
        </div>
        <div>
          <dt className="font-bold">メールアドレス</dt>
          <dd>
            <a
              href="mailto:contact@freehackapp.com"
              className="accent-text hover:underline"
            >
              contact@freehackapp.com
            </a>
          </dd>
        </div>
        <div>
          <dt className="font-bold">販売価格</dt>
          <dd>各商品・サービスごとに記載</dd>
        </div>
        <div>
          <dt className="font-bold">商品代金以外の必要料金</dt>
          <dd>
            消費税、振込手数料、配送料など（商品により異なる場合があります）
          </dd>
        </div>
        <div>
          <dt className="font-bold">お支払い方法</dt>
          <dd>クレジットカード決済、銀行振込、電子マネー等</dd>
        </div>
        <div>
          <dt className="font-bold">お支払い期限</dt>
          <dd>ご注文確定後7日以内、または決済画面に表示される期日まで</dd>
        </div>
        <div>
          <dt className="font-bold">商品引渡時期</dt>
          <dd>決済確認後、即時または24時間以内（デジタル商品）</dd>
        </div>
        <div>
          <dt className="font-bold">返品・キャンセルについて</dt>
          <dd>
            デジタル商品の性質上、返品・返金はお受けしておりません。内容に不備がある場合はお問い合わせください。
          </dd>
        </div>
        <div>
          <dt className="font-bold">販売条件</dt>
          <dd>日本国内在住の個人または法人</dd>
        </div>
      </dl>

      <p className="text-sm text-gray-500 mt-6">最終更新日：2025年7月15日</p>
    </div>
  );
}
