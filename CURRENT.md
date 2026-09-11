# 現在の状態

## プロジェクト

Digi Goose は、Next.js App Router で構築されたポートフォリオ主軸の Web サイトであり、記事・制作実績を自前 CMS 感覚で更新できる基盤へ再構成する準備段階にある。この文書は履歴ではなく、2026-09-09 時点で追跡対象のコードと設定から確認できた現在地を示す。

## Current Phase（現在のフェーズ）

公開サイト、記事探索、問い合わせ、ローカル記事編集は実装済み。2026-09-09 にトップページ、ヘッダー、フッターを画像欠落に依存しないポートフォリオ構成へ刷新し、サイト情報を `src/config/site.ts` に集約した。トップは、About / Works / Journal（記事） / Contact で流れる構成へ寄せられている。欠落画像91件は `data/image-assets.json` のマッピングにより既存 SVG へ一時転送され、後日 `replacementUrl` だけで差し替えられる。`blog/` は現在 `.gitkeep` のみで、記事は実運用投入が未着手。`content/works/` を新設して `Works` のデータ化を開始した。

## Implemented（実装済み）

- ポートフォリオ、サービス、料金、ポリシーの公開ページとレスポンシブな共通ナビゲーション。
- ファイルシステム上の Markdown 記事、解析、記事ページ、被リンク、タグ、カテゴリ、検索、RSS、サイトマップ。
- Markdown 記事の作成、読取、更新、削除、プレビュー、再検証を行うブラウザ編集画面。
- `/developer_edit` ページ配下を対象とする Basic 認証ミドルウェア。
- 入力検証、ハニーポット、プロセス内レート制限を備え、AWS SES で送信する問い合わせフォーム。
- Jest の単体・API ルートテスト、ESLint、TypeScript、プロダクションビルド用スクリプト、GitHub Actions の lint/test CI。
- トップページ、ヘッダー、フッターはテキスト主体のポートフォリオとして構成し、共通ナビゲーション、連絡先、SNS、トップ用画像を設定ファイルから参照する。
- `content/works/*.md` を追加し、`getSortedWorks` で `/works` をデータ駆動表示する基盤を追加。
- `GET/POST /api/works`, `GET/PUT/DELETE /api/works/[filename]` の Works CRUD ルートを追加。
- `DeveloperEditor` から `記事` と `制作実績` の切替編集に対応し、保存・公開更新ルートを対象ごとに切り替え可能にした。
- `/works/<slug>` の詳細ページを追加し、Works を記事のような公開導線へ接続。
- `Works` の公開基盤を本番寄りに強化（公開日順の厳密ソート、`draft` 非表示、`publishedAt` 優先表示、`DeveloperEditor` で公開情報の編集）
- 予約公開ルールを適用（`publishedAt` が未来日は公開一覧/詳細の既定ルートから除外）。
- `/works/preview/[slug]?secret=...` を追加し、管理者向けに下書き・予約公開を含む事前確認が可能に。
- `IMAGE_ASSETS` 用の運用準備として、`data/image-assets-replacements.template.csv` を追加し、`replacementUrl` を CSV ベースで `data/image-assets.json` に反映する `scripts/sync-image-assets.js` を追加。`npm run image-assets:sync` を実行する流れを確立。
- サイト体験の高級感を高めるUI整備を追加。`lux-card / lux-chip / portfolio-grid-tight / portfolio-list-spacious` を globals で整備し、`Card`・記事カード・Works セクション・Works 一覧に反映。  
  モーション速度を穏やかにし、カード密度とモバイル可読性の見え方を調整。
- ポートフォリオ全体で没入型ビジュアルテーマを統合。
  - グローバルで Aurora / Fog / Mesh / Spot 系レイヤーを実装し、マウス・スクロール連動の反応を追加。
  - Hero/Works/Contact/About の導線を統一デザインへ再編。
  - Works 一覧のカードと公開状態ラベルを統一化し、読みやすさを優先したグラス＋グロー表現を採用。

## In Progress（進行中）

- 「ポートフォリオ基調 + 自前 CMS（記事＋制作実績）再設計」の開発方針は確定済み。
- 開発着手前の文書整備（ROADMAP、実装優先順位、認可方針、公開フロー）を完了。
- 認可境界の本線化は完了。問い合わせの rate limit / 監査ログ要件を明文化し、最小限の監査ログ実装を完了。  
- 問い合わせ・変更系 API の最小ブラウザスモーク確認を完了（401/200 分岐を含む）。
- 沈静した没入型テーマの導入（背景演出、Glass/Glow、Hero強化、Works/記事カードの反応演出）を完了。
  導線（About / Works / Contact）も同一言語感で揃える対応を完了。
- `prefers-reduced-motion` を前提にした背景演出の簡略化、カード表示ラベル・公開情報の統一化を含めて完了。  
- 没入型テーマ V2 を実装。セクションごとの環境色、端末別 Quality Level、少量の反応粒子、操作点の波紋、奥行き差、Works 固有色から背景への弱い色伝播、実ルート読み込み時のみ表示するローディング、短いページ遷移を共通 Visual Layer として統合した。

## Known Issues（既知の問題）

- 問い合わせのレート制限はプロセス内だけで、再起動時に消え、複数インスタンスで共有されない。
- 元画像が未配置の画像参照は残るが、すべて画像台帳の仮画像へ転送される。本画像URLは未設定である。

## Technical Debt（技術的負債）

- テスト対象は記事ユーティリティ、Markdown 変換、カテゴリ、アイコン補助処理、2つの GET ルートに限られ、問い合わせ、変更系 API、認可、再検証、ページ描画、ブラウザ操作は未網羅。
- `README.en.md` は日本語 README と別管理で、内容がずれる可能性がある。
- CI は Node.js 18 と GitHub Actions v3 を使用する。ランタイムや依存との互換性は変更前に意図的な確認が必要。

## Immediate Next（直近の候補）

1. About / Works / Contact の情報密度を調整し、最終的な世界観トーン（テキスト比率・情報の優先順）を固定する。
2. 実環境での light/dark / Reduced-motion 動作と主要ブラウザ確認（可読性、コントラスト、読み込み速度）。
3. `IMAGE_ASSETS.md` を見ながら本画像URLを本運用値へ差し替え、`data/image-assets.json` を更新する。
4. 対象デプロイ環境で Next.js の解決規則を確認してから、重複ミドルウェアを統合する。

## Unknowns（判断不能）

- 本番のホスティング、Node.js バージョン、プロセス管理、TLS、監視、バックアップ、ロールバック方法はリポジトリから確認できない。
- 本番記事と不足画像をどこから供給し、永続化するかは確認できない。
- ファイルシステムを記事ストアに選んだ当初の理由と、将来の CMS / DB 移行意図は記録されていない。
- 2つのミドルウェアのうち本番でどちらが有効かを示すデプロイ時の検証結果はない。

未実装と判断した項目として、DB / ORM / migration、コメント機能、結合・E2E テスト、デプロイ自動化、単独の `typecheck` npm script は存在しない。
