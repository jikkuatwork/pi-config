# Motion Standards Reference

Use these as reviewed starting points for motion decisions and findings. Project
tokens, interaction frequency, accessibility, installed library/browser
behavior, measured performance, and rendered feel take precedence. Do not turn a
heuristic into a finding without target evidence.

## Should it animate?

| Frequency | Default posture |
| --- | --- |
| Very high / keyboard-driven | Instant response; at most essential state feedback |
| Frequent hover/list/navigation | None or near-imperceptible feedback |
| Occasional modal/drawer/toast | Standard restrained motion may help |
| Rare onboarding/success/celebration | More room for explanation or delight |

Valid purposes include feedback, spatial consistency, state indication,
preventing a jarring change, and explanation. Delight belongs mainly to rare
moments. If no purpose survives the frequency and function check, remove the
motion.

## Easing

Starting decision order:

- entering/exiting a directly triggered surface → responsive ease-out;
- moving or morphing an on-screen object → ease-in-out or a suitable spring;
- subtle hover/color response → project default/ease;
- constant-rate progress or marquee → linear;
- gesture release → velocity-aware spring/deceleration.

A pronounced ease-in often delays direct UI response. Built-in curves can be
fine for small transitions. If the project lacks tokens and a stronger curve is
needed, these upstream values are useful candidates to test:

```css
--ease-out: cubic-bezier(0.23, 1, 0.32, 1);
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);
```

Do not add all three automatically. Reuse an existing token or add only the
curve the target adopts.

## Duration

| Surface | Starting range |
| --- | --- |
| Press feedback | `100–160ms` |
| Tooltip/small popover | `125–200ms` |
| Dropdown/select | `150–250ms` |
| Modal/drawer | `200–500ms`, depending on distance/gesture |
| Marketing/explanatory | May be longer; must not block the task |

Most small, frequently used UI transitions should stay under roughly `300ms`.
Distance, screen size, input velocity, product personality, and reduced-motion
behavior can justify another value.

## Physicality and origin

- Ordinary surface entrances usually look more continuous from a subtle
  `scale(0.9–0.97)` plus opacity than from `scale(0)`. Avoid scaling when it
  distorts text or media.
- Trigger-anchored popovers/tooltips should normally transform from the trigger
  or supplied origin. Centered modals are not trigger-anchored and can remain
  centered.
- A press scale around `0.96–0.98` for `100–160ms` is a starting range, not a
  requirement for every button. High-frequency/dense controls may need only
  color or native active feedback.
- Enter and exit should preserve a comprehensible spatial story. Paths can
  match while timing differs.

## Springs

Use springs for gesture-driven, velocity-carrying, interruptible motion or a
product that deliberately calls for spring behavior. Avoid visible bounce in
routine professional UI.

Upstream starting forms:

```js
{ type: "spring", duration: 0.5, bounce: 0.2 }
{ type: "spring", mass: 1, stiffness: 100, damping: 10 }
```

Library semantics differ. Inspect the installed version: some spring APIs use
physical parameters, others derive a perceived duration/bounce. Tune on the
actual distance, device, and input velocity.

## Interruptibility

- CSS transitions retarget from their current interpolated value and suit
  rapidly toggled state properties.
- Keyframes suit predetermined one-shot sequences; restarting them for rapid
  toggles can snap.
- Gesture motion should track input continuously, accept interruption, and hand
  release velocity into its settling behavior where the library supports it.
- Do not disable input merely because a transition is running.
- Deliberate phases and system responses may use asymmetric timing: e.g. a
  hold-to-confirm fills slowly while cancel/release resets quickly.

## Performance

- Prefer `transform` and `opacity` for movement; they are common compositor
  candidates and avoid layout in ordinary cases.
- `transition: all` is risky because future property changes can animate
  unintentionally; name the intended properties.
- Layout properties (`width`, `height`, `margin`, `padding`, `top`, `left`) often
  trigger layout/paint. Use them only when the behavior needs intrinsic layout
  (such as an accordion), keep them scoped/short, and profile.
- Color, shadow, filter, and `clip-path` transitions are not forbidden; their
  paint/compositing cost varies by browser, area, and effect. Heavy blur is
  especially worth testing on Safari and low-end devices.
- Motion/Framer Motion `x`, `y`, and `scale` commonly compose to CSS transforms;
  they are not inherently non-composited. JavaScript scheduling can still
  contend with a busy main thread. Inspect emitted styles and profile before
  replacing syntax.
- Inherited custom-property updates can invalidate styles across a subtree. Use
  a direct property on the animated element when it is simpler, but measure
  before diagnosing a custom property as the bottleneck.
- CSS/WAAPI may keep eligible effects smooth under main-thread load; neither is
  a guarantee. Use CSS for predetermined motion, JavaScript/springs for dynamic
  control, and verify frame behavior.

## Transforms and `clip-path`

- Translate percentages are relative to the element's own box, making
  `translateY(100%)` useful for content-sized drawers/toasts.
- `scale()` affects descendants; that is useful for press feedback but can
  distort content during larger transitions.
- `clip-path: inset()` can implement reveals, progress fills, tab masks, and
  comparison sliders. Test clipping, focus outlines, hit testing, and browser
  performance.
- `@starting-style` can express entry transitions without mount-state JavaScript
  where the target browser matrix supports it; otherwise use the project's
  established fallback.

## Gestures and drag

- Use pointer capture after a drag commits so tracking continues outside bounds.
- Preserve the grab offset; do not snap the item center to the pointer.
- Use a movement threshold to distinguish tap from drag and ignore extra
  pointers once a gesture is active.
- Consider both distance and release velocity for dismissal. The upstream
  `~0.11 px/ms` threshold is a starting heuristic, not a cross-device constant.
- Use progressive resistance beyond bounds instead of an unexplained hard wall
  when the interaction model benefits from rubber-banding.
- Test gestures on a real target device; desktop emulation does not establish
  touch feel.

## Crossfades and stagger

A small blur can mask double-exposure in a crossfade, but first try a cleaner
state composition, timing, or shared-element transition. Filters add cost; keep
blur subtle and profile.

A `30–80ms` stagger can clarify hierarchy on an infrequent group entrance. It
is decorative, must not block interaction, and should not be added to routine
lists or keyboard-driven workflows merely because several items appear.

## Accessibility and pointer capability

```css
@media (prefers-reduced-motion: reduce) {
  .moving-surface {
    transform: none;
    transition-property: opacity;
  }
}

@media (hover: hover) and (pointer: fine) {
  .surface:hover {
    /* optional hover movement */
  }
}
```

Reduced motion preserves necessary state feedback while reducing/removing
parallax, zoom, large displacement, spin, and non-essential loops. Decorative
motion can be absent. Gate hover-dependent movement when the interaction should
not fire on touch; do not hide essential affordances behind hover.

## Debugging and verification

- Slow playback to `2–5×` duration or use the DevTools Animations panel.
- Step coordinated properties frame by frame and inspect transform origin.
- Spam reversible controls to expose restart/snap behavior.
- Profile frame/rendering behavior under realistic load.
- Toggle reduced motion and test keyboard, touch, and supported pointer modes.
- Use a real device for drag, drawer, swipe, and momentum interactions.
- Recheck with fresh eyes; motion can be mechanically correct and still feel
  out of character.

## Cohesion

Match motion to product personality and frequency. A playful consumer surface
may support more elasticity; a daily professional tool usually benefits from
crisp, quiet response. Consolidate repeated curves/durations into project tokens
only after the values are intentionally shared—not merely numerically close.
