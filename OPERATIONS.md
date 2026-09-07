# 運用

## ローカル開発

lockfile と互換性のある Node.js / npm が必要（CI は現在 Node.js 18）。

```bash
npm ci
cp .env.example .env.local
npm run dev
```

通常は `http://localhost:3000` で起動する。追跡対象の `blog/` は空なので、記事依存の挙動確認には有効な Markdown をローカルで追加する。secret は commit しない。

## 環境変数

| 変数 | 用途 | 備考 |
| --- | --- | --- |
| `NEXT_PUBLIC_DISABLE_INITIAL_ANIMATION` | 任意の UI 挙動 | `true` で初回 page transition を省略 |
| `BASIC_AUTH_USERNAME` | 編集ページ | middleware が使用。実環境では空にしない |
| `BASIC_AUTH_PASSWORD` | 編集ページ | secret として管理 |
| `REVALIDATE_SECRET` | 再検証 API | `/api/revalidate?secret=...`。browser bundle に含めない |
| `AWS_SES_REGION` | 問い合わせ | `AWS_REGION`、`AWS_DEFAULT_REGION` の順に fallback |
| `AWS_SES_ACCESS_KEY_ID` | 問い合わせ | `AWS_ACCESS_KEY_ID` に fallback |
| `AWS_SES_SECRET_ACCESS_KEY` | 問い合わせ | `AWS_SECRET_ACCESS_KEY` に fallback |

`.env.example` がアプリ固有名の正本である。問い合わせ処理は process manager 起動時のために Next の環境ファイルを明示的に読み込む。

## データと filesystem

DB setup はない。記事は `blog/<filename>.md` で、`title`、`date`、`category`、任意の `tags`、`image`、`alt`、`updated` などの front matter と本文を持つ。server process は読取権限、editor 利用時は書込・削除権限と永続 storage が必要。ephemeral / read-only な serverless filesystem は編集内容の永続化に適さない。

## 外部サービス

AWS SES には region、送信権限のある credential、account の検証 / sandbox 条件を満たす identity が必要。credential の値を記録・commit しない。contact endpoint が log に出すのは選択された変数名と SES 結果 / error metadata だけである。

## Build と起動

```bash
npm run build
npm start
```

README は EC2 のような Node.js host に言及するが、PM2、container、IaC、hosting manifest、health check、backup job、自動 deploy はない。リポジトリ外の実環境を推測せず確認する。

## CI/CD

GitHub Actions は push / PR に対して clean install、lint、Jest を行い、deploy はしない。本番の Node version、環境変数注入、`blog/` の永続性、TLS / reverse proxy、SES access、監視、backup / rollback はリポジトリ外で確認する。

## トラブルシュート

- **Editor が 401:** Basic 認証変数と request path を確認する。API route の認可 gap は `CURRENT.md` / `SECURITY.md` を参照。
- **再検証が `Invalid token`:** request に `REVALIDATE_SECRET` と同じ token が必要。現在の browser editor は送信しない。
- **Contact が 500:** region、credential の存在、SES permission / identity と server log を確認し、secret 値は出力しない。
- **記事が空:** `blog/` 直下に読取可能な `.md` があるか確認する。nested file は検出されない。
- **編集が消える:** `blog/` が process restart / deploy をまたいで書込可能かつ永続的か確認する。
- **Font fetch で build 失敗:** `next/font/google` は build 中に外向き network を必要とする場合がある。
