---
title: Harnex Brief Bounds
updated: 2026-07-14
---

# Harnex Brief Bounds

Every worker brief must include explicit controls after mode selection justifies a
worker. Use a task file for anything longer than a few lines. Do not make a
brief longer than the bounded task it delegates.

## Required controls

```text
Depth bounds:
- Prior digestion: The issue/plan/review artifact already encodes the design.
  Do not re-derive project semantics from source unless a specific blocking
  question is unanswered by existing docs.
- Read budget: Read only files required for this phase. Target <= <N> files.
  If you hit the budget, stop exploring and produce the artifact from current evidence.
- Output ceiling: Target <min-max> lines for this artifact. If draft exceeds
  the ceiling, trim before finalizing.
- Override path: If a specific question genuinely blocks completion, stop
  research and list it under "Open Questions" in the reply.

Effort tier per phase:
- Phase <name>: <model/effort or repo-local tier> — why this level is needed.
```

## Also include

- promised product/tests/docs/review delta, expected phase count, process budget,
  short first monitor fence, and stop gate;
- explicit role and excluded roles (`implement`, `review`, `fix`, `rereview`, `recovery`, coordinator);
- exact repo, queue, entry, phase, attempt, parent coordinator, branch/worktree ownership, and expected base commit;
- exact source artifact paths and a prohibition on loading future queue plans;
- explicit allowed output path(s), including which canonical metadata the worker must not mutate;
- validation command(s), quality thresholds, and red-evidence requirement when applicable;
- work-complete return contract;
- versioned artifact/validation receipt path when supported, plus the canonical plain-text `koder/` output path;
- commit policy: whether the worker should commit/push or leave changes unstaged;
- proof-before-signal ordering: artifact, validation, commit/push, Git check, atomic receipt, then work-complete signal;
- forbidden actions, especially deploy/cloud/destructive/secret operations;
- queue metadata when queue-dispatched;
- global no-new-work/closeout deadlines in addition to the phase wall cap;
- one-continuation/two-attempt no-op circuit breaker;
- instruction to obtain any reported commit with `git rev-parse HEAD`, while the
  parent independently verifies Git/Harnex telemetry.

## Task file convention

For briefs longer than a few lines, write a task file instead of embedding a huge `--context` string:

```text
/tmp/task-plan-NNN.md
/tmp/task-impl-NNN.md
/tmp/task-review-NNN.md
/tmp/task-fix-NNN-attempt-01.md
```

Do not reuse a task, session ID, or receipt path for a retry. For explicit blind queues, generate briefs and receipts from the briefs/proof sections of `references/queues/blind-orchestration.md`; keep runtime files external/ignored and canonical project truth under `koder/`.

A task file should be self-contained and point to repo artifacts rather than pasting large content. It must repeat the safety-critical authorization, ownership, validation, return, and stop rules even when the repo also has a generic orchestration contract. It must not embed generic protocol prose, progress-narration instructions longer than the task, or a metadata-only phase that the coordinator can perform directly.
