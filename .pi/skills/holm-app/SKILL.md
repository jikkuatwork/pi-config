---
name: holm-app
description: Build, modify, validate, and deploy Holm apps from Zippy with BFBB/raw compatibility, CLI-walkable route contracts, ESM api/main.js, auth/storage/realtime/tasks/agents, and current holm app deploy commands. Use for holm-app, Zippy scaffold, BFBB, Holm serverless/runtime/storage/auth/realtime/agents, or app deployment work.
updated: 2026-05-23
holm_version: 0.119.3
metadata:
  domain: holm
  role: app-builder
  source-repo: /home/glasscube/Projects/holmhq/holm/master
  source-version-reviewed: 0.119.3
  source-commit-reviewed: de9e73f4
---

# Holm App

## Purpose

Build production-shaped Holm apps from the current Holm runtime contract. Zippy is the preferred full-stack starting point, BFBB/raw is the primary deploy posture, and serious apps must be CLI-walkable so their behavior can be proven without a browser.

## Use when

- Creating, scaffolding, pruning, or reviewing a `holm-app`.
- Using the Zippy boilerplate under the Holm repo.
- Editing `manifest.json`, `index.html`, `src/`, `api/main.js`, `api/routes/*`, `private/`, or `private/agents/*`.
- Implementing Holm app storage, auth, member-private data, realtime, uploads, blob links, tasks, AI, egress, private files, or native agents.
- Preparing or reviewing `holm app deploy`, exact host routes, app validation, CLI walkthroughs, or BFBB/raw deploys.

## Do not use when

- Working on Holm's Go binary, CLI internals, migrations, SDK implementation, or platform bugs rather than an app using Holm.
- Doing generic Vue/React/frontend work with no Holm runtime or deploy target.
- Doing generic Go work; use `golang-pro` instead.
- Managing cloud/VPS/node infrastructure around a Holm node; follow that repo's ops policy first.

## Inputs expected

- App goal, target directory, target host/peer if deployment is requested.
- Required surfaces: static pages, `/api/*`, auth, roles, storage, realtime, uploads, tasks/AI, agents, private files, operator scripts.
- Whether the app must be a showcase/reference app or a pruned product app.
- Permission before mutating commands: scaffold copy/overwrite, package installs, deploys, restarts/upgrades, secret/provider writes, member/user/schedule changes, or app removal.

## Workflow

1. **Load current context** — Read `../../../HOLM.md`, then this skill's relevant references. For real app generation or deploy work, also read live Holm docs first: `/home/glasscube/Projects/holmhq/holm/master/knowledge-base/skills/app/SKILL.md`, `checklist.md`, `recipes/zippy/README.md`, `references/cli-walkable-apps.md`, and `knowledge-base/agent-context/app-runtime.md`. Trust live source over cached notes.
2. **Classify app shape** — Static-only vs SPA/full-stack; decide `api/main.js`, storage scopes, auth/roles, realtime channels, uploads/blob links, slow work/tasks, AI, agents, and whether `private/` ships.
3. **Design the contract before coding** — For serious apps, sketch route contracts, data model/storage scope, auth matrix, realtime channels, async job state, CLI/headless checks, and deploy targets.
4. **Start from the right source** — Use Zippy for full apps; use minimal Holm templates only for tiny examples. Copy/rename/prune rather than inventing a parallel convention.
5. **Keep BFBB intact** — Primary app must run raw without `npm install`, a build step, or public runtime CDN dependencies. npm/Vite are optional build/dev/test conveniences only; the built `dist/` mirror must never be the only working path.
6. **Implement current runtime style** — New server code uses ESM `export default async function handler(request)`, relative imports under `api/`, and `holm.*` namespaces. Do not assume Node built-ins or arbitrary npm imports in serverless code.
7. **Make behavior CLI-walkable** — Every meaningful UI action maps to an API route, durable state/task ID, status/result/log route where needed, and a `holm test run`/curl/script check.
8. **Verify locally** — Run API syntax checks, app-specific walkthrough script, build checks when needed, and runtime smoke checks where possible. Prefer direct scripts (`bash scripts/cli-walkthrough.sh`) over making npm required.
9. **Prepare deploy** — Use `@peer`, exact `--host <fqdn>`, `--spa`, and `--no-build`; deploy `private/` only with `--include-private` after inspecting it.

## Output contract

When acting as this skill, provide:

- App-shape summary and chosen starting point.
- BFBB/raw compatibility notes and any npm/build usage clearly marked optional.
- Route/state/auth/realtime/async contract summary for non-trivial apps.
- Files changed or scaffolded.
- Runtime/storage/auth/realtime choices made, including shared vs member-private storage.
- UI states covered: loading, empty, error, signed-out/forbidden, success, mobile/responsive where relevant.
- Validation commands run and results, including CLI-walkable checks when available.
- Deploy commands prepared; clearly say whether they were run.
- Any permission needed before mutating a Holm node, installing packages, writing secrets/providers, or changing members/schedules.

## Reference guide

| Topic | Reference | Load when |
| --- | --- | --- |
| Holm inventory | `references/holm-inventory.md` | First use, source refreshes, feature coverage, or replacing root `HOLM.md` context |
| Holm mental model | `references/holm-overview.md` | Explaining Holm or choosing app fit |
| Zippy boilerplate | `references/zippy-boilerplate.md` | New app scaffolds or visual/full-stack app work |
| App quality/contracts | `references/app-quality-and-contracts.md` | Any serious app, production handoff, or audit |
| Runtime/storage/auth | `references/runtime-and-storage.md` | `api/main.js`, `holm.*`, auth, storage, realtime, tasks, AI, uploads |
| Deploy/verify | `references/deployment.md` | Validation, deploys, host routes, private files, logs, or no-browser walkthroughs |
| Native agents | `references/agents.md` | App ships `private/agents/*` or uses agent runtime patterns |
| Eval prompts | `references/eval-prompts.md` | Reviewing trigger boundaries or improving the skill |

## Hard rules

- No npm dependency for the primary BFBB/raw app. Do not make `npm install`, `npm run build`, or public CDN runtime assets required for the primary deploy.
- Ask before package installs, live deploys, upgrades, restarts, secret/provider writes, member/user/schedule changes, or app removal.
- Do not use removed deploy patterns: no `--to`, `--name`, `--alias`, or legacy alias routing for new deploys.
- Do not put secrets in app source, skills, `HOLM.md`, or command output. Use Holm secret/provider surfaces and redact values.
- Do not assume `private/` is deployed; it requires `--include-private` and should be intentional.
- If data is private to one member, use `holm.app.member.*`; do not emulate privacy with shared keys like `prefs:${user.id}` unless the data is intentionally admin/shared-readable.
- Prune Zippy demos and example agents unless the user explicitly wants a showcase/reference app.
- Do not patch around a Holm platform bug inside each app if the source repo should be fixed instead.
