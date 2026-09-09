# ポートフォリオ方向への調整

## 実施内容

- トップページの主語をサービスから制作者本人へ変更した。
- 第一画面に氏名、肩書き、制作姿勢、担当領域を配置した。
- 既存情報をもとに、LINE・Web・AI活用の3領域を Selected Work として整理した。
- About、Capabilities、Journal、Contact を商談で順に説明しやすい構成へ変更した。
- ナビゲーションの「実績」を「制作実績」へ変更した。

## 検証

- `npm run lint`: 成功
- `npm test -- --runInBand`: 15件成功
- `npm run build`: 成功、47ページ生成
- `http://localhost:3001/`: HTTP 200
