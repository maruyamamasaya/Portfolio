# アーキテクチャ

## システム概要

Digi Goose は単一の Next.js 14 App Router アプリケーションである。Server Component と Route Handler がローカルの `blog/` から Markdown を読み、Client Component がナビゲーション、絞り込み、アニメーション、テーマ、問い合わせフォーム、編集画面を担う。アプリケーション DB は存在しない。

```text
Browser
  -> Next.js App Router (src/app)
       |-- pages / React components / route handlers
       |-- blog/*.md（fs/promises）
       |-- data/categories.ts
       `-- AWS SES（問い合わせメールのみ）
/developer_edit -> Basic Auth middleware
push / PR -> GitHub Actions: npm ci -> lint -> Jest
```

## 技術構成

- Next.js 14.2、React 18、TypeScript、Node.js runtime。
- Tailwind CSS / PostCSS、Framer Motion。
- front matter は `gray-matter`、Markdown 変換は unified / remark / rehype。
- 問い合わせ送信は AWS SDK v3 の SES client。
- Jest + ts-jest / babel-jest、ESLint (`next/core-web-vitals`)、Prettier。

## 主要ディレクトリ

| パス | 責務 |
| --- | --- |
| `src/app/` | App Router の layout、page、Route Handler、style |
| `src/app/components/` | 共通 UI、Client UI、編集 UI |
| `src/lib/` | 記事、Markdown、カテゴリ、検証、エラー |
| `data/` | 静的カテゴリ定義 |
| `blog/` | 実行時 Markdown ストア（Git 上は現在空） |
| `public/` | 静的 SVG と placeholder |
| `data/image-assets.json` | 欠落画像の仮画像・本番URLマッピング |
| `__tests__/`, `src/**/__tests__/` | Jest テスト |
| `.github/workflows/` | 検証 CI |

## 主要な入口

- `src/app/layout.tsx`: metadata、font、theme、header/footer/navigation、タグ件数。
- `src/app/page.tsx` と `HomeWindow.tsx`: ホーム画面と新着・カテゴリ記事。
- `src/app/blog/[slug]/page.tsx` と `PostLayout.tsx`: 記事取得、変換、前後・関連記事、描画。
- `SearchBar.tsx` と search/tag/category route: 記事探索。
- `DeveloperEditor.tsx`: ブラウザ CRUD と preview。
- `BusinessContactForm.tsx` / `TutorContactForm.tsx`: `/api/contact` の client。

## データフロー

### 記事の読取と表示

1. App Router の page が `src/lib/posts.ts` を呼ぶ。
2. `blog/*.md` を読み、front matter を解析して `Post` を返す。
3. 本文を `markdownToHtml` に渡し、内部リンク、表、太字、chat block、見出し、HTML を変換する。
4. Server / Client Component が表示する。記事 HTML は `dangerouslySetInnerHTML` を使うため、入力元を変更する場合は sanitization の影響を確認する。

### 記事の編集

1. Basic 認証 middleware が `/developer_edit` のページ要求を検査する。
2. `DeveloperEditor` が `/api/posts` と `/api/posts/[filename]` を呼ぶ。
3. Route Handler が basename を検証し、`blog/` のローカルファイルを変更する。
4. `/api/revalidate` で path の再検証を要求できるが、現在 client は必須 secret を送らない。詳細は `CURRENT.md`。

### 問い合わせ

1. form が JSON を `/api/contact` へ POST する。
2. route が項目、honeypot、長さ、email 形式、プロセス内要求数を検証する。
3. Node.js Route Handler が AWS SES を呼び、JSON を返す。

## API

| Method / path | 実装済みの挙動 |
| --- | --- |
| `GET, POST /api/posts` | Markdown ファイル名一覧、ファイル作成 |
| `GET, PUT, DELETE /api/posts/[filename]` | 検証済みファイル名の記事読取・更新・削除 |
| `GET /api/search-data` | 記事・カテゴリ・タグの軽量検索データ |
| `POST /api/contact` | 検証後に SES で問い合わせ送信 |
| `POST /api/revalidate?secret=...` | 指定 path 群の再検証 |
| `GET /rss.xml` | 記事から RSS を生成 |
| `GET /post-sitemap.xml`, `GET /category-sitemap.xml` | XML sitemap を生成 |
| Next metadata route `/sitemap.xml` | main sitemap を生成 |

## Persistence、認証、外部依存

DB はなく、記事は `fs/promises`、カテゴリは TypeScript 配列である。書込の永続性と複数 instance の整合性はデプロイ先 filesystem に依存する。2つの middleware は `/developer_edit` 配下だけを Basic 認証し、API 認可は未実装。`/api/revalidate` は別途 `REVALIDATE_SECRET` を比較する。

外部依存は問い合わせ用 AWS SES と、`next/image` が許可する Google Cloud Storage の asset host である。標準 AWS の region / credential 環境変数は fallback として使われる。運用条件は `OPERATIONS.md`、信頼境界と既知リスクは `SECURITY.md` を正本とする。

未配置のローカル画像URLは `next.config.js` の rewrite が `data/image-assets.json` を読み、`replacementUrl` または既存SVGの `temporary` へ転送する。差し替え手順は `IMAGE_ASSETS.md` を正本とする。

## デプロイ

`next build` / `next start` の Node.js 配置だけが定義され、インフラ・デプロイ自動化はない。GitHub Actions は push / PR で install、lint、Jest を実行するが deploy はしない。編集機能には書込可能で永続的な `blog/` が必要である。
