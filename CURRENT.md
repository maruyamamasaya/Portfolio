# Current Status

## Project

Digi Goose is a Japanese portfolio, service-information, and Markdown blog site built with the Next.js App Router. The source of truth for this status is the tracked code and configuration as inspected on 2026-09-07.

## Current phase

The public site, content discovery, contact flow, and local article editor are implemented. The repository currently contains no published Markdown posts (`blog/` contains only `.gitkeep`), so blog-driven pages render an empty content state until posts are supplied.

## Implemented

- Public portfolio/service/pricing/policy pages and responsive shared navigation.
- Filesystem-backed Markdown posts, parsing, article pages, backlinks, tags, categories, search, RSS, and sitemaps.
- Browser editor for creating, reading, updating, deleting, previewing, and revalidating Markdown posts.
- Basic authentication middleware for `/developer_edit` page paths.
- Contact forms delivered through AWS SES, with validation, honeypot, and per-process in-memory rate limiting.
- Jest unit/API-route tests, ESLint, TypeScript configuration, production build scripts, and GitHub Actions lint/test CI.

## In progress

- No feature work is explicitly marked in progress in source, tests, or repository documentation.

## Not implemented / not evidenced

- No database, ORM, schema, migration, or persistent application datastore is present. Posts use local files.
- No comment feature exists.
- No integration-test or browser E2E suite is configured.
- No deployment-as-code, container definition, or automated deployment job is tracked; CI only validates.
- No standalone `typecheck` npm script exists (use `npx tsc --noEmit`).

## Known issues

- The post write/delete API paths are outside the Basic Auth middleware matcher; protecting the editor page alone does not establish API authorization.
- `DeveloperEditor` calls `/api/revalidate` without the required `secret` query parameter, so revalidation returns 401 when `REVALIDATE_SECRET` is configured.
- Contact rate limiting is process-local and resets on restart; it is not shared across instances.
- Root `middleware.ts` and `src/middleware.ts` duplicate the same implementation, making the effective maintenance location ambiguous.
- Several image paths referenced by UI/metadata are absent from the tracked `public/` files; visual completeness depends on externally provisioned assets.

## Technical debt

- Tests cover post utilities, Markdown conversion, categories, one icon helper, and two GET routes, but not contact, mutations, authorization, revalidation, page rendering, or browser journeys.
- `README.en.md` is maintained separately and may drift from the Japanese README.
- The CI uses Node.js 18 and v3 GitHub Actions; runtime/dependency compatibility should be deliberately reviewed before changing them.

## Next actions

1. Decide and document an authorization boundary for all editor and post-mutation APIs, then add authorization tests.
2. Define a safe server-side revalidation flow rather than exposing a secret to client code.
3. Add contact and mutation route tests, followed by a minimal browser smoke test.
4. Decide whether production content is deployed with the repository or mounted/provisioned externally.
5. Remove or consolidate duplicate middleware only after verifying Next.js resolution in the target deployment.
