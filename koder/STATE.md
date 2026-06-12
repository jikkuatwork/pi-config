---
updated_at: "12 Jun 2026 | 10:53 AM IST"
---

# Koder State

## Past

- Session handoff open/close flow is active; `koder/STATE.md` remains source-of-truth.
- Earlier durable work includes kodemachine issue 001, Framework7 research/skill work, and the global `koder-pattern` refactor/bootstrap route.
- Issue 002 was filed from Holm, implemented, resolved, then clarified around `koder/STATE.md` boundaries.

## Present

- Source for the global `koder-pattern` install is `.pi/skills/koder-pattern/`; global Pi, generic agents, Claude, and Codex skill paths all symlink to it.
- `koder-pattern` has a thin `bin/koder-pattern init` script, scaffold templates, and state-commit protocol docs.
- Protocol: grepable `state:` commits are the semantic movement ledger; `koder/STATE.md` is only session handoff, updated at init/close/explicit handoff or external-origin filings.
- Setup creates the thin `koder/` scaffold and commits `state: init - koder pattern scaffold` by default; `--no-commit` is the explicit escape hatch.
- Repo has no root test/build harness; validation is script/docs/manual plus temp-repo smoke tests.

## Future

- Use `git log --grep='^state:' --oneline` for semantic repo-evolution history.
- Keep project-local pi skills reviewed and source-controlled under `.pi/skills/`; symlinked global installs should not be edited directly.
- If expanding koder artifacts later, keep `plans/`, `reviews/`, `research/`, etc. lazy/on-demand rather than part of init.
