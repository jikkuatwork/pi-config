# Procedural VFX

> Docs-only local adaptation. Load numbered references only when exact formulas, numeric contracts, or failure diagnostics are needed; upstream executable examples and assets are intentionally omitted.

Build effects from an event envelope, motion field, geometry representation, and shading response. Avoid independent particle emitters that happen to share a color.

## Effect graph

```text
subject/event state
  → effect-specific geometry or instance attributes
  → flow-facing masks or analytic age
  → material response
  → pool/lifetime ownership
  → HDR and bloom contribution
```

Read [references/procedural-vfx-system.md](01_procedural_vfx_system.md)
for ship-conforming reentry shells, capsule wakes, dense instanced
spark/debris pools, holographic projection shells, HDR hierarchy, and
implementation limits.

## Rules

- Every layer must have a role in silhouette, motion, illumination, or residue.
- Use normalized lifetime curves instead of scattered time constants.
- Derive secondary motion from the same flow or event direction.
- Keep bloom as a response to HDR emission, not as the effect's only shape.
- Pool instances and trails; do not allocate per burst.
- Filter every periodic band by pixel footprint, and fade it to the band's own
  mean rather than to zero.
- Measure rim incidence in a frame built from an inverse-transpose normal matrix.
- Give a multi-shape transition one shared normalised range and complementary
  discards, never per-shape ranges or overlapping coverage.
- Expose spawn, simulation, overdraw, and luminance debug views.
- Include a non-bloom baseline that remains legible.

## Routing boundary

Use [`temporal-surfaces`](../temporal_surfaces/GUIDE.md) only for the screen-space
frost/touch-history pipeline. Use [`precipitation-surfaces`](../precipitation_surfaces/GUIDE.md) for
falling rain or snow, splash flipbooks, and weather events that alter ground
materials. Keep subject-space plasma, generated wakes, sparks, pooled debris,
and additive projection shells in this module.
