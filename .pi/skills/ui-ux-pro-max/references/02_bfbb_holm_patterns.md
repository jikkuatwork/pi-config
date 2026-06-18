# BFBB / Holm UI Patterns

Use this when the UI will live in a Holm app, Zippy-derived app, or BFBB/raw browser path.

## Default posture

- Primary app path is raw/BFBB: `holm app deploy . --spa --no-build` must not require `npm install`, Vite, TypeScript compilation, or a public runtime CDN.
- If app implementation/deploy/runtime details matter, load the local `holm-app` references. For polished UI, especially read its `ui-excellence.md` and `zippy-boilerplate.md`.
- Build the actual product workflow first. Rename and prune Zippy/demo UI unless the user explicitly asked for a showcase.
- Prefer existing Zippy shell, tokens, auth/realtime/settings helpers, icons, and API helpers instead of inventing parallel systems.

## BFBB-safe frontend rules

Avoid in raw-loaded browser code unless deliberately handled:

- npm package imports not present in `vendor/bfbb/` or browser-native APIs;
- Vite aliases such as `@/`;
- TypeScript-only files;
- asset imports transformed only by a bundler;
- build-time environment injection required for first render;
- public CDN runtime dependencies.

Prefer:

- relative imports that work from raw files;
- plain HTML/CSS/JS/Vue patterns supported by the current app;
- CSS variables/semantic utility classes;
- SVG inline symbols or the app's existing icon component/path;
- browser-native `Intl`, `URL`, `FormData`, `AbortController`, `<dialog>` only when support is acceptable, and small custom fallbacks otherwise.

## Zippy visual defaults

Use the app's semantic tokens and component rhythm. Common current conventions:

- semantic tokens/classes such as `bg-surface-alt`, `text-text`, `text-text-faint`, `border-border/50`, `accent-*`;
- semi-transparent borders (`border-border/50`) instead of hard opaque lines;
- flat cards by default, with subtle hover lift: `hover:shadow-md transition-all duration-150`;
- metadata: `text-[10px] uppercase tracking-wide text-text-faint`;
- visible focus rings: `focus:ring-2 focus:ring-accent-500/50` or equivalent;
- motion under 300ms and disabled/reduced under `prefers-reduced-motion`;
- app scrollbar/shell patterns already present in Zippy.

Do not add ornamental gradients, 3D, noise, or blur unless it helps the product workflow and remains accessible in light/dark themes.

## Holm app state surfaces to design for

Holm apps often expose backend state. The UI should make it observable:

- **Auth**: signed-out prompt, member identity, role/forbidden state, logout path.
- **Storage**: saved/dirty/saving/error states; conflict or stale-write messaging for collaborative data.
- **Realtime**: connected/reconnecting/offline status; compact event update plus reconciliation status.
- **Tasks/AI/jobs**: queued/running/progress/succeeded/failed/canceled with job ID/status URL when useful.
- **Uploads/media**: selected file, progress, validation, retry, preview, failure.
- **Provider/secret needs**: visible setup placeholder without printing or storing secrets in files.

## Layout patterns

### App shell

- Mobile-first shell; header/footer fixed only if content padding/insets account for them.
- Keep core nav reachable from deep pages.
- Prefer sidebar on wide screens and compact top/bottom nav on phones only when hierarchy warrants it.
- Avoid mixing sidebar, tabs, and bottom nav at the same hierarchy level.

### Cards and rows

- Stable dimensions for cards, avatars, counters, status badges, and toolbars.
- Hover/pressed states should not move surrounding content.
- Clickable cards need visible affordance and keyboard focus, not hover-only discovery.

### Tables and dashboards

- On small screens, collapse tables to cards or make horizontal scroll intentional and labeled.
- Add empty/loading/error states for each data panel.
- Keep legends, units, time ranges, and filters visible near data.

### Forms and modals

- Visible labels, helper text for complex fields, inline validation on blur/submit.
- Destructive actions separated visually and confirmed.
- Modals/drawers need close affordance, escape/click-outside behavior, focus return, and a strong enough scrim.

## Delivery checks for Holm/BFBB UI

Before saying done:

- Search for stale product copy if starting from Zippy: `Zippy`, `demo`, `boilerplate`, placeholder titles/descriptions.
- Verify no new UI path requires npm/build/CDN unless explicitly requested.
- Check mobile width around 375px and a desktop width.
- Confirm fixed bars do not cover scroll content.
- Confirm user-visible errors are surfaced, not only logged to console.
- If the UI drives API routes, include the route contracts or CLI-walkable smoke path in the handoff.
