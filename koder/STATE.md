---
updated_at: "11 Jun 2026 | 02:03 PM IST"
---

# Koder State

## Past

- Session handoff open/close flow is active; `koder/STATE.md` remains source-of-truth.
- Earlier durable work includes kodemachine issue 001, Framework7 research/skill work, and the global `koder-pattern` refactor/bootstrap route.
- Issue 002 landed from Holm with a `state: file #002 from holm - cross-repo state protocol` commit.

## Present

- Source for the global `koder-pattern` install is `.pi/skills/koder-pattern/`; global Pi, generic agents, Claude, and Codex skill paths all symlink to it.
- `koder-pattern` now has a thin `bin/koder-pattern init` script, scaffold templates, and state-commit protocol docs.
- The protocol commits every intentional `koder/` state transition with grepable `state:` subjects by default; setup uses `state: init - koder pattern scaffold` and `--no-commit` is the explicit escape hatch.
- Issue 002 is resolved in the current state update: docs/templates cover init, close, external issue filings, dirty-repo guardrails, selected-path commits, and eval prompts.
- Repo has no root test/build harness; validation is script/docs/manual plus temp-repo smoke tests.

## Future

- Use `git log --grep='^state:' --oneline` as the semantic repo-evolution stream.
- Continue keeping project-local pi skills reviewed and source-controlled under `.pi/skills/`.
- If expanding koder artifacts later, keep `plans/`, `reviews/`, `research/`, etc. lazy/on-demand rather than part of init.
