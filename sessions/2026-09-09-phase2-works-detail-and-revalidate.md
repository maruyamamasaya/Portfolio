# Session: phase2 works detail and revalidate alignment

## Request（依頼）
- `/works` の保存フローと公開を本番運用に寄せるため、`Works` の詳細ページを追加し、編集公開時のパスを詳細へも効くようにする。

## Investigation（調査）
- 現在 `content/works` はリスト表示しかなく、`/works/<slug>` は未実装。
- `DeveloperEditor` の `revalidate` は `targetConfig.revalidatePaths` を使い `/works/${slug}` を含める構成になっている。
- `markdownToHtml` と `notFound` の運用は既存ブログ詳細ページで実績があるため再利用可能。

## Changes（変更）
- `src/lib/works.ts`
  - `getWork(slug)` を追加し、存在しない slug 時は `FileNotFoundError` を返すように。
- `src/app/works/page.tsx`
  - カードタイトルと画像を `/works/${slug}` 詳細へリンク。
- `src/app/works/[slug]/page.tsx` を新規追加
  - `generateStaticParams` / `generateMetadata` 実装。
  - 見出し・本文・カテゴリ・タグ・他作品導線を含む詳細ページを追加。
- `src/lib/__tests__/works.test.ts`
  - `getWork` が存在しないファイルで `FileNotFoundError` を投げるテストを追加。

## Validation（検証）
- `npm run lint`
- `npm test`
- `npm run build`

## Result（結果）
- `/works/<slug>` が静的ページとして公開され、作品保存→`revalidate` が detail ルートまで反映される前提を整備。
- 作品一覧から詳細へ遷移できる導線を追加し、作成済み 2 記事で SSG も確認済み。
