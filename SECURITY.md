# セキュリティ

この文書は実装から確認できる信頼境界と既知リスクの索引であり、安全性を保証するものではない。公開用ポリシー本文は `src/app/policy/security/page.tsx` を正本とする。

## 現在の境界

- `src/middleware.ts` は `/developer_edit` とその配下だけを HTTP Basic 認証し、必要時に query secret でも通過可。API 系ルートも matcher で保護する。
- `/api/revalidate` は Query/Body/Bearer / Basic 認証のいずれかで検証可能。
- `/api/contact` は入力形式・長さ・honeypot と、送信元 IP ごとのプロセス内 rate limit を検査してから AWS SES を呼ぶ。
- `/api/posts`/`/api/posts/[filename]` と `/api/works`/`/api/works/[filename]` は filename を検証し、Basic 認証を満たした編集リクエストのみ書き込みを許可する。公開取得 API は公開対象。
- Markdown の表示は生成 HTML を `dangerouslySetInnerHTML` へ渡す。記事入力元の信頼条件を変更する場合は sanitization を再評価する。

## 既知のリスク

1. Basic 認証は TLS 自体を提供しない。本番 transport の構成はリポジトリ外で判断不能。
3. 問い合わせの rate limit は再起動で消え、複数 instance で共有されない。
4. 編集ページと API 保護の認可ログの出力・監査性（誰がいつどのAPIを通過したか）は未整備。

## Secret と設定

必要な変数名と fallback は `OPERATIONS.md`、例は `.env.example` を参照する。実値、`.env.local`、credential、token を commit・文書・log・screenshot に含めない。`NEXT_PUBLIC_` 接頭辞の変数は client から参照可能なため、secret に使わない。

## 変更時の確認

認証、記事変更、問い合わせ、Markdown 入力元、環境変数を変更する前に、入口から外部依存までを `CODEMAP.md` で追跡する。少なくとも未認証・不正入力・失敗応答をテストし、検証コマンドは `TESTING.md` に従う。認可方式の決定は実装前に `decisions/` へ記録する。

## 判断不能

脆弱性報告窓口、credential rotation、WAF / proxy、TLS termination、監査 log、production access control、依存関係 update 方針は追跡対象ファイルから確認できない。
