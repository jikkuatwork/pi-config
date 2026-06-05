---
title: Koder Pattern Router
updated: 2026-06-05
---

# Koder Pattern Router

Thin router for setting up durable `koder/` repo memory and managing `koder/` artifacts. Do ordinary code work normally unless the user asked to set up koder-pattern or file/manage artifacts.

## Start

1. Read live repo instructions (`AGENTS.md`, `CLAUDE.md`, etc.) and `koder/STATE.md` when present.
2. If the user asked to set up/install/bootstrap koder-pattern in a repo, load the setup route first.
3. Inspect nearby live artifacts before creating a new one; live convention beats this cached guide.
4. Choose the narrowest route below and load only those files.

## Routes

| Need | Load |
| --- | --- |
| Set up/install/bootstrap koder-pattern in a repo | `references/setup.md`, then `references/shared/safety-validation.md` |
| Paths, numbering, source-of-truth, turns, status vocabulary | `references/shared/artifact-model.md` |
| Safety, validators, manual quality checks | `references/shared/safety-validation.md` |
| Unsure which artifact type fits | `references/artifacts/INDEX.md` |
| File/update an issue | `references/artifacts/issues.md` |
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

- Setup creates/merges repo handoff files, project-local `.pi/skills/open` and `.pi/skills/close`, `koder/STATE.md`, git initialization, and a close commit unless the user says not to commit.
- Folder-first: `koder/<type>/NNN_slug/INDEX.md`; reviews are numbered files under `koder/reviews/NNN_slug/`.
- `INDEX.md` is canonical; `turns/` is history. Update canonical state when a turn changes decisions/status.
- Queues contain orchestration metadata and refs, not implementation prose.
- Harnex briefs must be bounded; use live harnex/repo docs over cached examples.
- Keep artifacts concise, source-linked, validated, and safe to commit.
