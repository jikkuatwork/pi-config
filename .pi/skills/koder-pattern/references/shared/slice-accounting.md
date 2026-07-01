---
title: Koder Slice Accounting
updated: 2026-07-01
---

# Koder Slice Accounting

Use this when raw issue counts are too coarse to show progress. Large repos often
have umbrella issues that require many plans, live proofs, or child issues; a
queue can drain substantial work while the open issue count barely moves. Slice
accounting makes that movement visible without pretending parent issues are done.

## Core terms

| Term | Meaning |
| --- | --- |
| `seam` | A stable ownership boundary inside an issue: runtime, CLI, policy, docs, live proof, etc. |
| `slice` | One checkable unit of progress inside a seam. It can be a plan, child issue, ledger row, validation gate, release gate, or live proof. |
| `slice ledger` | A compact table on a broad issue that names remaining slices and their status. |
| `slice delta` | Queue/run closeout count of slices queued, drained, blocked, released, live-proven, and still left. |

A slice should be small enough that a runner can say `done`, `blocked`, or
`skipped` with evidence. If not, split it or call it a mapping seam instead.

## Issue kinds

Add `issue_kind` only when it helps. Do not rewrite old issues just to add it.

| `issue_kind` | Use for | Closure expectation |
| --- | --- | --- |
| `slice` | One bounded capability or bug fix. This is the default when absent. | Closes when its acceptance criteria and validation proof are satisfied. |
| `track` | Umbrella issue with many checkable slices across one domain. | Closes when its slice ledger and acceptance criteria are complete. |
| `mapping` | Decomposition issue whose job is to create child issues/plans/slices. | Closes when the map and traceability are complete, not when children ship. |
| `live-proof` | Bug/fix issue where source can land locally but closure needs release/live evidence. | Closes after source proof plus the required live/release proof. |

Optional frontmatter:

```yaml
issue_kind: track     # slice | track | mapping | live-proof
parent: 123           # for child/slice issues
slice_count: 12       # optional current ledger total
slices_done: 5        # optional current done count
```

These fields are hints for humans and queue builders. The canonical truth remains
the issue body, slice ledger, and evidence.

## Slice Ledger section

For `track`, `mapping`, or large `live-proof` issues, add a concise ledger near
Acceptance Criteria or Current Status:

```markdown
## Slice Ledger

| Slice | Status | Ref | Queue | Closure gate |
| --- | --- | --- | --- | --- |
| CLI parser | queued | `koder/plans/610_issue415_github_install_source_parser/INDEX.md` | `Q065` | local tests |
| GitHub fetch | candidate | — | — | network/fetch design |
| deploy integration | candidate | — | — | source metadata schema |
```

Recommended statuses:

| Status | Meaning |
| --- | --- |
| `candidate` | Known slice, not yet planned. |
| `planned` | Has an issue/plan/runbook but is not queued. |
| `queued` | Packed into a queue. |
| `running` | Actively being drained. |
| `done` | Local/source validation complete. |
| `released` | Included in a released build where release matters. |
| `live_proven` | Live/smoke proof gathered where required. |
| `blocked` | Needs user decision, credentials, live approval, or design split. |
| `closed` | Slice no longer contributes remaining work. |

Keep rows short. Put implementation detail in the linked plan/issue, not the
ledger.

## Queue slice accounting

Queues should report both issue impact and slice impact. Prefer this summary in
the queue frontmatter or a `## Progress Accounting` section:

```yaml
progress_accounting:
  issues_touched: 10
  slices_queued: 12
  issues_likely_closed: 1
  issues_moved_to_live_gate: 3
```

Human-facing table:

```markdown
## Progress Accounting

| Metric | Count |
| --- | ---: |
| Issues touched | 10 |
| Slices queued | 12 |
| Likely slices drained | 12 |
| Likely issues closed | 1 |
| Likely moved to live-proof-only | 3 |
```

## Queue/run closeout language

Closeouts should distinguish issue count from real movement:

```markdown
Queue result:
- Issues closed: 1
- Issues advanced: 10
- Slices drained: 12
- Slices blocked: 2
- Issues moved to live-proof-only: 3
- Raw open issue delta: -1
```

For each broad issue touched, prefer a before/after row:

```markdown
| Issue | Before | After |
| ---: | --- | --- |
| `#480` | local plan queued | source fix released; long provider proof remains |
```

## Lazy adoption rule

Do not mass-rewrite existing backlog. Apply slice accounting lazily when:

- filing a new broad issue;
- touching a broad issue for a queue;
- closing or reconciling a queue;
- extracting child issues from a mapping issue;
- the user asks why open issue count is not moving.

If old issue format conflicts with this guide, preserve the old artifact and add
a small `## Slice Ledger` or `## Progress Accounting` section rather than
rewriting history.
