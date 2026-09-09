# トップページ改修

## 実施内容

- トップページを、画像欠落に依存しないテキスト中心の構成へ刷新した。
- ヘッダーとフッターを再設計し、存在しないロゴ・SNS画像参照を除去した。
- `src/config/site.ts` にサイト情報、ナビゲーション、連絡先、SNS、トップ用画像参照を集約した。
- 記事が0件の場合の準備中表示を追加した。
- 存在しない favicon / OGP 参照と外部 Google Fonts 依存を除去した。

## 検証

- `npm run lint`: 成功
- `npx tsc --noEmit`: 成功
- `npm test -- --runInBand`: 15件成功
- `npm run build`: 成功、47ページ生成
- `http://localhost:3001/`: HTTP 200

## 次の候補

- About、Services、Works、Pricing、Contact の内容と画像参照を順次更新する。
- ブログ記事の供給方法を決定する。
- 既知の編集API認可と再検証フローを修正する。
