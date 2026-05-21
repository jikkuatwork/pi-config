# Zippy Boilerplate

Zippy is the full-stack app recipe in the Holm repo:

```text
/home/glasscube/Projects/holmhq/holm/master/knowledge-base/skills/app/recipes/zippy/
```

Use it as the default starting point for real Holm apps. Use minimal templates only for tiny demos.

## What Zippy gives you

- `manifest.json` with app metadata and `spa: true`.
- `index.html` that supports raw/BFBB mode and built mode.
- `vendor/bfbb/` pinned browser runtime assets so raw deploys do not depend on npm or public CDNs.
- `src/main.bfbb.js` source-hosted Vue SFC bootstrap.
- `src/main.js` Vite/build entrypoint.
- `src/router.js`, layout, components, settings, sounds, icons, auth, realtime, and API helpers.
- `api/main.js` ESM server entry with split route modules under `api/routes/`.
- `api/lib/context.js`, `api/lib/http.js`, and `api/lib/id.js` server helpers.
- Example native agents under `private/agents/`.
- Vite config that strips BFBB-only tags for the built mirror.

## Copy pattern

Ask before running commands that create or overwrite files. Prefer an explicit copy into the user's target app directory:

```bash
HOLM_ROOT=/home/glasscube/Projects/holmhq/holm/master
APP_ROOT=/path/to/new-app

mkdir -p "$APP_ROOT"
rsync -a \
  --exclude node_modules \
  --exclude dist \
  "$HOLM_ROOT/knowledge-base/skills/app/recipes/zippy/" \
  "$APP_ROOT/"
```

There is also a Holm repo helper:

```bash
/home/glasscube/Projects/holmhq/holm/master/scripts/create-holm-app.sh <name> [--recipe zippy] [--peer local]
```

Use that script only with explicit permission; it writes under the Holm repo's `servers/<peer>/<name>/` tree and renames identifiers.

## Rename checklist

After copying Zippy:

- `manifest.json`: update `name`, `description`, visual metadata, tags, and capabilities if needed.
- `package.json`: update `name`; keep build scripts if a built mirror is required.
- `index.html`: update `<title>`, description, OpenGraph tags, icons, and theme details.
- Layout/sidebar/header: rename visible brand text and nav items.
- Assets: replace Zippy logos/social previews or remove references.
- Routes/pages: remove demo pages not needed by the target app.
- API: prune unused routes from `api/main.js` and remove unused `api/routes/*` files.
- Agents: remove example agents unless the target app actually ships native agents.

## Keep these parts unless intentionally changing architecture

- `vendor/bfbb/` and `src/main.bfbb.js` for raw deploys.
- `vite.config.js` BFBB build-mode transform when using Vite.
- `api/lib/http.js` style response helpers.
- `api/lib/context.js` pattern for `request`, `body`, `query`, `headers`, `user`, `ds`, `kv`, and `realtime`.
- `src/lib/api.js` using `createAppClient()`.
- `src/lib/auth.js` browser auth flow through `/auth/login` and `/auth/logout`.
- `src/lib/realtime.js` WebSocket helper for `/_ws` when realtime is needed.

## Server route pattern

Zippy's current server entry is the preferred shape:

```js
import { createContext } from './lib/context.js'
import { notFound } from './lib/http.js'
import { handleHealth } from './routes/health.js'

const routes = [handleHealth]

export default async function handler(request) {
  const ctx = createContext(request)

  for (const route of routes) {
    const response = await route(ctx)
    if (response) return response
  }

  return notFound()
}
```

Route modules return response objects or `null`:

```js
import { json } from '../lib/http.js'

export function handleHealth({ request, user }) {
  if (request.path === '/api/hello') {
    return json({ authenticated: !!user, user })
  }
  return null
}
```

## Useful Zippy examples

- Auth state: `/api/me`, `src/lib/auth.js`, route guards in `src/router.js`.
- Queryable shared state: guestbook and lobby routes using `holm.app.ds`.
- Counters/current state: collab and canvas routes using `holm.app.kv`.
- Realtime: collab, canvas, lobby, and pulse routes using `holm.realtime`.
- Analytics/events: `api/routes/analytics.js`.
- Member-like preferences: `api/routes/preferences.js` stores by user ID in KV; use true `holm.app.member.*` when privacy/isolation is required.

## Pruning rule

Do not leave Zippy as a showcase unless the user asked for a showcase. Prune to the app's actual product surface, but preserve the underlying Holm conventions.
