---
updated_at: "23 Jun 2026 | 01:56 PM IST"
---

# Koder State

## Past

- Session handoff open/close flow is active; `koder/STATE.md` remains source-of-truth.
- `state:` commits are the semantic movement ledger; `koder/STATE.md` is only session handoff.
- Local `.pi/skills/*/SKILL.md` files use frontmatter-only tiny front doors with `metadata.references.index` routers.
- `koder-pattern` has a queue-conveyor route at `references/queues/conveyor.md` for mining issues/plans into queueable slices, queue-shaped plans, compatible queues, and refills.
- Imported `ui-ux-pro-max` as a docs-only local pi skill optimized for BFBB/Holm/Zippy UI work.
- Added a symlink-gated zero-repo `gopls-mcp` Pi experiment; `/gopls-mcp-status` validates against `gopls v0.22.0` in Pi JSON mode.
- Checked `/home/glasscube/dotfiles/codex-modes.zsh` for Foundry/Codex wiring: it has ChatGPT subscription + Azure modes only, while `/home/glasscube/dotfiles/pi-modes.zsh` contains Foundry ZYT/`FOUNDRY_API_KEY` support.

## Present

- Branch `master` is clean except this close-session `koder/STATE.md` update before commit.
- `codex-modes.zsh` has no `foundry`, `FOUNDRY_API_KEY`, `codex-foundry`, or `cx-foundry` matches, so `codex-foundry` will not work from that file yet.
- Global extension loading is symlink-gated via `~/.pi/agent/settings.json` with active local extension symlinks plus `gopls-mcp`.
- Repo has no root test/build harness; validation remains docs/manual plus targeted file, grep, and pi CLI probes.

## Future

- If requested, add a Codex Foundry mode/function to `/home/glasscube/dotfiles/codex-modes.zsh` that uses `FOUNDRY_API_KEY` and the Foundry base URL without copying secrets into dotfiles.
- Use `/reload` or restart Pi after enabling/disabling extension symlinks; current already-running sessions may not see newly registered tools until reload.
- Trial `gopls_*` tools only as optional backend/dev assistance; the experiment intentionally does not expose upstream `go_rename_symbol` yet.
- If the experiment sticks, decide whether to promote it from `extension-experiments/` to a normal extension or keep it symlink-gated.
- If implementing cross-repo notes later, update `koder-pattern` docs minimally: ownership rule, external-note fields, and handoff visibility rule.
- Analyze DocFlow via Issue 003 before importing/adapting productization ideas into `koder-pattern`.
