import BlogNavButtons from '../components/BlogNavButtons';
import ScrollFadeIn from '../components/ScrollFadeIn';
import ProfileCategories from '../components/ProfileCategories';

export default function About() {
  return (
    <ScrollFadeIn className="max-w-2xl mx-auto px-4">
      <BlogNavButtons />
      <h1 className="text-3xl font-extrabold mb-6">独立系エンジニア × クリエイター</h1>

      <p className="mb-4 text-lg">
        「分からない」を「分かる」に変える──<br />
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
        当サイトでは、技術系ブログ・デザイン思考・アート系の視点など、
        多様な切り口から価値ある情報をお届けします。
      </p>

      <p className="text-sm text-gray-500">※ 本名は非公開。活動名は今後設定予定です。</p>
      <ProfileCategories />
    </ScrollFadeIn>
  );
}
