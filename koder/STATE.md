---
updated_at: "01 Sep 2026 | 11:22 AM IST"
---

# Koder State

## Past

- 01 Sep 2026: moved Claude Fable 5 and Opus 5 into the enabled model cycle
  through OpenRouter and removed every direct Anthropic entry; generated runtime
  settings were synced without changing the Foundry default.
- 31 Aug 2026: adapted Archify `2.16.0` at `5de7275` into the canonical
  skill home with its MIT local renderer and a fail-closed no-repo-data-egress
  policy; updater and remote brand paths were removed while no-referrer Google
  Fonts remained owner-approved.
- 23 Aug 2026: adopted the docs-only `web-art-direction` umbrella from the MIT-licensed MengTo/Skills snapshot `4c716b5`; it routes art direction, layout, surface, motion/scroll, interaction, and delivery guidance through one tiny entrypoint.
- 23 Aug 2026: established `~/Projects/pi/.pi/skills/` as the canonical synced
  home for reusable adopted/imported skills, with tiny front doors and relative
  requesting-repo test symlinks; promoted the reviewed LottieFiles
  `motion-design` skill from the lab into that home.
- 21 Aug 2026: commit `04f9c1b` added OpenRouter Ox Alpha to the shared
  model cycle with live catalog metadata and the existing zero-price gate.
  Config generation, runtime sync, model resolution, and a live low-reasoning
  prompt passed.
- 20 Aug 2026: commit `44e9fc3` added Baseten DeepSeek V4 Pro 0813 and ZAI
  GLM 5.3 to the shared Pi model cycle. Both bundled catalog entries resolve,
  and the generated runtime settings were synced without storing credentials.
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

- `archify` is canonical under `.pi/skills/` but not globally promoted. Its
  bundled Node runtime passed privacy, doctor, five-mode showcase, delivery,
  delta, migration, and loopback-preview checks; browser visual evidence was
  skipped because Chrome/Chromium was unavailable.
- `web-art-direction` is canonical under `.pi/skills/`, contains no runtime code or dependency, and is exposed to the lab only through a relative test symlink; it has not been globally promoted with `install.sh --sync`.
- Explicit adopt/import work now lands canonically in this repo even when begun
  elsewhere. The requesting repo gets only a relative `.pi/skills/<name>` test
  symlink; global promotion remains a separate explicit sync decision.
- `./install.sh` installs or syncs versioned config; `./install.sh --sync` skips
  installation. Generated `~/.pi/agent/settings.json` is writable and the
  versioned default remains Foundry GPT-5.6 Sol/max.
- `.pi/settings.base.json` scopes OpenRouter Claude Fable 5 and Opus 5 with no
  direct Anthropic entries in the enabled scope, alongside OpenRouter Ox Alpha,
  Baseten routes, direct ZAI GLM 5.3, Sakana, and the Foundry default.
- `.pi/models.json` includes Foundry, Sakana, curated OpenRouter routes, and
  Baseten using environment credential references. Ox Alpha has a 1M context,
  image input, mandatory low/high/max reasoning, and max-price-zero routing;
  built-in ZAI resolves `ZAI_API_KEY`, and no credential value is versioned.
- The current `ZAI_API_KEY` is present but both ZAI global API endpoints reject
  it with HTTP `401 Authentication Failed`; catalog/config checks still pass.
- Fresh shells expose only plain `pi`; repo-specific `open`/`close` skills stay
  local, while global `koder-pattern` resolves to this repository.
- Koder-pattern v2 smoke coverage passes for fresh setup, existing release
  tracking, explicit opt-out, safe Git-history aggregation, and existing
  consumer synchronization. Scratch-invariant smoke and Gomux doctor also pass.
- `./install.sh --sync` completes its writes but exits `1` when no credential is
  missing because its final false conditional becomes the script status.
- SDK Queue `#002` remains unauthorized pending Harnex `#57`/`#59`; imported
  skill routing and selected model/tool loops remain optional follow-ups.

## Future

- Reload Pi to discover and test `archify`; run `./install.sh --sync` only if
  global promotion is explicitly intended, and optionally repeat its visual
  check on a host with Chrome/Chromium.
- Reload Pi before testing `web-art-direction` or `motion-design` through their
  lab adapters; run `./install.sh --sync` only when global promotion is intended.
- Replace or refresh `ZAI_API_KEY` with a valid Global ZAI Coding Plan key,
  restart Pi, and smoke GLM 5.3 without exposing or committing the credential.
- Fix the successful-sync exit status in `install.sh`, then rerun its sandbox and
  idempotency checks.
- Separately validate Ox Alpha and Kimi image/tool loops plus imported-skill
  routing if needed; recheck Ox Alpha identity and pricing while it remains an
  alpha model.
- On the next authorized queue, file runner defects in Harnex rather than
  masking them.
