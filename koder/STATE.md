---
updated_at: "05 Jun 2026 | 06:55 PM IST"
---

# Koder State

## Past

- Session handoff open/close flow is active; `koder/STATE.md` remains source-of-truth.
- Earlier durable work includes kodemachine design issue `koder/issues/001_kodemachine_namespaced_resources_and_storage_vm/INDEX.md` and Framework7 research scaffold under `koder/research/002_framework7_docs/`.
- The global `koder-pattern` skill was refactored into a thin router with split reference leaves for artifacts, queues, harnex, shared safety/model guidance, and meta evals.
- This session taught `koder-pattern` how to bootstrap itself into a repo: git init, repo handoff files, project-local `/skill:open` and `/skill:close`, `koder/STATE.md`, validation, and close commit.

## Present

- Source for the global `koder-pattern` install is `.pi/skills/koder-pattern/`; `~/.pi/agent/skills/koder-pattern` points there.
- The skill is now visible to model invocation for setup/artifact requests; ordinary code work should not trigger it.
- Repo has no root test/build harness; validation is manual/documentation-based unless a target repo defines checks.

## Future

- Use `/skill:koder-pattern` or natural language setup/artifact requests to exercise the new setup route.
- If trigger behavior is too broad, narrow the `SKILL.md` description rather than restoring slash-only mode by default.
- Continue keeping project-local skills reviewed and source-controlled under `.pi/skills/`.
