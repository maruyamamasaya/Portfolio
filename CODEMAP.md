# Code Map

Use this as an index, then search symbols and paths with `rg` or `git grep`; it is intentionally not a complete file list.

## Application entry and shell

**Files:** `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`, `src/app/mobile.css`, `src/app/components/HomeWindow.tsx`

**Search:** `RootLayout`, `HomePage`, `HomeWindow`, `metadata`, `ThemeProvider`

## Blog and Markdown

**Files:** `src/lib/posts.ts`, `src/lib/markdownToHtml.ts`, `src/app/blog/page.tsx`, `src/app/blog/[slug]/page.tsx`, `src/app/components/PostLayout.tsx`, `blog/`

**Search:** `getSortedPosts`, `getPost`, `markdownToHtml`, `getBacklinks`, `Post`, `:::chat`, `FileNotFoundError`

## Search, tags, and categories

**Files:** `src/app/search/page.tsx`, `src/app/api/search-data/route.ts`, `src/app/tags/`, `src/app/categories/`, `src/lib/categories.ts`, `src/lib/categoryTree.ts`, `data/categories.ts`

**Search:** `searchPosts`, `getAllTags`, `getTagCounts`, `getPostsByCategory`, `/api/search-data`, category slugs such as `pc-support`

## Editor and post API

**Files:** `src/app/developer_edit/page.tsx`, `src/app/components/DeveloperEditor.tsx`, `src/app/components/DeveloperCalendar.tsx`, `src/app/api/posts/route.ts`, `src/app/api/posts/[filename]/route.ts`, `src/lib/validateFilename.ts`

**Search:** `DeveloperEditor`, `POSTS_BASE`, `saveFile`, `deleteFile`, `validateFilename`, `Invalid filename`, `/api/posts`

## Authentication and revalidation

**Files:** `middleware.ts`, `src/middleware.ts`, `src/app/api/revalidate/route.ts`

**Search:** `BASIC_AUTH_USERNAME`, `authorization`, `matcher`, `REVALIDATE_SECRET`, `revalidatePath`, `Invalid token`

## Contact and AWS SES

**Files:** `src/app/contact/business/BusinessContactForm.tsx`, `src/app/contact/tutor/TutorContactForm.tsx`, `src/app/api/contact/route.ts`

**Search:** `/api/contact`, `ContactRequest`, `rateLimit`, `SESClient`, `SendEmailCommand`, `AWS_SES_`, `メール送信に失敗しました`

## Shared UI

**Files:** `src/app/components/` (notably `Header.tsx`, `Footer.tsx`, `BottomNav.tsx`, `Breadcrumbs.tsx`, `ThemeProvider.tsx`, `PageTransition.tsx`, `Card.tsx`)

**Search:** component name, `'use client'`, `useTheme`, `useReducedMotion`, Tailwind class or visible Japanese copy

## Marketing and policy pages

**Files:** `src/app/about/`, `src/app/services/`, `src/app/pricing/`, `src/app/works/`, `src/app/ai-course/`, `src/app/arcana/`, `src/app/policy/`

**Search:** route segment, exported page function, page heading, `metadata`

## Feeds and SEO

**Files:** `src/app/sitemap.ts`, `src/app/rss.xml/route.ts`, `src/app/post-sitemap.xml/route.ts`, `src/app/category-sitemap.xml/route.ts`, `src/app/layout.tsx`, `public/robots.txt`

**Search:** `baseUrl`, `freehackapp.com`, `sitemap`, `rss`, `openGraph`, `generateMetadata`

## Configuration and environment

**Files:** `package.json`, `tsconfig.json`, `next.config.js`, `tailwind.config.js`, `postcss.config.js`, `.eslintrc.json`, `.prettierrc`, `.env.example`

**Search:** `process.env`, `remotePatterns`, `paths`, npm script/dependency name

## Tests and CI

**Files:** `__tests__/`, `src/lib/__tests__/`, `src/app/api/__tests__/`, `jest.config.js`, `.github/workflows/ci.yml`, `scripts/check-component-names.js`

**Search:** `describe(`, `it(`, target symbol, route path, `npm run lint`, `npm test`

## Recommended search sequence

```bash
rg "feature-or-visible-text" src data __tests__
rg "SymbolName" src --glob '*.{ts,tsx}'
rg "/api/route-path|process\.env|Error message" . --glob '!node_modules/**'
rg "describe\(|it\(" __tests__ src --glob '*test.ts*'
rg "TODO|FIXME" . --glob '!node_modules/**'
```

From each hit, inspect imports/callers, downstream filesystem or service access, and matching tests before editing.
