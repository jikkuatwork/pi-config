# Eval Prompts

Use these when checking trigger behavior or future edits.

## Should trigger

1. `Make this Holm/Zippy dashboard look professional, mobile-first, and BFBB-safe without adding npm dependencies.`
2. `Review this Vue page for UI polish, accessibility, responsive layout, and empty/error states.`
3. `Design a compact data dashboard with charts and status cards for a Holm app.`
4. `The app works but feels like boilerplate; improve the product UX and remove demo-looking surfaces.`

## Should not trigger

1. `Add a new API route that writes to holm.app.ds.` — use `holm-app` unless UI behavior is involved.
2. `Deploy this app to a Holm peer with --host.` — deployment/permission-gated Holm work, not UI design.
3. `Install Python so upstream ui-ux-pro-max search.py works.` — this adaptation intentionally avoids setup/runtime pieces.
4. `Refactor a Go microservice for concurrency.` — unrelated backend work.

## Edge cases

1. `Add an analytics chart to a Holm dashboard.` — trigger for UI/data-viz design; avoid new chart dependencies unless approved and BFBB-compatible.
2. `Improve page performance.` — trigger only if the performance concern is UI-facing (layout shift, animation jank, heavy images, perceived loading); otherwise use the relevant stack/runtime skill.
3. `Build a landing page.` — trigger if it is app/UI work; still keep Holm apps product-first unless user explicitly wants marketing.
4. `Make it pretty.` — trigger, but first translate into a concrete design brief and constraints instead of applying decorative effects.

## Expected behavior

- Loads `references/INDEX.md`, then only necessary references.
- Does not recommend Python/npm/uipro/Skills CLI setup.
- Mentions BFBB constraints for Holm/Zippy raw apps.
- Produces concrete UI changes or prioritized review findings.
- Includes accessibility, responsive, interaction-state, and dependency checks.
