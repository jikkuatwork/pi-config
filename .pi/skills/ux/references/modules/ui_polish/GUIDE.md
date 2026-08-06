# UI Polish

> Docs-only local adaptation. Follow the UX umbrella core and target-project
> conventions. This module owns surfaces, optical alignment, and icon craft;
> `../motion/GUIDE.md` owns whether movement exists, timing, interruption,
> reduced motion, and motion performance.

Small details compound, but polish never outranks task clarity, accessibility,
or interaction correctness. Preserve the project's component library, tokens,
density, icon family, and visual language unless the task explicitly changes
the system.

## Quick reference

| Topic | Reference |
| --- | --- |
| Radius, optical alignment, elevation, image edges | `01_surfaces.md` |
| Small state/icon transitions and motion handoff | `02_animations.md` |
| Icon weight, state, sizing, and RTL | `03_icons.md` |
| Transition specificity and `will-change` | `04_performance.md` |

## Core principles

### 1. Concentric nested corners

For closely nested surfaces with a visible even inset, a useful geometric start
is `outer radius = inner radius + inset`. Preserve established component tokens
when layers are independent, asymmetrical, or intentionally use another shape.
Judge the rendered corners rather than enforcing arithmetic without context.

### 2. Optical alignment beats arithmetic

Geometric centering can look wrong for triangles, carets, stars, icons with
uneven mass, and text/icon buttons. Prefer fixing the SVG view box/path; use a
small logical padding or transform correction only when the asset cannot change.
Check RTL before applying a physical-direction correction.

### 3. Elevation and structure are different jobs

Use borders for structure, state, input affordance, dividers, and dense tables.
Use restrained shadows when a surface needs elevation or separation across
varying backgrounds. Reuse project elevation tokens; do not replace every
border with a bespoke layered shadow.

### 4. Image-edge treatment is contextual

A subtle inside outline can separate images from similar backgrounds without
changing layout. Use a neutral project token or an actually neutral black/white
alpha after checking light/dark themes. Do not add a universal outline when the
image already has a frame, the product intentionally uses edge-to-edge media, or
contrast is sufficient.

### 5. One coherent icon system

- Keep one optical strategy/library on a surface.
- Match icon size and apparent stroke to adjacent type without assuming every
  library supports arbitrary stroke overrides.
- Prefer one `currentColor` SVG and express hover/selected/disabled states in
  CSS; use an available filled variant for selected state only when the set is
  designed that way.
- Test at the smallest rendered size and on the pixel grid the icon set expects.
- Mirror only direction-dependent glyphs in RTL; do not mirror brands,
  checkmarks, clocks, or conventional media controls.
- Accessible names and decorative hiding belong to the accessibility module.

### 6. State craft before decoration

Walk default, hover, focus, active, disabled, loading, empty, error, selected,
and dark/light states. A polished default with a broken focus or loading state
is not polished. Hover/press effects must not change surrounding layout.

### 7. Route movement to motion

Load `../motion/GUIDE.md` for entrances/exits, press feedback, icon swaps,
stagger, gestures, springs, and animation reviews. Numeric source recipes are
starting points, not universal constants. Reuse the project's motion tokens and
verify normal speed, slow motion, interruption, touch/hover behavior, and
reduced motion.

## Common mistakes

| Mistake | Better action |
| --- | --- |
| Same radius on visibly inset nested surfaces looks pinched | Start from concentric geometry, then verify |
| Per-component pixel nudges compensate for a broken SVG | Fix the asset/view box when possible |
| Shadow replaces a structural or focus border | Keep the semantic border |
| New one-off shadow/radius/color bypasses tokens | Extend or reuse the system |
| Mixed icon libraries/stroke strategies in one toolbar | Normalize to one set |
| Separate icon assets for every state | Recolor or use designed outline/fill variants |
| Polish effect weakens light/dark contrast | Remove or retune it in both appearances |
| Motion recipe copied here despite target constraints | Route through the motion and BFBB rules |

## Standalone polish review

When the user asks for a focused UI-polish review, remain read-only and provide:

1. **Scope and evidence** — exact components/states/viewports inspected.
2. **Findings** — one table ordered by user impact:

| Severity | Location | Before | After | Why |
| --- | --- | --- | --- | --- |
| LOW | `src/Card.css:18` | Equal radii on an 8px inset pair | Increase the outer radius using the existing radius scale | Nested corners currently pinch |

3. **Considered but rejected** — real polish candidates left unchanged because
   the project token, platform convention, or rendered evidence supports them.
4. **Verification** — exact rendered states and checks; mark gaps **Not verified**.
5. **Verdict** — `Block`, `Needs changes`, or `Approve` using the umbrella's
   user-impact severity, not aesthetic preference alone.

When the interface-review module orchestrates the review, return domain evidence
and let its consolidated format and finding cap take precedence.
