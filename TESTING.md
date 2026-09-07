# Testing and Validation

## Test strategy

Use the smallest relevant check while iterating, then the required repository checks before committing code. Current automated coverage is Jest unit-level testing of library behavior and direct invocation of selected route handlers. There is no configured integration environment or browser E2E framework.

## Lint

```bash
npm run lint
```

Runs Next.js ESLint with `.eslintrc.json`. Required before committing code changes.

## Typecheck

```bash
npx tsc --noEmit
```

There is no `typecheck` npm script. TypeScript is strict in `tsconfig.json`, although selected strict sub-options are relaxed.

## Unit and route tests

```bash
npm test
npm test -- --runInBand src/lib/__tests__/posts.test.ts
```

Jest discovers `*.test.ts` files. Existing tests cover post helpers, categories, Markdown conversion, arrow asset selection, and GET handlers for posts/search data. The tests use the real local `blog/` directory, which is empty by default; one Markdown test creates and removes a temporary post.

## Integration tests

No distinct integration-test command or external-service test environment is configured. Direct route-handler tests are not a substitute for testing middleware, a running server, filesystem deployment semantics, or AWS SES.

## E2E

No E2E runner or browser suite is configured. For user-visible changes, manually run `npm run dev` and verify relevant routes; add a screenshot when the task requires or produces a perceptible UI change.

## Build

```bash
npm run build
```

Creates the production Next.js build and performs framework compilation/type validation. It may require network access because the layout uses Google fonts. Run for routing, configuration, dependency, rendering, or release-wide changes.

## Change-to-check matrix

| Change | Minimum checks |
| --- | --- |
| Documentation/comments only | Link/path review; tests and lint optional |
| UI/component | Relevant Jest test if present + `npm run lint` + `npx tsc --noEmit`; manual route check |
| Post/Markdown library | Targeted library test + `npm test` + `npm run lint` + typecheck |
| API/auth/contact | Relevant route tests (add if absent) + `npm test` + lint + typecheck |
| Routing/config/dependency/global layout | Full lint + typecheck + tests + build |
| Static content or assets | Validate referenced paths + affected page/build |

## CI

`.github/workflows/ci.yml` runs on every push and pull request using Node.js 18: `npm ci`, `npm run lint`, then `npm test`. Typecheck is partly exercised by tooling/build but is not a separate CI step, and CI does not run `npm run build`.
