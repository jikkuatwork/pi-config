---
title: Harnex Dispatch Router
updated: 2026-06-05
---

# Harnex Dispatch Router

Use only when a queue or review workflow needs worker agents through `harnex`. Live `harnex --help`, `harnex agents-guide`, and repo-local workflow docs are authority when behavior differs.

## Routes

| Need | Load |
| --- | --- |
| Decide whether harnex is appropriate; command/session/meta shape | `references/harnex/dispatch.md` |
| Write bounded worker brief controls | `references/harnex/brief-bounds.md` |
| Monitor/stop sessions, apply wall-clock caps, queue integration | `references/harnex/monitoring.md` |

## Preconditions

Before dispatching:

1. Read repo instructions and the source issue/plan/review/queue entry.
2. Confirm harnex is available: `harnex --help` and `harnex agents-guide`.
3. Confirm risky actions are allowed by the user and queue constraints.
4. Prepare a bounded brief; missing bounds make the dispatch invalid.
5. Decide whether implementation must be serial on the current branch or isolated in a worktree.
