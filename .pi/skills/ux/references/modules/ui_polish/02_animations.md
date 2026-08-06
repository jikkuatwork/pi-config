# UI-Polish Motion Bridge

The canonical motion workflow is `../motion/GUIDE.md`. Load it before adding or
reviewing movement. This reference keeps only the small icon/state-transition
craft that belongs next to visual polish.

## Contextual icon swaps

When one icon replaces another in the same control (play/pause, saved/unsaved,
loading/success), preserve the control's dimensions and keep both states
legible without motion.

- Use a stable wrapper so the swap does not shift layout.
- A short opacity/scale transition can bridge the states; blur is optional and
  should stay subtle because filters can be expensive.
- Reuse the project's motion library and tokens if already present. Otherwise a
  CSS crossfade is enough; do not add a dependency.
- Keep the accessible name/state synchronized with the control. Decorative SVGs
  remain hidden from assistive technology.
- On initial page load, render the settled default state rather than replaying a
  state-change animation unless an intentional entrance is part of the brief.
- Under reduced motion, use an instant swap or a brief opacity-only transition.

A conservative CSS pattern:

```css
.icon-state {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  opacity: 0;
  transform: scale(0.9);
  transition:
    opacity 150ms var(--motion-fast, ease-out),
    transform 150ms var(--motion-fast, ease-out);
}

.icon-state[data-active] {
  opacity: 1;
  transform: scale(1);
}

@media (prefers-reduced-motion: reduce) {
  .icon-state {
    transform: none;
    transition-property: opacity;
  }
}
```

Treat the values as a starting point. If the target already has an icon-swap
pattern, use it.

## Press feedback

Press feedback is optional, especially for high-frequency or dense tools. When
it helps, reuse the project token; a subtle scale around `0.96–0.98` for roughly
`100–160ms` is a starting range, never a universal requirement. Keep focus,
color, label, or state feedback visible without relying on movement.

## Entrance and exit restraint

- Use movement only when it explains hierarchy, origin, destination, or state.
- Prefer interruptible transitions for rapidly reversible UI.
- Do not stagger routine list/keyboard interactions; reserve staged entrances
  for infrequent surfaces where sequence helps comprehension.
- Keep exit paths spatially consistent and usually quieter than entrances.
- Verify at normal speed and slow playback, then route exact implementation and
  review decisions through the motion module.
