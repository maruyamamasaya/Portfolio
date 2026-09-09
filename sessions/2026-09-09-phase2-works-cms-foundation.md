# Session: phase2 works cms foundation

## Request（依頼）
- Phase2として「トップ/ヘッダー/フッターとWorks導線の見せ方」が落ち着いたため、次はWorksのCMS基盤を先に整える。
- `/works` を営業寄りではなく作品展示ベースで運用しやすい構成にする。

## Investigation（調査）
- `src/lib/posts.ts` の Markdown 読込モデルと `api/posts` の CRUD パターンを確認。
- `DeveloperEditor` の保存先 (`posts` ベース) と、`validateFilename` 仕様を再確認。
- 現状の `/works/page.tsx` が静的配列でハードコードされていることを確認。

## Changes（変更）
- `src/lib/works.ts` を新規追加し、`content/works/*.md` の読み込み・ソートを実装。
- `content/works/.gitkeep` を追加。
- Worksサンプル記事を2件追加。
  - `content/works/line-traffic-design.md`
  - `content/works/concept-web-refresh.md`
- Works API を追加。
  - `src/app/api/works/route.ts`
  - `src/app/api/works/[filename]/route.ts`
- `/works/page.tsx` をサーバーサイドデータ駆動に変更し、`getSortedWorks()` で描画。
- 最小テストを追加。
  - `src/lib/__tests__/works.test.ts`
  - `src/app/api/__tests__/works-route.test.ts`
- `CURRENT.md` の `Current Phase` と `In Progress` を Phase2進行中に更新。

## Validation（検証）
- 本タスクは実装優先で、`npm test` / `npm run lint` は未実行。後続で実施予定。

## Result（結果）
- `/works` が静的配列依存から解放され、CMS化に先立つデータソースへ接続。
- Works の API CRUD を記事APIと同型で新設し、将来の統合編集導線（1基盤）に寄せやすい状態。
