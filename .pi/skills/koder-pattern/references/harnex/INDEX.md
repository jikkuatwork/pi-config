---
title: Harnex Dispatch Router
updated: 2026-07-14
---

# Harnex Dispatch Router

Use only after `references/queues/mode-selection.md` shows that a fresh worker
materially helps. Queue existence alone is not enough. Live `harnex --help`,
`harnex agents-guide`, and repo-local workflow docs are authority when behavior
differs.

## Routes

| Need | Load |
| --- | --- |
| Decide whether harnex is appropriate | `references/queues/mode-selection.md`, then `references/harnex/dispatch.md` |
| Write bounded worker brief controls | `references/harnex/brief-bounds.md` |
| Monitor/stop sessions, apply wall-clock caps, queue integration | `references/harnex/monitoring.md` |
| Explicit blind-orchestrator queue | First load `references/queues/mode-selection.md`, `references/queues/blind-orchestration.md`, and `references/queues/blind-briefs.md`; use `references/queues/blind-recovery.md` on disagreement |

## Preconditions

Before dispatching:

1. Record the promised product/process outcome, why direct work is insufficient,
   expected phases/workers, planning/wall budget, and stop gate.
2. Read repo instructions and the source artifacts allowed for the current role. In blind coordinator/governor context, read only queue/current-row process metadata and bounded plan capability/validation/stop facts; pass canonical plan/review paths to phase workers instead of reading implementation or finding detail.
3. Confirm Harnex is available: `harnex --help`, `harnex agents-guide`, and
   `harnex doctor`; verify runtime telemetry is external or ignored.
4. Confirm risky actions are allowed by the user and queue constraints.
5. Prepare a bounded brief; missing bounds make the dispatch invalid.
6. Decide whether implementation must be serial on the current branch or isolated in a worktree.
7. Apply the two-attempt no-op/boot/permission circuit breaker and short first
   monitor fence from the mode/monitoring routes.
8. When queue mode is `blind`, confirm its declared isolation/review boundary,
   compact proof, and coordinator rollover cap. If these cannot be enforced,
   stop rather than dispatch directly.
