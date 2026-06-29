---
updated_at: "29 Jun 2026 | 09:29 PM IST"
---

# Koder State

## Past

- Session handoff open/close flow is active; `koder/STATE.md` remains source-of-truth, while grepable `state:` commits are the semantic movement ledger.
- Local `.pi/skills/*/SKILL.md` files use tiny front doors with `metadata.references.index` routers.
- Added reviewed `speak` skill (`fb349aa`) with `agent-speak` helper; symlinked globally for Pi/Agents/Claude/Codex and removed Holm's repo-local `scripts/speak.sh` in Holm commit `bcad749f`.
- Added reviewed docs-only `council` skill (`9402fef`) adapted from `0xNyk/council-of-high-intelligence`; it is a transparent single-agent simulated council and omits upstream installers/scripts/provider calls.
- Prior durable skill/workflow context remains: `koder-pattern` queue-conveyor route, `ui-ux-pro-max`, symlink-gated `gopls-mcp`, and Codex Foundry wiring gap noted in dotfiles.

## Present

- Branch `master` is clean at close after this handoff commit.
- Global council symlinks currently exist for `~/.pi/agent/skills/council` and `~/.claude/skills/council`; speak symlinks exist for `~/.pi/agent`, `~/.agents`, `~/.claude`, and `~/.codex` plus `~/.local/bin/agent-speak`.
- Repo has no root test/build harness; validation is docs/manual plus targeted scans, shell syntax checks, grep checks, and pi reload probes.
- `codex-modes.zsh` still has no `foundry`, `FOUNDRY_API_KEY`, `codex-foundry`, or `cx-foundry` matches; Pi modes do contain Foundry support.

## Future

- Reload/restart existing agent sessions after skill changes so new/changed global skills are discovered.
- If requested, add Codex Foundry mode/function to `/home/glasscube/dotfiles/codex-modes.zsh` using `FOUNDRY_API_KEY` without copying secrets.
- If desired, add council symlinks for `~/.agents/skills/council` and `~/.codex/skills/council` to mirror speak's full cross-harness wiring.
- Trial `gopls_*` tools only as optional backend/dev assistance; decide later whether to promote the experiment from `extension-experiments/`.
- If implementing cross-repo notes later, update `koder-pattern` docs minimally: ownership rule, external-note fields, and handoff visibility rule.
