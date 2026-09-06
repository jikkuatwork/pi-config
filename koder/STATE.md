---
updated_at: "06 Sep 2026 | 09:51 PM IST"
---

# Koder State

## Past

- 06 Sep 2026: commit `9ff2cec` enabled `azure-openai-responses/gpt-6-astra`
  in Pi. The sponsored guard and Direct-from-Azure coverage passed; an exact
  `2026-09-03` GlobalStandard deployment succeeded and a live low-reasoning Pi
  smoke returned `ASTRA_OK`. No direct OpenAI inference route was enabled or
  used.
- 04 Sep 2026: commit `74cafb0` pinned the built-in OpenRouter provider to
  OpenAI Chat Completions at `/api/v1`. A refreshed catalog had mixed an
  Anthropic-style base URL with OpenRouter's OpenAI adapter, producing HTML
  `404`s at `/api/chat/completions`; the configured key was valid, runtime sync
  passed, and a live Fable 5.1 smoke returned `OK`.
- 03 Sep 2026: imported the docs-only `fal` skill at `.pi/skills/fal` from
  owner-provided MiniMax H3 Max API notes. It adds explicit paid/media-egress
  authorization, no-automatic-retry, validation, and actual-cost measurement;
  `movie_planet` has a relative test adapter. No Fal request ran and no secret
  entered the repository.
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

- Foundry GPT-5.6 Sol/max remains the versioned default. Astra is enabled only
  through Azure OpenAI Responses; runtime `~/.pi/agent/{settings,models}.json`
  matches the repository sources.
- Astra version `2026-09-03` is documented as Direct from Azure and the
  sponsored guard passes. Final account-specific meter attribution still awaits
  Cost Management lag; keep all Astra inference off direct OpenAI.
- OpenRouter Fable 5 and 5.1 remain enabled. The provider route is explicitly
  pinned against catalog drift; Fable 5.1 keeps its 1M context and practical
  32K output cap.
- `archify`, `web-art-direction`, and `motion-design` remain canonical but are
  not globally promoted; reload/testing and `install.sh --sync` are explicit
  owner choices.
- `fal` is canonical, docs-only, and linked into `movie_planet` for a future
  one-job cost trial; it has not been globally promoted or used for paid work.
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

- Recheck Astra's first Cost Management meter after reporting lag; if its Azure
  attribution is clean, benchmark coding and tool loops against Sol without
  changing the default unless requested.
- On explicit owner authorization, run one controlled Fal H3 Max trial from
  `movie_planet`, validate the video, and measure an uncached before/after Fal
  accounting delta without persisting private account state.
- Resume `~/Projects/graphily` only with explicit approval to execute third-party
  code: run `uv sync --frozen`, targeted and full tests, then `graphify update .`;
  decide whether to add fail-closed non-browser offline mode and remove skill
  auto-install/upgrade behavior.
- Fix `install.sh --sync` successful-write exit status and rerun sandbox plus
  idempotency checks.
- Monitor Pi's OpenRouter catalog/composer fix; remove the local route pin only
  after Fable resolves to `/api/v1/chat/completions` without it.
- Refresh the ZAI credential only outside the repo, then restart Pi and smoke
  GLM 5.3 without exposing the value.
- Promote or visually retest canonical skills only when explicitly requested;
  separately validate remaining Ox Alpha/Kimi image and tool loops if useful.
- File future authorized runner defects in Harnex rather than masking them.
