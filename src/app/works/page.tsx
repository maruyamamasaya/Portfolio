'use client';

import BlogNavButtons from '../components/BlogNavButtons';
import Card from '../components/Card';
import Image from 'next/image';
import Link from 'next/link';

import ArtworkSlideshow, { Artwork } from '../components/ArtworkSlideshow';
import ArcanaWorkCarousel from '../components/ArcanaWorkCarousel';

const artworks: Artwork[] = [
  {
    id: 1,
    title: 'デジタルアート 001',
    year: 2023,
    medium: 'Digital',
    description: '抽象的な形状をモチーフにした実験的作品。',
    image: '/images/img1.svg',
  },
  {
    id: 2,
    title: '風景スケッチ',
    year: 2022,
    medium: 'Watercolor',
    description: '旅行先で描いた水彩スケッチ。',
    image: '/images/img2.svg',
  },
  {
    id: 3,
    title: 'モノクロ写真集',
    year: 2021,
    medium: 'Photography',
    description: '街並みをテーマにしたシリーズ。',
    image: '/images/img3.svg',
  },
  {
    id: 4,
    title: '立体コラージュ',
    year: 2020,
    medium: 'Mixed Media',
    description: '紙と布を組み合わせた立体作品。',
    image: '/images/img4.svg',
  },
  {
    id: 5,
    title: 'デジタルイラスト',
    year: 2019,
    medium: 'Digital',
    description: 'キャラクターデザインの習作。',
    image: '/images/img5.svg',
  },
  {
    id: 6,
    title: '日本の森とデジタル',
    year: 2024,
    medium: 'Digital',
    description:
      '自然の森が複雑な生態系を通じて無数の生命を育むように、AIは膨大なデータを吸収し、深層学習という「見えない森」を形成していく。一本一本の樹木が森を成すように、一つひとつのパラメータが知性を形づくる──自然とデジタル、その生成の原理は驚くほど似ている。',
    image: '/images/artwork01-mori.png',
  },
  {
    id: 7,
    title: '日本の森とデジタル II',
    year: 2024,
    medium: 'Digital',
    description:
      '自然の森が複雑な生態系を通じて無数の生命を育むように、AIは膨大なデータを吸収し、深層学習という「見えない森」を形成していく。一本一本の樹木が森を成すように、一つひとつのパラメータが知性を形づくる──自然とデジタル、その生成の原理は驚くほど似ている。',
    image: '/images/artwork02-mori.png',
  },
];

const arcanaImages = Array.from({ length: 12 }, (_, i) =>
  `/images/arcana/arcanacard${String(i + 1).padStart(5, '0')}.svg`,
);

export default function Works() {
  const regularArtworks = artworks.filter((a) => a.id <= 5);
  const slideshowArtworks = artworks.filter((a) => a.id > 5);
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-10 py-8">
      <BlogNavButtons />
      <h1 className="text-3xl font-extrabold mb-6">Works</h1>
      <div className="mb-6 space-y-4">
        <h2 className="text-xl font-bold">かたちにした思考の軌跡</h2>
        <p>
          このセクションでは、これまでに制作してきたビジュアル作品やプロジェクトを紹介しています。アイデアの芽から完成に至るまでのプロセスも含めて、思考と表現の融合を記録しています。
        </p>
        <p>
          日々の創作活動の中で生まれた作品をまとめています。ジャンルや形式を問わず、試行錯誤や発見の過程を大切にしながら、表現のかたちを追求しています。
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {regularArtworks.map((art) => (
          <Card key={art.id} className="space-y-2">
            <Image
              src={art.image}
              alt={art.title}
              width={600}
              height={400}
              className="w-full h-auto object-cover rounded"
            />
            <h3 className="font-semibold">{art.title}</h3>
            <p className="text-sm text-gray-500">
              {art.year} / {art.medium}
            </p>
            {art.description && <p className="text-sm">{art.description}</p>}
          </Card>
        ))}
      </div>
      {slideshowArtworks.length > 0 && (
        <div className="mt-8">
          <ArtworkSlideshow artworks={slideshowArtworks} />
        </div>
      )}
      <div className="mt-8">
        <Card className="space-y-3">
          <h2 className="text-xl font-bold">アルカナ公式 TCGカード</h2>
          <p>
            神秘的なアルカナの力を駆使して戦うターン制カードゲームを開発中。
            美麗なイラストと戦略性が魅力です。
          </p>
          <ArcanaWorkCarousel images={arcanaImages} autoSlideInterval={3000} />
          <Link
            href="/arcana"
            className="inline-block px-4 py-2 bg-primary text-white rounded shadow"
          >
            特設ページを見る
          </Link>
        </Card>
      </div>
    </div>
  );
}
