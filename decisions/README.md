# 設計判断記録

コードから理由を復元できない重要な選択だけを記録する。変更ごとに記録を増やさない。

## 命名とライフサイクル

- `NNNN-short-title.md` として連番を付ける。
- status と date を記す。Accepted の記録は書き換えず、新しい記録で Superseded にする。
- 関連コード / 文書へ link し、観測事実と意図を分ける。

## テンプレート

```markdown
# NNNN: タイトル

- Status: Proposed | Accepted | Superseded
- Date: YYYY-MM-DD

## Context（背景・制約）
## Decision（決定）
## Reason（理由）
## Alternatives（代案）
## Consequences（影響）
```
