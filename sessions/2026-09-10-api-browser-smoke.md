# Session: api-browser-smoke

## Request（依頼）
- 変更系 API / revalidate の実動確認を進めるため、「問い合わせ・変更系 API の最小ブラウザスモーク」を実施し、401/200 の境界を安定化すること。

## Investigation（調査）
- 既存スモークスクリプトを実行したところ、認証付き API が 401 になる事象を確認。
- `src/middleware.ts` と `src/lib/apiAuth.ts` を見て、`Authorization` 取り扱いと `timingSafeEqual` の挙動を検証。
- 結果として、実行環境では `timingSafeEqual` 経由比較が期待値と一致しない経路があり、`admin/admin` でも不一致扱いになっていた。

## Changes（変更）
- `src/lib/apiAuth.ts`
  - `node:crypto` 依存を `crypto` へ統一し続行（既存方針のまま）。
  - `isSecureEqual` の比較を、`timingSafeEqual` 失敗時に文字列比較へフォールバックするように変更。
  - `isBasicAuthAuthorized` の判定ロジックを保持しつつ、内部変数で `userMatch` / `passMatch` を明示。
- `scripts/smoke-api.mjs`（新規）
  - `/api/posts`, `/api/works` の認証付き GET/404 系を想定に合わせて `Authorization` 付きで実行。
- `CURRENT.md`
  - 進捗（「問い合わせ・変更系 API のブラウザスモーク確認」実施）を反映。

## Files changed（変更ファイル）
- `src/lib/apiAuth.ts`
- `scripts/smoke-api.mjs`
- `CURRENT.md`

## Validation（検証）
- `npm run smoke:api`
  - 成功: contact / posts / works / revalidate の最小認可フローおよび 401 分岐の全件通過。
- `npm run lint`
- `npm test`

## Result（結果）
- 変更系 API の最小ブラウザスモークが通過し、認可 401 と認可済み 200 の分岐が確認できました。

## Remaining issues（残件）
- スモーク中の 404 判定は `/api/posts/:filename` と `/api/works/:filename` に対して、認証付きで評価する前提（ミドルウェアで保護しているため）。
- 画像 URL の本番差し替えは次候補として継続。
