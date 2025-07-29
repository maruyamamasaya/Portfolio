import BlogNavButtons from '../components/BlogNavButtons';
import ScrollFadeIn from '../components/ScrollFadeIn';
import ProfileCategories from '../components/ProfileCategories';
import SkillBars from '../components/SkillBars';
import CTASection from '../components/CTASection';
import ToolsGrid from '../components/ToolsGrid';
import MediaCardGrid from '../components/MediaCardGrid';

export default function About() {
  return (
    <ScrollFadeIn className="max-w-2xl mx-auto px-4 space-y-8">
      <BlogNavButtons />
      <h1 className="text-3xl font-extrabold mb-6">
        独立系エンジニア × クリエイター
      </h1>

      <p className="mb-4 text-lg">
        「分からない」を「分かる」に変える──
        <br />
        技術・アート・マーケを横断する“攻略型”の情報発信を行っています。
      </p>

      <div className="mb-4 space-y-1">
        <p>🎓 1994年生まれ。20代中盤に大手金融系のシステム開発に3年従事。</p>
        <p>🚀 2022年に独立し、飲食・美容業界向けにシステム/SNS支援を展開。</p>
        <p>🏆 導入実績は100店舗以上。独立6ヶ月以内に月商350万円を達成。</p>
      </div>

      <p className="mb-4">
        「脱サラ」「副業」「スキルアップ」などのテーマに寄り添いながら、
        実践に役立つコンテンツを発信中。
        ゲーム攻略のような分かりやすさを意識した、読みやすいマルチメディア構成が特徴です。
      </p>

      <p className="mb-4">
        登録フォロワー数 200名以上、発信記事数150記事以上。
        ビジネススキル向上に役立つ記事を中心に発信しています。
      </p>

      <p className="mb-4">
        当サイトでは、技術系ブログ・デザイン思考・アート系の視点など、
        多様な切り口から価値ある情報をお届けします。
      </p>

      <section className="space-y-2 text-sm">
        <h2 className="text-lg font-bold">
          LINE公式アカウント × ChatGPT × AWS
        </h2>
        <p>LINE自動応答・モバイルオーダー機能の独自開発</p>
        <p>
          AWS上で構築したインフラに、LINE Messaging
          APIとChatGPTを統合。ユーザーと
          の自然な対話を実現するLINE窓口や、飲食店向けのモバイルオーダー機能を開発しま
          した。LINE上で注文・問い合わせ・予約が完結する仕組みを提供し、店舗業務の効率
          化とユーザー体験の向上を実現しています。
        </p>
        <p>
          使用技術：AWS（Lambda, API Gateway, DynamoDB, S3 他）／LINE Messaging
          API／OpenAI API
        </p>
        <p>
          開発内容：自動応答Bot構築／注文情報の管理／LINE上でのメニュー表示・選択フローの設計
        </p>
        <p>特徴：インフラレスでスケーラブルな構成／ノーアプリで完結するUX</p>
      </section>

      <ProfileCategories />

      <section className="space-y-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
          Media / SNS活動
        </h2>
        <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          🎬 YouTubeチャンネル2つとInstagramで、ポップス・クラシック音楽の解説やレビュー動画を投稿しています。音楽の背景や構造をわかりやすく紐解く「聴く攻略本」をコンセプトに、ショート動画中心で発信中です。
        </p>
        <div className="space-y-1 text-sm font-semibold text-primary">
          <p>総再生回数：100万回超（ショート動画中心）</p>
          <p>総登録者数：約500名（2025年時点）</p>
        </div>

        {/** Media cards */}
        <MediaCardGrid
          items={[
            {
              icon: '/images/arcana.png',
              title: 'Arcana - アルカナ チャンネル',
              description: 'クラシック音楽の構造を丁寧に読み解く解説型チャンネル。',
              href: 'https://www.youtube.com/@Arcana-%E3%82%A2%E3%83%AB%E3%82%AB%E3%83%8A',
            },
            {
              icon: '🎥',
              title: '【ざっくり紹介】楽曲紹介チャンネル〜黒の讃美歌〜',
              description: 'ポップスやクラシックを横断した楽曲レビュー。',
              href: 'https://www.youtube.com/@musicwordriio',
            },
            {
              icon: '📷',
              title: 'Instagram',
              description: 'ショート動画と写真で分かりやすく音楽を解説。',
              href: 'https://www.instagram.com/xsbyli/',
            },
          ]}
        />
      </section>

      <section className="space-y-6 text-sm">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            活動ポリシー
          </h2>
          <p className="mb-4">
            <strong>「信頼される技術者であること」</strong>
            を最優先に、ユーザー視点での価値提供を心がけています。
            単なる知識提供や技術支援ではなく、本当に“役に立つ”体験を届けることを軸に活動しています。
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <p className="font-semibold">ユーザーファースト</p>
              <p>
                誰にでもわかりやすく、丁寧なサポートを心がけ、相談しやすい空気感を大切にしています。
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <p className="font-semibold">信頼性の担保</p>
              <p>
                不確かな情報は扱わず、検証・確認を通じた正確なアドバイスを提供します。
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <p className="font-semibold">継続学習の姿勢</p>
              <p>
                テクノロジーの進化に対応し続けるため、自ら学び、検証し、常に最新の知識で向き合います。
              </p>
            </div>
          </div>
        </div>
        <ToolsGrid />
        <SkillBars />
        <div>
          <h2 className="text-lg font-bold mb-2">更新履歴</h2>
          <ul className="ml-5 space-y-1">
            <li className="flex space-x-2 items-start">
              <span className="w-28 text-gray-500 font-serif">2025/07/30</span>
              <span className="border-b border-gray-300 dark:border-gray-600">サイトリニューアル</span>
            </li>
            <li className="flex space-x-2 items-start">
              <span className="w-28 text-gray-500 font-serif">2025/07/30</span>
              <span className="border-b border-gray-300 dark:border-gray-600">ブログ機能追加</span>
            </li>
          </ul>
        </div>
      </section>

      <CTASection
        href="mailto:contact@freehackapp.com"
        label="\uD83D\uDCE9 お仕事のご相談はこちら"
      />
    </ScrollFadeIn>
  );
}
