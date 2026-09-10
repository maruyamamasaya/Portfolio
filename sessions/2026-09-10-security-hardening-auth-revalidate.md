# 2026-09-10 認可・revalidate本線化

## 実施内容

- `Posts` / `Works` の書き込み API (`POST` / `PUT` / `DELETE`) に Basic 認証を必須化。
- `/api/revalidate` の認証仕様を刷新し、`query secret` 以外に:
  - Basic 認証ヘッダ
  - `Authorization: Bearer <token>`
  - body の `secret`
  を許可する形に変更（最終的な許可はサーバ側判定）。
- `DeveloperEditor` 側の `preview URL` を環境変数直参照しない形へ変更し、`/api/works/preview-url` からサーバー側で発行。
- `DeveloperEditor` の API 呼び出しに `credentials: 'include'` を付与し、Basic 認証コンテキストを明示的に送る。
- `middleware` の matcher を API 系（`/api/posts*`, `/api/works*`, `/api/revalidate*`）まで拡張し、`/src` 配下とルートの middleware を同一化。

## 影響

- 認可が弱かった記事/作品の変更 API を直接叩かれるリスクを低減。
- `REVALIDATE_SECRET` 未設定時でも、`/developer_edit` 上の保存→再検証フローが通る状態へ。
- クライアントバンドルに秘密情報を乗せずにプレビュー URL の公開を行えるように変更。

## 検証

- `npm run lint`
- `npm test`（既存9件）

