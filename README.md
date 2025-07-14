# ポートフォリオブログ

この README は日本語で記述されています。Next.js を用いたポートフォリオ兼ブログサイトです。`blog/` ディレクトリに Markdown 形式の記事を置くことで投稿できます。開発者向けの記事は `developers_blog/` ディレクトリに配置してください。

## Markdown ファイル構成

ブログ記事の Markdown ファイルのフォーマットは `docs/markdown-structure.md` にまとめています。

## セットアップ

依存パッケージをインストールした後、開発サーバーを起動します。

```bash
npm install
npm run dev
```

## デプロイ

`npm run build` でビルドし、`npm start` でサーバーを起動します。EC2 などの Node.js が動作する環境で実行してください。

## Basic 認証

`/developers_blog` 配下は Basic 認証で保護されています。デフォルトではユーザー名 `user`、パスワード `0000` を使用してください。

