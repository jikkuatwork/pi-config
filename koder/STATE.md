---
updated_at: "29 Sep 2026 | 05:21 PM IST"
---

# Koder State

## Past

- 29 Sep 2026: `289684a` enabled direct Anthropic Opus 5.5, Sonnet 5.5,
  and Fable 5.1. It also committed owner-approved pre-existing Astra/max,
  OpenRouter Opus 5.5, and Baseten model selections. Default documentation now
  agrees with source/runtime; README records OAuth, billing, usage, and Harnex.
- Sep 2026: `ef3ba56` routed Astra through Foundry and narrowed the picker;
  `74cafb0` pinned OpenRouter to Chat Completions at `/api/v1` after catalog
  drift caused HTML 404s. Earlier live route checks passed; none ran this session.
- Sep 2026: global `secret-output-guard` redacts credential output, broad
  environment dumps, replay, and provider payloads. `ba5c31a` preserves opaque
  provider cryptography and omits damaged legacy reasoning blocks. Seven offline
  tests and recovery probes passed when shipped; the affected session was cleaned.
- Sep 2026: adopted docs-only Fal guidance and the reviewed local Archify
  renderer. Fal has not had a paid trial; Graphily's offline fork remains paused
  pending permission to run third-party dependencies/tests.
- Aug 2026: established portable versioned Pi config, generated writable runtime
  files, reviewed skill links, and durable koder/Harnex workflow guidance.

## Present

- Canonical default is `foundry-zyt/gpt-6-astra:max`. Astra retains 1,050,000
  context, 32,768 output, and 180,000 reserve (compaction above 870K). Pricing
  and retry/compaction policy were not changed in this session.
- All 19 enabled model patterns resolve in the offline authenticated catalog.
  JSON/diff checks, script syntax, runtime equality, credential hygiene, and
  idempotent `install.sh --sync` pass. Auth remains private and unchanged.
- Direct models: `anthropic/claude-opus-5-5`, `anthropic/claude-sonnet-5-5`,
  and `anthropic/claude-fable-5-1`. Offline credential checks report
  Anthropic OAuth ready; no custom provider or extra API key was added.
- Billing caveat: Pi 0.87.1 warns that third-party subscription login draws paid
  Extra Usage, not included Claude plan allowance. No Anthropic inference,
  dispatch, account-spend lookup, or paid test was performed.
- Harnex 0.14.0 / Pi 0.87.1 pass `harnex doctor --adapter pi`. Installed source
  confirms exact `--model` / `--effort` become verified Pi startup controls.
  Pure checks covered all three Anthropic models and reject provider mismatch;
  this is static compatibility evidence, not a live Anthropic dispatch test.
- Harnex Pi workers can reuse OAuth under the same local user/agent directory.
  Use visible matching `--id` / `--tmux`, bounded briefs, explicit project trust,
  runtime budgets, and receipt/artifact verification. Never copy credentials
  into briefs, repositories, or dispatch metadata.
- Koder-pattern automatic-dispatch policy remains GPT-family by default.
  Claude workers require explicit owner-approved queue `dispatch_models`;
  enabling picker entries does not authorize automatic use or change that policy.
- `/session` shows tokens/cache/estimated costs and multi-model breakdowns;
  footer percentages measure context fullness, not plan quota. Harnex receipts
  provide worker telemetry, not billing proof. Actual account usage is at
  `https://claude.ai/settings/usage`.
- Runtime settings/models are generated files matching source. Extension/skill
  links retain their targets; sync ran no skill code. Repo-owned open/close stay
  local; reusable imports follow the canonical skill-home policy.
- OpenRouter Fable 5/5.1 and Opus 5/5.5 remain enabled. The route pin remains;
  Fable 5.1 retains its practical 32K output cap.
- SDK Queue `#002` remains unauthorized. Its prior handoff cites Harnex
  `#57`/`#59`; recheck live blocker status before considering a future run.
- Graphily work was not resumed: dependency installation, tests, graph update,
  and browser visual evidence still require the paused workflow's approvals.

## Future

- Restart Pi to load the saved Anthropic scope; choose `[anthropic]`, not
  `[openrouter]`, for OAuth. Do not assume included subscription allowance.
- Before any automatic Claude worker, obtain queue-specific model/spend approval
  and a bounded visible preflight dispatch. No global dispatch-policy change or
  live Anthropic smoke was authorized by this configuration task.
- Monitor normal Astra usage for throttling and long-context cost; no new probe
  ran. Keep the OpenRouter route pin until catalog/composer behavior is verified.
- Run a controlled Fal H3 Max trial from `movie_planet` only with explicit
  approval, validating output and actual uncached before/after accounting.
- Resume Graphily only with third-party execution approval: frozen dependency
  sync, targeted/full tests, then graph update; decide fail-closed offline mode
  and removal of automatic skill install/upgrade behavior.
- Promote or visually retest skills only when requested; file authorized runner
  defects in Harnex rather than adding workarounds here.
