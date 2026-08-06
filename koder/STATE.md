---
updated_at: "06 Aug 2026 | 10:36 AM IST"
---

# Koder State

## Past

- 06 Aug 2026: commit `787811e` added Baseten-hosted Kimi K3, GLM 5.2
  Fast, and DeepSeek V4 Flash 0731 to the shared 13-model Pi scope. The
  user-local global provider resolves `$BASETEN_API_KEY`; discovery, direct
  Chat Completions, and max-thinking Pi streaming smokes passed for all three.
- 06 Aug 2026: commit `7ffa1fc` replaced `ui-ux-pro-max` with one extensible,
  docs-only `.pi/skills/ux/` umbrella. It retains the BFBB/Holm core and adapts
  `jakubkrehel/skills@a673333` plus `emilkowalski/skills@de33dbe` into 12 routed
  capability modules. Install/plugin surfaces were omitted, risky mutations are
  gated, source conflicts were reconciled, and all three MIT notices remain.
- 05 Aug 2026: commit `1c7a248` pinned the isolated OpenRouter DeepSeek route to
  `deepseek/deepseek-v4-flash-0731:exacto`; pi 0.83.0 resolved it verbatim and a
  minimal live glow test passed. Close commit: `894c1eb`.
- 03 Aug 2026: `.pi/settings.json` became the ten-model shared cycle authority;
  `~/.pi/agent/settings.json` now symlinks to it. Primary `pi` and `pi-zyt` share
  the same scope; dotfiles commit `7db28d0` removed the launcher override.
- 03 Aug 2026: koder-pattern contract v1 gained a fail-closed close-time scratch
  invariant, retention ledger, precedence rules, init/doctor validation, and
  passing scaffold/cross-harness smoke coverage (`f845dae`).
- 03 Aug 2026: vendored docs-only `write-skill` and `git-worktree`; skipped
  redundant or tool-bound skills from `davidondrej/skills`.
- 31 Jul 2026: imported the docs-only `threejs-graphics` umbrella with 23 topic
  modules and 27 deep references (`2e6995e`); runtime/install/assets were omitted.
- 15 Jul 2026: SDK Queue `#002` review consolidated delivery-first orchestration,
  one mode authority, queue-global budgets, adapter preflight, and Harnex-owned
  receipts. Session handoffs and sparse `state:` history remain active.

## Present

- Global user-local provider `baseten` points at
  `https://inference.baseten.co/v1`, uses `openai-completions`, and keeps its
  credential as the `$BASETEN_API_KEY` environment reference; no key was copied.
- Plain `pi` and `pi-zyt` discover all three Baseten models. Minimal direct API
  and Pi streaming calls returned exactly `OK`; pricing metadata remains zero
  because Baseten's model listing did not publish rates.
- `.pi/settings.json` remains the shared cycle authority through the global
  settings symlink. The scope now resolves 13 models; the default remains
  `anthropic`/`claude-fable-5`, with OpenRouter DeepSeek `:exacto` still enabled.
- The current Pi process does not inherit `BASETEN_API_KEY`; a fresh process is
  required before selecting Baseten interactively.
- `ux` remains canonical and mechanically clean. Koder-pattern contract v1 is
  canonical; SDK Queue `#002` remains unauthorized pending Harnex `#57`/`#59`.
- `threejs-graphics` and imported-skill routing smoke checks remain outstanding.

## Future

- Run `/quit`, `source ~/dotfiles/pi-modes.zsh`, and `pi-zyt -c`; verify the 13
  scoped models through `/model` and `Ctrl+P`, then choose any default changes.
- Replace Baseten's zero cost metadata if authoritative rates become available;
  separately validate Kimi image input and coding tool-call loops if needed.
- Invoke `/skill:ux` and smoke-check review, accessibility, motion, prototyping,
  and library-selection boundaries; also check imported-skill and Three.js routing.
- On the next authorized queue, measure product, quality, process, worker-count,
  and wall-time deltas; file runner defects in Harnex rather than masking them.
