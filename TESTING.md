# テストと検証

## 方針

作業中は変更に最も近い検証を使い、コード変更のコミット前には必須のリポジトリ検証を行う。現在の自動テストは、ライブラリの Jest 単体テストと一部 Route Handler の直接呼出しである。結合環境と browser E2E framework はない。

## 利用可能なコマンド

### Lint

```bash
npm run lint
```

`.eslintrc.json` を使う Next.js ESLint。コード変更時は必須。

### 型検査

```bash
npx tsc --noEmit
```

`typecheck` npm script はない。`tsconfig.json` は strict だが、一部 strict option は緩和されている。

### 単体・Route Handler テスト

```bash
npm test
npm test -- --runInBand src/lib/__tests__/posts.test.ts
```

Jest は `*.test.ts` を検出する。既存テストは記事 helper、カテゴリ、Markdown 変換、矢印 asset 選択、posts / search-data の GET handler を対象とする。実際の `blog/` を使い、Markdown テストの1つは一時記事を作成後に削除する。

### Build

```bash
npm run build
```

production build と framework の compile / 型検証を行う。layout が Google Fonts を使うためネットワークを必要とする場合がある。

## 未整備の検証

個別の integration test command、外部 service test environment、E2E runner はない。Route Handler の直接テストだけでは middleware、稼働 server、デプロイ先 filesystem、AWS SES を検証できない。見た目を変更した場合は `npm run dev` で対象 route を確認し、依頼または知覚可能な UI 変更がある場合は screenshot を残す。

## 変更別の最小検証

| 変更 | 最小検証 |
| --- | --- |
| 文書・コメントのみ | link / path の確認。lint と test は任意 |
| UI / component | 関連 Jest + lint + typecheck + 手動 route 確認 |
| 記事 / Markdown library | 対象 test + 全 Jest + lint + typecheck |
| API / auth / contact | 関連 route test（なければ追加）+ 全 Jest + lint + typecheck |
| routing / config / dependency / global layout | lint + typecheck + 全 Jest + build |
| 静的 content / asset | 参照 path + 対象 page または build |

## CI

`.github/workflows/ci.yml` は push / pull request ごとに Node.js 18 で `npm ci`、`npm run lint`、`npm test` を実行する。独立した typecheck と build は CI に含まれず、CD stage もない。
