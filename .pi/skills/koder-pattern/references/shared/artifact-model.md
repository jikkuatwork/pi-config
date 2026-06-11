---
title: Koder Artifact Model
updated: 2026-06-11
---

# Koder Artifact Model

Use when path shape, numbering, source-of-truth, turns, or statuses are relevant. For state commits read `references/shared/state-commit-protocol.md`; for safety and validators also read `references/shared/safety-validation.md`.

## Core invariant

`koder/` is durable agent memory and orchestration state. It should make work resumable across humans, agents, sessions, and branches without forcing the next agent to read chat history.

## Operator/doc placement

- Keep durable non-code agent/operator files under `koder/`: state, issues, plans, reviews, research, notes, queues, scratch, local skills, and operator docs.
- Root `AGENTS.md`, `CLAUDE.md`, `.pi/skills/*`, `.claude/skills/*`, and `.agents/skills/*` should be symlinks/adapters to `koder/` when possible.
- `README.md` is the normal root documentation exception because repository hosts render it directly.
- Prefer other durable docs under `koder/docs/` unless live project conventions require another location.

## State movement ledger

Every intentional `koder/` state transition gets a grepable `state:` commit by default. This includes scaffold init, close handoffs, external filings, and artifact status changes. `koder/STATE.md` is not the ledger; do not update it for every local artifact state commit. Do not force ordinary code-only commits into the ledger. Use selected-path commits when unrelated dirty/staged work exists.

## Folder-first layout

Use this for new durable artifacts unless the target repo has a stricter convention:

```text
koder/<type>/NNN_short_slug/
  INDEX.md          # canonical frontmatter + current body
  turns/            # optional discussion/history
    01_codex.md
    02_claude.md
```

`turns/` is optional. Use it when the user asks for a turn or when multi-agent discussion would clutter canonical state. Do not create it for routine edits.

Reviews usually do **not** use `INDEX.md`; the numbered review files are the artifact and function as turns:

```text
koder/reviews/NNN_short_slug/
  01_plan.md
  02_tests.md
  03_code.md
```

Legacy flat files may remain. Do not churn history just to normalize old artifacts.

## Source-of-truth hierarchy

When facts conflict, prefer:

1. live source code, commands, and current repo instructions;
2. canonical `koder/<type>/.../INDEX.md` frontmatter/body;
3. latest relevant review verdict;
4. latest relevant `turns/` file;
5. scratch/session logs and chat memory.

Update the highest applicable source instead of adding contradictory lower-level notes.

## Numbering and slugs

- Each artifact type owns its own sequence: issue 123 and plan 123 need not be the same topic unless linked.
- Find the next number by local helper if present; otherwise scan existing folders/files and increment the highest numeric prefix.
- Slugs are lowercase, short, and durable: `345_queue_run_telemetry_handoff`.
- If duplicate legacy numbers exist, route by full path, not number alone.

## What “do one turn” means

When the user says “do one turn in #NNN,” first identify the artifact type and live convention:

- if the artifact has `turns/`, append `turns/<next>_<actor>.md`;
- if it has no `turns/` but the user explicitly asks for a turn, create `turns/` and append the next actor file;
- review artifacts use the next numbered review file in `koder/reviews/<slug>/` instead of `turns/`;
- queue artifacts may use `Run Log` for mechanical status and `turns/` for substantive discussion/design;
- plan artifacts may use `turns/` for convergence discussion, but canonical implementation instructions stay in `INDEX.md`.

If the turn changes canonical decisions/status, update `INDEX.md` too.

## Status vocabulary

Keep status values boring and finite. Follow repo-local validators when they differ.

- Issue: `open`, `resolved`, `blocked`, `backlog`, `superseded`.
- Plan: `draft`, `in_review`, `approved`, `implemented`, `superseded`.
- Queue batch: `ready`, `active`, `drained`, `paused`, `archived`.
- Queue entry: `candidate`, `queued`, `running`, `reviewing`, `done`, `blocked`, `skipped`.
- Research/analysis: `open`, `active`/`in_progress`, `complete`/`completed`, `archived`.

If the repo uses different spellings, follow the repo and note the mismatch only if it affects tooling.
