---
title: Blind Queue Orchestration
updated: 2026-07-15
---

# Blind Queue Orchestration

Use this route only when the user or queue explicitly selects
`orchestration_mode: blind` after the delivery-cost gate in
`mode-selection.md`. Blind mode is a context-isolation contract for
substantial unattended queue work, not the default for ordinary coding.

Blind means **blind to implementation detail, not blind to process state**.
The orchestration layer still verifies identity, authorization, queue state,
commits, changed paths, validation, review verdicts, blockers, and Git safety.

This file consolidates the former `blind-briefs.md` and `blind-recovery.md`.
One idea governs everything here: *the coordinating context must not ingest
implementation detail, so route fresh workers and reconcile against Git and
typed receipts rather than transcripts.* Everything else is supporting
mechanics — and mechanics belong in deterministic tooling, not model prose.

## Mechanics belong to the runner

Fences, retry breakers, receipt validation, Git identity checks, failure
budgets, and row sequencing are deterministic control flow. Harnex owns that
direction: #56 (adapter preflight smoke), #57 (terminal outcome classes and
run-scoped failure budgets), #59 (deterministic conveyor runner). When a
runner primitive exists, use it instead of simulating it in coordinator
context. Until then the coordinator executes these mechanics by hand, exactly
as written, and treats every hand-executed rule as a candidate to move into
the runner rather than into more prose.

Before any unattended run: preflight the chosen adapter and one declared
fallback with a real dispatch smoke, pin task/receipt roots to paths the
adapter can actually read/write, and declare a queue-global process-failure
budget (see `mode-selection.md`).

## Keep the repo overlay small

The reusable protocol lives here. A target repo records only facts that vary:
active authorization window and stop gate; queue identity, dependency order,
and done state; branch/worktree and concurrency policy; exact validation and
quality thresholds; forbidden actions and approval gates; caps; and
project-specific final review requirements. Do not paste this protocol into
`AGENTS.md`, execution docs, plans, or queue rows.

A minimal queue overlay:

```yaml
orchestration_mode: blind
review_granularity: entry   # or batch for bounded lower-risk rows
coordinator_entry_cap: 2    # hard maximum 4; prefer 1-2 for complex entries
max_fix_cycles: 2
process_failure_budget: 6   # queue-global; adapter changes do not reset it
implementation_ownership: serial
final_review_required: true
```

`koder/STATE.md` may mirror only the active queue/window, mode, and stop gate
so `open` can report the boundary. The execution-window document (for example
`koder/docs/EXECUTION.md`) is the single home of window authorization; STATE
points at it rather than duplicating it.

## Roles

**Coordinator** — a fresh bounded session that owns process mechanics for at
most `coordinator_entry_cap` entries: eligibility, one current entry at a
time, phase dispatch and fences, receipt validation, Git checks, and batched
queue/run-log/issue accounting. It may read the current row's queue summary
and the plan's capability/validation/stop sections when row metadata lacks
them; it must not preload future plans or ingest product source, diffs, tests,
review findings, transcripts, routine panes, or long logs. It does not
implement, review, or repair product work, and never launches its own
successor.

**Fresh phase workers** — separate sessions per phase: `implement`, `review`,
`fix` (reads the committed finding review directly), `rereview`, `recovery`
(owns source-level reconciliation of unknown WIP), and `final_review`. A
reviewer never fixes; a fixer never rewrites the review. Phase workers never
mutate the queue, run log, `STATE.md`, or execution window.

A separate **governor** layer above the coordinator exists only when
unattended relaunch across coordinator rollovers is genuinely required — a
durable supervisor that validates coordinator receipts and launches
successors. For owner-present runs the interactive session is the coordinator;
do not add a governor by default. Whatever supervises must obey the same
firewall: no phase-worker transcripts, diffs, or finding prose.

## Context firewall

The coordinator consumes only: queue/process metadata and the current row;
phase identity and attempt number; compact typed receipts; changed-path lists
and commit refs; command/exit validation results; review verdict and finding
counts (plus a path only when a canonical artifact was required); blockers;
and clean/synchronized Git facts.

It does not consume: product source or tests; full diffs or generated
bundles; worker prompts, responses, reasoning, transcripts, or panes; review
finding prose (fix workers read the committed review); future plans; or long
command output when command/exit plus a bounded failure excerpt suffices.
Pane/event reads are bounded diagnostic exceptions after a stall, disconnect,
or malformed receipt — diagnosis must not become implementation review.

## Launch gate: fail closed

Do not start or continue blind execution unless: the active window authorizes
the current entry and names a stop gate; the queue has a completion contract
and an eligible reviewed source artifact; fresh isolated workers are available
through Harnex or an explicitly equivalent harness; implementation ownership
is unambiguous and serial; Git is clean/synchronized or a recovery worker owns
recorded WIP; receipt contracts are enforceable; independent review is
available at the declared granularity; validation, commit policy, wall caps,
forbidden actions, and the process-failure budget are explicit; the
coordinator cap is not exhausted; and no release/deploy/destructive/credential
or owner gate would be crossed. If any gate fails, record the shortest
actionable blocker and stop. Never degrade an explicitly blind queue into one
giant direct-coding session.

## Row lifecycle

```text
queued -> implementing -> implemented -> reviewing
  -> approved | needs_fixes -> fixing -> rereviewing -> approved | blocked
```

A row is complete only when its implementation commit exists, required
validation is green (including any generated-artifact/size gates the repo
declares — a missing artifact returns the row to `implementing`, it does not
consume a fix cycle), independent review approves, Git safety passes, and
accounting is updated. A process exiting is not row completion. On approval,
hold compact row proof and batch queue/run-log evidence at the next resumable
checkpoint; never create an approval-only metadata commit. Stop and escalate
at `max_fix_cycles`, when a finding changes architecture or product scope, or
when validation cannot be made reliable.

For `review_granularity: batch`, implementation workers stay fresh and
non-overlapping; the coordinator fences the declared batch and dispatches one
reviewer over the integrated commit range. Never use batch review to hide
entry-level high risk.

## Briefs

Reference canonical artifacts by path; never paste their bodies. Every
coordinator or phase brief states: promised outcome and stop gate; role and
non-role ("fresh review worker, not implementer"); authorization window and
exact entry/phase/attempt; identity (repo, branch, queue, refs, parent); read
budget and forbidden reads; write ownership and queue/STATE prohibitions;
output ceiling (no pasted diffs/logs); exact validation commands and expected
exits; commit policy and clean/sync expectation; return contract
(proof-before-signal); override/block conditions; forbidden actions; and wall
cap with the short first fence. Coordinator briefs add: entry cap and current
count, first eligible entry and already-proven phases, global no-new-work and
closeout deadlines, max fix cycles, permission to batch metadata directly, and
the prohibition on launching a successor. See `../harnex/brief-bounds.md` for
harness-level bounds.

## Proof

Use the harness-native typed report — one proof system, not two. With Harnex:
first-class queue/entry/phase/attempt attribution flags, `--artifact-report`,
`$HARNEX_ARTIFACT_REPORT_PATH`, and `harnex.artifact_report.v1`. Review phases
always return normalized `verdict`, `p1`, `p2`, `p3`; a clean approval needs
no Markdown artifact unless policy says otherwise. Only when the active
harness has no equivalent typed report, record the same facts in one compact
JSON receipt (status, queue/entry/phase/attempt, base and result commit from
`git rev-parse HEAD`, changed paths, validation command/exit pairs, verdict/
counts, clean/sync state, blocker), written atomically (temp file then
rename). A coordinator's terminal receipt additionally carries `next_entry`,
`next_phase`, and its batched-checkpoint commit.

Finish in proof order: canonical artifact -> validation -> commit/push when
required -> Git verification -> atomic receipt -> completion signal. A receipt
does not replace commit verification; a harness success signal does not
replace a receipt. Keep receipts process-only: no source summaries, finding
prose, or logs. Runtime receipts are transport evidence — before closeout,
promote the minimum durable facts into queue/review/run-log artifacts; never
cite a `/tmp` path as the only proof of a durable claim.

## Recovery: resume at the first unproven phase

When harness state, receipts, queue metadata, and Git disagree: reconcile,
never replay. Fence ownership first (stop stale sessions; never launch a
second implementation owner), snapshot process and Git facts without opening
diffs, validate receipt identity, verify referenced commits and claimed
artifact paths exist, compare canonical queue state, then act:

| Proven evidence | Next action |
| --- | --- |
| No implementation commit, clean tree | Fresh `implement`. |
| No implementation commit, product WIP present | Fresh `recovery` worker; the coordinator does not inspect or reset source. |
| Implementation commit + valid receipt, no review proof | Fresh `review`; do not reimplement. |
| Implementation commit, receipt missing/invalid | Bounded verifier/review worker reconstructs compact proof; do not rerun implementation blindly. |
| `needs_fixes` + canonical finding review, no fix commit | Fresh `fix` pointing at that review. |
| Fix commit + receipt, no re-review | Fresh `rereview`. |
| Approving proof + green validation, accounting stale | Coordinator batches accounting at the next checkpoint; no worker needed. |
| Coordinator receipt missing, child proof present | Fresh coordinator at the first unproven phase. |
| Queue claims done, required final review absent | Fresh `final_review`. |
| Required proof cannot be reconstructed safely | Block with the shortest missing proof and close. |

A transport failure after a valid commit + receipt is a **process anomaly**:
record it and continue; do not convert it to success automatically and do not
rerun proven work. A success signal without a required receipt is unknown, not
success. Give every dispatch a stable queue/entry/phase plus monotonic
attempt; never reuse session IDs or receipt paths across attempts; a retry
must not duplicate an already-proven implementation commit.

## Rollover and closeout

Roll the coordinator at `coordinator_entry_cap`, at an issue/milestone
boundary, after complex fix loops, or at a context high-water mark — stop
children, batch queue/run-log evidence at one resumable checkpoint, verify Git
safety, write the terminal receipt. Internal rollover never invokes the
user-facing close skill or rewrites `koder/STATE.md`; the root session
performs one real handoff at the owner stop gate. When the done state covers a
milestone, a separate fresh final-review context reviews the integrated range
— the implementation coordinator must not absorb final review merely because
rows drained. If nothing can relaunch cleanly, a clean stop at the boundary is
correct; context accumulation is not.
