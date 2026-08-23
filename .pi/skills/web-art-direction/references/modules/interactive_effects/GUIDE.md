# Interactive Effects

A signature effect should reward exploration without carrying essential navigation, copy, or state. Choose one effect family and provide a static, keyboard, touch, and reduced-motion path.

## Spotlight reveal

Use for before/after, material, color, x-ray, or alternate-treatment comparisons.

1. Prepare two layers with identical bounds, crop, and focal geometry.
2. Keep the base layer fully visible and meaningful.
3. Stack the alternate layer above it and reveal it with a feathered radial CSS mask.
4. Convert pointer coordinates with the component's current bounding rectangle.
5. Ease the rendered point toward the raw pointer only for fine pointers without reduced motion.
6. Collapse the mask on pointer exit, cancellation, window blur, and stale re-entry.
7. Add an explicit “show alternate” toggle when the alternate carries meaning or touch/keyboard users should access it.

Run one animation frame loop only while the position or radius is unsettled. Keep the native cursor unless a custom cursor has a real purpose.

## Distance-emitted particle trail

Use when individual motes should follow a gesture consistently at different speeds.

- Emit per unit of traveled distance, not per timer tick.
- Interpolate spawn points across the whole segment so fast motion does not create gaps.
- Cap emissions per frame so teleports and resumed tabs cannot replace the whole pool.
- Reset the previous point on leave, cancellation, or a missed interaction plane.
- Allocate a fixed pool and recycle it with a ring index; do not grow arrays during use.
- For modest 2D counts, Canvas 2D is enough. Use GPU points only when scale, depth, or measured performance requires them.
- Expose a real button for a burst or static composition; pointer movement cannot be the only trigger.

Keep particles small and away from long reading regions and controls. Under reduced motion, render a deterministic still or remove the layer.

## Ambient section particles

Use ambient motion inside one bounded chapter, not across the whole page.

- Choose DOM/SVG for a few styled fragments, canvas for dozens of simple particles, and WebGL only for high counts or depth.
- Scale count from container area, then clamp mobile and low-power values.
- Put the layer behind semantic content with `pointer-events: none`.
- Reserve quiet zones behind text and controls.
- Use one loop, one resize observer, and one section-visibility gate.
- Define whether particles recycle, exit, settle, or become static.

Decorative particles are hidden from assistive technology and pause when a modal or critical task needs attention.

## WebGL gate

Add WebGL only when camera, lighting, spatial depth, shaders, or a real 3D object materially supports the concept. Do not use it as proof of quality.

Before choosing it, define:

- the one job of the canvas;
- the static poster or CSS fallback;
- mobile and device-pixel-ratio limits;
- offscreen and hidden-document behavior;
- context-loss behavior;
- cleanup for geometry, material, texture, targets, listeners, and renderer;
- how semantic copy and controls remain outside the canvas.

Use `threejs-graphics` for scene architecture, materials, atmosphere, procedural geometry, or reference matching.

## Pointer and touch contract

- Gate hover-only behavior with `(hover: hover) and (pointer: fine)`.
- Use Pointer Events when touch or pen participation is intentional.
- Do not block vertical page scrolling for a decorative gesture.
- Keep controls in normal DOM stacking with visible focus and adequate hit areas.
- Clear interaction state on pointer cancel, window blur, visibility change, and component teardown.
- Never hide prices, actions, instructions, or required status inside an effect.

## Performance budget

Prefer no continuously running loop. When one is justified:

- start it only while visible and active;
- reuse objects and typed arrays on hot paths;
- avoid per-frame DOM queries and layout measurement;
- limit overdraw, blur, full-screen compositing, and backing resolution;
- update renderer attributes only when data changes;
- measure CPU, GPU/frame timing, and long-session stability before claiming success.

## Verification

Compare slow and fast pointer paths; leave and re-enter; test repeated button bursts; resize rapidly; background and restore the tab; scroll the effect offscreen; use keyboard and touch; enable reduced motion; disable JavaScript; and inspect the console. Confirm resource counts and loops do not multiply after remounts.
