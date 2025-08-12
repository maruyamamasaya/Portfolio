import BlogNavButtons from '../components/BlogNavButtons';
import CTASection from '../components/CTASection';
import ToolsGrid from '../components/ToolsGrid';
import SkillsGrid from '../components/SkillsGrid';
import Card from '../components/Card';
import ProfileCategories from '../components/ProfileCategories';
import MediaCardGrid from '../components/MediaCardGrid';

export const metadata = {
  title: 'About',
};

export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-10 py-8 space-y-10">
      <BlogNavButtons />
      <h1 className="text-3xl font-extrabold mb-6">
        ソロエンジニア × クリエイター – 企画から運営まで一人完結
      </h1>

      {/* プロフィール */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">プロフィール</h2>
        <p className="mb-4">
          外注なしのワンストップ対応。
          <br />
          企画から運営まで一貫してサポートしますので、安心してご相談いただけます。
        </p>
        <p className="mb-4 text-lg">
          「分からない」を「分かる」に変える──
          <br />
          技術・アート・マーケを横断する“攻略型”の情報発信を行っています。
        </p>
        <div className="space-y-1 text-sm">
          <p>🎓 1994年生まれ。20代中盤に大手金融系のシステム開発に3年従事。</p>
          <p>🚀 2022年に独立し、飲食・美容業界向けにシステム/SNS支援を展開。</p>
          <p>🏆 導入実績は100店舗以上。独立6ヶ月以内に月商350万円を達成。</p>
        </div>
        <p className="mb-4">
          「脱サラ」「副業」「スキルアップ」などのテーマに寄り添いながら、実践に役立つコンテンツを発信中。ゲーム攻略のような分かりやすさを意識した、読みやすいマルチメディア構成が特徴です。
        </p>
        <p className="mb-4">
          登録フォロワー数
          200名以上、発信記事数150記事以上。ビジネススキル向上に役立つ記事を中心に発信しています。
        </p>
        <p className="mb-4">
          当サイトでは、技術系ブログ・デザイン思考・アート系の視点など、多様な切り口から価値ある情報をお届けします。
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">導入事例</h2>
        <Card className="text-sm space-y-2" disableHover>
          <h3 className="text-lg font-semibold">
            LINE公式アカウント × ChatGPT × AWS
          </h3>
          <p>LINE自動応答・モバイルオーダー機能の独自開発</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>AWS上で構築したインフラにLINE Messaging APIとChatGPTを統合</li>
            <li>
              注文・問い合わせ・予約がLINE上で完結するモバイルオーダー仕組みを提供
            </li>
            <li>
              使用技術：AWS（Lambda, API Gateway, DynamoDB, S3 他）／LINE
              Messaging API／OpenAI API
            </li>
            <li>
              開発内容：自動応答Bot構築、注文情報の管理、メニュー表示・選択フロー設計
            </li>
            <li>
              特徴：インフラレスでスケーラブルな構成／ノーアプリで完結するUX
            </li>
          </ul>
        </Card>
      </section>

      <ProfileCategories />

      <section className="space-y-4">
        <h2 className="text-xl font-bold">Media / SNS活動</h2>
        <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          🎬
          YouTubeチャンネル2つとInstagramで、ポップス・クラシック音楽の解説やレビュー動画を投稿しています。音楽の背景や構造をわかりやすく紐解く「聴く攻略本」をコンセプトに、ショート動画中心で発信中です。
        </p>
        <div className="space-y-1 text-sm font-semibold text-primary">
          <p>総再生回数：100万回超（ショート動画中心）</p>
          <p>総登録者数：約500名（2025年時点）</p>
        </div>

        {/** Media cards */}
        <MediaCardGrid
          items={[
            {
              icon: '/images/arcana-Youtube.png',
              iconSize: 48,
              title: 'Arcana - アルカナ チャンネル',
              description:
                'エンタメ系ショート動画作成。TCGオフィシャルのルールやカード紹介をするチャンネル。',
              href: 'https://www.youtube.com/@Arcana-%E3%82%A2%E3%83%AB%E3%82%AB%E3%83%8A',
            },
            {
              icon: '/images/kuronosanbika-icon-Youtube.png',
              iconSize: 48,
              title: '【ざっくり紹介】楽曲紹介チャンネル〜黒の讃美歌〜',
              description:
                'クラシック音楽の構造を丁寧に読み解く解説型チャンネル。',
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

      <section className="space-y-4 text-sm">
        <h2 className="text-xl font-bold">活動ポリシー</h2>
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
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-bold">開発技術</h2>
        <ToolsGrid />
        <SkillsGrid />
      </section>

      <section className="space-y-4 text-sm">
        <h2 className="text-xl font-bold">更新履歴</h2>
        <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
          <tbody>
            <tr className="border-b border-gray-300 dark:border-gray-600">
              <td className="w-28 px-3 py-2 font-mono text-gray-600 text-left">2025/07/30</td>
              <td className="px-3 py-2 font-medium text-left">サイトリニューアル</td>
            </tr>
            <tr>
              <td className="w-28 px-3 py-2 font-mono text-gray-600 text-left">2025/07/30</td>
              <td className="px-3 py-2 font-medium text-left">ブログ機能追加</td>
            </tr>
          </tbody>
        </table>
      </section>

      <CTASection
        href="mailto:contact@freehackapp.com"
        label="📩 お仕事のご相談はこちら"
      />
    </div>
  );
}
