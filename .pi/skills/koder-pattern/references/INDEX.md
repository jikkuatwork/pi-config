---
title: Koder Pattern Router
updated: 2026-07-14
---

# Koder Pattern Router

Thin router for setting up durable `koder/` repo memory, managing `koder/` artifacts, and routing bounded queue/worker workflows. Do ordinary code work normally unless the user asked to set up koder-pattern, file/manage artifacts, or design/run/recover a koder queue or worker chain.

## Start

1. Read live repo instructions (`AGENTS.md`, `CLAUDE.md`, etc.) and `koder/STATE.md` when present.
2. If the user asked to set up/install/bootstrap koder-pattern in a repo, load the setup route first and prefer the `bin/koder-pattern init` script.
3. Inspect nearby live artifacts before creating a new one; live convention beats this cached guide.
4. Choose the narrowest route below and load only those files.

## Routes

| Need | Load |
| --- | --- |
| Set up/install/bootstrap koder-pattern in a repo | `references/setup.md`, then `references/shared/state-commit-protocol.md`, then `references/shared/safety-validation.md` |
| Paths, numbering, source-of-truth, turns, status vocabulary | `references/shared/artifact-model.md` |
| State commit ledger, dirty repo guardrails, commit body schemas | `references/shared/state-commit-protocol.md` |
| Issue kinds, seam/slice ledgers, queue progress accounting | `references/shared/slice-accounting.md` |
| Safety, validators, manual quality checks | `references/shared/safety-validation.md` |
| Unsure which artifact type fits | `references/artifacts/INDEX.md` |
| File/update a proposal or RFC | `references/artifacts/proposals.md`, then `references/shared/state-commit-protocol.md` |
| File/update an issue | `references/artifacts/issues.md`, then `references/shared/state-commit-protocol.md` |
| File/update a plan | `references/artifacts/plans.md` |
| Ask/process inline unblock questions for human decisions blocking queues/tasks/slices | `references/artifacts/unblock.md` |
| File/update a review verdict | `references/artifacts/reviews.md` |
| File research | `references/artifacts/research.md` |
| File analysis/audit/mapping | `references/artifacts/analysis.md` |
| File a lightweight note | `references/artifacts/notes.md` |
| File/maintain task state | `references/artifacts/tasks.md` |
| Scratch, state handoff, evidence stores | `references/artifacts/scratch-state.md` |
| Choose direct or blind execution and review strictness | `references/queues/mode-selection.md` |
| Extract queueable slices / build a queue conveyor | `references/queues/INDEX.md`, then `references/queues/mode-selection.md`, `references/queues/conveyor.md` |
| File/add/refill a queue | `references/queues/INDEX.md`, then `references/queues/mode-selection.md`, `references/queues/model.md`, `references/queues/gates.md`, `references/queues/queue-add.md` |
| Run a queue | `references/queues/INDEX.md`, then `references/queues/mode-selection.md`, `references/queues/model.md`, `references/queues/queue-run.md` |
| Design/adopt/run/recover a blind-orchestrator queue | `references/queues/mode-selection.md`, then `references/queues/blind-orchestration.md` (includes briefs and recovery), plus the normal queue and harnex routes |
| Harnex/worker dispatch | `references/harnex/INDEX.md`, then only required harnex leaves |
| Source pattern/origin | `references/meta/holm-pattern-review.md`; for blind queues also `references/meta/sdk-blind-orchestration-review.md` |
| Trigger/quality tests for this skill | `references/meta/eval-prompts.md` |

## Defaults

- Setup is a thin, conservative scaffold: `koder/AGENTS.md`, `koder/STATE.md`, `koder/issues/`, and complete `koder/skills/{open,close}/` front doors. One canonical skill copy is exposed by relative symlinks to Pi (`.pi/skills`), Codex (`.agents/skills`), and Claude (`.claude/skills`) by default; `AGENTS.md` and `CLAUDE.md` point to `koder/AGENTS.md`. Setup initializes git if needed and commits created scaffold paths with `state: init - koder pattern scaffold` unless explicitly told not to commit.
- Keep durable non-code operator/docs files under `koder/`; `README.md` is the normal root documentation exception. Folder-first artifacts: `koder/<type>/NNN_slug/INDEX.md`; reviews are numbered files under `koder/reviews/NNN_slug/`. Use `koder/proposals/` for RFC-scale ideas that should converge before issues/plans are extracted.
- `INDEX.md` is canonical; `turns/` is history. Update canonical state when a turn changes decisions/status. For issues with frontmatter `converged: turns/...`, the pointed turn is the current self-contained planning source while `status` remains independent.
- Delivery is the invariant. `references/queues/mode-selection.md` is the canonical gate and the single home of the delivery-first rule, disclosure contract, circuit breakers, proof ownership, and progress-delta reporting; load it before choosing any machinery and do not restate its rules elsewhere.
- Queues contain orchestration metadata and refs, not implementation prose. An executable issue may be referenced directly; do not manufacture a conveyor map and child plans when the live source already has capability, validation, ownership, and stop rules.
- Queue-conveyor work lives under the queue route: mine issues for safe mechanical slices, write queueable plans only when needed, pack compatible queues, and keep active implementation ownership non-overlapping. When human decisions block safe queue drain, ask terse inline numbered questions with recommended option `a.` by default; if the user wants async replies, accept any temporary file under `koder/scratch/` and apply answers back to canonical artifacts.
- For new issues, set `issue_kind`; legacy absence means `slice`. For ordinary `slice` issues, do not add a ledger. For broad issues, use slice accounting lazily: add `Slice Ledger` and queue slice-delta summaries only when filing/touching/closing relevant artifacts; do not mass-rewrite old backlog.
- Harnex briefs must be bounded; use live harnex/repo docs over cached examples.
- Blind orchestration is explicit opt-in after the delivery-cost gate; keep the repo overlay small and fail closed when declared isolation cannot be enforced (`references/queues/blind-orchestration.md`).
- Keep `state:` commits sparse: init, real handoff, external filing, owner/process milestones, and batched resumable checkpoints. Routine artifact/queue movement rides with logical work or review commits; never create one commit per phase merely to mirror metadata. Use selected paths around unrelated dirty work.
- `koder/STATE.md` is session handoff, not the `state:` commit ledger; update it at init, close, explicit handoff requests, or external-origin filings.
- Keep artifacts concise, source-linked, validated, and safe to commit.
