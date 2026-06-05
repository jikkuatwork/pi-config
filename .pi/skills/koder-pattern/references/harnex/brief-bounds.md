---
title: Harnex Brief Bounds
updated: 2026-06-05
---

# Harnex Brief Bounds

Every worker brief must include explicit controls. Use a task file for anything longer than a few lines.

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

- exact source artifact paths;
- explicit output path(s);
- validation command(s);
- done-marker or return contract;
- commit policy: whether the worker should commit or leave changes unstaged;
- forbidden actions, especially deploy/cloud/destructive/secret operations;
- queue metadata when queue-dispatched.

## Task file convention

For briefs longer than a few lines, write a task file instead of embedding a huge `--context` string:

```text
/tmp/task-plan-NNN.md
/tmp/task-impl-NNN.md
/tmp/task-review-NNN.md
/tmp/task-fix-NNN.md
```

A task file should be self-contained and point to repo artifacts rather than pasting large content.
