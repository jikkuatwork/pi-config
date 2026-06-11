---
title: Koder State Commit Protocol
updated: 2026-06-11
---

# Koder State Commit Protocol

Use this when setup, close, artifact filing, artifact status changes, or cross-repo handoffs intentionally mutate `koder/` state.

## Core rule

Every intentional `koder/` state transition gets a grepable `state:` commit by default.

`state:` commits are the git-level semantic movement ledger. `koder/STATE.md` is **not** that ledger; it is a compact session-to-session handoff. Do not edit `koder/STATE.md` for every `state:` commit.

The escape hatch must be explicit: `--no-commit`, “do not commit”, or equivalent. If a state change is left uncommitted, say so clearly and list the dirty paths.

## What counts as a state transition

Commit these with `state:`:

- initializing the koder scaffold;
- updating `koder/STATE.md` during close;
- filing an issue/plan/review/research/note/task/queue artifact;
- changing artifact status or acceptance/resolution state;
- filing into this repo from another repo/session;
- durable queue/harnex run-log movement.

Do not force ordinary implementation commits to use `state:` when they do not change koder/operator state. The ledger tracks independent semantic repo movements, not every code diff.

Dry-runs and read-only inspections are not state transitions.

## When to update `koder/STATE.md`

Update `koder/STATE.md` only when the handoff itself must move:

- during init, because the scaffold creates the initial handoff;
- during close/session handoff;
- when an external repo/agent/session files an issue or similar artifact into this repo mid-session;
- when the user explicitly asks to update handoff state.

Do **not** update `koder/STATE.md` solely because a local in-session `state:` commit files/updates/resolves an artifact. Record that movement in the artifact and commit body; summarize it in `koder/STATE.md` at close if it matters to the next session.

Use `State file: koder/STATE.md` in a commit body only when the commit actually touches `koder/STATE.md`.

## Subject forms

Use concise subjects that are easy to grep:

```text
state: init - koder pattern scaffold
state: close - <semantic session result>
state: file #NNN from <origin-repo> - <short reason>
state: update #NNN - <short reason>
state: resolve #NNN - <short result>
```

For non-issue artifacts, include the artifact type when useful:

```text
state: update plan #NNN - <short reason>
state: file review #NNN - <short reason>
```

Always include the exact artifact path in the body when a number could be ambiguous.

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

### Artifact update

```text
State event: artifact_update
Artifact: koder/<type>/NNN_slug/INDEX.md
Reason: <one line>

Delta:
- <state change>
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
- Prefer selected-path staging and pathspec commits for state-only movement. External issue filings touch both handoff and issue paths:
  ```bash
  git add -- koder/STATE.md koder/issues/NNN_slug/INDEX.md
  git commit -F /tmp/state-message -- koder/STATE.md koder/issues/NNN_slug/INDEX.md
  ```
- Ordinary local artifact updates usually do **not** touch `koder/STATE.md`:
  ```bash
  git add -- koder/issues/NNN_slug/INDEX.md
  git commit -F /tmp/state-message -- koder/issues/NNN_slug/INDEX.md
  ```
- Avoid blind `git add -A` when unrelated dirty work exists.
- If a repo has no git repository and a state transition is being committed, run `git init` in the target root first. Do not add remotes or rewrite history.

## Analysis invariant

This should produce a compact semantic repo-evolution stream:

```bash
git log --grep='^state:' --oneline
```

Use full commit bodies for cross-repo reconstruction before reading long chats or large artifact history.
