# Architecture

## System overview

Digi Goose is one Next.js 14 App Router application. Server components and route handlers read Markdown from the local `blog/` directory. Client components provide navigation, filtering, animation, theme state, contact forms, and the developer editor. There is no application database.

```text
Browser
  |
  v
Next.js App Router (src/app)
  |-- pages + React components
  |-- route handlers (/api, RSS, sitemaps)
  |
  +--> local Markdown files (blog/) via fs/promises
  +--> static category data (data/categories.ts)
  +--> AWS SES (contact email only)

/developer_edit request --> Basic Auth middleware
Git push / PR -----------> GitHub Actions: install -> lint -> Jest
```

## Technology stack

- Next.js 14.2, React 18, TypeScript, Node.js runtime.
- Tailwind CSS/PostCSS for styling; Framer Motion for interaction and transitions.
- `gray-matter` for front matter; unified/remark/rehype for Markdown-to-HTML conversion.
- AWS SDK v3 SES client for contact email.
- Jest + ts-jest/babel-jest for tests; ESLint (`next/core-web-vitals`) and Prettier.

## Directory structure

| Path | Responsibility |
| --- | --- |
| `src/app/` | App Router layouts, pages, route handlers, styles |
| `src/app/components/` | Shared server/client UI and editor UI |
| `src/lib/` | Posts, Markdown, categories, validation, and errors |
| `data/` | Static category definitions |
| `blog/` | Runtime Markdown content store (currently empty in Git) |
| `public/` | Tracked static SVGs and placeholders |
| `__tests__/`, `src/**/__tests__/` | Jest tests |
| `.github/workflows/` | Validation CI |

## Main components

- `src/app/layout.tsx`: global metadata, fonts, theme, header/footer/navigation, and tag counts.
- `src/app/page.tsx` + `HomeWindow.tsx`: home composition and recent/category post display.
- `src/app/blog/[slug]/page.tsx` + `PostLayout.tsx`: article lookup, conversion, related navigation, and rendering.
- `SearchBar.tsx`, search/tag/category routes: content discovery.
- `DeveloperEditor.tsx`: browser CRUD client and preview orchestration.
- `BusinessContactForm.tsx` / `TutorContactForm.tsx`: `/api/contact` clients.

## Data flow

### Read and render a post

1. An App Router page calls a function in `src/lib/posts.ts`.
2. The function reads `blog/*.md`, parses front matter, and returns `Post` objects.
3. A post body passes through `markdownToHtml`, including internal-link, table, bold, chat-block, heading, and HTML transformations.
4. Server and client components render the result. Article HTML uses `dangerouslySetInnerHTML`; review sanitization implications when changing accepted content sources.

### Edit a post

1. Basic Auth middleware gates the `/developer_edit` page request.
2. `DeveloperEditor` calls `/api/posts` and `/api/posts/[filename]`.
3. Route handlers validate the basename and modify local files under `blog/`.
4. The editor can request path revalidation through `/api/revalidate` (currently missing the required client-side secret; see `CURRENT.md`).

### Contact

1. A form POSTs JSON to `/api/contact`.
2. The route validates fields, honeypot, length, email format, and in-memory request count.
3. A Node.js route handler invokes AWS SES and returns JSON.

## API structure

| Method/path | Implemented behavior |
| --- | --- |
| `GET, POST /api/posts` | List Markdown filenames; create a file |
| `GET, PUT, DELETE /api/posts/[filename]` | Read, update, or delete a validated Markdown filename |
| `GET /api/search-data` | Return lightweight post/category/tag search data |
| `POST /api/contact` | Validate and send a contact email with SES |
| `POST /api/revalidate?secret=...` | Revalidate a supplied array of paths |
| `GET /rss.xml` | Generate RSS from posts |
| `GET /post-sitemap.xml` | Generate post sitemap XML |
| `GET /category-sitemap.xml` | Generate category sitemap XML |
| Next metadata route `/sitemap.xml` | Generate the main sitemap |

## Database

There is no database. Markdown files are accessed with `fs/promises`; category metadata is a TypeScript array. Consequently, write persistence and multi-instance consistency depend on the deployment filesystem.

## Authentication

Both tracked middleware files implement HTTP Basic Auth matching only `/developer_edit` and descendants, using `BASIC_AUTH_USERNAME` and `BASIC_AUTH_PASSWORD`. API authorization is not implemented. `/api/revalidate` separately compares a query token to `REVALIDATE_SECRET`.

## External services

- AWS SES sends contact email. Explicit SES credentials are constructed from environment variables; standard AWS region/credential variable names are accepted as fallbacks.
- Google-hosted font files are requested through `next/font/google` during build.
- `next/image` permits remote images only from the configured Google Cloud Storage asset host.

## Deployment

The repository defines a standard `next build` / `next start` Node.js deployment and documents EC2 as an example, but contains no infrastructure or deployment automation. GitHub Actions runs dependency installation, lint, and Jest for pushes and pull requests; it does not deploy.

## Important dependencies

Filesystem access makes the post/editor routes Node-oriented and requires a writable, persistent `blog/` directory for production edits. SES requires network access, credentials, a configured region, and verified SES identities. See `OPERATIONS.md` for exact variables and commands.
