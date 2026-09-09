# 0006: Works の公開ルートに未来日付除外と管理者プレビューを導入

- Status: Accepted
- Date: 2026-09-09

## Context（背景）

- Works は下書き制御（`draft`）を導入済みだが、公開時刻まで制御できると運用が安定する。
- クライアント側に未公開データを見せない構成が前提だが、編集者向け確認導線は必要。

## Decision（決定）

- 既定の `getWork` / `getSortedWorks` は、
  - `draft` が true の作品を除外。
  - `publishedAt`（fallback: `date`）が未来の日付であれば、公開ルートでは除外。
- 例外として preview 用では `includeDraft` / `includeScheduled` オプションを付与して読み取り。
- preview には `WORKS_PREVIEW_SECRET`（未設定時は `REVALIDATE_SECRET`）を使う。

## Reason（理由）

- 公開前提の経路と編集者経由の確認経路を分離し、公開ルートの意図を明確化するため。
- 予約公開を front matter 1つで管理しつつ、運用を段階的に高められる。

## Alternatives（代案）

- 予約公開を `date` 単体で扱い、`draft` と同時に特別ケースを追加。
- preview を Basic 認証のみで実装し secret を使わない。

## Consequences（影響）

- 既定の公開ページは「今公開可能な公開済み」だけを表示する。
- secret 未設定時は middleware の制御にも影響するため、環境変数管理が運用上重要になる。
- 将来 `scheduledAt` や時刻単位のタイムゾーン制御を追加する余地を残す。
