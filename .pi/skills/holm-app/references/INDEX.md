---
title: Holm App Skill Router
updated: 2026-05-24
holm_version: 0.119.3
holm_source_commit: 3775fd8e
---

# Holm App Skill Router

This skill is self-contained and safe to promote globally. Do not depend on a repo-root `HOLM.md`; read it only when the current project provides one. References below are relative to this directory.

## Scope

Use for Holm apps: Zippy scaffolds, BFBB/raw deploys, `manifest.json`, static/browser files, `api/main.js`, app storage/auth/realtime/tasks/uploads/agents/private files, CLI walkthroughs, and deploy prep.

Do not use for Holm platform internals, generic frontend/Go work, or node/cloud operations unless the task is specifically an app using Holm.

## Load order

1. Load only refs needed by the task.
2. For real app generation or deploy work, also read live Holm app docs from `/home/glasscube/Projects/holmhq/holm/master` when available:
   - `knowledge-base/skills/app/SKILL.md`
   - `knowledge-base/skills/app/checklist.md`
   - `knowledge-base/skills/app/references/app-generation-source.md`
   - `knowledge-base/skills/app/recipes/zippy/README.md`
   - `knowledge-base/skills/app/references/cli-walkable-apps.md`
   - `knowledge-base/agent-context/app-runtime.md`
3. Trust live source over cached notes. If live Zippy/source is dirty or ahead of the reviewed commit, mention it before copying, but do not block when active/WIP source is intentional.

## Reference map

| Need | Read |
| --- | --- |
| First use, feature inventory, source refresh | `holm-inventory.md` |
| Explain Holm or choose app fit | `holm-overview.md` |
| New full-stack app or visual scaffold | `zippy-boilerplate.md` |
| Serious app contracts/handoff/audit | `app-quality-and-contracts.md` |
| Maximal/multi-surface app or single-shot quality pass | `complex-app-single-shot.md` |
| Post-#340 hardening, first-shot gap analysis, maximal stress patterns | `agent-first-shot-hardening.md` |
| Multi-member realtime/collab/chat/presence/boards | `collaboration-production.md` |
| Polished/showcase/production UI/UX | `ui-excellence.md` |
| `api/main.js`, `holm.*`, auth/storage/tasks/uploads | `runtime-and-storage.md` |
| Validation, deploys, logs, host routes | `deployment.md` |
| `private/agents/*` or agent design | `agents.md` |
| Skill trigger/eval review | `eval-prompts.md` |

## Operating defaults

- Prefer Zippy for real full-stack apps; minimal templates only for tiny examples.
- Keep primary app BFBB/raw: no required `npm install`, build step, or public runtime CDN.
- Use ESM `api/main.js`, relative imports under `api/`, browser `createAppClient()`, and current `holm.*` namespaces.
- Make serious apps CLI-walkable: UI action -> API route -> durable state/task ID -> status/result/log route/check.
- Use `holm.app.member.*` for one-member-private data; use app-level membership guards for team/workspace privacy.
- For realtime/collab, realtime is notification, not authorization; use compact events plus authorized reconciliation routes and a two-client smoke path.
- For maximal multi-surface apps, load `complex-app-single-shot.md`, complete its build brief/feature ledger before editing, and pass its readiness gate before saying ready.
- For post-#340 hardening or first-shot failure analysis, also load `agent-first-shot-hardening.md` and look for scope, contract drift, collaboration semantics, security, observability, lifecycle, and manual-proof gaps.
- For serious apps, do not offload basic acceptance testing to the human; self-check requested features, auth UI, settings/theme persistence, durable saves, route links, and privacy probes.
- For polished apps, build the product workflow first and prune stale Zippy demos/agents unless intentionally showcasing.

## Permission gates

Ask before package installs, live deploys, restarts/upgrades, secret/provider writes, member/user/schedule changes, app removal, or other mutating Holm node operations.
