# Holm App Skill Eval Prompts

Use these prompts when checking trigger boundaries and output quality for the `holm-app` skill.

## Should trigger

1. "Build me a new Holm app from Zippy for a small team issue tracker. It needs login, comments, realtime updates, and a deploy plan for @prod."
2. "I copied `knowledge-base/skills/app/recipes/zippy`; help me prune it into a simple guestbook and update `api/main.js`, `manifest.json`, and the deploy commands."
3. "Add a native Holm app agent under `private/agents/reviewer` that can receive messages and remember review notes."
4. "Review this Holm app's `api/main.js` and tell me whether it follows the current ESM runtime/storage/auth patterns."

## Should not trigger

1. "Optimize the Go implementation of Holm's deploy handler and add migration tests." Use Holm repo workflow and likely `golang-pro`, not this app-builder skill.
2. "Create a generic Vue dashboard that will deploy on Vercel." No Holm runtime or deploy target.
3. "Provision a VPS and install Holm in production." This is operations/infrastructure, not app building.
4. "Explain how Go interfaces work." Use `golang-pro` or generic help.

## Edge cases

- User asks to deploy: prepare commands, but ask before running live `holm app deploy`, `holm restart`, `holm upgrade`, or secret/provider writes.
- User wants `private/agents/*`: remind that `private/` is excluded unless `--include-private` is used.
- User asks for fastest prototype: still keep BFBB raw deploy working unless explicitly told to make build-only output.
- Holm docs conflict: read the live source repo and follow source over this skill.

## Checklist

- [x] At least two should-trigger prompts.
- [x] At least two should-not-trigger prompts.
- [x] Description names specific triggers: Holm app, Zippy, BFBB, `api/main.js`, deploy.
- [x] Output contract includes app shape, file changes, validation, and deploy status.
- [x] Scope limits exclude Holm binary internals and generic frontend/Go work.
- [x] Edge cases cover private files, live deploys, and source drift.
