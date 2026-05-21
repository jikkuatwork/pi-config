---
name: holm-app
description: Build, modify, validate, and deploy Holm apps using the current Holm app runtime and the Zippy boilerplate. Use when the user asks for a holm-app, Zippy scaffold, Holm app manifest/api/main.js work, BFBB/raw deploys, Holm storage/auth/realtime/agents, or Holm app deployment commands.
metadata:
  domain: holm
  role: app-builder
  source-repo: /home/glasscube/Projects/holmhq/holm/master
  source-version-reviewed: 0.119.3
---

# Holm App

## Purpose

Build production-shaped Holm apps from the current Holm runtime contract, with Zippy as the preferred full-stack boilerplate and BFBB as the default deploy posture.

## Use when

- Creating, scaffolding, or pruning a `holm-app`.
- Using the Zippy boilerplate under the Holm repo.
- Editing a Holm app's `manifest.json`, `index.html`, `src/`, `api/main.js`, or `private/agents/`.
- Implementing Holm app storage, auth, realtime, tasks, AI, uploads, blob links, or app agents.
- Preparing or reviewing `holm app deploy`, host-route, or app validation commands.

## Do not use when

- Working on Holm's Go binary, CLI internals, migrations, or SDK implementation rather than an app using Holm.
- Doing generic Vue/React/frontend work with no Holm runtime or deploy target.
- Doing generic Go work; use `golang-pro` instead.
- Managing cloud infrastructure around a Holm node; follow that repo's ops policy first.

## Inputs expected

- App goal and target directory.
- Whether the app needs static pages, `/api/*`, auth, storage, realtime, uploads, background tasks, AI, or agents.
- Target peer/host only if deployment is requested.
- Permission before running mutating commands (`cp`/`rsync` scaffold, package installs, deploys, restarts, upgrades, secret writes).

## Workflow

1. **Load context** — Read `../../../HOLM.md`, then the relevant references below. If runtime/deploy details matter, prefer the live Holm source at `/home/glasscube/Projects/holmhq/holm/master` over this cached skill.
2. **Classify app shape** — Decide static-only vs SPA, whether `api/main.js` is needed, which storage scope is correct, and whether `private/`/agents must ship.
3. **Start from the right source** — Use Zippy for full apps; use minimal Holm templates only for tiny examples. Copy, rename, then prune rather than inventing a parallel convention.
4. **Keep BFBB intact** — Primary app must run raw without `npm install`, a build step, or public CDN runtime dependencies. Vite/build output is a mirror, not the only working path.
5. **Implement current runtime style** — New server code uses ESM `export default async function handler(request)`, relative imports under `api/`, and `holm.*` namespaces.
6. **Verify locally** — Run syntax checks for API modules, build checks when package scripts exist, and runtime smoke checks where possible.
7. **Prepare deploy** — Use `@peer`, exact `--host <fqdn>`, `--spa`, and `--no-build`; include `private/` only with `--include-private`.

## Output contract

When acting as this skill, provide:

- App-shape summary and chosen starting point.
- Files changed or scaffolded.
- Runtime/storage/auth/realtime choices made.
- Validation commands run and results.
- Deploy commands prepared; clearly say whether they were run.
- Any permission needed before mutating a Holm node or installing dependencies.

## Reference guide

| Topic | Reference | Load when |
| --- | --- | --- |
| Holm mental model | `references/holm-overview.md` | First use, explaining Holm, or choosing app fit |
| Zippy boilerplate | `references/zippy-boilerplate.md` | New app scaffolds or visual/full-stack app work |
| Runtime/storage/auth | `references/runtime-and-storage.md` | `api/main.js`, `holm.*`, auth, storage, realtime, tasks, AI, uploads |
| Deploy/verify | `references/deployment.md` | Preparing validation, deploys, host routes, private files, or logs |
| Native agents | `references/agents.md` | App ships `private/agents/*` or uses agent runtime patterns |
| Eval prompts | `references/eval-prompts.md` | Reviewing trigger boundaries or improving the skill |

## Hard rules

- Do not use removed deploy patterns: no `--to`, `--name`, `--alias`, or legacy alias routing for new deploys.
- Do not put secrets in app source, skills, `HOLM.md`, or command output. Use Holm secret/provider surfaces and redact values.
- Do not assume `private/` is deployed; it requires `--include-private` and should be intentional.
- Do not patch around a Holm platform bug inside each app if the source repo should be fixed instead.
- Ask before deploying, upgrading, restarting, writing secrets, or running package installs.
