---
title: Koder Scratch, State, and Evidence Stores
updated: 2026-06-11
---

# Koder Scratch, State, and Evidence Stores

Use when handling transient work products, session handoff, or reproducible evidence.

## Scratch

`scratch/` is for transient work products:

- worker briefs;
- temporary proofs;
- dispatch summaries;
- command output snapshots;
- session-specific notes.

Scratch is **not canonical**. Promote durable decisions to issues/plans/reviews/analysis/notes before relying on them.

Rules:

- Do not store secrets or private payloads.
- Do not require future agents to read huge scratch logs to understand current state.
- Link scratch artifacts only when they are concise evidence and likely to remain useful.
- Clean or archive scratch according to repo policy; do not churn large generated files casually.

## Session state

`koder/STATE.md` is a tiny cross-session handoff, not history. Keep it short and current:

```markdown
# Koder State

## Past

- What was completed or decided.

## Present

- Current repo state, dirty work, active focus.

## Future

- Next likely tasks, risks, commands.
```

Detailed chronology belongs in changelogs, run logs, issues, reviews, or grepable `state:` commit history. Update session state at init, closeout, explicit handoff requests, or external-origin filings into the repo; do not update it for every local state commit.

## Bench / evidence stores

A `koder/bench/` or equivalent directory can hold reproducible run outputs, baselines, and reports. Treat it as evidence, not prose:

- keep raw machine-readable outputs under run IDs;
- write a short summary or analysis artifact when interpreting results;
- avoid committing massive generated data unless the repo expects it;
- record environment, version, commit, and command lines for reproducibility.
