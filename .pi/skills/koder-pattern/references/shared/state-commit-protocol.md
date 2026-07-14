---
title: Koder State Commit Protocol
updated: 2026-07-14
---

# Koder State Commit Protocol

Use this when setup, close, artifact filing, artifact status changes, or cross-repo handoffs intentionally mutate `koder/` state.

## Core rule

Commit semantic milestones, not every metadata transition. `state:` is a useful
subject prefix when operator state itself is the deliverable; it is not a second
commit stream that mirrors every plan, review, queue-row, or frontmatter edit.

Routine artifact and queue movement should ride with the logical product, review,
or checkpoint commit whenever practical. Batch related status/run-log changes at
a resumable checkpoint instead of committing each worker phase. `koder/STATE.md`
is a compact session handoff, not a commit-by-commit ledger.

If the user says not to commit, preserve the dirty paths and report them. That is
the normal explicit escape hatch for changes that otherwise need a commit.

## When to use a standalone `state:` commit

Use one when the state change is independently meaningful and has no better
logical commit:

- initializing the koder scaffold;
- updating `koder/STATE.md` during a real session close/handoff;
- filing into this repo from another repo/session;
- recording an owner authorization, acceptance, block, resolution, or comparable
  process-only milestone;
- checkpointing a batch of queue/run-log movement needed for safe interruption or
  coordinator rollover.

Do **not** create a standalone commit merely for:

- routine local plan/issue/review filing that can accompany the work it describes;
- each queue row or phase status change;
- approval/frontmatter normalization after an already-proven review;
- a metadata-finalizer phase;
- every worker or coordinator boundary.

A logical implementation or review commit may include its directly related
`koder/` artifact changes and keep its normal `feat:`, `fix:`, `test:`, `review:`,
or repo-local subject. Dry-runs and read-only inspections are not state movement.

## When to update `koder/STATE.md`

Update `koder/STATE.md` only when the handoff itself must move:

- during init, because the scaffold creates the initial handoff;
- during close/session handoff;
- when an external repo/agent/session files an issue or similar artifact into this repo mid-session;
- when the user explicitly asks to update handoff state.

Do **not** update `koder/STATE.md` solely because a local artifact or queue row
moved. Record routine movement in the artifact, compact run proof, or logical
work commit; summarize only what matters to the next session at close.

Use `State file: koder/STATE.md` in a commit body only when the commit actually touches `koder/STATE.md`.

## Subject forms

Use concise subjects that are easy to grep:

```text
state: init - koder pattern scaffold
state: close - <semantic session result>
state: file #NNN from <origin-repo> - <short reason>
state: authorize #NNN - <bounded owner decision>
state: resolve #NNN - <process-only result>
```

For process-only milestones, include the artifact type when useful:

```text
state: authorize queue #NNN - <bounded window>
state: checkpoint queue #NNN - <resumable result>
```

Ordinary plan/review commits use the repository's normal subject vocabulary.
Always include the exact artifact path in a `state:` commit body when a number
could be ambiguous.

## Commit body schemas

### Init

```text
State event: init
State file: koder/STATE.md

Scaffold:
- koder/AGENTS.md
- koder/STATE.md
- koder/issues/
- koder/skills/open/
- koder/skills/close/

Delta:
- Repository now has koder-pattern durable operator state.
- Agent surfaces point at koder-owned instructions/skills where possible.
```

### Close

```text
State event: close
State file: koder/STATE.md
Session result: <one line>

Delta:
- <semantic movement completed this session>
- <operator-facing next state>

Validation:
- <commands/checks/manual validation>
```

### External issue filing

```text
State event: external_issue
Origin repo: <repo>
Origin context: <one line>
Issue: koder/issues/NNN_slug/INDEX.md

Delta:
- <what changed in target repo state>
- <operator-facing impact>
```

### Process-only checkpoint

```text
State event: checkpoint
Artifact: koder/<type>/NNN_slug/INDEX.md
Reason: <why this movement needs an independent durable milestone>

Delta:
- <batched state change>
- <next operator implication>

Validation:
- <commands/checks/manual validation, if any>
```

## Dirty repo guardrails

Before committing a state transition, inspect both working tree and index:

```bash
git status --short
git diff --cached --name-only
```

Rules:

- If the paths you need to touch are already dirty/staged from someone else, stop and coordinate.
- Unrelated dirty or staged paths may remain, but must not be swept into the `state:` commit.
- Prefer selected-path staging and pathspec commits for state-only milestones. External issue filings touch both handoff and issue paths:
  ```bash
  git add -- koder/STATE.md koder/issues/NNN_slug/INDEX.md
  git commit -F /tmp/state-message -- koder/STATE.md koder/issues/NNN_slug/INDEX.md
  ```
- Routine local artifact changes should normally be included in their logical
  product/review commit or batched checkpoint; they do not require a standalone
  `state:` commit and usually do **not** touch `koder/STATE.md`.
- Avoid blind `git add -A` when unrelated dirty work exists.
- If a repo has no git repository and a state transition is being committed, run `git init` in the target root first. Do not add remotes or rewrite history.

## Analysis invariant

This should produce a **sparse** semantic milestone stream:

```bash
git log --grep='^state:' --oneline
```

If the stream is dominated by queue-row, review-approval, or worker-boundary
commits, batching failed. Use full commit bodies for cross-repo reconstruction
before reading long chats or large artifact history.
