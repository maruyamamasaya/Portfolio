import BlogNavButtons from '../components/BlogNavButtons';
import ScrollFadeIn from '../components/ScrollFadeIn';
import ProfileCategories from '../components/ProfileCategories';
import SkillBars from '../components/SkillBars';
import CTASection from '../components/CTASection';

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

      <p className="text-sm text-gray-500">
        ※ 本名は非公開。活動名は今後設定予定です。
      </p>
      <SkillBars />
      <ProfileCategories />

      <section className="space-y-2 text-sm">
        <h2 className="text-lg font-bold">Media / SNS活動</h2>
        <p>🎬 YouTubeチャンネル2つ ＆ Instagram</p>
        <p>
          趣味で、ポップス・クラシック音楽の解説・レビューを発信する動画アカウントを運営中。
        </p>
        <p>
          音楽の背景や構造を分かりやすく紐解く“聴く攻略本”をコンセプトに、ショート動画を中心とした発信を行っています。
        </p>
        <p>総再生回数：100万回超（ショート動画中心）</p>
        <p>総登録者数：約500名（2025年時点）</p>
        <p>コンテンツ例：楽曲分析、作曲家紹介、音楽ジャンルの解説 など</p>
        <p className="text-xs text-gray-500">
          ポップス・クラシック音楽を分かりやすく解説するショート動画チャンネル
        </p>
        <div className="flex space-x-4">
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-primary text-white rounded shadow hover:bg-primary/80"
          >
            YouTubeチャンネル1
          </a>
          <a
            href="https://youtube.com/channel2"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-primary text-white rounded shadow hover:bg-primary/80"
          >
            YouTubeチャンネル2
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-primary text-white rounded shadow hover:bg-primary/80"
          >
            Instagramで見る
          </a>
        </div>
      </section>

      <section className="space-y-6 text-sm">
        <div>
          <h2 className="text-lg font-bold mb-2">活動ポリシー</h2>
          <p>ユーザーファースト・信頼性・継続学習を軸に活動しています。</p>
        </div>
        <div>
          <h2 className="text-lg font-bold mb-2">利用ツール</h2>
          <p>
            React / Next.js / Tailwind CSS / Figma / Zapier
            などを駆使しています。
          </p>
        </div>
        <div>
          <h2 className="text-lg font-bold mb-2">更新履歴</h2>
          <ul className="list-disc ml-5 space-y-1">
            <li>2025-01 サイトリニューアル</li>
            <li>2024-11 ブログ機能追加</li>
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
