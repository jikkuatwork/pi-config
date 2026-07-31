# Parallax Occlusion Mapping

> Docs-only local adaptation. Load numbered references only when exact formulas, numeric contracts, or failure diagnostics are needed; upstream executable examples and assets are intentionally omitted.

Treat relief as a coupled intersection, coverage, normal, and shadow system.
Do not stop at offsetting texture coordinates.

## Build order

```text
tangent frame and height convention
  -> view-ray march and hit refinement
  -> bounded or curved silhouette coverage
  -> shared marched sampling
  -> height-derived shading normal
  -> light-ray self-shadow march
  -> relief-aware cast/received shadow positions
```

Read [references/silhouette-relief-contract.md](01_silhouette_relief_contract.md)
for the intersection contract, flat and curved silhouette modes, shell
inflation, shadow integration, quality controls, and diagnostics.

## Required controls

- world or UV relief scale;
- minimum and maximum view-march layers;
- silhouette bounds and feathering;
- curved-surface curvature or curvature callback;
- horizon trimming and edge erosion;
- self-shadow steps, bias, and strength;
- geometry, carved, and full-relief shadow modes;
- height, coverage, marched UV, normal, and shadow diagnostics.

## Failure conditions

- color, normal, and roughness rebuild separate view marches unintentionally;
- a curved host uses flat silhouette clipping at its geometric horizon;
- an inflated shell changes the relief floor instead of keeping it on the base surface;
- alpha-tested beauty coverage is assumed to carve shadow maps automatically;
- derivative sampling runs behind discard on drivers where it erodes coverage;
- grazing rays divide by an unbounded view-space Z component;
- relief self-shadowing darkens fill or emission indiscriminately.

## Routing boundary

Use [`procedural-materials`](../procedural_materials/GUIDE.md) when no ray-marched height intersection or
silhouette ownership is required. Use [`procedural-geometry`](../procedural_geometry/GUIDE.md) when the
silhouette must be actual mesh topology rather than a view-dependent relief.
