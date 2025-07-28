---
---

# API ルート一覧

各エンドポイントのメソッド、パラメータ、例をまとめています。パスはすべてサイトルートからの相対パスです。

## `/api/calendar` - `GET`

指定した年月の日付ごとに投稿を取得します。

### パラメータ

- `year` : 西暦年 (例: `2024`)
- `month` : 月を 0 始まりの数値で指定 (例: `4` は 5 月)

### 例

```bash
curl "/api/calendar?year=2024&month=4"
```

## `/api/dev-posts` - `GET`, `POST`

### GET

開発者向け記事のファイル名一覧を返します。

```bash
curl /api/dev-posts
```

### POST

`filename` と `content` を JSON で渡して新規ファイルを作成します。

```bash
curl -X POST /api/dev-posts \
  -H "Content-Type: application/json" \
  -d '{"filename":"sample.md","content":"# hello"}'
```

## `/api/dev-posts/[filename]` - `GET`, `PUT`, `DELETE`

`[filename]` 部分に対象の Markdown ファイル名を指定します。

### GET

指定ファイルの内容を取得します。

```bash
curl /api/dev-posts/example.md
```

### PUT

ファイル内容を更新します。

```bash
curl -X PUT /api/dev-posts/example.md \
  -H "Content-Type: application/json" \
  -d '{"content":"updated text"}'
```

### DELETE

ファイルを削除します。

```bash
curl -X DELETE /api/dev-posts/example.md
```

## `/api/posts` - `GET`, `POST`

公開ブログ記事を扱うエンドポイントで、使い方は `/api/dev-posts` と同様です。

## `/api/posts/[filename]` - `GET`, `PUT`, `DELETE`

公開記事ファイルを取得・更新・削除します。`[filename]` の指定方法は `/api/dev-posts/[filename]` と同じです。

## `/api/revalidate` - `POST`

ISR の再生成を手動で行います。クエリ `secret` に環境変数 `REVALIDATE_SECRET` を指定し、ボディには再生成したい `paths` 配列を渡します。

```bash
curl -X POST "/api/revalidate?secret=YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"paths":["/blog/my-post"]}'
```

## `/api/search-data` - `GET`

検索用の投稿メタ情報、カテゴリ、タグ一覧を返します。

```bash
curl /api/search-data
```

## `/api/upload-image` - `POST`

`file` フィールドで送信された画像を保存します。

```bash
curl -X POST /api/upload-image \
  -F "file=@path/to/image.png"
```
