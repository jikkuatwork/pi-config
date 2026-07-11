---
updated_at: "11 Jul 2026 | 09:58 PM IST"
---

# Koder State

## Past

- Session handoff open/close flow is active; `koder/STATE.md` remains source-of-truth, while grepable `state:` commits are the semantic movement ledger.
- Local `.pi/skills/*/SKILL.md` files use tiny front doors with `metadata.references.index` routers.
- Existing durable context remains: reviewed `speak` and `council` skills, Foundry/ZYT Codex shell mode in dotfiles, `ui-ux-pro-max`, symlink-gated `gopls-mcp`, koder-pattern queue-conveyor/slice-accounting guidance, and deferred `last30days` import review.
- Evaluated `professorpalmer/Puppetmaster` from `/tmp/Puppetmaster` at `59b57ff` for ideas to adapt; read docs/source only, no install/setup/runtime invoked. Decision: lift narrow typed-artifact/report ideas, not the broader orchestrator/hooks/SQLite-memory model.
- Filed Harnex #52 in `/home/glasscube/Projects/harnex` (`3bf6025`): typed artifact and validation sidecar reports for dispatches, keeping plain-text `koder/` artifacts canonical.
- Updated koder-pattern Harnex guidance (`717b552`) to prefer `harnex watch --id --until done`, treat marker files as compatibility outputs, and add sidecar guidance.
- Added then corrected koder-pattern unblock guidance: human decisions should now be asked inline in chat, with optional temporary `koder/scratch/` replies, not a `koder/unblock/` artifact tree.
- Reworked open/close hand-offs with Holm-style pretty-print formats; close now requires a verified clean Git state, and fresh koder-pattern setup vendors the routed format references.

## Present

- Pi repo branch `master` is clean after `e554521` and this close hand-off; recent intentional state commits include `717b552`, `ee90ebd`, and `3e409ea`.
- Harnex repo branch `main` is clean at `3bf6025 state: file typed artifact sidecar issue`.
- Repo has no root test/build harness; validation this session was docs/manual review plus `git diff --check` in Pi and Harnex.
- Koder-pattern now has an inline `unblock` route in artifacts/router/evals and queue-conveyor integration; it explicitly avoids `koder/unblock/` packet folders.
- Fresh init creates frontmatter-only open/close routers plus `references/INDEX.md` and `references/FORMAT.md`; doctor validates the complete skill shape.

## Future

- Use `/skill:koder-pattern unblock ...` when queue building finds user decisions blocking safe autonomous drain; ask concise inline numbered questions and accept optional temp replies under `koder/scratch/`.
- If implementing Harnex #52, start with sidecar ingestion and docs/tests; keep `koder/` plain text canonical and avoid prose scraping.
- Reload/source dotfiles before using `cx-zyt`; run real Foundry/ZYT calls only with key/cost awareness.
- If desired, switch `cx()` default from `cx-azure` to `cx-zyt`, add wider council symlinks, or revisit `last30days` import with explicit approval before running upstream executables/installers.
- Use the new `open`/`close` render contracts on the next session; keep close blocked when unknown or unsafe dirty paths prevent a safe commit.
