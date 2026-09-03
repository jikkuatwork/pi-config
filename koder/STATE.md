---
updated_at: "03 Sep 2026 | 08:07 AM IST"
---

# Koder State

## Past

- 03 Sep 2026: commit `aa58245` added OpenRouter Claude Fable 5.1 to Pi's
  enabled cycle with a local fallback catalog entry, 1M context, image input,
  mandatory low-through-max reasoning, and a practical 32K output cap. Runtime
  config, model resolution, the live provider catalog, and a low-reasoning prompt
  passed.
- 02 Sep 2026: audited Graphify `0.9.53` at `33362d9`, then created the external
  offline fork at `~/Projects/graphily` on `offline-capability`. Koder-pattern was
  initialized there in `baf53e1`; pinned HTML assets and offline hardening are
  staged but intentionally uncommitted pending approval to run third-party code.
- 01 Sep 2026: routed Claude Fable 5 and Opus 5 through OpenRouter with no direct
  Anthropic model enabled; adopted Archify `2.16.0` as a canonical no-repo-data-
  egress skill with its reviewed local renderer.
- Aug 2026: established `.pi/skills/` as the canonical home for reusable adopted
  skills, made plain Pi portable through versioned config plus generated writable
  runtime settings, and promoted koder-pattern's project-history contract to v2.
- Jul-Aug 2026: added Foundry, Baseten, ZAI, Sakana, and curated OpenRouter model
  routes; the persistent message bar; docs-only UX/motion/art-direction skills;
  and delivery-first queue/Harnex review guidance.

## Present

- Foundry GPT-5.6 Sol/max remains the versioned default. Runtime
  `~/.pi/agent/{settings,models}.json` matches the repository sources.
- OpenRouter Fable 5.1 resolves in Pi and is live. The custom 32K cap avoids the
  full 128K output reservation while preserving the provider's 1M context.
- `archify`, `web-art-direction`, and `motion-design` remain canonical but are
  not globally promoted; reload/testing and `install.sh --sync` are explicit
  owner choices.
- Explicit imports land canonically here; requesting repositories receive only
  relative test symlinks. Repo-owned `open`/`close` skills stay local.
- The configured ZAI key is still rejected by provider endpoints. No credential
  value is versioned.
- `./install.sh --sync` completes writes but returns `1` when all credentials are
  present because the final false conditional becomes the script status.
- SDK Queue `#002` remains unauthorized pending Harnex `#57`/`#59`.
- `~/Projects/graphily` remains dirty by design: static asset/hash/TOML/Python
  checks pass, but dependency installation, project tests, `graphify update .`,
  and browser visual evidence have not run. Chromium is unavailable.

## Future

- Resume `~/Projects/graphily` only with explicit approval to execute third-party
  code: run `uv sync --frozen`, targeted and full tests, then `graphify update .`;
  decide whether to add fail-closed non-browser offline mode and remove skill
  auto-install/upgrade behavior.
- Fix `install.sh --sync` successful-write exit status and rerun sandbox plus
  idempotency checks.
- Refresh the ZAI credential only outside the repo, then restart Pi and smoke
  GLM 5.3 without exposing the value.
- Promote or visually retest canonical skills only when explicitly requested;
  separately validate remaining Ox Alpha/Kimi image and tool loops if useful.
- File future authorized runner defects in Harnex rather than masking them.
