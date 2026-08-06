---
updated_at: "06 Aug 2026 | 08:32 AM IST"
---

# Koder State

## Past

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

- `ux` is now the canonical interface-design skill: one frontmatter-only head,
  BFBB-safe root guidance, and routed specialist modules for review, foundations,
  polish, motion, prototyping, Apple-inspired design, and library selection.
- Mechanical validation is green: the full pi loader finds `ux` exactly once
  among 22 skills with zero diagnostics and no `ui-ux-pro-max`; there are no
  nested skill heads, executables, symlinks, broken local links, or credential
  values. Three source license files match exactly.
- Koder-pattern contract v1 remains canonical at
  `.pi/skills/koder-pattern/references/meta/pattern-contract.md`; init/doctor
  scratch-invariant coverage is green. SDK Queue `#002` remains unauthorized;
  runner-dependent work waits for Harnex `#57`/`#59`.
- The ten-model resolver remains clean. A `/model` selector write left the
  default at `anthropic`/`claude-fable-5`; pinned DeepSeek `:exacto` remains
  enabled. The running Pi process predates the latest settings/skill changes.
- `threejs-graphics` is discoverable; positive, near-miss, and cross-module
  routing smoke checks remain outstanding.

## Future

- Restart Pi, invoke `/skill:ux`, and smoke-check routing for holistic review,
  accessibility, motion restraint, explicit prototyping, and library-selection
  permission boundaries. Pi exposes the skill as `/skill:ux`; `/ux` is trigger
  wording, not a native skill-command alias.
- Run `/quit`, `source ~/dotfiles/pi-modes.zsh`, and `pi-zyt -c`; verify the ten
  scoped models through `/model` and `Ctrl+P`. Decide whether DeepSeek `:exacto`
  should become the default again.
- Smoke-check imported-skill routing boundaries (`write-skill` vs
  `create-skill`, `git-worktree` vs `koder-pattern`) and Three.js routing.
- On the next authorized queue, measure product, quality, process, worker-count,
  and wall-time deltas; file runner defects in Harnex rather than masking them.
