# Image Pipeline

> Docs-only local adaptation. Load numbered references only when exact formulas, numeric contracts, or failure diagnostics are needed; upstream executable examples and assets are intentionally omitted.

Use this module only when composing several image-space systems or defining shared buffers. For one effect, load its atomic module instead.

Load:

- [`screen-space-ambient-occlusion`](../screen_space_ambient_occlusion/GUIDE.md) for GTAO, bent normals, denoising, or AO application;
- [`bloom`](../bloom/GUIDE.md) for HDR extraction and bloom;
- [`exposure-color-grading`](../exposure_color_grading/GUIDE.md) for metering, adaptation, tone mapping, LUTs, and output conversion.

The pipeline must expose its signals and ordering. Do not install a pile of effects and tune the final frame blindly.

## Signal order

```text
scene HDR color + depth + normals + albedo where required
  → lighting-related screen effects
  → atmosphere/transparency composition
  → bloom
  → exposure
  → tone mapping
  → grading
  → lens/presentation effects
  → output conversion
```

Read [references/production-image-pipeline.md](01_production_image_pipeline.md)
for four production pass graphs, their buffer/resolution contracts, and the
ownership boundaries between whole-scene and effect-local graphs.

## Rules

- Tone-map once.
- Keep HDR bloom before tone mapping.
- Meter exposure from a small luminance target, not the final 8-bit screen.
- Separate direct and indirect light before applying bent-normal ambient tint when possible.
- Upsample low-resolution effects with depth/normal-aware weights.
- Build pass toggles and effect-only views before tuning.
- UI rendered in the same target needs an explicit protection strategy.
- Do not load all atomic post modules by default. Route only the effects actually requested.

## Routing boundary

Use this module when multiple image-space systems must share buffers, ordering,
or output ownership. For one isolated effect, use its atomic module without
loading this coordinator.
