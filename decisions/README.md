# Decision Records

Use this directory for significant choices whose rationale would not be recoverable from code. Do not create a record for every change.

## Naming and lifecycle

- Name records `NNNN-short-title.md` with monotonically increasing numbers.
- State the status and date. Preserve accepted records; supersede them with a new record rather than silently rewriting history.
- Link affected code/docs and separate observed facts from intended behavior.

## Template

```markdown
# NNNN: Title

- Status: Proposed | Accepted | Superseded
- Date: YYYY-MM-DD

## Context
What problem and constraints exist?

## Decision
What was decided?

## Reason
Why is this the preferred choice?

## Alternatives
What else was considered?

## Consequences
What becomes easier, harder, or required?
```
