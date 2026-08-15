---
updated_at: "15 Aug 2026 | 12:42 PM IST"
---

# Koder State

## Past

- 15 Aug 2026: commit `c671608` simplified to plain Pi. Versioned
  `.pi/models.json` owns custom public provider/model definitions using
  environment credential refs; `.pi/settings.base.json` holds stable settings
  and the Sol/max default while generated local settings preserve machine-local
  metadata. External dotfiles commit `dc13a18` removed `pi-zyt`/`pi-or`;
  commands commit `fbc3bdb` removed the credential scrubber. Real and sandbox
  sync, idempotency, JSON, shell, secret, and 14-target discovery checks passed.
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

- `./install.sh` installs or syncs versioned config; `./install.sh --sync` skips
  installation. Generated `~/.pi/agent/settings.json` is writable and no longer
  aliases a tracked file; the versioned default is Foundry GPT-5.6 Sol/max.
- `.pi/models.json` includes Foundry, Sakana, curated OpenRouter routes, and
  Baseten. Every custom credential is an environment reference; no key copied.
- Fresh shells resolve plain Pi through mise. No `pi-zyt`, `pi-or`, forced tool
  allowlist, forced trust, or ambient-credential scrubber remains. Repo-specific
  `open`/`close` skills are excluded from global install to avoid collisions.
- Real local models match source exactly; provider discovery passed. Pre-change
  local settings/models remain in `*.bak-pre-versioned` backups.
- `ux` and koder-pattern remain canonical. SDK Queue `#002` remains unauthorized
  pending Harnex `#57`/`#59`; imported-skill routing smokes remain outstanding.

## Future

- Restart the already-open Pi process once more; verify no skill-collision notice
  and confirm `foundry-zyt/gpt-5.6-sol:max` is selected.
- Separately validate Kimi image/tool loops and imported-skill routing if needed.
- On the next authorized queue, file runner defects in Harnex rather than
  masking them.
