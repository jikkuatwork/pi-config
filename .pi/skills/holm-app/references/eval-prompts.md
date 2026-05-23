---
title: Holm App Skill Eval Prompts
updated: 2026-05-23
holm_version: 0.119.3
holm_source_commit: de9e73f4
---

# Holm App Skill Eval Prompts

Use these prompts when checking trigger boundaries and output quality for the `holm-app` skill.

## Should trigger

1. "Build me a new Holm app from Zippy for a small team issue tracker. It needs login, comments, realtime updates, a CLI walkthrough, and a deploy plan for @prod."
2. "I copied `knowledge-base/skills/app/recipes/zippy`; help me prune it into a simple guestbook and update `api/main.js`, `manifest.json`, BFBB deploy commands, and route tests."
3. "Add a native Holm app agent under `private/agents/reviewer` that can receive messages and remember review notes."
4. "Review this Holm app's `api/main.js` and tell me whether it follows the current ESM runtime/storage/auth patterns."
5. "Make this Zippy-derived app BFBB-compatible again; it currently only works after `npm run build`."
6. "Design a Holm app with member-private uploads, blob links, and async AI jobs, then give me the route contract and deploy plan."

## Should not trigger

1. "Optimize the Go implementation of Holm's deploy handler and add migration tests." Use Holm repo workflow and likely `golang-pro`, not this app-builder skill.
2. "Create a generic Vue dashboard that will deploy on Vercel." No Holm runtime or deploy target.
3. "Provision a VPS and install Holm in production." This is operations/infrastructure, not app building.
4. "Explain how Go interfaces work." Use `golang-pro` or generic help.
5. "Install npm packages and redesign a generic Tailwind component library." Do not trigger unless tied to a Holm/Zippy app.

## Edge cases

- User asks to deploy: prepare commands, but ask before running live `holm app deploy`, `holm restart`, `holm upgrade`, secret/provider writes, member/user/schedule mutations, or app removal.
- User wants `private/agents/*`: remind that `private/` is excluded unless `--include-private` is used; inspect it first.
- User asks for fastest prototype: still keep BFBB raw deploy working unless explicitly told to make build-only output.
- User asks about npm dependency: say npm is optional for Vite dev/build/test wrappers; raw BFBB must not require npm install/build.
- User asks for private user data: require `holm.app.member.*`, not shared keys by user ID.
- Holm docs conflict: read the live source repo and follow source over this skill.

## Output quality checklist

- [x] App-shape summary and starting point.
- [x] BFBB/raw compatibility statement and optional npm/tooling distinction.
- [x] Route contract, data model/storage scope, auth matrix, realtime map for serious apps.
- [x] UI state checklist or summary for generated app surfaces.
- [x] Validation commands, including CLI-walkable checks where available.
- [x] Deploy commands with exact host routes and clear run/not-run status.
- [x] Permission gates for package installs and live Holm mutations.

## Trigger correctness checklist

- [x] At least two should-trigger prompts.
- [x] At least two should-not-trigger near-miss prompts.
- [x] Description names specific triggers: Holm app, Zippy, BFBB, `api/main.js`, auth/storage/realtime/agents/deploy.
- [x] Scope limits exclude Holm binary internals and generic frontend/Go work.
- [x] Edge cases cover private files, npm, live deploys, member-private storage, and source drift.
