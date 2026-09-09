# 画像フォールバックと共通デザイン基盤

## 実施内容

- 欠落画像91件を `data/image-assets.json` に登録した。
- 元URL、仮画像、将来の本画像URL、用途を一元管理できるようにした。
- `next.config.js` の rewrite で、本画像未設定時は既存SVGへ転送するようにした。
- `IMAGE_ASSETS.md` に差し替え方法と仮画像の用途表を追加した。
- 下層ページの背景、見出し、本文、表、カードにポートフォリオ共通のデザイントークンを適用した。

## 検証

- マッピング91件の仮画像がすべて存在することを確認。
- コード上の未配置画像に未登録参照が0件であることを確認。
- トップ、About、Services、Worksと代表画像3件がHTTP 200。
- `npm run lint`: 成功
- `npx tsc --noEmit`: 成功
- `npm test -- --runInBand`: 15件成功
- `npm run build`: 成功、47ページ生成
