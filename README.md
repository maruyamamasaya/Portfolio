# Digi Goose（デジグース）｜最新AIから業務効率まで、幅広くお任せ　テクニカル法人サポート

デジグース｜中高生の「できた！」を育てる、家庭教師型パソコンスクール

![demo](public/image/demo.gif)

Digi Goose は、PCトラブルから最新AI活用までを扱う技術サポートブログ兼ポートフォリオサイトです。Markdownで記事を管理し、編集ページから手軽に投稿できます。

## 目次

- [デモ](#デモ)
- [主な機能](#主な機能)
- [使用技術](#使用技術)
- [ディレクトリ構成](#ディレクトリ構成)
- [Markdown ファイル構成](#markdown-ファイル構成)
- [セットアップ](#セットアップ)
- [テストと Lint](#テストと-lint)
- [環境変数](#環境変数)
- [デプロイ](#デプロイ)
- [開発者向け編集ページ](#開発者向け編集ページ)
- [画像ファイルについて](#画像ファイルについて)
- [Todo](#todo)
- [ライセンス](#ライセンス)
- [作者・連絡先](#作者連絡先)
- [貢献方法](#貢献方法)

## デモ

アプリの動作イメージは以下の GIF を参考にしてください。

![デモ GIF](public/image/demo.gif)

## 主な機能

- ✏️ Markdown 記事の投稿・編集
- 🗂️ カテゴリ・タグによる記事管理
- 📱 レスポンシブ対応
- 🔍 記事検索
  - トップページの検索バーでは記事タイトル・本文・カテゴリ・タグを横断して検索できます。

## 使用技術

- React / Next.js
- TypeScript
- Tailwind CSS
- Prisma
- Framer Motion

## ディレクトリ構成

```text
src/
  app/          # ページおよびレイアウト
  lib/          # ユーティリティ
public/
  images/       # 画像ファイル
blog/           # 公開ブログ記事
developers_blog/# 開発者向け記事
```

## Markdown ファイル構成

ブログ記事の Markdown ファイルのフォーマットは `docs/markdown-structure.md` にまとめています。`tags` や `updated` などのメタ情報もここで確認できます。
API エンドポイントの詳細は `docs/api-routes.md` に記載しています。
レイアウトに使う主な Tailwind クラスは `docs/layout.md` にまとめています。

## セットアップ

依存パッケージをインストールした後、開発サーバーを起動します。

```bash
npm install
npm run dev
```

## テストと Lint

コード変更時は次のコマンドで静的解析、コード整形、テストを実行できます。

```bash
npm run lint
npm run format
npm test
```

`npm run lint` は `.eslintrc.json` を参照して ESLint を実行します。
ArcanaCardCarousel コンポーネントで使用するアルカナカード画像は `public/images/arcana` に配置しており、拡張子は `.png` です。
`npm run format` は リポジトリの `.prettierrc` を参照して Prettier を実行します。
ArcanaCardCarousel コンポーネントで使用するアルカナカード画像は `public/images/arcana` に配置しており、拡張子は `.png` です。
`npm test` は `jest.config.js` に基づいて Jest を起動します。
テスト実行には `.env.local` に定義した環境変数が利用されるため、`\*.example` をも
とに設定してください。

### 初回マウントアニメーションの無効化

開発中にページ遷移アニメーションを停止したい場合は、`.env.local` に次の設定を追加します。

```env
NEXT_PUBLIC_DISABLE_INITIAL_ANIMATION=true
```

この変数が `true` のとき、`PageTransition` コンポーネントによるフェードインをスキップします。

### Basic 認証の設定

開発者向けページへのアクセスには Basic 認証を利用します。ユーザー名とパスワードを `.env.local` に設定してください。

```env
BASIC_AUTH_USERNAME=your_username
BASIC_AUTH_PASSWORD=your_password
```

## 環境変数

アプリで利用する主な環境変数を以下にまとめています。`.env.example` を参考に `.env.local` を作成してください。

| 変数名                                | 説明                                           |
| ------------------------------------- | ---------------------------------------------- |
| NEXT_PUBLIC_DISABLE_INITIAL_ANIMATION | 初回マウントアニメーションを無効化             |
| BASIC_AUTH_USERNAME                   | Basic 認証のユーザー名                         |
| BASIC_AUTH_PASSWORD                   | Basic 認証のパスワード                         |
| REVALIDATE_SECRET                     | `/api/revalidate` の `secret` パラメータに使用 |

`REVALIDATE_SECRET` の値は `/api/revalidate?secret=...` に指定し、手動で ISR を再生成する際の認証トークンとして利用します。

## デプロイ

`npm run build` でビルドし、`npm start` でサーバーを起動します。EC2 などの Node.js が動作する環境で実行してください。

## 開発者向け編集ページ

`/developer_edit` ではブラウザ上で Markdown 記事の作成や編集が行えます。公開ページの改ざんを防ぐため、このページには Basic 認証を適用済みです。`.env.local` に `BASIC_AUTH_USERNAME` と `BASIC_AUTH_PASSWORD` を設定して利用してください。
詳細な使い方は [`docs/editor.md`](docs/editor.md) を参照してください。

## 画像ファイルについて

このリポジトリではバイナリファイル（画像など）をサポートしていません。画像は GitHub で管理せず、FTP で別途アップロードしてください。アップロードや生成 AI などで新規ファイルを作成しないようご注意ください。ヘッダーアイコンやヒーロー画像、フッターアイコンは `/images` に配置してお使いください。

### 画像の配置先と推奨サイズ

アプリで利用するアイコンや背景画像は `public/image/` ディレクトリに配置します。配置後は URL として `/images/ファイル名` を指定してください。

**注意**: Next.js の仕様上、`public` フォルダ以外に置いた画像はブラウザから読み込めません。`app/images` や `src/images` などに配置しないようにしてください。

| 用途             | ファイル名        | 推奨アスペクト比 | 推奨ピクセル数 |
| ---------------- | ----------------- | ---------------- | -------------- |
| ヘッダーアイコン | `headericon-light.png`, `headericon-dark.png` | 3:1              | 192×64         |
| ヒーロー背景     | `hero_bg.png`     | 128:67           | 1280×670       |
| フッターアイコン | `footer_icon.png` | 1:1              | 48×48          |
| ファビコン       | `favicon.png`     | 1:1              | 32×32          |
| OGP 画像         | `eye-catch.png`   | 128:67           | 1280×670       |

`favicon.png` と `eye-catch.png` は `public/image` ディレクトリに配置しています。利用する際はそれぞれ `/images/favicon.png` と `/images/eye-catch.png` を参照してください。
ArcanaCardCarousel コンポーネントで使用するアルカナカード画像は `public/images/arcana` に配置しており、拡張子は `.png` です。

## Todo

- バックエンド API の追加実装
- 記事へのコメント機能

## ライセンス

[MIT](LICENSE)

## 作者・連絡先

- GitHub: [username](https://github.com/username)
- Twitter: [@user](https://twitter.com/user)

## 貢献方法

不具合報告や機能提案は Issues から受け付けています。プルリクエストも大歓迎です。
