# 画像差し替え台帳

画像URLの正本は [`data/image-assets.json`](data/image-assets.json) です。現在は欠落している画像を、リポジトリ内のSVGへ一時的に割り当てています。

## 差し替え方法

対象画像の `replacementUrl` に本番URLを設定し、再ビルドしてください。空文字の間は `temporary` が表示されます。既存コードの `/images/...` 参照を変更する必要はありません。

```json
"/images/profile.jpg": {
  "temporary": "/images/img1.svg",
  "replacementUrl": "https://example.com/profile.jpg",
  "usage": "プロフィール写真"
}
```

外部URLは既存のローカルパスからサーバー側で転送されるため、通常は `replacementUrl` の更新だけで切り替えられます。画像を同一サイトの `/images/...` に配置する場合は、`replacementUrl` ではなく元のパスへファイルを置き、このマッピングから該当項目を削除します。

## 仮画像の対応表

| 仮画像 | 用途 | 主な対象 |
| --- | --- | --- |
| `/images/img1.svg` | 人物・プロフィール | プロフィール、お客様、受講者、会話アイコン |
| `/images/img2.svg` | サービス・メインビジュアル | Web制作、AI講座、家庭教師、バナー |
| `/images/img3.svg` | ロゴ・SNS | 技術ロゴ、SNS、メディアアイコン |
| `/images/img4.svg` | 手順・動き | フロー、特徴、矢印、アニメーション |
| `/images/img5.svg` | 制作実績 | デザイン、LINE、予約アプリ、アート作品 |
| `/images/arcana/*.svg` | カード | 同番号のPNG参照 |

## 管理項目

| JSON項目 | 意味 |
| --- | --- |
| オブジェクトのキー | 現在コードが参照している画像パス |
| `temporary` | 本画像が決まるまで表示する画像 |
| `replacementUrl` | 後日設定する本番画像URL |
| `usage` | 画像の用途・掲載内容 |

全対象と個別用途は `data/image-assets.json` に記録しています。新しい欠落画像が増えた場合も、同じ形式で項目を追加してください。
