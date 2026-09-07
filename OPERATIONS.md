# Operations

## Local development

Prerequisite: Node.js and npm compatible with the lockfile (CI currently uses Node.js 18).

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Next.js normally serves at `http://localhost:3000`. The checked-in `blog/` directory is empty, so add valid local Markdown content when testing content-driven behavior. Do not commit secrets.

## Environment variables

| Variable | Required for | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_DISABLE_INITIAL_ANIMATION` | Optional UI behavior | `true` skips the initial page transition |
| `BASIC_AUTH_USERNAME` | Developer editor access | Used by middleware; use a non-empty value outside local throwaway environments |
| `BASIC_AUTH_PASSWORD` | Developer editor access | Used by middleware; keep secret |
| `REVALIDATE_SECRET` | Revalidation API | Sent as `/api/revalidate?secret=...`; do not expose it in browser bundles |
| `AWS_SES_REGION` | Contact email | Falls back to `AWS_REGION`, then `AWS_DEFAULT_REGION` |
| `AWS_SES_ACCESS_KEY_ID` | Contact email | Falls back to `AWS_ACCESS_KEY_ID` |
| `AWS_SES_SECRET_ACCESS_KEY` | Contact email | Falls back to `AWS_SECRET_ACCESS_KEY` |

`.env.example` documents the application-specific names. Contact handling explicitly loads Next environment files for process-manager launches.

## Data and filesystem setup

There is no database setup. Articles are `blog/<filename>.md` files with front matter such as `title`, `date`, `category`, optional `tags`, `image`, `alt`, and `updated`, followed by Markdown content. The server process needs read access; using the editor additionally requires write/delete access and persistent storage. Ephemeral or read-only serverless filesystems are unsuitable for persistent editor writes.

## External services

AWS SES must be configured in the selected region, with credentials authorized to send from the contact address and identities satisfying the account's SES verification/sandbox rules. Never log or commit credential values. The contact endpoint logs only which variable names were selected and SES result/error metadata.

## Build and start

```bash
npm run build
npm start
```

The repository mentions an EC2-like Node.js host but includes no PM2 file, container, infrastructure-as-code, hosting manifest, health check, backup job, or automated deployment. Establish those details in the deployment environment rather than inferring them.

## CI/CD

GitHub Actions validates pushes and pull requests with clean install, lint, and Jest. There is no CD stage. Confirm the production Node version, environment injection, writable/persistent `blog/` storage, TLS/reverse proxy, SES access, and rollback/backup approach outside this repository.

## Troubleshooting

- **Editor returns 401:** confirm Basic Auth variables and request path. API routes currently have a separate authorization gap documented in `CURRENT.md`.
- **Revalidation returns `Invalid token`:** the request must include a token equal to `REVALIDATE_SECRET`; the current browser editor omits it.
- **Contact returns 500:** check region and credential presence, SES permissions, verified identities, and server logs; do not print secret values.
- **Posts are empty:** check for readable `.md` files directly under `blog/`; nested files are not discovered.
- **Editor changes disappear:** verify `blog/` is writable and persistent across process restarts/deploys.
- **Build cannot fetch fonts:** `next/font/google` can require outbound network access during build.
