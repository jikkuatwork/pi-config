---
title: Blind Orchestration Recovery
updated: 2026-07-14
---

# Blind Orchestration Recovery

Use when harness state, a phase/coordinator receipt, queue metadata, and Git do not agree. Recovery is reconciliation, not replay.

## Core rule

Resume from the **first unproven phase**. Do not reimplement a committed entry merely because its worker or coordinator disconnected, and do not mark an entry complete merely because a process exited successfully.

The coordinator/governor must remain blind during recovery. If source-level judgment or dirty product WIP is involved, dispatch a fresh bounded `recovery` implementation worker.

## Evidence surfaces

Check these independently:

1. active harness sessions and work-level terminal state;
2. expected phase/coordinator receipt existence, parseability, schema, and identity;
3. referenced commit existence/reachability and expected parent/base relationship;
4. typed review proof plus canonical review artifacts when findings/gates required them, and queue/run-log artifacts;
5. changed-path list and current Git HEAD/status/upstream drift;
6. required validation exits and verdict fields;
7. authorization, deadline, ownership, and stop gates.

No single surface is sufficient in every failure mode. Harness status proves process outcome; receipts prove claimed phase outcome; commits and canonical artifacts prove durable effects; Git checks prove current safety.

## Reconciliation algorithm

1. **Fence ownership.** Identify and stop/park duplicate or stale sessions. Never launch another implementation owner while one may still be writing.
2. **Snapshot process and Git facts.** Record bounded status, HEAD, branch/worktree, dirty paths, and upstream counts without opening diffs.
3. **Validate receipts.** Parse JSON; verify schema, queue, entry, phase, attempt, commit, required fields, and timestamps. Malformed/partial JSON is unknown.
4. **Verify durable claims.** Confirm referenced commits and any claimed canonical review paths exist. Check changed paths, typed verdict/counts, and validation summaries without reading implementation content.
5. **Compare canonical state.** Determine which phase queue/run-log state says should be active and whether accounting lags durable work.
6. **Choose the first unproven phase** using the table below.
7. **Dispatch recovery or the next normal phase.** Give the fresh worker only reconciled process facts and canonical paths, not old transcript/pane content.
8. **Repair orchestration metadata.** After proof, batch queue/run-log metadata with selected paths and continue or stop blocked. Update `koder/STATE.md` only at the owner handoff boundary.

## First-unproven-phase table

| Proven evidence | Next action |
| --- | --- |
| No implementation commit, clean tree, no active worker | Dispatch fresh `implement`. |
| No implementation commit, product/config WIP present | Dispatch fresh `recovery` implementation worker; coordinator does not inspect or reset source. |
| Implementation commit + valid receipt, no independent review proof | Dispatch fresh `review`; do not reimplement. |
| Implementation commit exists but receipt is missing/invalid | Dispatch a bounded verifier/review worker to validate the commit and reconstruct compact proof; do not blindly rerun implementation. |
| Review verdict `needs_fixes` + canonical finding review, no fix commit | Dispatch `fix` pointing directly to that review. |
| Fix commit + receipt, no re-review | Dispatch fresh `rereview`. |
| Approving typed review proof + required validation + safe Git, queue accounting stale | Coordinator batches queue/run-log/issue accounting at the next checkpoint; no product or finalizer worker needed. |
| Coordinator receipt missing, child phase commits/receipts present | Launch a fresh recovery coordinator at the first unproven phase. |
| Queue claims done but required final review absent | Launch fresh `final_review`. |
| Required proof cannot be reconstructed safely | Mark blocked with the shortest missing proof and close. |

## Common disagreements

### Harness failed, durable work appears complete

A transport disconnect, terminal-signal race, or parent stop can report `failed` after a commit and receipt were written.

- Do not convert the failure to success automatically.
- Validate receipt identity, commit, canonical artifact, validation exits, Git state, and queue consistency.
- If all phase proof is valid, record a **process/transport anomaly** and continue to the next phase rather than rerunning work.
- If proof is incomplete, dispatch a verifier/reviewer or block.

### Harness succeeded, receipt missing

A success signal without the required receipt violates the return contract.

- Check for commit/canonical artifact and current Git state.
- If durable output exists, verify it with a fresh worker and reconstruct proof.
- If no output exists and the tree is clean, rerun the phase.
- If WIP exists, use a recovery worker.

### Worker left dirty WIP

- Preserve paths; do not have the blind coordinator inspect, stage, reset, or finish them.
- Stop any stale writer.
- Dispatch a fresh recovery worker with the current plan, exact dirty-path list, interrupted phase, and normal validation/receipt contract.
- The recovery worker may complete, safely revert within owned scope, or return blocked.

### Coordinator ended before receipt

- Do not assume all its work vanished.
- Inspect only child receipts, commit refs, queue state, and Git/process facts.
- Launch a fresh coordinator with a concise recovery preamble naming proven phases and the first unproven phase.
- Do not paste the prior coordinator transcript or ask the new coordinator to replay it.

### Review/fix loops repeat

- Count fix attempts durably.
- Stop at `max_fix_cycles` or earlier when findings require architecture/product decisions.
- Do not let a coordinator read findings and improvise a fix to save a dispatch.

### Upstream or ownership drift

Unexpected ahead/behind state, an unknown commit, or a second implementation owner is a launch blocker. Stop, identify ownership from process/commit metadata, and ask for a decision when it cannot be reconciled without inspecting unrelated work.

## Attempt identity and idempotence

- Give every dispatch a stable queue/entry/phase plus monotonic `attempt`.
- Reuse neither session IDs nor receipt paths across attempts.
- Include the expected base commit in the brief and receipt.
- Before retrying, check active session IDs, commit history, and the prior receipt path.
- A retry must not create a duplicate implementation commit for already-proven work.

## Diagnostic budget

Use bounded diagnostics only:

- native harness status/watch result;
- last small event/pane tail after an anomaly;
- receipt parse errors;
- `git status --short`, concise log, ref existence, and changed-path lists;
- short failure excerpt when command exit is nonzero.

Do not ingest full transcripts, routine panes, full diffs, source, reviews, or long logs into governor/coordinator context.

## Recovery closeout

Record:

- original phase/attempt and anomaly class;
- facts proven independently;
- first unproven phase selected;
- recovery dispatch/commit/review refs;
- queue/run-log correction;
- blocker or continuation;
- final Git and active-session state.

Promote only this concise process evidence. Keep raw runtime logs external/ignored and disposable.
