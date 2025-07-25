import { useState } from 'react';
import BlogNavButtons from '../components/BlogNavButtons';
import ImageSlider from '../components/ImageSlider';

interface Work {
  id: number;
  category: string;
  title: string;
  description: string;
  images: string[];
}

const worksData: Work[] = [
  {
    id: 1,
    category: 'Design',
    title: 'LINE公式アカウント リッチメニュー',
    description: 'スライドショー形式／画像 prof_001〜010.jpg',
    images: ['/images/img1.svg', '/images/img2.svg', '/images/img3.svg'],
  },
  {
    id: 2,
    category: 'Website',
    title: '公式サイト・ポスター制作（例：東京タワー）',
    description: '画像 prof_a01〜a05.jpg',
    images: ['/images/img2.svg', '/images/img3.svg', '/images/img4.svg'],
  },
  {
    id: 3,
    category: 'System',
    title: '管理・決済システム 導入支援',
    description: '画像 prof_b01〜b03.jpg',
    images: ['/images/img3.svg', '/images/img4.svg', '/images/img5.svg'],
  },
  {
    id: 4,
    category: 'System',
    title: 'エステサロン系 予約システム導入',
    description: '画像 prof_c01〜c03.jpg',
    images: ['/images/img4.svg', '/images/img5.svg', '/images/img1.svg'],
  },
  {
    id: 5,
    category: 'Design',
    title: 'その他 飲食店向けデザイン支援',
    description: '画像 prof_d01〜d03.jpg',
    images: ['/images/img5.svg', '/images/img1.svg', '/images/img2.svg'],
  },
];

export default function Works() {
  const [category, setCategory] = useState('All');
  const [selected, setSelected] = useState<Work | null>(null);

  const categories = Array.from(new Set(worksData.map((w) => w.category)));
  const filtered = category === 'All' ? worksData : worksData.filter((w) => w.category === category);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <BlogNavButtons />

      <h1 className="text-4xl font-extrabold mb-6 tracking-tight">独立系エンジニア × クリエイター</h1>

      <p className="mb-6 text-lg leading-relaxed">
        「分からない」を「分かる」に変える──<br />技術・アート・マーケを横断する“攻略型”情報発信を行う、実践志向のクリエイターです。
      </p>

      <div className="mb-8 space-y-2 text-base leading-relaxed">
        <p>🎓 1994年生まれ。20代中盤に大手金融系のシステム開発に3年従事。</p>
        <p>🚀 2022年に独立し、飲食・美容業界向けにシステム/SNS支援を展開。</p>
        <p>🏆 導入実績は100店舗以上。独立6ヶ月以内に月商350万円を達成。</p>
      </div>

      <p className="mb-6">副業・脱サラ・スキルアップといったテーマに寄り添い、ゲーム攻略のような「分かりやすさ・体験性」を重視したマルチメディア構成で発信を行っています。</p>

      <p className="mb-12 text-gray-600">※ 本名は非公開。活動名は今後設定予定です。</p>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">🎨 デザイン・制作事例</h2>

        <div className="flex space-x-2 mb-6">
          <button
            onClick={() => setCategory('All')}
            className={`px-3 py-1 border rounded ${category === 'All' ? 'bg-primary text-white' : ''}`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1 border rounded ${category === cat ? 'bg-primary text-white' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="space-y-8">
          {filtered.map((work) => (
            <div key={work.id}>
              <h3 className="text-lg font-semibold mb-2">{work.title}</h3>
              <p className="text-sm text-gray-500 mb-2">{work.description}</p>
              <ImageSlider images={work.images} />
              <button
                onClick={() => setSelected(work)}
                className="mt-2 text-sm text-primary underline"
              >
                詳細を見る
              </button>
            </div>
          ))}
        </div>
      </section>

      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 max-w-lg w-full">
            <h3 className="text-lg font-semibold mb-2">{selected.title}</h3>
            <ImageSlider images={selected.images} />
            <p className="mt-2 text-sm text-gray-600">{selected.description}</p>
            <button
              onClick={() => setSelected(null)}
              className="mt-4 px-4 py-2 bg-primary text-white rounded"
            >
              閉じる
            </button>
          </div>
        </div>
      )}

      <p className="mt-4">
        ご依頼はこちらまで。WEB制作やデザイン作成など、お気軽にご相談ください：
        <a href="mailto:contact@freehackapp.com" className="text-primary hover:underline">contact@freehackapp.com</a>
      </p>
    </div>
  );
}
