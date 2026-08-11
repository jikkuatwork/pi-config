---
updated_at: "11 Aug 2026 | 07:01 PM IST"
---

# Koder State

## Past

- 11 Aug 2026: built a portable fresh-machine setup for pi: `install.sh`
  (auto-detects pi, symlinks settings/AGENTS/extensions/skills into
  `~/.pi/agent/`, generates `models.json`, checks env keys), `.pi/providers.json`
  (foundry + foundry-zyt defs wired to `$FOUNDRY_API_KEY`), and
  `scripts/build-models.js` (injects an `openai` override from
  `$OPENAI_API_KEY`/`$OPENAI_BASEURL` only when both are set). README gained a
  "Setup On A Fresh Machine" section. bash 3.2-safe for macOS/Linux; sandbox
  runs, idempotency, missing-env, and pi auto-detect paths all passed. Commit
  `528b3ab`.
- 11 Aug 2026: populated Baseten cost metadata for Kimi K3, GLM 5.2 Fast,
  and DeepSeek V4 Flash 0731 in `~/.pi/agent/models.json` from the live
  `/v1/models` API. This corrects the earlier "Baseten published no rates"
  finding — the endpoint does return per-token `pricing` (input/output/
  cache-read). Commit `e434fcf` set the shared cycle default to
  `baseten/deepseek-ai/DeepSeek-V4-Flash-0731`.
- 06 Aug 2026: commit `6e16c3c` added a Pi-only persistent message bar with
  six agent-selected variants, a strict sub-160-character display, session
  restore, manual control, and global Pi guidance. Dotfiles commit `c9a01f2`
  added `message_bar` to the `pi-zyt` tool allowlist; TUI, restore, RPC load,
  and explicit allowlist activation smokes passed.
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

- Fresh-machine setup is now one command: clone the repo and run
  `./install.sh`; it skips the npm install when pi is already present and only
  adds the `openai` override when `OPENAI_API_KEY` + `OPENAI_BASEURL` are both
  set. `~/.pi/agent/models.json` here is unchanged (install.sh keeps existing
  files unless `--force`).
- Baseten models now carry real cost metadata in `~/.pi/agent/models.json`
  (Kimi K3 $3/$15/$0.30, GLM 5.2 Fast $2.10/$6.60/$0.21, DeepSeek V4 Flash
  $0.13/$0.26/$0.028 per M tokens); pi shows these in the footer and `/usage`
  after the next `/model` reload.
- The shared cycle default is now `baseten`/`deepseek-ai/DeepSeek-V4-Flash-0731`
  (committed `e434fcf`); OpenRouter DeepSeek `:exacto` remains enabled.
- Global user-local provider `baseten` points at
  `https://inference.baseten.co/v1`, uses `openai-completions`, and keeps its
  credential as the `$BASETEN_API_KEY` environment reference; no key was copied.
- `.pi/settings.json` remains the shared cycle authority through the global
  settings symlink; the scope resolves 13 models.
- The message-bar extension and Pi-global instructions are enabled through
  source-of-truth symlinks under `~/.pi/agent/`. The current `pi-zyt` process
  predates its new tool allowlist, so a full restart is still required before
  the agent can call `message_bar`; the manual `/message-bar` UI path works.
- The current Pi process does not inherit `BASETEN_API_KEY`; the same fresh
  process is required before selecting Baseten interactively.
- `ux` remains canonical and mechanically clean. Koder-pattern contract v1 is
  canonical; SDK Queue `#002` remains unauthorized pending Harnex `#57`/`#59`.
- `threejs-graphics` and imported-skill routing smoke checks remain outstanding.

## Future

- Run `/quit`, `source ~/dotfiles/pi-modes.zsh`, and `pi-zyt -c`; verify the 13
  scoped models through `/model` and `Ctrl+P`, confirm Baseten costs render in
  the footer/`/usage`, then ask the agent to set and clear a `message_bar` test
  before choosing any default model changes.
- Separately validate Kimi image input and coding tool-call loops if needed;
  re-check Baseten cost metadata if rates change.
- Invoke `/skill:ux` and smoke-check review, accessibility, motion, prototyping,
  and library-selection boundaries; also check imported-skill and Three.js routing.
- On the next authorized queue, measure product, quality, process, worker-count,
  and wall-time deltas; file runner defects in Harnex rather than masking them.
