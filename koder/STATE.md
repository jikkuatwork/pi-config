---
updated_at: "12 Jul 2026 | 04:13 PM IST"
---

# Koder State

## Past

- Session handoffs and koder durable memory are active; `koder/STATE.md` is the compact narrative while grepable `state:` commits record semantic movement.
- Local skills use tiny front doors with routed references; open/close enforce live Git facts, reviewed commits, and a verified clean close.
- Harnex dispatch guidance now prefers native work-terminal watches and typed artifact sidecars while keeping plain-text `koder/` artifacts canonical.
- Designed a portable, opt-in context-rotation protocol: only explicit long queue drains may use it; the model chooses semantic boundaries, completes `close`, then a harness capability may reset and optionally run `open`. Unsupported Codex/Claude harnesses simply continue.
- Audited Holm blind orchestration. Q089's two entries produced 53 worker dispatches and a growing Markdown run log, showing that implementation blindness alone does not keep the primary context light.
- Converged on an event-thin direction: a durable conductor handles mechanics, fresh entry captains own bounded chains, and the primary governor sees only compact terminal receipts or exceptions.
- Filed Harnex #54 and #55 in `/home/glasscube/Projects/harnex` at `262f55e`: active context-window high-water telemetry and logical primary-orchestrator/queue-tax telemetry.

## Present

- Pi branch `master` has no code/config changes; this close updates only the durable handoff.
- Harnex branch `main` is clean at `262f55e state: file #54 and #55 from pi - capture orchestration telemetry`.
- Pi RPC exposes `contextUsage`, but Harnex currently drops it; interactive primary sessions also sit outside child-dispatch usage telemetry.
- An autonomous Harnex implementation/release/install prompt is available at `/tmp/harnex-54-55-autonomous.md` and was supplied in chat.
- This repo has no root test/build harness; validation was source/docs review, YAML frontmatter parsing for both Harnex issues, and `git diff --check`.

## Future

- User will run the autonomous prompt in Harnex to resolve #54/#55, publish the next release, push/tag it, install the gem locally, and verify the installed binary.
- On return, verify the released telemetry surfaces before refining the portable rotation skill and optional Pi extension.
- Then converge and file the separate event-thin queue-conductor/entry-captain issue; telemetry should measure the baseline before orchestration policy changes.
- Keep rotation default-off and advisory: model-selected clean boundaries, optional small temp capsule, successful `close`, capability-gated reset, and canonical-state-first `open`.
- Retain native compaction/normal continuation when reset capability is absent; never simulate resets with shell process tricks from portable skills.
