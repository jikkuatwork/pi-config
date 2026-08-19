---
updated_at: "19 Aug 2026 | 01:11 PM IST"
---

# Koder State

## Past

- 19 Aug 2026: commit `f336b4d` promoted bounded project-history adoption to
  koder-pattern contract v2. Setup/upgrade preserves existing changelog or
  release-note surfaces, creates a safe root `CHANGELOG.md` only when none
  exists, and limits generated `open` history loading to 100 lines. Gomux synced
  as the first v2 consumer in commit `7e28a76`.
- 15 Aug 2026: plain Pi became the portable default with versioned
  `.pi/models.json`, stable `.pi/settings.base.json`, generated writable local
  settings, and Foundry GPT-5.6 Sol/max as the canonical launch default
  (`c671608`; external dotfiles `1e65bcb`).
- 11 Aug 2026: `install.sh` gained portable fresh-machine setup and sync, while
  Baseten model pricing/default metadata was populated (`528b3ab`, `e434fcf`).
- 06 Aug 2026: added the persistent Pi message bar, Baseten-hosted models, and
  the docs-only `ux` umbrella (`6e16c3c`, `787811e`, `7ffa1fc`).
- 03 Aug 2026: koder-pattern contract v1 added the fail-closed scratch retention
  gate and cross-harness scaffold validation (`f845dae`).
- 15 Jul 2026: SDK Queue `#002` review consolidated delivery-first orchestration,
  queue-global budgets, adapter preflight, and Harnex-owned receipts.

## Present

- `./install.sh` installs or syncs versioned config; `./install.sh --sync` skips
  installation. Generated `~/.pi/agent/settings.json` is writable and the
  versioned default remains Foundry GPT-5.6 Sol/max.
- `.pi/models.json` includes Foundry, Sakana, curated OpenRouter routes, and
  Baseten using environment credential references; no credential value is
  versioned.
- Fresh shells expose only plain `pi`; repo-specific `open`/`close` skills stay
  local, while global `koder-pattern` resolves to this repository.
- Koder-pattern v2 smoke coverage passes for fresh setup, existing release
  tracking, explicit opt-out, safe Git-history aggregation, and existing
  consumer synchronization. Scratch-invariant smoke and Gomux doctor also pass.
- `./install.sh --sync` completed its writes but exits `1` when no credential is
  missing because its final false conditional becomes the script status.
- SDK Queue `#002` remains unauthorized pending Harnex `#57`/`#59`; imported
  skill routing and selected model/tool loops remain optional follow-ups.

## Future

- Fix the successful-sync exit status in `install.sh`, then rerun its sandbox and
  idempotency checks.
- After the owner updates `ANTHROPIC_API_KEY`, restart Pi and smoke one direct
  Anthropic request if needed; never expose or commit the key.
- Separately validate Kimi image/tool loops and imported-skill routing if needed.
- On the next authorized queue, file runner defects in Harnex rather than
  masking them.
