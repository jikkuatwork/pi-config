# Procedural Fields

> Docs-only local adaptation. Load numbered references only when exact formulas, numeric contracts, or failure diagnostics are needed; upstream executable examples and assets are intentionally omitted.

Do not start by stacking noise. Start by defining the fields the object physically or stylistically needs.

## Field contract

Before shader code, write a field bundle:

```text
coordinates
  → macro form
  → meso structure
  → derived causes
  → material channels
```

Example:

```text
sphereDirection
  → warpedDirection
  → elevation + ridges + craterDepth
  → slope + cavity + latitude + moisture
  → biome + color + roughness + bump
```

## Required workflow

1. Choose coordinates that remain stable under camera and object motion.
2. Lock real or perceptual scale for each frequency band.
3. Create named primary fields. Never hide the whole look in one expression.
4. Derive secondary fields from causes: slope from normals, shore from sea-level distance, wear from exposure, dirt from cavity.
5. Reuse the same fields across color, roughness, normal, displacement, emission, and scattering.
6. Add debug output for every named field.
7. Filter high-frequency fields by derivatives, tessellation density, or camera distance.

Read [references/field-stack-recipes.md](01_field_stack_recipes.md)
before implementation. It records sphere, terrain, water, and
structured-placement field contracts plus common parity defects.

## Non-negotiable rules

- Independent noise per channel produces visual soup. Share structure.
- Domain warp the coordinates, not every result.
- Warp spherical coordinates tangentially, then renormalize.
- Use different frequency bands for silhouette, regions, surface breakup, and micro-normal.
- Do not displace geometry with frequencies the mesh cannot represent.
- Keep categorical masks broad enough to avoid isolated “bubble” regions.
- Parameter names must describe perception: `ridgeWidth`, `coastBlend`, `cavityDarkening`, not `noise3Amount`.

## Routing boundary

Use this module when the shared field model is the task. Use
[`procedural-materials`](../procedural_materials/GUIDE.md) when the task is channel assembly and material
response, and [`procedural-planets`](../procedural_planets/GUIDE.md) when the deliverable is a complete
planetary body.
