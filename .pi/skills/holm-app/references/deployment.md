---
title: Deployment And Verification
updated: 2026-05-23
holm_version: 0.119.3
holm_source_commit: de9e73f4
---

# Deployment And Verification

Read live source docs when in doubt:

- `/home/glasscube/Projects/holmhq/holm/master/internal/help/cli/app/deploy.md`
- `/home/glasscube/Projects/holmhq/holm/master/knowledge-base/skills/app/holm/deployment.md`
- `/home/glasscube/Projects/holmhq/holm/master/docs/reference/cli.md`

Ask before running commands that mutate a Holm node, deploy an app, restart/upgrade services, install packages, write secrets/providers, change members/users/schedules, or remove apps.

## Current deploy shape

Use `@peer` to choose the target node:

```bash
holm app deploy ./app
holm @prod app deploy ./app --host app.example.com --spa --no-build
```

Important flags:

- `--host <fqdn>` — bind an exact full-FQDN host route.
- `--spa` — clean URL fallback to `index.html`.
- `--no-build` — deploy source as-is and skip package-manager build detection.
- `--include-private` — include gitignored/private files such as `private/agents/*`.
- `--system` — protected system app flag.
- `--force` — overwrite/redeploy an existing target.
- `--from-json <file|->` — deploy a scripted file map.

Do not use removed patterns:

```bash
holm app deploy ./app --to prod      # wrong
holm app deploy ./app --name app     # wrong
holm app deploy ./app --alias app    # wrong
```

## BFBB primary deploy

For Zippy-style apps, primary deploy is raw/source-hosted:

```bash
holm @prod app deploy . \
  --host app.example.com \
  --spa \
  --no-build \
  --force
```

This preserves BFBB: the app works without `npm install`, `npm run build`, or public runtime CDNs.

## Optional built mirror

If a build path exists, verify and deploy it as a mirror, not as the only working path:

```bash
npm run build
holm @prod app deploy dist \
  --host app-built.example.com \
  --spa \
  --no-build \
  --force
```

The built mirror keeps Vite/tooling honest. It should not be required for the primary app to render or operate.

## npm policy

- No npm install/build requirement for the primary raw app.
- `npm install` is a package install and needs permission.
- `npm run build` is optional validation/build output; run it only when the app intentionally keeps build tooling.
- `npm test` is acceptable only as a wrapper/convenience; serious app docs should also show direct `bash scripts/cli-walkthrough.sh` or `holm test run` commands.

## Host routes and blue/green

Deploying with `--host` binds/redeploys behind that exact FQDN.

For inspection-first or blue/green:

```bash
holm @prod app deploy . --spa --no-build
holm @prod host add app.example.com --app <app_id>
holm @prod host update app.example.com --app <app_id> --force
```

If `--force` against an existing host warns about replacing the app behind the host, deploy hostless and retarget with `host update` when you only wanted to move the route.

## Private files

`private/` is special:

- it may be gitignored
- it is excluded unless `--include-private` is set
- it is for server-only files and native agents, not public assets

```bash
holm @prod app deploy . \
  --host app.example.com \
  --spa \
  --no-build \
  --include-private
```

Before `--include-private`, inspect contents and ensure no plaintext secrets are included. Prefer Holm secret/provider surfaces for secrets.

## Validation flow

From the app root:

```bash
# server ESM syntax
find api -name '*.js' -exec node --check {} \;

# app walkthrough if present; no browser required
bash scripts/cli-walkthrough.sh

# runtime-ish serverless smoke
holm test run api/main.js /api/hello
holm test run api/main.js /api/me -u alice@example.com
```

For realtime/collaboration apps, `holm test run` proves API state transitions but not connected WebSocket delivery. Also run or document a local/deployed two-client WebSocket smoke that subscribes, mutates through the API, observes compact events, reconnects, and reconciles through an authorized state route.

If optional npm/build tooling is intentionally present:

```bash
npm test       # only if it wraps/reuses the direct walkthrough
npm run build  # built mirror validation
```

`holm app validate` is useful for manifest/static shape checks, but it may parse API files through an older script-style path. For split ESM modules, syntax checks, walkthroughs, builds, and runtime smoke tests are stronger signals.

## CLI-walkable smoke target

Serious apps should prove at least:

- health endpoint
- auth/me endpoint with a test member
- one read route
- one write route
- one expected error/unauthorized route
- realtime-adjacent state mutation if applicable
- two-client WebSocket delivery/reconnect smoke when realtime matters
- async job start/status/result if applicable

Prefer temp DB tests for local route proof and deployed curl/SDK smoke for final host proof.

## Logs and day-two checks

```bash
holm @prod status
holm @prod app list
holm @prod app status --id <app_id>
holm @prod app files <app_id>
holm @prod app logs <app_id-or-name> -n 100
holm @prod app logs <app_id-or-name> -f
holm @prod logs
holm @prod activity list --limit 50
```

Use `holm restart` / `holm @prod restart` only with permission.

## Deploy handoff output

When preparing deploys, state clearly:

- target peer and host
- raw deploy command
- optional built mirror command
- whether commands were run
- whether `private/` is included and why
- validation commands and results
- realtime smoke status when applicable
- rollback/retarget command when relevant
