# Markdown ファイルの構成

このプロジェクトでは `blog/` もしくは `developers_blog/` ディレクトリ配下に Markdown 形式の記事ファイルを配置します。各ファイルは以下の構成を持ちます。

```md
---
title: "記事タイトル"
date: "YYYY-MM-DD"
image: "/images/example.png"
tags:
  - "タグ1"
  - "タグ2"
updated: "YYYY-MM-DD"
---

本文が続きます。
```

フロントマターでは記事タイトル、投稿日、サムネイル画像へのパスに加え、カテゴリ分けに使用する `tags` と最終更新日を示す `updated` を指定します。フロントマター直下に記述された本文がブログとして表示されます。

新しい記事を追加する際は、上記フォーマットに従って `blog/` または `developers_blog/` に `.md` ファイルを置いてください。
