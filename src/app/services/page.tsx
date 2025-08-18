import React from 'react';

export const metadata = {
  title: 'サービス紹介',
};

export default function ServicesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-10 py-8 space-y-12">
      <h1 className="text-3xl font-bold">サービス紹介</h1>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Digi Goose（デジグース）</h2>
        <p>法人や個人フリーランス向けのサービス</p>
        <p>
          最新AIから業務効率まで、幅広くお任せ テクニカル法人サポート
        </p>
        <p>
          社内のIT活用やシステム運用、テクニカルな課題をまるごとサポートする法人向けサービスです。
          面倒な作業の自動化から先端技術の導入支援まで、現役エンジニアが伴走。
          ビジネスを“もっとスマートに”変えていきます。
        </p>
        <p>
          <a
            href="https://freehackapp.com/contact/business"
            className="accent-text hover:underline transition-base"
          >
            法人向けお問い合わせはこちら
          </a>
        </p>
        <p>
          <a
            href="https://freehackapp.com/pricing/business"
            className="accent-text hover:underline transition-base"
          >
            法人向け料金表
          </a>
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">DigiGoose</h2>
        <p>
          デジグース｜中高生の「できた！」を育てる、家庭教師型パソコンスクール
        </p>
        <p>
          学校の授業の補助からプログラミング・最先端ITまで、現役エンジニアがマンツーマンで指導する家庭教師型のパソコンスクールです。
          わからないを一緒に解決し、自分の力でできる喜びを育てます。オンライン・対面どちらにも対応。
        </p>
        <p>
          <a
            href="https://freehackapp.com/pricing/tutor"
            className="accent-text hover:underline transition-base"
          >
            家庭教師料金表
          </a>
        </p>
        <p>
          <a
            href="https://freehackapp.com/contact/tutor"
            className="accent-text hover:underline transition-base"
          >
            家庭教師に関するお問い合わせはこちら
          </a>
        </p>
      </section>
    </div>
  );
}

