# 0001: 現在の filesystem Markdown 構成を記録する

- Status: Accepted（既存実装。当初の理由は一部不明）
- Date: 2026-09-07

## Context（背景）

実装は Node.js filesystem API で `blog/*.md` を読み書きする。DB、object storage adapter、CMS は存在しない。将来の作業者がこの運用制約を認識しつつ、文書化されていない当初の意図まで事実と扱わないようにする必要がある。

## Decision（決定）

ローカル filesystem を現在の記事システムとして文書化し、別途承認された変更で置き換えるまでは維持する。Markdown / front matter を記事 record、`data/categories.ts` をカテゴリ metadata として扱う。

## Reason（理由）

現在のコード経路を正確に表し、第二の正本を不用意に導入しないため。filesystem を最初に選んだ理由は記録されていない。

## Alternatives（代案）

- DB / ORM ベースの記事。
- 外部 headless CMS。
- object storage または Git ベースの公開フロー。

## Consequences（影響）

実行時編集には書込可能で永続的な共有 filesystem が必要。複数 instance や ephemeral deployment では記事が消失・不整合になる可能性がある。別方式を意図的に選ぶまで、backup と記事 provision は運用側の責務となる。
