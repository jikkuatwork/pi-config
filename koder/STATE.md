---
updated_at: "31 Jul 2026 | 10:17 PM IST"
---

# Koder State

## Past

- 31 Jul 2026: dotfiles commit `2e344f7` fixed the actual `pi-zyt` launcher in
  `/home/glasscube/dotfiles/pi-modes.zsh`: its explicit `--models` scope now
  includes the curated Sonnet 5, Opus 4.8, and Fable 5 entries, and
  `pi-zyt-models` searches Anthropic. Pi-repo commit `506540a` records that the
  dotfiles repo—not the status-label extension—is the launcher source of truth.
- 31 Jul 2026: enabled Pi's built-in Anthropic provider without copying a
  credential: user-local `~/.pi/agent/models.json` now references the existing
  environment key. Pi `0.83.0` exposes 15 Anthropic catalog entries; this
  project keeps a curated three-model Anthropic scope, validated offline.
- 31 Jul 2026: commit `2e6995e` adapted
  `scottstts/Threejs-Awesome-Graphics-Agent-Skills` into the docs-only
  `.pi/skills/threejs-graphics/` umbrella: one
  frontmatter-only head routes to 23 topic modules and 27 deep references.
  Upstream installers, scripts, examples, shaders, and binary assets were
  omitted; the always-visible description footprint fell by about 95%.
- 15 Jul 2026: an independent SDK-side review of Queue `#002` (SDK
  `koder/analysis/001_q002_orchestration_efficiency/INDEX.md`) drove a
  consolidation of koder-pattern: `blind-briefs.md` and `blind-recovery.md`
  merged into `blind-orchestration.md`; four orchestration shapes collapsed to
  direct/blind plus a `review_granularity` flag; `mode-selection.md` is now the
  single home of the delivery-first rule, breakers, and proof ownership;
  duplicate skill-level receipt schemas were dropped in favor of Harnex's
  `harnex.artifact_report.v1`; queue-global `process_failure_budget`, adapter
  preflight, and implementation-incomplete classification were added. Mechanical
  state-machine rules are being delegated to Harnex (#56-#59 filed there).
  Skill corpus: 28.2k -> 23.7k words; cross-harness smoke passes.
- Session handoffs and routed cross-harness skills are active. `state:` history
  is reserved for sparse operator milestones rather than metadata churn.
- Commit `4132a6c` generalized blind orchestration from Holm SDK Queue `#001`;
  commit `4e53da1` then made koder-pattern delivery-first with tighter mode,
  planning-budget, no-op, monitoring, and commit-proof gates.
- `koder/analysis/001_koder_pattern_delivery_overhead/INDEX.md` records the
  evidence, decisions, SDK implication, and residual risk from that correction.
- Project-local model scoping was added for the preferred Anthropic and Azure
  OpenAI model families without storing credentials or private Azure state.

## Present

- The committed `threejs-graphics` import has one discoverable `SKILL.md`, no
  executables or credential-pattern findings, resolved local links, MIT
  attribution, provenance/evals, and explicit GPL/unlicensed-source boundaries.
  It needs a fresh Pi process for discovery.
- `.pi/settings.json` scopes `/model` and `Ctrl+P` to eight entries:
  `claude-sonnet-5`, `claude-opus-4-8`, `claude-fable-5`, and five Azure OpenAI
  GPT-5.5/GPT-5.6 variants.
- Pi `0.83.0` resolves all three Anthropic models through the shared user-local
  environment reference while retaining the credential-scrubbing wrapper; no
  key was copied into this repo or `auth.json`. The dotfiles launcher change is
  committed and validated. This already-running `pi-zyt` session still has its
  old Foundry/Sakana-only scope until the zsh function is re-sourced and Pi is
  relaunched.
- Validation was metadata-only and offline: no inference or cost-impacting API
  request was made.
- Koder-pattern remains delivery-first; SDK Queue `#002` is still unauthorized
  unless a separate execution window is explicitly opened.

## Future

- Restart Pi from this repository and smoke-check one positive, one near-miss,
  and one cross-module `threejs-graphics` route; keep upstream runtime examples
  omitted unless a separate permission and license review authorizes them.
- Run `/quit`, then `source ~/dotfiles/pi-modes.zsh` and `pi-zyt -c`; open
  `/model`, switch to the scoped tab, and verify the three Anthropic entries
  alongside Foundry/Sakana. Decide later whether to add Haiku/Opus 5 aliases or
  broaden to all 15 Anthropic catalog entries.
- Make a paid Anthropic inference check only if explicitly requested; metadata
  and authentication-presence checks already pass offline.
- On the next authorized queue, measure product, quality, process, worker-count,
  and wall-time deltas; fix Harnex completion and receipt-authority defects in
  its own repository rather than masking them with orchestration phases.
