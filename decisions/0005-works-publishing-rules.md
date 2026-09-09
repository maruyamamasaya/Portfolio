# 0005: Works の公開ルートを `publishedAt` + `draft` で明示運用する

- Status: Accepted
- Date: 2026-09-09

## Context（背景）

- `/works` は `blog` と同様の CMS 化を進めているが、公開運用では「公開日」と「下書き状態」を明確化する必要があった。
- 作品一覧は現場運用で手元に草稿を残しつつ、公開画面に出したくないケースが発生しうる。

## Decision（決定）

- `src/lib/works.ts` の読み取り処理で、公開取得 API (`getWork`, `getSortedWorks`) を `draft` フラグで制御する。
- `getSortedWorks` はソートキーを次の順で拡張する。
  - 第一キー: `publishedAt`
  - 第二キー: `date`
  - 第三キー: `slug`
- `publishedAt` がない/不正な値は最下位に扱い、一覧の並び順が崩れないようにする。
- `DeveloperEditor` の保存/新規 UI に `publishedAt` と `draft` を追加し、公開日時・下書き状態を編集者が直接操作できるようにする。

## Reason（理由）

- 内容公開の意図と表示順を分離し、編集途中作品が意図せず公開されるリスクを抑える。
- `publishedAt` を第一キーにしたことで、記事運用に近い「掲載日ベース」の管理がしやすくなる。
- `slug` で tie-break し、同日更新時の順序の再現性を高める。

## Alternatives（代案）

- `draft` なしで YAML の有無に依存する規約運用を継続する。
- API 側でクエリパラメータ `preview=1` による明示的な下書き参照を導入し、公開取得と編集参照を分離する。

## Consequences（影響）

- 既存の `draft` 未設定作品は `date` を fallback して公開される（`publishedAt` と `date` の未設定状態がある場合はソート末尾）。
- 下書きは `getSortedWorks`/`getWork` の既定公開ルートから除外されるため、閲覧者向けページでは即時非表示となる。
- 将来の「プレビュー/公開予約」運用を追加する場合、`publishedAt` と `draft` を活用した追加ルールを入れやすい。
