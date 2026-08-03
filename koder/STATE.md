---
updated_at: "03 Aug 2026 | 10:45 PM IST"
---

# Koder State

## Past

- 03 Aug 2026: commit `f845dae` back-ported Holm's close-time scratch invariant
  into koder-pattern: future `init` scaffolds receive an executable fail-closed
  gate, JSONL retention ledger contract, active/specific/latest-TTL precedence,
  and two-way contract v1. New smoke coverage and a real temporary-repo `init`
  proof passed.
- 03 Aug 2026: reviewed `davidondrej/skills` (MIT, ~3.1k stars) and vendored two
docs-only skills under `.pi/skills/` (`write-skill` = effective-agent-skills authoring
reference; `git-worktree` = parallel-agent worktree mechanism, as-is). Skipped
`pi-custom-model` as redundant (pattern already implemented), and tool-bound
DeepAPI/cmux/herdr/etc. as inapplicable.
- 03 Aug 2026: commit `3cbb987` made `.pi/settings.json` the shared
  model-cycle authority for primary `pi` and `pi-zyt`: three Foundry GPT-5.6,
  three Anthropic, three Sakana, and one curated OpenRouter DeepSeek model.
  Dotfiles commit `7db28d0` removed the launcher's `--models` override; commands
  commits `45ce696`/`40722a6` bridge the existing OpenRouter environment key to
  a dedicated alias without storing it.
- 03 Aug 2026: commit `e37b5a5` aligned koder-pattern dispatch guidance with
  the then-current Harnex 0.9.0 v2 telemetry: tracked
  `.harnex/dispatch.jsonl` is canonical and observed Git/usage/list-price cost
  belongs to Harnex. Concurrent commit `39adc0a` then recorded Harnex 0.10.0's
  removal of `--summary-out`; a second telemetry destination now hard-errors.
- 31 Jul 2026: commit `2e6995e` adapted
  `scottstts/Threejs-Awesome-Graphics-Agent-Skills` into the docs-only
  `.pi/skills/threejs-graphics/` umbrella with 23 topic modules and 27 deep
  references; installers, scripts, runtime examples, and binaries were omitted.
- 15 Jul 2026: SDK Queue `#002` review consolidated koder-pattern around
  delivery-first direct/blind orchestration, one mode-selection authority,
  queue-global failure budgets, adapter preflight, and Harnex-owned receipts.
- Session handoffs and routed cross-harness skills are active. `state:` history
  remains reserved for sparse operator milestones.

## Present

- Koder-pattern contract v1 is canonical at
  `.pi/skills/koder-pattern/references/meta/pattern-contract.md`; Holm is its
  reference consumer with explicit deviations.
- The `init` scaffold installs and `doctor` validates
  `koder/skills/close/bin/scratch-invariant.sh`; dedicated and cross-harness
  smoke tests are green.
- The scoped resolver returns exactly ten models with zero diagnostics. The
  isolated `openrouter-deepseek` provider exposes only
  `~deepseek/deepseek-v4-flash-latest`, avoiding the full OpenRouter catalog and
  proxy duplicates.
- User-local `~/.pi/agent/models.json` references
  `PI_OPENROUTER_API_KEY`; the standard key is bridged then scrubbed by the
  committed `~/commands/pi` wrapper. No credential value entered any repo.
- OpenRouter's live catalog contained the requested literal `~` alias and its
  authentication endpoint returned HTTP 200. No paid inference was performed.
- This running Pi process predates the final settings/launcher changes; reload
  the zsh function and restart before judging `/model` or `Ctrl+P`.
- `threejs-graphics` is discoverable in a fresh Pi process; its positive,
  near-miss, and cross-module routing smoke checks remain outstanding.
- Koder-pattern remains delivery-first. SDK Queue `#002` is unauthorized, and
  runner-dependent guidance still waits for Harnex `#57`/`#59`.

## Future

- Run `/quit`, then `source ~/dotfiles/pi-modes.zsh` and `pi-zyt -c`; verify the
  ten-entry scoped model list in `/model` and through `Ctrl+P`.
- In a fresh Pi process, smoke-check routing for the imported skills:
  `write-skill` vs `create-skill` (differentiator held), and `git-worktree` vs
  `koder-pattern` (mechanism vs policy). Decide whether `git-worktree` should be
  folded into `koder-pattern` as a `references/modules/` guide instead of
  standing alone.
- Make a paid DeepSeek or Anthropic inference check only if explicitly desired;
  configuration, catalog, scope, and authentication checks already pass.
- Smoke-check positive, near-miss, and cross-module `threejs-graphics` routing.
- On the next authorized queue, measure product, quality, process, worker-count,
  and wall-time deltas; move runner defects to Harnex rather than masking them.
