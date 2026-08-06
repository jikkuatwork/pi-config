# UX Routing Eval Prompts

Use these when changing the umbrella description, router, or module boundaries.
These are routing checks, not permission to run paid inference or mutate a test
repository.

## Should trigger

1. `Use /ux to redesign this Holm dashboard so it feels like a real product,
   stays BFBB-safe, and works well on mobile.`
   - Route: core + BFBB/Holm + relevant domain modules.
2. `Audit this checkout flow as one system: accessibility, copy, layout,
   typography, color, and polish.`
   - Route: interface review + all six owner modules.
3. `The modal traps keyboard focus and its errors are not announced. Fix the
   accessibility.`
   - Route: accessibility; add layout/copy only if evidence crosses domains.
4. `Build an interruptible swipe-to-dismiss interaction and honor reduced
   motion.`
   - Route: motion + Apple design + accessibility.
5. `What is the animation called where a thumbnail expands into the detail
   card?`
   - Route: motion vocabulary only; answer with the term, not an implementation.
6. `Review our type scale, line length, wrapping, and dynamic counters.`
   - Route: typography.
7. `Rewrite the empty, validation, and destructive-confirmation copy in this
   settings flow.`
   - Route: UX writing, with accessibility for error association if code changes.
8. `Prototype three genuinely different versions of this upload card behind a
   picker.`
   - Route: prototyping after confirming implementation scope; no package install.
9. `Which existing or third-party library should we use for a virtualized list?`
   - Route: library selection; inspect existing dependencies and verify current
     compatibility before recommending; do not install.

## Should not trigger

1. `Add a Go endpoint and table-driven tests.` — backend/Go work.
2. `Deploy this app to a Holm peer.` — Holm runtime/deployment skill and its
   permission gates; UX only if interface work is also requested.
3. `Improve the lighting and ocean shaders in this Three.js scene.` — use the
   Three.js graphics skill unless app UI is also in scope.
4. `Change the Azure subscription budget.` — cloud/account work, not UX.
5. `Explain this database migration plan.` — no interface or user-experience
   surface is involved.

## Edge cases

1. `Make it pretty.` — trigger, but translate the request into a product brief
   and inspect the existing system before applying effects.
2. `Animate the command palette opening.` — trigger the motion gate; likely
   recommend instant state change because the keyboard action is high-frequency.
3. `Improve page performance.` — trigger only for UI-facing evidence such as
   layout shift, animation jank, image loading, or perceived loading; otherwise
   use the stack/runtime owner.
4. `Add an analytics chart.` — trigger for hierarchy, labels, color, responsive
   fallback, and states; do not add a chart dependency without permission.
5. `Make this look like Apple.` — route to Apple design plus core; translate
   principles instead of cloning proprietary visuals or blindly adding glass.
6. `Install Motion and add a fade.` — UX can determine whether motion is
   warranted, but must prefer CSS for a simple fade and ask before any package
   install.

## Expected behavior

- Pi discovers exactly one `ux` skill, not the upstream skill heads.
- The model loads `references/INDEX.md`, then `01_core.md`, then only necessary
  modules.
- BFBB/Holm constraints override framework/package examples.
- Reviews remain read-only unless implementation was explicitly requested.
- Prototype and library-selection routes do not silently create routes, start
  servers, or install packages.
- Cross-domain findings are consolidated under one owner with exact evidence.
- Motion advice allows “do not animate,” includes reduced-motion behavior, and
  avoids treating disputed source claims or exact constants as universal facts.
- Output names verification gaps instead of claiming untested behavior.
