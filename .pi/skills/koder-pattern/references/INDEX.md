---
title: Koder Pattern Router
updated: 2026-06-11
---

# Koder Pattern Router

Thin router for setting up durable `koder/` repo memory and managing `koder/` artifacts. Do ordinary code work normally unless the user asked to set up koder-pattern or file/manage artifacts.

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
| Safety, validators, manual quality checks | `references/shared/safety-validation.md` |
| Unsure which artifact type fits | `references/artifacts/INDEX.md` |
| File/update an issue | `references/artifacts/issues.md`, then `references/shared/state-commit-protocol.md` |
| File/update a plan | `references/artifacts/plans.md` |
| File/update a review verdict | `references/artifacts/reviews.md` |
| File research | `references/artifacts/research.md` |
| File analysis/audit/mapping | `references/artifacts/analysis.md` |
| File a lightweight note | `references/artifacts/notes.md` |
| File/maintain task state | `references/artifacts/tasks.md` |
| Scratch, state handoff, evidence stores | `references/artifacts/scratch-state.md` |
| File/add/refill a queue | `references/queues/INDEX.md`, then `references/queues/model.md`, `references/queues/gates.md`, `references/queues/queue-add.md` |
| Run a queue | `references/queues/INDEX.md`, then `references/queues/model.md`, `references/queues/queue-run.md` |
| Harnex/worker dispatch | `references/harnex/INDEX.md`, then only required harnex leaves |
| Source pattern/origin | `references/meta/holm-pattern-review.md` |
| Trigger/quality tests for this skill | `references/meta/eval-prompts.md` |

## Defaults

- Setup is a thin, conservative scaffold: `koder/AGENTS.md`, `koder/STATE.md`, `koder/issues/`, `koder/skills/{open,close}/`, plus safe symlink adapters. It initializes git if needed and commits created scaffold paths with `state: init - koder pattern scaffold` unless explicitly told not to commit.
- Keep durable non-code operator/docs files under `koder/`; `README.md` is the normal root documentation exception. Folder-first artifacts: `koder/<type>/NNN_slug/INDEX.md`; reviews are numbered files under `koder/reviews/NNN_slug/`.
- `INDEX.md` is canonical; `turns/` is history. Update canonical state when a turn changes decisions/status.
- Queues contain orchestration metadata and refs, not implementation prose.
- Harnex briefs must be bounded; use live harnex/repo docs over cached examples.
- Every intentional `koder/` state transition gets a grepable `state:` commit by default; use selected-path commits so unrelated dirty/staged work is not swept in.
- `koder/STATE.md` is session handoff, not the `state:` commit ledger; update it at init, close, explicit handoff requests, or external-origin filings.
- Keep artifacts concise, source-linked, validated, and safe to commit.
