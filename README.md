# Digi Goose（デジグース）｜最新AIから業務効率まで、幅広くお任せ　テクニカル法人サポート

デジグース｜中高生の「できた！」を育てる、家庭教師型パソコンスクール

Digi Goose は、PCトラブルから最新AI活用までを扱う技術サポートブログ兼ポートフォリオサイトです。Markdownで記事を管理し、編集ページから手軽に投稿できます。

> **一時的なお知らせ**
> フッター直前に表示していたGIFアニメーションはテストのため現在非表示になっています。

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
- [開発ドキュメント](#開発ドキュメント)

## デモ

デモ用 GIF は現在リポジトリに含まれていません。ローカルで `npm run dev` を実行し、実際の画面を確認してください。

## 主な機能

- ✏️ Markdown 記事の投稿・編集
- 🗂️ カテゴリ・タグによる記事管理
- 📱 レスポンシブ対応
- 🔍 記事検索
  - トップページの検索バーでは記事タイトル・本文・カテゴリ・タグを横断して検索できます。
 - 🏷️ 右サイドバーのタグ検索ウィジェット（AWS / GitHub / React / Next.js / Docker）

## 使用技術

- React / Next.js
- TypeScript
- Tailwind CSS
- Framer Motion

## ディレクトリ構成

```text
src/
  app/          # ページおよびレイアウト
  lib/          # ユーティリティ
public/
  images/       # 画像ファイル
blog/           # 公開ブログ記事
```

## Markdown ファイル構成

ブログ記事は `blog/` 直下の Markdown ファイルとして管理され、`title`、`date`、`category`、`tags`、`image`、`alt`、`updated` などの front matter を利用できます。実装上の読み書きの流れは [`ARCHITECTURE.md`](ARCHITECTURE.md) と [`CODEMAP.md`](CODEMAP.md) を参照してください。

### チャット吹き出し記法

次のような簡単な構文で会話形式の吹き出しを表現できます。

```markdown
:::chat user01 Calm left
こんにちは！Reactについて教えてください。
:::

:::chat user02 Happy right
もちろんです！ReactはUIを作るためのライブラリです。
:::
```

`user01`〜`user10` は `/images/user01Calm.png` などのアイコンに対応します。2 番目の引数で感情 (`Calm` / `Happy` / `Serious` / `Troubled` / `Surprised` / `Sad`) を指定し、`left` と `right` は吹き出しの表示位置を示します。

## セットアップ

依存パッケージをインストールした後、開発サーバーを起動します。

```bash
npm install
npm run dev
```

## テストと Lint

コード変更時は次のコマンドで静的解析とテストを実行します。

```bash
npm run lint
npm test -- --passWithNoTests
```

`npm run lint` は `.eslintrc.json` を参照して ESLint を実行します。
`npm test -- --passWithNoTests` は `jest.config.js` に基づいて Jest を起動します。
テスト実行には `.env.local` に定義した環境変数が利用されるため、`*.example` をもとに設定してください。

## タグ検索ウィジェットのアイコン追加

右サイドバーのタグ検索ウィジェットに表示するアイコンは、`src/app/components/TagSearchWidget.tsx` の `tags` 配列に追記することで
簡単に増やせます。アイコン画像は `public/images/` に配置し、30px 程度のサイズを推奨します。

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
実装上の制約と環境設定は [`OPERATIONS.md`](OPERATIONS.md) を参照してください。

## 画像ファイルについて

新しいバイナリ画像はリポジトリへ追加せず、既存の `public/` または `data/` の素材を利用してください。実運用で外部配置する画像の管理方法は、このリポジトリでは定義されていません。

### 画像の配置先と推奨サイズ

現在追跡されている画像は主に `public/images/` と `public/icons/` にあります。`public/images/example.svg` は URL `/images/example.svg` として参照されます。

**注意**: Next.js の仕様上、`public` フォルダ以外に置いた画像はブラウザから読み込めません。`app/images` や `src/images` などに配置しないようにしてください。

| 用途             | ファイル名        | 推奨アスペクト比 | 推奨ピクセル数 |
| ---------------- | ----------------- | ---------------- | -------------- |
| ヘッダーアイコン | `headericon-light.png`, `headericon-dark.png` | 3:1              | 192×64         |
| ヒーロー背景     | `hero_bg.png`     | 128:67           | 1280×670       |
| フッターアイコン | `footer_icon.png` | 1:1              | 48×48          |
| ファビコン       | `favicon.png`     | 1:1              | 32×32          |
| OGP 画像         | `eye-catch.png`   | 128:67           | 1280×670       |

表中のファイル名は推奨名ですが、現在の Git 管理対象には含まれていないものがあります。デプロイ先で別途供給する場合も、コードが参照する URL と一致することを確認してください。
`ArcanaCardCarousel` が使用するアルカナカード画像は `public/images/arcana/` にあり、現在追跡されている拡張子は `.svg` です。

## Todo

- バックエンド API の追加実装
- 記事へのコメント機能

## ライセンス

[MIT](LICENSE)

## 作者・連絡先

- GitHub: [username](https://github.com/username)
- X: [@GooseDigi](https://x.com/GooseDigi)

## 貢献方法

不具合報告や機能提案は Issues から受け付けています。プルリクエストも大歓迎です。

## 開発ドキュメント

人間向けの概要とセットアップはこの README に残し、調査・設計・検証の詳細は目的別に分けています。

- [`CURRENT.md`](CURRENT.md): 実装済み・未実装・既知の問題・次の作業
- [`ARCHITECTURE.md`](ARCHITECTURE.md): 現在のシステム構成とデータフロー
- [`CODEMAP.md`](CODEMAP.md): 機能から主要コードと検索語へ進む索引
- [`TESTING.md`](TESTING.md): 変更内容に応じた検証方法
- [`SECURITY.md`](SECURITY.md): セキュリティ境界、既知のリスク、未確認事項
- [`OPERATIONS.md`](OPERATIONS.md): ローカル起動、環境変数、ビルド、デプロイ上の制約
- [`AGENTS.md`](AGENTS.md): AI エージェントの共通作業ルール
- [`decisions/`](decisions/README.md): 重要な設計判断の理由
- [`sessions/`](sessions/README.md): 短い作業引き継ぎ記録

AI エージェントは `CURRENT.md` から読み始め、必要な文書だけを開き、`CODEMAP.md` の検索語を使って対象コードへ進んでください。
