---
title: Koder Artifact Model
updated: 2026-05-24
---

# Koder Artifact Model

## Core invariant

`koder/` is durable agent memory and orchestration state. It should make work resumable across humans, agents, sessions, and branches without forcing the next agent to read chat history.

## Folder-first layout

Use this for new durable artifacts unless the target repo already has a stricter convention:

```text
koder/<type>/NNN_short_slug/
  INDEX.md          # canonical frontmatter + current body
  turns/            # optional; only when that artifact type/repo uses turns
    01_codex.md
    02_claude.md
```

`turns/` is optional and can be used for any folder-first artifact when separate discussion/history helps. Live Holm currently uses it mainly on issues, analysis, research, and chat-style artifacts; plans and queues usually update `INDEX.md` directly, and queues also use `Run Log`. Do not create `turns/` for routine edits, but it is available when the user asks for a turn or when multi-agent discussion would otherwise clutter canonical state.

Exception: reviews usually do **not** use `INDEX.md`; the numbered review files are the artifact and function as turns:

```text
koder/reviews/NNN_short_slug/
  01_plan.md
  02_tests.md
  03_code.md
```

Legacy flat files may remain in place. Do not churn history just to normalize old artifacts.

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
- queue artifacts may use `Run Log` for mechanical status and `turns/` for substantive discussion/design around the queue;
- plan artifacts may use `turns/` for convergence discussion, but canonical implementation instructions stay in `INDEX.md`.

If the turn changes canonical decisions/status, update `INDEX.md` too.

## Common frontmatter fields

### Issues

```yaml
---
status: open        # open | resolved | blocked | backlog | superseded
priority: P1        # P0 | P1 | P2 | P3
created: YYYY-MM-DD
tags: area, topic
type: feature       # bug | feature | design | audit | analysis | docs
context: One-line why this exists
---
```

### Plans

```yaml
---
plan: 450
title: Short title
issue: 340
type: implementation # implementation | mapping | analysis | research
status: draft        # draft | in_review | approved | implemented | superseded
created: YYYY-MM-DD
updated: YYYY-MM-DD
---
```

### Reviews

```yaml
---
plan: 450
issue: 340
type: plan-review    # plan-review | code-review | tests-review | audit
verdict: pass        # pass | approve | approve with fixes | needs fixes | revise | reject
reviewer: codex      # codex | claude | user | other
created: YYYY-MM-DD
---
```

### Queues

```yaml
---
queue: 005
title: Short queue title
status: ready        # ready | active | drained | paused | archived
created: YYYY-MM-DD
updated: YYYY-MM-DD
target_window: 6h
queued_effort_target: 9h
autonomy_level: A2
constraints:
  no_release: true
  no_cloud_spend: true
  no_destructive_db: true
  serial_master: true
---
```

### Research / analysis / notes

```yaml
---
status: active       # research/analysis only: open | active | complete | archived
topic: Short topic
tags: area, topic
created: YYYY-MM-DD
updated: YYYY-MM-DD
---
```

## Status vocabulary

Keep status values boring and finite. Do not invent status synonyms unless the target repo validator allows them.

- Issue: `open`, `resolved`, `blocked`, `backlog`, `superseded`.
- Plan: `draft`, `in_review`, `approved`, `implemented`, `superseded`.
- Queue batch: `ready`, `active`, `drained`, `paused`, `archived`.
- Queue entry: `candidate`, `queued`, `running`, `reviewing`, `done`, `blocked`, `skipped`.
- Research/analysis: `open`, `active` or `in_progress`, `complete` or `completed`, `archived`.

If the repo already uses different spellings, follow the repo and note the mismatch only if it affects tooling.

## Safety rules

- Do not store credentials, secrets, private account identifiers, full prompts, private payloads, or personal data in artifacts.
- Do not bury a user decision in scratch; update the canonical issue/plan.
- Do not duplicate large source excerpts; link paths and line references.
- Do not mark work resolved without evidence: commit, validation, release/version, or explicit user decision.
- Ask before filing artifacts that imply cloud spend, release/deploy, destructive DB work, production mutation, or credential changes.

## Validation

Use local validators when present, for example:

```bash
./scripts/issues/validate.sh
./scripts/reviews/validate.sh
./scripts/tasks/validate.sh
./scripts/plans/check-thinness.sh <plan-path>
```

If no validator exists, manually verify:

- path shape and numeric prefix;
- frontmatter parses and has required fields;
- status values are from the repo vocabulary;
- references point to existing artifacts;
- body has problem/context/acceptance or equivalent;
- no sensitive data is included.
