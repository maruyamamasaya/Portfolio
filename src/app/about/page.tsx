import BlogNavButtons from '../components/BlogNavButtons';
import ScrollFadeIn from '../components/ScrollFadeIn';

export default function About() {
  return (
    <ScrollFadeIn className="max-w-2xl mx-auto px-4">
      <BlogNavButtons />
      <h1 className="text-3xl font-extrabold mb-6">独立系エンジニア × クリエイター</h1>

      <p className="mb-4 text-lg">
        「分からない」を「分かる」に変える──<br />
        技術・アート・マーケを横断する“攻略型”の情報発信を行っています。
      </p>

      <p className="mb-4">
        1994年生まれ。20代中盤で大手金融系のシステム開発に3年間従事したのち、2022年に独立。
        現在はフリーランスとして、飲食・美容業界の企業100店舗以上を対象に、
        SNS戦略とシステム支援を提供しています。
      </p>

      <p className="mb-4">
        「脱サラ」「副業」「スキルアップ」などのテーマに寄り添いながら、
        実践に役立つコンテンツを発信中。
        ゲーム攻略のような分かりやすさを意識した、読みやすいマルチメディア構成が特徴です。
      </p>

      <p className="mb-4">
        当サイトでは、技術系ブログ・デザイン思考・アート系の視点など、
        多様な切り口から価値ある情報をお届けします。
      </p>

      <p className="text-sm text-gray-500">※ 本名は非公開。活動名は今後設定予定です。</p>
    </ScrollFadeIn>
  );
}
