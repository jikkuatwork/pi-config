---
title: Harnex Dispatch Router
updated: 2026-07-14
---

# Harnex Dispatch Router

Use only when a queue or review workflow needs worker agents through `harnex`. Live `harnex --help`, `harnex agents-guide`, and repo-local workflow docs are authority when behavior differs.

## Routes

| Need | Load |
| --- | --- |
| Decide whether harnex is appropriate; command/session/meta shape | `references/harnex/dispatch.md` |
| Write bounded worker brief controls | `references/harnex/brief-bounds.md` |
| Monitor/stop sessions, apply wall-clock caps, queue integration | `references/harnex/monitoring.md` |
| Explicit blind-orchestrator queue | First load `references/queues/blind-orchestration.md` and `references/queues/blind-briefs.md`; use `references/queues/blind-recovery.md` on disagreement |

## Preconditions

Before dispatching:

1. Read repo instructions and the source artifacts allowed for the current role. In blind coordinator/governor context, read only queue/current-row process metadata and bounded plan capability/validation/stop facts; pass canonical plan/review paths to phase workers instead of reading implementation or finding detail.
2. Confirm harnex is available: `harnex --help` and `harnex agents-guide`.
3. Confirm risky actions are allowed by the user and queue constraints.
4. Prepare a bounded brief; missing bounds make the dispatch invalid.
5. Decide whether implementation must be serial on the current branch or isolated in a worktree.
6. When queue mode is `blind`, confirm fresh implementation and independent review isolation, compact phase/coordinator receipts, and a declared coordinator rollover cap. If these cannot be enforced, stop rather than dispatch directly.
