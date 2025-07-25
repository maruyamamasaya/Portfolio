import BlogNavButtons from '../components/BlogNavButtons';

export default function Works() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <BlogNavButtons />

      <h1 className="text-4xl font-extrabold mb-6 tracking-tight">
        独立系エンジニア × クリエイター
      </h1>

      <p className="mb-6 text-lg leading-relaxed">
        「分からない」を「分かる」に変える──<br />
        技術・アート・マーケを横断する“攻略型”情報発信を行う、実践志向のクリエイターです。
      </p>

      <div className="mb-8 space-y-2 text-base leading-relaxed">
        <p>🎓 1994年生まれ。20代中盤に大手金融系のシステム開発に3年従事。</p>
        <p>🚀 2022年に独立し、飲食・美容業界向けにシステム/SNS支援を展開。</p>
        <p>🏆 導入実績は100店舗以上。独立6ヶ月以内に月商350万円を達成。</p>
      </div>

      <p className="mb-6">
        副業・脱サラ・スキルアップといったテーマに寄り添い、
        ゲーム攻略のような「分かりやすさ・体験性」を重視した
        マルチメディア構成で発信を行っています。
      </p>

      <p className="mb-12 text-gray-600">※ 本名は非公開。活動名は今後設定予定です。</p>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">🎨 デザイン・制作事例</h2>

        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">LINE公式アカウント リッチメニュー</h3>
            <p className="text-sm text-gray-500 mb-2">スライドショー形式／画像 prof_001〜010.jpg</p>
            {/* 画像スライダー挿入予定 */}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">公式サイト・ポスター制作（例：東京タワー）</h3>
            <p className="text-sm text-gray-500 mb-2">画像 prof_a01〜a05.jpg</p>
            {/* 画像スライダー挿入予定 */}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">管理・決済システム 導入支援</h3>
            <p className="text-sm text-gray-500 mb-2">画像 prof_b01〜b03.jpg</p>
            {/* 画像スライダー挿入予定 */}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">エステサロン系 予約システム導入</h3>
            <p className="text-sm text-gray-500 mb-2">画像 prof_c01〜c03.jpg</p>
            {/* 画像スライダー挿入予定 */}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">その他 飲食店向けデザイン支援</h3>
            <p className="text-sm text-gray-500 mb-2">画像 prof_d01〜d03.jpg</p>
            {/* 画像スライダー挿入予定 */}
          </div>
        </div>
      </section>

      <p className="mt-4">
        ご依頼はこちらまで。WEB制作やデザイン作成など、お気軽にご相談ください：
        <a href="mailto:contact@freehackapp.com" className="text-primary hover:underline">
          contact@freehackapp.com
        </a>
      </p>
    </div>
  );
}
