# コードマップ

これは全ファイル一覧ではなく、検索を始めるための索引である。ここから `rg` または `git grep` でシンボルとパスを検索する。

## アプリケーションの入口と共通 shell

**主要ファイル:** `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/loading.tsx`, `src/app/globals.css`, `src/app/mobile.css`, `src/app/components/HomeWindow.tsx`, `src/app/components/Header.tsx`, `src/app/components/Footer.tsx`, `src/app/components/ImmersiveAtmosphere.tsx`, `src/app/components/visual/VisualEnvironmentContext.tsx`, `src/app/components/visual/SectionEnvironment.tsx`, `src/app/components/visual/ProjectVisualSurface.tsx`, `src/config/site.ts`, `data/image-assets.json`, `IMAGE_ASSETS.md`

**検索語:** `RootLayout`, `HomePage`, `HomeWindow`, `siteConfig`, `image-assets`, `replacementUrl`, `metadata`, `ThemeProvider`, `VisualEnvironment`, `ProjectVisualSurface`, `data-visual-space`

## ブログと Markdown

**主要ファイル:** `src/lib/posts.ts`, `src/lib/markdownToHtml.ts`, `src/app/blog/page.tsx`, `src/app/blog/[slug]/page.tsx`, `src/app/components/PostLayout.tsx`, `blog/`

**検索語:** `getSortedPosts`, `getPost`, `markdownToHtml`, `getBacklinks`, `Post`, `:::chat`, `FileNotFoundError`

## CMS 基盤（記事 + Works への拡張）

**主要ファイル:** `src/app/developer_edit/page.tsx`, `src/app/components/DeveloperEditor.tsx`, `src/app/api/posts/route.ts`, `src/app/api/posts/[filename]/route.ts`, `src/app/api/works/route.ts`, `src/app/api/works/[filename]/route.ts`, `src/app/works/page.tsx`, `src/app/works/[slug]/page.tsx`, `src/app/works/preview/[slug]/page.tsx`, `src/lib/works.ts`, `src/lib/validateFilename.ts`, `content/works/`, `data/image-assets.json`

**検索語:** `POST /api/posts`, `PUT /api/posts`, `DELETE /api/posts`, `POST /api/works`, `PUT /api/works`, `DELETE /api/works`, `getSortedWorks`, `getWork`, `draft`, `publishedAt`, `includeScheduled`, `works preview`, `slug`

### 追加検討

再設計時は、この入口群を共通化し、作品データを `Post` と同じインデックス・編集・再検証の導線に寄せる。作品詳細ページは `src/app/works/page.tsx` と `src/app/works/[slug]/page.tsx`、管理者確認は `src/app/works/preview/[slug]/page.tsx` が現実装入口になる。将来予約公開運用は `src/lib/works.ts` の `WorkVisibilityOptions` から拡張する。

## 検索、タグ、カテゴリ

**主要ファイル:** `src/app/search/page.tsx`, `src/app/api/search-data/route.ts`, `src/app/tags/`, `src/app/categories/`, `src/lib/categories.ts`, `src/lib/categoryTree.ts`, `data/categories.ts`

**検索語:** `searchPosts`, `getAllTags`, `getTagCounts`, `getPostsByCategory`, `/api/search-data`, category slugs such as `pc-support`

## 編集画面と記事 API

**主要ファイル:** `src/app/developer_edit/page.tsx`, `src/app/components/DeveloperEditor.tsx`, `src/app/components/DeveloperCalendar.tsx`, `src/app/api/posts/route.ts`, `src/app/api/posts/[filename]/route.ts`, `src/lib/validateFilename.ts`

**検索語:** `DeveloperEditor`, `POSTS_BASE`, `saveFile`, `deleteFile`, `validateFilename`, `Invalid filename`, `/api/posts`

## 認証と再検証

**主要ファイル:** `middleware.ts`, `src/middleware.ts`, `src/app/api/revalidate/route.ts`

**検索語:** `BASIC_AUTH_USERNAME`, `authorization`, `matcher`, `REVALIDATE_SECRET`, `WORKS_PREVIEW_SECRET`, `revalidatePath`, `Invalid token`, `/works/preview`

## 問い合わせと AWS SES

**主要ファイル:** `src/app/contact/business/BusinessContactForm.tsx`, `src/app/contact/tutor/TutorContactForm.tsx`, `src/app/api/contact/route.ts`

**検索語:** `/api/contact`, `ContactRequest`, `rateLimit`, `SESClient`, `SendEmailCommand`, `AWS_SES_`, `メール送信に失敗しました`

## 共通 UI

**主要ファイル:** `src/app/components/` (notably `Header.tsx`, `Footer.tsx`, `BottomNav.tsx`, `Breadcrumbs.tsx`, `ThemeProvider.tsx`, `PageTransition.tsx`, `Card.tsx`)

**検索語:** component name, `'use client'`, `useTheme`, `useReducedMotion`, Tailwind class or visible Japanese copy

## 案内・ポリシーページ

**主要ファイル:** `src/app/about/`, `src/app/services/`, `src/app/pricing/`, `src/app/works/`, `src/app/ai-course/`, `src/app/arcana/`, `src/app/policy/`

**検索語:** route segment, exported page function, page heading, `metadata`

## Feed と SEO

**主要ファイル:** `src/app/sitemap.ts`, `src/app/rss.xml/route.ts`, `src/app/post-sitemap.xml/route.ts`, `src/app/category-sitemap.xml/route.ts`, `src/app/layout.tsx`, `public/robots.txt`

**検索語:** `baseUrl`, `freehackapp.com`, `sitemap`, `rss`, `openGraph`, `generateMetadata`

## 設定と環境

**主要ファイル:** `package.json`, `tsconfig.json`, `next.config.js`, `tailwind.config.js`, `postcss.config.js`, `.eslintrc.json`, `.prettierrc`, `.env.example`

**検索語:** `process.env`, `remotePatterns`, `paths`, npm script/dependency name

## テストと CI

**主要ファイル:** `__tests__/`, `src/lib/__tests__/`, `src/app/api/__tests__/`, `jest.config.js`, `.github/workflows/ci.yml`, `scripts/check-component-names.js`

**検索語:** `describe(`, `it(`, target symbol, route path, `npm run lint`, `npm test`

## 推奨検索順序

```bash
rg "feature-or-visible-text" src data __tests__
rg "SymbolName" src --glob '*.{ts,tsx}'
rg "/api/route-path|process\.env|Error message" . --glob '!node_modules/**'
rg "describe\(|it\(" __tests__ src --glob '*test.ts*'
rg "TODO|FIXME" . --glob '!node_modules/**'
```

各 hit から import / caller、下流の filesystem / service access、対応テストをたどってから編集する。
