# 0003: Works を `content/works` の Markdown で CMS 化する

- Status: Accepted
- Date: 2026-09-09

## Context（背景）

- Phase2では `/works` を静的配列ではなく、記事と同じ運用思想で更新可能な土台へ移行する必要があった。
- 既存の編集経路（ファイルベース）とテスト観点を再利用しつつ、`blog/` と同型の CRUD API を段階的に拡張したい。

## Decision（決定）

- まず `content/works/*.md` を新規追加し、`src/lib/works.ts` で `getSortedWorks` を提供する。
- `api/works` / `api/works/[filename]` を追加し、`api/posts` と同じ I/O 契約（validateFilename、JSON 返却、ファイル読込/更新/削除）で揃える。
- `/works/page.tsx` はこの新規 loader を直接読むデータ駆動表示へ切り替える。

## Reason（理由）

- 既存ブログ基盤とパターンを合わせることで、実装コストを抑えつつ段階的な統合（記事+作品共通編集）へ進めやすい。
- 将来 DB やヘッドレスCMSへ移行する場合も、front matter とslug ベースの設計が移行単位として扱いやすい。

## Alternatives（代案）

- `works` を既存ブログと同じ `blog/` に格納して共通処理化する（カテゴリ衝突と編集体験の混線が懸念）。
- 外部 CMS へ直接移行する（既存基盤再利用性が小さく、初期工数が増える）。
- データを JSON に固定する（編集体験が分断される、既存 markdown フローを活かしにくい）。

## Consequences（影響）

- 現時点では `content/works` と `blog` が別ストアで管理される。
- `DeveloperEditor` の保存先は既存 `posts` のままのため、作品編集 UI の統合は次段階で必要。
- `content/works` 配下のサンプルデータ作成後、既存 `/works` の見え方が CMS 化される。
