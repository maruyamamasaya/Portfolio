# 電脳幻境プロジェクト

## 目次

- [Markdown ファイル構成](#markdown-ファイル構成)
- [セットアップ](#セットアップ)
- [デプロイ](#デプロイ)
- [画像ファイルについて](#画像ファイルについて)
  - [画像の配置先と推奨サイズ](#画像の配置先と推奨サイズ)
- [revalidate エンドポイントのセキュリティ](#revalidate-エンドポイントのセキュリティ)
  - [実装例](#実装例)
  - [環境変数](#環境変数)
  - [追加のベストプラクティス](#追加のベストプラクティス)

## Markdown ファイル構成

ブログ記事の Markdown ファイルのフォーマットは `docs/markdown-structure.md` にまとめています。`tags` や `updated` などのメタ情報もここで確認できます。

## セットアップ

依存パッケージをインストールした後、開発サーバーを起動します。

```bash
npm install
npm run dev
```

## デプロイ

`npm run build` でビルドし、`npm start` でサーバーを起動します。EC2 などの Node.js が動作する環境で実行してください。

## 画像ファイルについて

このリポジトリではバイナリファイル（画像など）をサポートしていません。
ヘッダーアイコンやヒーロー画像、フッターアイコンは `/images` に配置してお使いください。

### 画像の配置先と推奨サイズ

アプリで利用するアイコンや背景画像は `public/images/` ディレクトリに配置します。配置後は URL として `/images/ファイル名` を指定してください。

**注意**: Next.js の仕様上、`public` フォルダ以外に置いた画像はブラウザから読み込めません。`app/images` や `src/images` などに配置しないようにしてください。

| 用途 | ファイル名 | 推奨アスペクト比 | 推奨ピクセル数 |
| ---- | --------- | --------------- | -------------- |
| ヘッダーアイコン | `header_icon.png` | 1:1 | 64×64 |
| ヒーロー背景 | `hero_bg.png` | 16:9 | 1920×1080 |
| フッターアイコン | `footer_icon.png` | 1:1 | 48×48 |
| ファビコン | `favicon.png` | 1:1 | 32×32 |
| OGP 画像 | `eye-catch.png` | 16:9 | 1200×630 |

`favicon.png` と `eye-catch.png` は `public/images` ディレクトリに配置しています。利用する際はそれぞれ `/images/favicon.png` と `/images/eye-catch.png` を参照してください。

## revalidate エンドポイントのセキュリティ

Next.js では `res.revalidate()` を用いて静的ページを再生成できますが、
無制限に呼び出せるとサーバー負荷の増大や意図しない改ざんにつながります。
このプロジェクトでは `/api/revalidate` を以下のように保護しています。

### 実装例

```ts
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  const { slug } = await req.json();
  if (!slug) {
    return NextResponse.json({ message: 'Missing slug' }, { status: 400 });
  }

  revalidatePath(`/blog/${slug}`);
  return NextResponse.json({ revalidated: true, slug });
}
```

### 環境変数

`.env` に次の値を設定してください。

```env
REVALIDATE_SECRET=my_super_secret_token
```

### 追加のベストプラクティス

- 管理画面など認証済みの場所からのみ呼び出す
- 必要に応じてレート制限やログ出力を組み合わせる

