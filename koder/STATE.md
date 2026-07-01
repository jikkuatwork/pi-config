---
updated_at: "01 Jul 2026 | 11:35 AM IST"
---

# Koder State

## Past

- Session handoff open/close flow is active; `koder/STATE.md` remains source-of-truth, while grepable `state:` commits are the semantic movement ledger.
- Local `.pi/skills/*/SKILL.md` files use tiny front doors with `metadata.references.index` routers.
- Added reviewed `speak` skill (`fb349aa`) with `agent-speak` helper and reviewed docs-only `council` skill (`9402fef`); global speak symlinks are broadly wired, council is wired for Pi/Claude.
- Added Codex Foundry/ZYT shell mode in `/home/glasscube/dotfiles/codex-modes.zsh` (`3ebeab0`): `cx-zyt` and `cx-zyt-status` use `FOUNDRY_API_KEY`, `.foundry-zyt.env`, provider `foundry-zyt`, Responses wire API, default `gpt-5.5:xhigh`, and a separate `$HOME/.codex-zyt`.
- Prior durable skill/workflow context remains: `koder-pattern` queue-conveyor route, `ui-ux-pro-max`, symlink-gated `gopls-mcp`, and optional cross-repo notes doc cleanup.
- Added koder-pattern slice accounting guidance so broad issues can lazily track `issue_kind`, `Slice Ledger`, and queue slice deltas without rewriting old backlog.

## Present

- Pi repo branch `master` is clean after the koder-pattern slice-accounting guidance commit.
- Dotfiles repo intentionally committed only `codex-modes.zsh`; pre-existing unrelated `/home/glasscube/dotfiles/claude-modes.zsh` dirty work remains uncommitted and untouched.
- Repo has no root test/build harness; validation is docs/manual plus targeted scans, shell syntax checks, grep checks, and pi/codex probes.
- `cx()` in dotfiles still points to `cx-azure`; `cx-zyt` is available explicitly after shell reload/source.

## Future

- Reload/source dotfiles shell config before using `cx-zyt`; run a real Foundry/ZYT Codex call only if desired and with key/cost awareness.
- If desired, switch `cx()` default from `cx-azure` to `cx-zyt`.
- If desired, add council symlinks for `~/.agents/skills/council` and `~/.codex/skills/council` to mirror speak's full cross-harness wiring.
- Trial `gopls_*` tools only as optional backend/dev assistance; decide later whether to promote the experiment from `extension-experiments/`.
- If implementing cross-repo notes later, update `koder-pattern` docs minimally: ownership rule, external-note fields, and handoff visibility rule.
- Apply slice accounting lazily in target repos: new broad issues or touched queues get ledgers; do not mass-rewrite old issues unless explicitly requested.
