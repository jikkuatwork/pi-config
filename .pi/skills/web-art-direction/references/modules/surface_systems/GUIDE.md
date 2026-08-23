# Surface Systems

Surfaces support hierarchy; they are not a substitute for it. Choose one material language, define semantic tokens, and keep the accent scarce.

## Shared token foundation

Define roles before values:

```text
background / surface / raised surface
text / muted text / inverse text
structural rule / strong rule / focus
signal accent / success / warning / danger
small / medium / large elevation
quick / standard / slow motion
```

Use the project's existing notation and tokens when present. Verify every rendered foreground/background pair; do not infer contrast from token names or alpha values.

## Warm technical paper

- Use warm off-white rather than stark white.
- Place the paper field inside a darker outer frame when the page needs a contained, authored feel.
- Add hairlines, inset rules, corner brackets, coordinates, or a faint diagonal texture.
- Pair a clean display sans with readable body text and mono utility labels.
- Use one strong accent for active states, progress, or a single focal mark.
- Keep texture low enough that it disappears while reading.

This is technical material, not distressed vintage paper. Internal geometry stays crisp even when the surface feels tactile.

## Restrained dark glass

- Start from a near-black opaque fallback.
- Use translucent fills and backdrop blur only where underlying atmosphere makes the depth legible.
- Add crisp edge highlights and soft neutral shadow falloff; avoid neon outlines.
- Limit the number of floating shells and preserve a quiet central stage.
- Recheck text and focus contrast over every backdrop state.
- Reduce or remove blur on constrained devices when it becomes costly or muddy.

Glass is a page-level material decision, not a card class sprinkled across an unrelated system.

## Documentary ink

- Use hard black and warm white, exposed grids, square corners, and type-led hierarchy.
- Let documentary media provide texture; minimize icon and surface ornament.
- Use line breaks as composition, then retest them at every viewport and with longer copy.
- Use pale color fields only for verified proof or a deliberate chapter shift.

Brutalism is not random misalignment, illegible type, or missing interaction states.

## Border and frame craft

- A flat low-contrast border is the default for structure.
- A gradient border may mark one elevated hero, selected item, or premium surface.
- Keep it thin, inherit the surface radius, and use neutral highlights plus at most one accent.
- When a complex background must remain intact, use an isolated pseudo-element mask with `pointer-events: none`.
- Focus indicators remain explicit; a decorative gradient is not a focus ring.
- Adjacent frames share weight, corner logic, and alignment.

## Elevation

Use borders for structure and shadows for actual separation from the plane.

- **Small:** controls and compact cards.
- **Medium:** normal panels and popovers.
- **Large:** a rare hero object or modal-scale surface.

Layer several low-opacity neutral shadows rather than one opaque drop shadow. Keep one elevation level per state and do not animate large shadows continuously.

## Masks, fades, and blur

Alpha masks are useful for edge fades and spotlight reveals. Include both standard and WebKit mask properties when target support requires them. A progressive backdrop blur can soften a sticky edge, but each layer adds compositing cost; use the fewest steps that survive visual inspection.

All overlays use `pointer-events: none`, remain below dialogs and critical controls, and have an opaque or unblurred fallback. Never blur content merely to disguise weak hierarchy.

## Texture and atmosphere

- Texture should be perceptible on close inspection, not during reading.
- Keep noise, grid, dither, or scan lines in their own decorative layer.
- Avoid large saturated gradient blobs as a default source of “premium.”
- Reserve glows for a meaningful signal or focal object.
- Ensure backgrounds do not animate behind dense copy or form tasks.

## State completeness

For every surface, inspect default, hover, focus, active, selected, disabled, loading, error, and reduced-motion behavior that applies. Hover and focus may share visual emphasis but must remain independently operable. No effect should move surrounding layout.
