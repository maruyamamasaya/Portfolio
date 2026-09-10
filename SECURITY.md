# セキュリティ

この文書は実装から確認できる信頼境界と既知リスクの索引であり、安全性を保証するものではない。公開用ポリシー本文は `src/app/policy/security/page.tsx` を正本とする。

## 現在の境界

- `src/middleware.ts` は `/developer_edit` とその配下だけを HTTP Basic 認証し、必要時に query secret でも通過可。API 系ルートも matcher で保護する。
- `/api/revalidate` は Query/Body/Bearer / Basic 認証のいずれかで検証可能。
- `/api/contact` は入力形式・長さ・honeypot と、送信元 IP ごとのプロセス内 rate limit を検査してから AWS SES を呼ぶ。
- `/api/posts`/`/api/posts/[filename]` と `/api/works`/`/api/works/[filename]` は filename を検証し、Basic 認証を満たした編集リクエストのみ書き込みを許可する。公開取得 API は公開対象。
- Markdown の表示は生成 HTML を `dangerouslySetInnerHTML` へ渡す。記事入力元の信頼条件を変更する場合は sanitization を再評価する。
- 変更系 API と問い合わせは `src/lib/audit.ts` の `recordAuditEvent` で監査ログを出力する（JSON 文字列を console.info へ出力）。

## 監査ログ要件（最低）

- 監査対象:
  - `contact.submit`
  - `posts.create` / `posts.update` / `posts.delete`
  - `works.create` / `works.update` / `works.delete`
  - `cache.revalidate`
- 最低記録フィールド:
  - `at`, `action`, `outcome`, `status`, `ip`, `requestId`, `filename`（該当時）, `paths`（revalidate時）, `reason`
- 運用条件（推奨）:
  - 1回目の連続失敗（401/400/429）が続く場合は監視対象化
  - `error`（500）発生時はアラート
  - `deny` か `error` を 1 時間で継続集計し、想定外件数の急増を検知

## 既知のリスク

1. Basic 認証は TLS 自体を提供しない。本番 transport の構成はリポジトリ外で判断不能。
2. 問い合わせの rate limit は再起動で消え、複数 instance で共有されない（現状の改善対象）。
3. 複数運用先（本番）が異なる場合、監査ログ保管先の権限設計とローテーションを別途確定する必要がある。

## Secret と設定

必要な変数名と fallback は `OPERATIONS.md`、例は `.env.example` を参照する。実値、`.env.local`、credential、token を commit・文書・log・screenshot に含めない。`NEXT_PUBLIC_` 接頭辞の変数は client から参照可能なため、secret に使わない。

## 変更時の確認

認証、記事変更、問い合わせ、Markdown 入力元、環境変数を変更する前に、入口から外部依存までを `CODEMAP.md` で追跡する。少なくとも未認証・不正入力・失敗応答をテストし、検証コマンドは `TESTING.md` に従う。認可方式の決定は実装前に `decisions/` へ記録する。

## 判断不能

脆弱性報告窓口、credential rotation、WAF / proxy、TLS termination、監査 log、production access control、依存関係 update 方針は追跡対象ファイルから確認できない。
