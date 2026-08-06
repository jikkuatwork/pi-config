# Motion Design and Engineering

> Docs-only local adaptation. Follow the UX umbrella core and target-project conventions; load only the references needed for the task. Do not add dependencies or run project tooling without the user’s request and the repository’s permission gates.

Use this guide to decide whether motion belongs and to build it when requested. For a focused review read `02_review.md`; for exact review heuristics read `03_standards.md`; for a codebase audit/plan read `04_audit_and_plan.md`; for restrained opportunity discovery read `07_opportunity_finder.md`; for naming an effect read `08_vocabulary.md`.

## Operating Posture

Act as a senior design engineer. Use the source philosophy as a high-craft lens, not as a substitute for target evidence, project tokens, accessibility, browser/library behavior, or user intent.

Two failure modes, and the first is worse:

1. **Animating something that shouldn't animate.** The gate below exists to produce zero lines of code sometimes. That's a success, not a dodge.
2. **Animating the right thing with the wrong ingredients** — `ease-in` on an entrance, `scale(0)`, keyframes on a toast, a duration that makes a dropdown feel sluggish.

For a normal implementation request, make one evidence-based call rather than dumping a menu. Offer alternatives only when the user asks to explore or the choice depends on an unresolved product tradeoff.

## Hard Rules

1. **Run the sequence in order.** Decide whether motion belongs and name its purpose before choosing ingredients.
2. **Use target evidence.** Prefer existing project tokens. When none exist, use the recipes below as starting points, then verify at normal/slow playback and on target input devices.
3. **Extend the codebase's tokens, don't fork them.** A parallel easing/duration system for one component is a defect.
4. **Reduced motion and hover/pointer behavior ship with the animation**, not as a follow-up.
5. **Use the cheapest tool that works.** Do not add a motion dependency for a fade or simple state transition.

## The Build Sequence

### 1. Should this animate at all?

| Frequency | Decision |
| --- | --- |
| Very high frequency (keyboard shortcuts, command palette toggle) | Prefer instant response; retain only essential, near-imperceptible state feedback |
| Frequent (hover effects, list navigation) | Fast and subtle, or nothing |
| Occasional (modals, drawers, toasts) | Standard animation |
| Rare / first-time (onboarding, success, celebration) | The delight budget lives here |

Keyboard-initiated and very frequent actions usually need immediate response; decorative entrances commonly make them feel delayed. If motion fails this gate, say so plainly and offer an instant state change or static affordance instead.

### 2. What is the purpose?

Name it in one of these words before continuing:

- **Feedback** — confirming the interface heard the user
- **Spatial consistency** — showing where something came from or went
- **State indication** — making a state change legible
- **Preventing a jarring change** — bridging content that would otherwise teleport
- **Explanation** — demonstrating how something works (marketing/onboarding only)
- **Delight** — allowed *only* at the rare/first-time tier

Can't name it? Don't build it. "It looks cool" on a frequently-seen element is a reason to stop.

Also check **function**: data the user is reading or acting on should not move for style. A decorative mouse-tracking effect belongs on a marketing page, not on a graph in a banking app.

### 3. Pick the tool — cheapest that works

Walk down; stop at the first that fits.

| Need | Tool |
| --- | --- |
| Hover, press, color, a state toggle you control with a class or attribute | **CSS transition** |
| Entry animation on mount, no JS state | **CSS `@starting-style`** |
| Predetermined keyframed motion with compositor-friendly properties | **CSS animation** |
| Programmatic control without a library | **WAAPI** (`element.animate()`) |
| Springs, layout animations, exit animations, gesture-driven values | **Motion** (`motion.dev`) |

CSS/WAAPI can let eligible transform/opacity work run on the compositor, while JavaScript-driven scheduling can contend with a busy main thread. None is automatically smooth: layout, paint, filters, event work, and browser/library versions matter. Prefer CSS for predetermined motion, JavaScript/springs for dynamic gestures, and profile the target.

If the task needs a complex component rather than only motion, first reuse the project's component system or a native element. Consult the library-selection module only when a dependency is actually in scope; BFBB/raw paths default to no new package.

### 4. Pick the properties

- **Prefer `transform` and `opacity`** for movement because they are commonly compositor-friendly. Color, shadow, `clip-path`, and intrinsic-size transitions can be justified; layout properties usually cost more and must be short, scoped, and profiled.
- **Avoid `scale(0)` for ordinary surface entrances.** A subtle `scale(0.9–0.97)` plus opacity often preserves continuity; use another treatment when scaling content would distort it.
- **`transform-origin` at the trigger** for popovers, dropdowns, menus, tooltips — `var(--transform-origin)` in Base UI. **Modals are exempt**; they're not anchored to a trigger, so they stay centered.
- **Percentages in `translate()`** are relative to the element's own size — `translateY(100%)` moves by its own height whatever the content. Prefer over hardcoded pixels.
- **Do not assume a library syntax determines acceleration.** Motion/Framer Motion shorthands usually compose into transforms, but JavaScript scheduling and surrounding effects can still jank. Inspect emitted styles and profile the installed version; use a full transform string only when it measurably improves or simplifies the target.
- **Avoid high-frequency inherited custom-property updates across large subtrees** when a direct transform on the animated element is sufficient. Measure before calling a CSS-variable path a bottleneck.

### 5. Easing and duration — or a spring

**Easing**, in decision order:

| Situation | Easing |
| --- | --- |
| Entering or exiting | `ease-out` |
| Moving / morphing on screen | `ease-in-out` |
| Hover / color change | `ease` |
| Constant motion (marquee, progress) | `linear` |
| Default | `ease-out` |

For direct UI response, a pronounced `ease-in` often feels delayed; start with an ease-out entrance/exit or ease-in-out relocation, then match the project's motion language. Built-in easings may be sufficient for subtle transitions. When a stronger house curve is needed and no token exists, these are reviewed starting points:

```css
--ease-out: cubic-bezier(0.23, 1, 0.32, 1);        /* strong ease-out for UI */
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);    /* strong ease-in-out for on-screen movement */
--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);     /* iOS-like drawer curve (Ionic) */
```

If these do not fit, choose or derive a curve deliberately, name it as a shared token when reused, and verify the resulting motion rather than collecting near-duplicate curves.

**Duration:**

| Element | Duration |
| --- | --- |
| Button press feedback | 100–160ms |
| Tooltips, small popovers | 125–200ms |
| Dropdowns, selects | 150–250ms |
| Modals, drawers | 200–500ms |
| Marketing / explanatory | Can be longer |

Most small, frequently used UI transitions should stay under roughly 300ms. Larger modals/drawers, gestures, and explanatory motion may need longer; justify the duration and ensure interaction is not blocked.

**Reach for a spring instead** when the motion is drag with momentum, an element that should feel alive, a gesture the user can interrupt or reverse, or decorative mouse-tracking:

```js
{ type: "spring", duration: 0.5, bounce: 0.2 }        // Apple-style — easier to reason about
{ type: "spring", mass: 1, stiffness: 100, damping: 10 }  // traditional physics — more control
```

Keep bounce at 0.1–0.3, and avoid bounce in most UI — reserve it for drag-to-dismiss and playful interactions.

### 6. Interruption and exit

- **Transitions, not keyframes, for anything triggered rapidly** — toasts, toggles, anything a user can fire twice in a second. Transitions retarget from the current value; keyframes restart from zero.
- **Springs for gestures**, because they carry velocity through an interruption.
- **Exit the way it entered.** A toast that slides in from the bottom leaves through the bottom. Symmetric paths are what make swipe-to-dismiss feel obvious.
- **Asymmetric timing where the user is deciding.** Slow on the deliberate phase (a hold-to-confirm press: 2s linear), snappy on the system response (release: 200ms ease-out).

### 7. Reduced motion and pointer gating

Ships with the animation, every time.

```css
@media (prefers-reduced-motion: reduce) {
  .element { animation: fade 0.2s ease; } /* keep opacity/color, drop transform-based motion */
}

@media (hover: hover) and (pointer: fine) {
  .element:hover { transform: scale(1.05); } /* touch fires false hovers on tap */
}
```

```jsx
const reduce = useReducedMotion();
const closedX = reduce ? 0 : '-100%';
```

Reduced motion preserves necessary state feedback while removing or reducing vestibular displacement, parallax, zoom, and non-essential looping. Opacity/color can remain when useful; decorative motion may be removed entirely.

## Recipes

For ready-to-build implementations of the common cases — button press, dropdown, tooltip, modal, drawer, toast, accordion, stagger, hold-to-confirm, tab indicator, scroll reveal, drag-to-dismiss — see [01_recipes.md](01_recipes.md). Load it whenever the request matches one of those components; start from the recipe rather than from a blank file.

## High-risk patterns to review

Self-check these before finishing. Context can justify an exception, but it needs evidence and verification:

| Pattern to investigate | Better direction |
| --- | --- |
| `transition: all` | Name the exact properties |
| `transform: scale(0)` entrance | `scale(0.95)` + `opacity: 0` |
| Pronounced `ease-in` delays direct UI response | Start with the project's responsive ease-out token |
| Unreviewed one-off curve | Reuse a project token or verify and name a deliberate shared curve |
| Decorative animation on a very frequent keyboard action | Instant response or minimal state feedback |
| Small UI transition over 300ms with no reason | Shorten it; retain longer timing only when the interaction needs it |
| `transform-origin: center` on a trigger-anchored popover | `var(--transform-origin)` (modals exempt) |
| Keyframes on toasts, toggles, rapidly-triggered elements | CSS transitions |
| Unprofiled layout animation on a hot path | Prefer `transform`/`opacity`, or keep the justified exception scoped and short |
| JavaScript-driven motion janks under load | Profile; consider CSS/WAAPI, fewer effects, or less main-thread work |
| Hover-only movement leaks onto touch input | Gate by supported hover/pointer capabilities when appropriate |
| Missing `prefers-reduced-motion` behavior | Remove displacement and retain only useful feedback |
| Decorative group entrance lacks hierarchy | Consider a short stagger only for infrequent surfaces |

## Output

When implementation was requested, write the smallest compatible code change. Then, in at most a few lines:

- **The gate result** — frequency tier and the named purpose. If something in the request was rejected, say which and why.
- **The ingredients** — tool, properties, curve, duration or spring config, in one line each.
- **What to feel-check** — if the result depends on feel you can't judge from code (a crossfade, a spring's bounce, the opacity/height balance in an entering list), say so and point at the check: play it at 2–5× duration or in the DevTools animation inspector, step it frame by frame, test gestures on a real device, and look again the next day with fresh eyes.

Don't pad this into a report. The code is the deliverable.

## Tone

Opinionated and brief. When the honest answer is "this shouldn't animate," give it — that answer is a core reason this module exists. When feel genuinely can't be settled from code, say so instead of guessing at a value.
