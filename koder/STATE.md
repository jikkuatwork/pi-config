---
updated_at: "23 Jun 2026 | 07:27 AM IST"
---

# Koder State

## Past

- Session handoff open/close flow is active; `koder/STATE.md` remains source-of-truth.
- `state:` commits are the semantic movement ledger; `koder/STATE.md` is only session handoff.
- Local `.pi/skills/*/SKILL.md` files use frontmatter-only tiny front doors with `metadata.references.index` routers.
- `koder-pattern` scaffold templates are named `SKILL.md.template` so pi does not discover nested live skills, while init still writes target `koder/skills/{open,close}/SKILL.md`.
- External Holm filing created Issue 003 to compare DocFlow with `koder-pattern` and decide what to import/adapt.
- Imported `ui-ux-pro-max` as a docs-only local pi skill optimized for BFBB/Holm/Zippy UI work; Python/CLI/scripts/data/install cruft was intentionally omitted.
- `koder-pattern` queue docs now encode the queue-conveyor lesson: build/refill multiple compatible queues while human judgment is present, require completion contracts, and keep blind orchestration process-aware.
- `koder-pattern` now has `references/queues/conveyor.md` as the explicit route for mining issues/plans into queueable slices, queue-shaped plans, compatible queues, and refills.

## Present

- Added a zero-repo `gopls-mcp` Pi experiment for Go semantic tooling. Source lives at `extension-experiments/gopls-mcp/`; runtime binary/cache lives at `~/.pi/agent/devtools/gopls-mcp/`.
- Global extension loading is now symlink-gated: `~/.pi/agent/settings.json` has `"extensions": []`, and Pi auto-loads only selected symlinks in `~/.pi/agent/extensions/`.
- Active symlinks now include the standard local extensions (`vim`, footer, mode status, Azure retry normalizer, hide clone autocomplete) plus `gopls-mcp`.
- `gopls-mcp` validation passed through Pi JSON mode: `/gopls-mcp-status` connects to `gopls v0.22.0` and lists MCP tools.
- Repo has no root test/build harness; validation remains docs/manual plus targeted pi CLI probes.

## Future

- Use `/reload` or restart Pi after enabling/disabling extension symlinks; current already-running sessions may not see newly registered tools until reload.
- Trial `gopls_*` tools only as optional backend/dev assistance; the experiment intentionally does not expose upstream `go_rename_symbol` yet.
- If the experiment sticks, decide whether to promote it from `extension-experiments/` to a normal extension or keep it symlink-gated.
- If implementing the cross-repo note idea later, update `koder-pattern` docs minimally: ownership rule, external-note fields, and handoff visibility rule; avoid adding `koder/inbox/` unless repeated pain proves it needed.
- Analyze DocFlow via Issue 003 before importing/adapting productization ideas into `koder-pattern`.
