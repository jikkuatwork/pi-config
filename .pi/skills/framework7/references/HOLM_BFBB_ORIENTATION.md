---
title: Framework7 UI Option For Holm/Zippy/BFBB Apps
updated: 2026-05-27
scope: framework7-holm-bridge
---

# Framework7 UI Option For Holm/Zippy/BFBB Apps

Keep Holm-specific guidance isolated in this file. The rest of the Framework7 skill should remain generic.

## When to use this reference

Read this when the user wants Framework7 as a UI option inside a Holm app, Zippy-derived app, BFBB/raw deploy app, or `holm app deploy --spa --no-build` project.

If the user explicitly asks for `/holm-app`, Zippy, Holm runtime, app storage, auth, realtime, deploy prep, or CLI walkthroughs, also load the `holm-app` skill and its task-relevant references. Treat live Holm source as canonical when details drift.

## Fit

Framework7 can be the mobile/touch UI layer while Holm remains the backend/runtime layer:

- UI: static browser files, Framework7 components, Vue 3 state, Framework7 router.
- Backend: `api/main.js` and split `api/routes/*.js` ESM modules.
- Persistence/auth/realtime/tasks/uploads: Holm app APIs, not browser-only fake state.
- Deployment shape: SPA/raw/BFBB, no required build step.

This matches the future split of "Zippy backend + selectable UI shell" better than embedding Framework7 details throughout the Holm app skill.

## BFBB/raw constraints

For Holm BFBB compatibility:

- Do not add required `npm install`, Vite, Webpack, `.vue`, TypeScript, or package-managed runtime dependencies.
- Do not make public CDNs mandatory for deployed raw mode.
- Prefer vendored browser runtime assets under a local static path such as `vendor/framework7/` and `vendor/vue/`.
- Keep import maps pointed at local vendored files in BFBB mode.
- Keep API code under `api/` with relative ESM imports; do not import frontend vendor files from API code.
- Keep route contracts browserless-testable: UI action -> `/api/*` route -> durable state/task ID -> status/list/result route.

A BFBB import-map shape should look like this after vendoring:

```html
<link rel="stylesheet" href="/vendor/framework7/framework7-bundle.min.css">

<script type="importmap">
{
  "imports": {
    "vue": "/vendor/vue/vue.esm-browser.prod.js",
    "framework7/lite": "/vendor/framework7/framework7-lite-bundle.esm.js",
    "framework7/lite-bundle": "/vendor/framework7/framework7-lite-bundle.esm.js",
    "framework7-vue/bundle": "/vendor/framework7-vue/framework7-vue-bundle.js"
  }
}
</script>
```

Manual vendoring is acceptable when explicitly requested or already present. Ask before downloading/installing/copying runtime assets into a user's app.

## Suggested app layout

For a Framework7-first Holm app:

```text
manifest.json
index.html
vendor/
  vue/
  framework7/
  framework7-vue/
src/                    # optional static browser modules, no build-only imports
  app.js
  api-client.js
api/
  main.js
  routes/
  lib/
scripts/
  cli-walkthrough.sh    # proves API contracts without browser state
```

Small apps may keep all UI code in `index.html`. Larger apps may split static browser ESM modules under `src/`, but imports must be browser-resolvable through relative paths or the import map.

## Browser/API boundary

Framework7 pages should call small browser API helpers; server logic belongs in Holm routes.

Browser helper pattern:

```js
export async function apiJson(path, options = {}) {
  const response = await fetch(path, {
    headers: { 'content-type': 'application/json', ...(options.headers || {}) },
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.error || `Request failed: ${response.status}`);
  return body;
}
```

Use Holm's `createAppClient()` helper when starting from Zippy and the helper is already vendored/available. Do not invent ad hoc auth. For private/member data, use authorized API routes backed by Holm member storage, not localStorage.

## UI generation defaults for Holm apps

- Start with the Framework7 no-build boilerplate, including desktop app-frame/scrollbar polish for mobile-width previews, then replace demo state with route-backed state.
- Keep product screens focused; prune Zippy showcase/demo pages unless intentionally showcasing.
- Make auth state visible in the UI only through Holm/Zippy auth helpers or `/api/me`-style routes.
- For realtime, treat Framework7 as display/controller only: storage is truth, realtime is notification, and UI reconciles through authorized API routes.
- Keep settings/theme preferences durable only when the app has an intentional route/storage contract.

## Verification

For a Holm app with Framework7 UI, report both checks:

- Browser smoke: home page renders, route navigation works, form bindings update, popup/sheet open and close, mobile viewport is usable.
- Holm smoke: route syntax checks pass, browserless CLI walkthrough proves the core API flow, and raw deploy shape remains no-build.

Do not run live deploys, mutating Holm commands, package installs, or asset downloads without explicit user permission.
