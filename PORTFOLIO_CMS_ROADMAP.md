# ポートフォリオ + CMS基盤 リニューアル計画

## 方針

現行サイトを壊さず、次を同時に満たす。  
- サービス案内として硬い印象を避け、作品・思考・制作実績が主語になる。  
- 記事投稿は編集画面を活用した自前 CMS として成立させる。  
- まず見た目・体験の統一を先にし、認可・DB化などの土台は段階導入する。

## 目標（MVP）

- 一般向けにわかりやすいポートフォリオUIへ移行  
- トップ、Works、About、Journal、Contact の導線統一  
- 画像台帳でリンク切れ対策を継続したまま、作品掲載フローを構築  
- 記事＋Works を同じ編集思想で扱える最小基盤を作る  

## 実装フェーズ

### 0. 基盤と運用ルール整備

- `README/CURRENT/ARCHITECTURE/CODEMAP/TESTING/OPERATIONS` を現方針へ更新済み
- 運用規約として下記を固定  
  - 画像欠落は `data/image-assets.json` の `temporary` に寄せる  
  - 本文画像の最終 URL は `replacementUrl` で置換  
  - `works/` 導入時は記事と同一の命名・slug規則で統一

### 1. ビジュアル再設計（最優先）

- トップのヒーロー・About・Works導線のトーン統一  
- ヘッダー/フッターを作品重視の情報配置に寄せる  
- 記事一覧と作品一覧のカード密度・余白を揃える  
- CTA を控えめにし、依頼誘導ではなく探索誘導を主軸にする  

### 2. CMS基盤の下位互換再設計

- 既存 `api/posts` を壊さず、将来 `api/works` を追加できる状態にする前提で整理  
- フロントで以下を表示できる状態にする  
  - `blog/` 一覧（Journal）  
  - `works/` 一覧（新規）  
- `DeveloperEditor` の利用導線を Works でも使える前提で仕様を固定  
- revalidate と画像台帳との連携を同じ運用に収束

### 3. コンテンツ整備

- About（自己紹介）  
- Skills / Capabilities（得意領域）  
- Works（実績、3〜6件）  
- Journal（記事の下書き・公開）  
- Contact（必要最小情報、温度感の高い窓口）

### 4. 品質と検証

- lint / test / build を実行して主要ルートが壊れていないことを確認  
- API CRUD と認可の最小テスト追加  
- 主要4ルートの手動目視確認（`/`, `/about`, `/works`, `/blog`)  

## 完了条件

- ポートフォリオとして「営業サイト」より「作品展示」に見えること  
- 画像リンク切れが台帳運用で防止されること  
- Works と Journal の両方に対し、編集・公開の基本フローが設計どおり動くこと  
- 追加する認可ルールと API 仕様が文書化されること  

## 次アクション

1. `PORTFOLIO_CMS_ROADMAP.md` を基準に、トップ/Works/ヘッダー/フッターの UI 改修から着手  
2. 画像置換表 `data/image-assets.json` の `replacementUrl` 監査  
3. Works 用の content schema を決めて、最小限のモックデータ投入  
