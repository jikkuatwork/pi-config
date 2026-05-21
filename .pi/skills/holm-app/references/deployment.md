# Deployment And Verification

Read live source docs when in doubt:

- `/home/glasscube/Projects/holmhq/holm/master/internal/help/cli/app/deploy.md`
- `/home/glasscube/Projects/holmhq/holm/master/knowledge-base/skills/app/holm/deployment.md`
- `/home/glasscube/Projects/holmhq/holm/master/docs/reference/cli.md`

Ask before running commands that mutate a Holm node, deploy an app, restart/upgrade services, install packages, or write secrets.

## Current deploy shape

Use `@peer` to choose the target node:

```bash
holm app deploy ./app                       # local/default peer
holm @prod app deploy ./app --host app.example.com --spa --no-build
```

Current important flags:

- `--host <fqdn>` — bind an exact full-FQDN host route.
- `--spa` — clean URL fallback to `index.html`.
- `--no-build` — deploy source as-is and skip package-manager build detection.
- `--include-private` — include gitignored `private/` in the deploy.
- `--system` — protected system app flag.
- `--force` — overwrite/redeploy an existing target.
- `--from-json <file|->` — deploy a scripted file map.

Do not use removed patterns:

```bash
# wrong for current Holm
holm app deploy ./app --to prod
holm app deploy ./app --name app
holm app deploy ./app --alias app
```

## BFBB primary deploy

For Zippy-style apps, primary deploy should be raw/source-hosted:

```bash
holm @prod app deploy . \
  --host app.example.com \
  --spa \
  --no-build \
  --force
```

This preserves BFBB: the app works without `npm install`, `npm run build`, or public runtime CDNs.

## Built mirror

If a build path exists, verify and deploy it as a mirror, not as the only working path:

```bash
npm run build
holm @prod app deploy dist \
  --host app-built.example.com \
  --spa \
  --no-build \
  --force
```

Zippy's build script copies `api/`, `vendor/`, `manifest.json`, and key assets into `dist/` after Vite builds.

## Host routes

Deploying with `--host` binds the returned app to that exact FQDN. For blue/green or inspection-first deploys, deploy hostless and bind/retarget later:

```bash
holm @prod app deploy . --spa --no-build
holm @prod host add app.example.com --app <app_id>
holm @prod host update app.example.com --app <app_id> --force
```

If `--force` against an existing host redeploys the app behind that host, Holm may warn you to deploy hostless then `host update` when you wanted to move only the route.

## Private files

`private/` is special:

- It may be gitignored.
- It is excluded from deploy unless `--include-private` is set.
- Use it for server-only files and native agents, not public assets.

```bash
holm @prod app deploy . --host app.example.com --spa --no-build --include-private
```

Before using `--include-private`, inspect contents and ensure no secrets are being committed or printed. Prefer Holm secret/provider surfaces for actual secrets.

## Validation flow

From the app root:

```bash
# server ESM syntax
find api -name '*.js' -exec node --check {} \;

# build path, if package.json has build script
npm run build

# manifest/static shape; useful but can lag current split ESM support
holm app validate .

# runtime-ish serverless smoke
holm test run api/main.js /api/hello
holm test run api/main.js /api/me -u alice@example.com
```

`holm app validate` may parse API files through an older script-style path. For split ESM modules, `node --check`, successful build, and deployed/runtime smoke tests are stronger signals.

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

## Package installs

Zippy includes `package.json` and `package-lock.json` for the built/HMR path. Installing packages is optional for BFBB raw deploys. Ask before running:

```bash
npm install
npm run dev
npm run build
```

Never make package install or build a prerequisite for the primary raw deploy unless the user intentionally drops BFBB.
