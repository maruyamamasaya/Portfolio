# AGENTS Instructions

## Scope

These instructions apply to the entire repository. Source code, configuration, and tests are the primary evidence; distinguish implemented behavior from intended behavior, decisions, and defects.

## Start of work

1. Read `CURRENT.md`, then confirm this file.
2. Read `ARCHITECTURE.md` when behavior or dependencies matter.
3. Use `CODEMAP.md` to locate code and `TESTING.md` to select checks.
4. Read `OPERATIONS.md` for environment, runtime, or deployment work.
5. Search `decisions/` when a design choice is involved and recent `sessions/` when prior work matters.

## Investigation workflow

Do not read the repository indiscriminately. Start with `git grep`, `rg`, IDE symbol search, a language server, or repository search. Search function/class/component/route names, API paths, DB tables, environment variables, error messages, features, test names, `TODO`, and `FIXME`.

Trace the relevant path before editing:

```text
entry point -> main processing -> data access -> external dependency -> tests
```

Typical commands: `rg "login"`, `rg "ComponentName" src`, `rg "/api/" src`, `rg "process\.env"`, and `rg "TODO|FIXME"`.

## While working

- Respect existing behavior; code alone does not prove product intent.
- Do not turn uncertainty into fact. Record unknowns explicitly.
- Keep changes small and limited to the request; avoid incidental refactors.
- Find callers, callees, and relevant tests before implementation.
- Use TypeScript/React conventions and the repository ESLint/Prettier configuration.
- Reuse assets in `public/` or `data/`; do not generate images or commit binaries.
- Record only significant new architectural decisions in `decisions/`.

## Validation and completion

- For code changes, run `npm run lint` and `npm test` before committing. Select typecheck, integration, E2E, and build checks as documented in `TESTING.md`.
- Documentation/comment-only changes do not require lint or tests, though targeted documentation checks are encouraged.
- Add a concise session record under `sessions/`.
- Update `CURRENT.md` for status changes; update architecture, code map, testing, or operations docs only when their subject changes.
- Commit on the current branch with a clear Japanese commit message and leave the working tree clean.
- Summarize changes plus test/lint results in the pull request.

## Document responsibilities

| Document | Purpose |
| --- | --- |
| `CURRENT.md` | Current implementation status and next work |
| `ARCHITECTURE.md` | How the implemented system works |
| `CODEMAP.md` | Feature-to-code and search entry points |
| `TESTING.md` | How to validate changes |
| `OPERATIONS.md` | How to run, configure, and deploy |
| `decisions/` | Why important design choices were made |
| `sessions/` | Concise history of agent work |
| `README.md` | Human-facing project and setup guide |
