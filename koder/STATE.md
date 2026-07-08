---
updated_at: "08 Jul 2026 | 05:19 PM IST"
---

# Koder State

## Past

- Session handoff open/close flow is active; `koder/STATE.md` remains source-of-truth, while grepable `state:` commits are the semantic movement ledger.
- Local `.pi/skills/*/SKILL.md` files use tiny front doors with `metadata.references.index` routers.
- Existing durable context remains: reviewed `speak` and `council` skills, Foundry/ZYT Codex shell mode in dotfiles, `ui-ux-pro-max`, symlink-gated `gopls-mcp`, koder-pattern queue-conveyor/slice-accounting guidance, and deferred `last30days` import review.
- Evaluated `professorpalmer/Puppetmaster` from `/tmp/Puppetmaster` at `59b57ff` for ideas to adapt; read docs/source only, no install/setup/runtime invoked. Decision: lift narrow typed-artifact/report ideas, not the broader orchestrator/hooks/SQLite-memory model.
- Filed Harnex #52 in `/home/glasscube/Projects/harnex` (`3bf6025`): typed artifact and validation sidecar reports for dispatches, keeping plain-text `koder/` artifacts canonical.
- Updated koder-pattern Harnex guidance (`717b552`) to prefer `harnex watch --id --until done`, treat marker files as compatibility outputs, and add sidecar guidance.
- Added koder-pattern unblock packets (`ee90ebd`): `koder/unblock/NNN_slug/{INDEX.md,answers.md}` for terse human decisions that unblock queues/tasks/slices, with recommended option `a.` by default and answer application back to canonical artifacts.

## Present

- Pi repo branch `master` should be clean after this handoff commit; recent intentional state commits are `717b552` and `ee90ebd` plus this close.
- Harnex repo branch `main` is clean at `3bf6025 state: file typed artifact sidecar issue`.
- Repo has no root test/build harness; validation this session was docs/manual review plus `git diff --check` in Pi and Harnex.
- Koder-pattern now has an `unblock` route in artifacts/router/evals and queue-conveyor integration, but no runtime helper script yet.

## Future

- Use `/skill:koder-pattern unblock ...` when queue building finds user decisions blocking safe autonomous drain; create packets rather than scattered chat questions.
- If implementing Harnex #52, start with sidecar ingestion and docs/tests; keep `koder/` plain text canonical and avoid prose scraping.
- If desired, add a small deterministic helper later to create/process `koder/unblock` packets, but keep the docs-only pattern usable first.
- Reload/source dotfiles before using `cx-zyt`; run real Foundry/ZYT calls only with key/cost awareness.
- If desired, switch `cx()` default from `cx-azure` to `cx-zyt`, add wider council symlinks, or revisit `last30days` import with explicit approval before running upstream executables/installers.
