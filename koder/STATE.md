---
updated_at: "14 Jul 2026 | 11:52 PM IST"
---

# Koder State

## Past

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
