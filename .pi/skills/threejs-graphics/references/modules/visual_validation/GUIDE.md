# Visual Validation

> Docs-only local adaptation. Load numbered references only when exact formulas, numeric contracts, or failure diagnostics are needed; upstream executable examples and assets are intentionally omitted.

Evaluate the mechanism that creates the image. A beautiful hero screenshot can hide unstable fields, broken depth, seed failures, or post-processing dependence.

## Validation sequence

1. Freeze deterministic inputs.
2. Capture the no-post baseline.
3. Capture system-specific diagnostic views.
4. Test the intended camera-distance envelope.
5. Sweep representative seeds and parameter extremes.
6. Test motion and temporal stability.
7. Record image, geometry, memory, and timing budgets.
8. Keep a small regression set tied to visual invariants.

Read [references/graphics-validation-protocol.md](01_graphics_validation_protocol.md)
for visual contracts, required inspection controls, mechanism-specific
evidence, temporal checks, budgets, and explicit rejection criteria.

## Required evidence

- fixed camera and seed manifest;
- final and no-post captures;
- field/pass diagnostic mosaic;
- near, design, and far camera views;
- at least one stress seed;
- frame-time and render-target inventory;
- written invariants and known compromises.

## Failure conditions

- approval relies on a single frame;
- post-processing cannot be disabled per pass;
- random seeds are not reproducible;
- GPU time is inferred only from CPU frame time;
- temporal artifacts are judged from still images;
- comparison thresholds ignore intentional stochastic pixels without stabilizing them.

## Routing boundary

This module evaluates an implementation; it does not supply the implementation
mechanism. Load the subject or image-effect module first, then use this protocol
to decide whether the result is acceptable.
