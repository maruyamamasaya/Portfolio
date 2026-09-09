# Session: phase2 works preview and schedule hardening

## Request（依頼）
Works の公開ルートを本番寄りに進めるため、公開予約（future date）と管理者専用 preview ルートを追加。

## Investigation（調査）
- `getWork` / `getSortedWorks` は既に下書きを除外する仕様があり、公開日ソートも `publishedAt` 優先に更新済み。
- 既定ルートでの公開運用としては、`draft=false` かつ公開日条件のチェックが必要。
- 運用上、編集者が下書きや予約公開を最終確認できる preview 経路が必要。

## Changes（変更）
- `src/lib/works.ts`
  - 取得時の可視性オプションを追加（`WorkVisibilityOptions`）。
  - `getWork` / `getSortedWorks` で既定ルートは `includeDraft=false`, `includeScheduled=false` に固定。
  - `publishedAt`/`date` から配信時刻を判定し、未来の作品をデフォルト表示から除外。
- `content/works/scheduled-portfolio-preview.md`
  - 未来公開日（`publishedAt: 2099-01-01`）のテスト素材を追加。
- `src/app/works/preview/[slug]/page.tsx`
  - 管理者限定プレビューページを追加。
  - `secret` を要求し、`includeDraft` / `includeScheduled` 付きで `getWork` を読むようにした。
- `middleware.ts`, `src/middleware.ts`
  - `/works/preview/*` を保護対象に追加。
  - `WORKS_PREVIEW_SECRET` / `REVALIDATE_SECRET` と `secret` クエリで preview アクセスを許可。

## Validation（検証）
- `npm run lint`
- `npm test -- --runInBand`
- `npm run build`

## Result（結果）
- 予約公開日が未来の作品は公開一覧・公開詳細（`/works`, `/works/[slug]`）から除外。
- 管理者は `WORKS_PREVIEW_SECRET`（未設定時は `REVALIDATE_SECRET`）付きURLで preview ページを確認できる。
- 既定の公開ルートは「一般向け公開基準」を満たす形に維持。
