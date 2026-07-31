# Bloom

> Docs-only local adaptation. Load numbered references only when exact formulas, numeric contracts, or failure diagnostics are needed; upstream executable examples and assets are intentionally omitted.

Bloom is a camera/display response to bright HDR signal. Establish scene exposure and emissive luminance before tuning blur.

## Workflow

1. Inspect pre-tone-map luminance.
2. Choose which scene values should bloom.
3. Choose a single-node or dual selective-render ownership model.
4. Calibrate threshold, radius, smooth width, and strength in HDR.
5. Restore all substituted materials transactionally for selective passes.
6. Composite before exposure/tone mapping.
7. Validate base, contribution, and final views.

Read [references/hdr-bloom-system.md](01_hdr_bloom_system.md) for the
HDR ordering, dual selective-bloom transaction, compact emissive hierarchy,
and the costs and limits of each ownership model.

Apply the material substitution/restoration ownership pattern in the
reference before adding selective bloom to a composed scene.

## Failure conditions

- bloom creates the only visible form of an effect;
- all bright materials share one arbitrary emission multiplier;
- threshold is tuned after tone mapping;
- selective bloom requires mutating scene materials every frame without restoration guarantees;
- transparent particles disappear from extraction because pass ownership is unclear;
- bloom radius changes wildly with resolution;
- highlights become gray because energy is clamped too early.

## Routing boundary

Use [`exposure-color-grading`](../exposure_color_grading/GUIDE.md) for metering, adaptation, tone mapping,
and LUTs. Load [`image-pipeline`](../image_pipeline/GUIDE.md) only when bloom must be composed with
several shared image-space systems.
