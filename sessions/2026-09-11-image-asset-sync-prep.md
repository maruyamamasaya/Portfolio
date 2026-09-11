# Session: image-asset URL sync prep

## Request（依頼）
画像差し替えを `IMAGE_ASSETS.md` の運用に沿って一括実施できる状態にするため、未設定 URL を一覧化し、後日 URL だけを入力して反映できる仕組みを先に準備したい。

## Investigation（調査）
- `IMAGE_ASSETS.md` と `data/image-assets.json` を確認。
- `replacementUrl` が未設定（空文字）の画像キーが 91 件あることを確認。

## Changes（変更）
- `data/image-assets-replacements.template.csv` を追加（全対象の `path / temporary / usage / replacementUrl` 一覧。`replacementUrl` は空で埋める想定）。
- `scripts/sync-image-assets.js` を追加し、CSV の非空 `replacementUrl` を `data/image-assets.json` の該当キーへ反映するための反映スクリプトを実装。
- `package.json` に `image-assets:sync` を追加（`node scripts/sync-image-assets.js ...`）。

## Files changed（変更ファイル）
- `data/image-assets-replacements.template.csv`
- `scripts/sync-image-assets.js`
- `package.json`

## Validation（検証）
- `node scripts/sync-image-assets.js data/image-assets-replacements.template.csv data/image-assets.json`
  - 期待どおり `replacementUrl` 未入力のため、更新なしで正常終了。

## Result（結果）
画像URL未設定状態のままでも、**URLを一括で差し替える下流準備**を完了。
本体の更新は未実施（`replacementUrl` が未入力のため）。

## Remaining issues（残件）
- 実際の本画像 URL 入力（社内保有CDN、ストレージ、または他素材配信元）を `data/image-assets-replacements.template.csv` に追記し、
  `npm run image-assets:sync` 実行で一括反映する必要がある。
