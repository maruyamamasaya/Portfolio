# 2026-09-10 ミドルウェア統合

## 実施内容

- `middleware.ts` の重複を解消し、`C:\\Users\\m-maruyama\\Development\\Portfolio\\src\\middleware.ts` のみを運用元に統一。
- ルート側 `C:\\Users\\m-maruyama\\Development\\Portfolio\\middleware.ts` を削除。
- `src/middleware.ts` の matcher は `/developer_edit*`、`/works/preview*`、および API 群（`/api/posts*`, `/api/works*`, `/api/revalidate*`, `/api/works/preview-url`）を保護対象として維持。

## 効果

- 認可判定ロジックの保守経路が1か所化し、運用時のどちらが有効か分かりにくい状態を排除。

## 検証

- `npm run lint`
- `npm test`（9 suites）

