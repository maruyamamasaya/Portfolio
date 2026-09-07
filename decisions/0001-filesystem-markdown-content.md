# 0001: Record the current filesystem Markdown architecture

- Status: Accepted (existing implementation, rationale partly unknown)
- Date: 2026-09-07

## Context

The implemented application reads and mutates `blog/*.md` through Node.js filesystem APIs. No database, object-storage adapter, or CMS implementation is present. Future agents need to recognize the operational constraint without treating undocumented original intent as known.

## Decision

Document the local filesystem as the current content system and preserve it unless a separately approved change replaces it. Treat Markdown/front matter as content records and `data/categories.ts` as category metadata.

## Reason

This accurately describes the deployed code path and avoids accidental introduction of a second source of truth. The original reason for selecting filesystem storage is not recorded.

## Alternatives

- Database/ORM-backed posts.
- External headless CMS.
- Object storage or a Git-backed publishing flow.

## Consequences

Runtime editing requires a writable, persistent, shared filesystem; multi-instance or ephemeral deployments can lose or diverge content. Backups and deployment content provisioning are operational responsibilities until another architecture is deliberately selected.
