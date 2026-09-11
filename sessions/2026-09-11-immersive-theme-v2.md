# 2026-09-11 没入型テーマ V2

## 実施内容

- V1 の Aurora / Glass 表現を維持し、イベント駆動の Visual Environment を整理した。
- Works の front matter に `accentColor` / `secondaryColor` / `glowColor` を追加し、カードの hover / focus から背景へ弱く反映する構造を追加した。
- pointer ripple、少量の反応粒子、セクション環境、scroll / pointer parallax、短いルート loading と page transition を追加した。
- Mobile / Low quality / `prefers-reduced-motion` では粒子・連続移動・波紋を停止または削減する。
- Card の属性透過と Section の `aria-labelledby` を整備した。

## 検証

- `npm run lint`: 成功
- `npm test`: 11 suites / 37 tests 成功
- `npm run build`: 成功（既存の Edge Runtime `crypto` と browserslist 更新警告あり）
- ブラウザ: `/` と `/works` の表示、主要要素、Next.js overlay、console error を確認。エラーなし。
