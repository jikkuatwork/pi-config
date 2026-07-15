---
updated_at: "15 Jul 2026 | IST"
---

# Koder State

## Past

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

- `.pi/settings.json` scopes `/model` and `Ctrl+P` to eight entries: current
  Sonnet, Opus, and Fable 5 catalog entries plus all available Azure OpenAI
  GPT-5.5 and GPT-5.6 variants.
- Pi `0.80.7` loads all eight project patterns. The five Azure entries resolve;
  the three Anthropic IDs exist in Pi's installed catalog but were unavailable
  to the current process because it inherited neither Anthropic environment
  variable.
- Validation was metadata-only and offline: no inference or cost-impacting cloud
  request was made.
- Koder-pattern remains delivery-first; SDK Queue `#002` is still unauthorized
  unless a separate execution window is explicitly opened.

## Future

- In the launch shell, map `ANTHROPIC_API_KEY_ORIGINAL` to the standard
  `ANTHROPIC_API_KEY` variable, then restart Pi from this repository.
- Open `/model` and verify the eight-entry scoped view and `Ctrl+P` order; if it
  works, decide whether to retain project-only scope or promote it globally.
- On the next authorized queue, measure product, quality, process, worker-count,
  and wall-time deltas; fix Harnex completion and receipt-authority defects in
  its own repository rather than masking them with orchestration phases.
