# 電脳幻境プロジェクト

この README は日本語で記述されています。Next.js を用いたポートフォリオ兼ブログサイトです。`blog/` ディレクトリに Markdown 形式の記事を置くことで投稿できます。開発者向けの記事は `developers_blog/` ディレクトリに配置してください。

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

## Basic 認証

`developers_blog` や `developer_edit` など、`developer` が付くページは Basic 認証で保護されています。
ユーザー名 `DENNOGENKYO`、パスワード `CYBERDREAM` を使用してください。
実際の管理画面は [https://freehackapp.com/developer_edit](https://freehackapp.com/developer_edit) からアクセスできます。

## その他のディレクトリ

| ディレクトリ名 | 用途例 |
| -------------- | ------- |
| `uploads/`     | 画像アップロード先 |
| `logs/`        | ログファイル保存先 |
| `tmp/`         | 一時ファイル保存先 |

将来的に使用する可能性があるため、あらかじめ作成してあります。

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
