---
title: Holm koder Pattern Review
updated: 2026-06-05
source_pattern: /home/glasscube/Projects/holmhq/holm/master/koder
---

# Holm koder Pattern Review

This reference summarizes the Holm `koder/` folder as the seed pattern. Use it to understand why the generalized workflow exists; do not hard-code Holm-specific paths when working in another repo.

## Observed shape

At review time, Holm's `koder/` tree contained a mature mix of durable workflow artifacts:

| Area | Role | Observed scale |
| --- | --- | ---: |
| `issues/` | durable problem, feature, design, and follow-up records | 280+ folders, 390+ files |
| `plans/` | thin implementation maps tied to issues | 190+ folders, 480+ files |
| `reviews/` | plan/code review verdicts and convergence turns | 300+ folders, 650+ files |
| `queue/` | unattended work batches with constraints and run logs | 5 batches |
| `research/` | open-ended exploration and source-backed reports | 60+ files |
| `analysis/` | scoped audits/inventories, often issue-linked | 60+ files |
| `notes/` | lightweight design/process memory | 9 files |
| `tasks/` | resumable chain-orchestration state machine records | 20+ tasks |
| `scratch/` | ephemeral briefs, telemetry, proofs, session logs | large, not canonical |
| `bench/` | run outputs, baselines, capacity evidence | large, evidence store |

## What matured

1. **Folder-first artifacts.** New durable items use `koder/<type>/NNN_slug/INDEX.md`; reviews are the exception (`koder/reviews/<slug>/01_codex.md`, `02_claude.md`, etc.).
2. **Frontmatter as routing state.** Status, priority, issue/plan numbers, queue constraints, task state, and reviewer/verdict are machine-readable.
3. **Canonical vs history split.** `INDEX.md` holds current truth; `turns/` captures discussion history and should not be the only place decisions live.
4. **Thin plans.** Plans define one capability, bounded layers, defer lists, validation commands, diff/stop budgets, and explicit non-goals.
5. **Reviews as durable gates.** Reviews cite concrete findings, classify severity, record verdict, and create a stable handoff for the next agent.
6. **Queues as meta-orchestration.** Queue entries contain references, estimates, risk, ambiguity, mode, validation, and stop rules — not implementation prose.
7. **State and scratch separation.** `koder/STATE.md` is a tiny handoff; `scratch/` can hold transient briefs/logs/proofs but should not become canonical.
8. **Validators where available.** Holm has scripts for issue/review/task validation and thinness/queue checks; other repos should copy the contract before copying scripts.

## Existing Holm skills that informed this lift

- `holm-issue` — manage `koder/issues/`, status scripts, next-number helper, folder-first issue files.
- `structured-artifacts` — one dormant umbrella for issues, plans, reviews, queues, tasks, and notes.
- `queue-add` and `queue-run` — gate, pack, and consume unattended work queues.
- `harnex-dispatch` and `task-brief` — bounded worker dispatches, metadata, telemetry, and brief-depth discipline.
- `holm-review` — plan/code review loop with durable review files.
- `thinness-gate`, `chain-orchestrate`, and `chain-triage` — advanced worker/orchestration controls.

The generalized `koder-pattern` skill intentionally keeps these as references under one explicit skill rather than creating many always-advertised sub-skills.

## Generalization boundary

Copy the **artifact contract**, not Holm's product content:

- Keep paths, frontmatter, status enums, validation expectations, and source-of-truth hierarchy.
- Replace Holm/Harnex-specific modes with the current repo's actual worker/review tooling.
- Preserve permission gates from the target repo: cloud, deploy, release, destructive DB, credentials.
- If a live repo has existing `koder/` conventions, merge with them rather than overwriting history.
