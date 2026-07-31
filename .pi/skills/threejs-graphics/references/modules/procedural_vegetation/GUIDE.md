# Procedural Vegetation

> Docs-only local adaptation. Load numbered references only when exact formulas, numeric contracts, or failure diagnostics are needed; upstream executable examples and assets are intentionally omitted.

Represent a plant as a growth hierarchy plus rendering adaptations. Do not model it as randomly scattered cylinders.

## Build sequence

1. Define a per-level species table: length, radius, taper, child count, emergence range, angle, twist, gnarliness, sections, radial segments.
2. Grow branches iteratively from a queue so recursion depth and budgets remain inspectable.
3. Emit each branch as oriented rings with an intentional UV seam.
4. Update section orientation from:
   - inherited direction;
   - stochastic curvature;
   - tropism or external force;
   - optional attraction constraints.
5. Spawn children with stratified longitudinal slots and independently permuted angular slots.
6. Generate leaves only after branch topology is stable.
7. Build foliage normals from both card orientation and local crown volume.
8. Choose wind scope explicitly. Leaf-root deformation, branch hierarchy deformation, and whole-tree sway are separate systems.

Read [references/structured-ash-growth-system.md](01_structured_ash_growth_system.md) and preserve its preset, continuation, child-placement, leaf, material, wind, and composition contracts before tuning.

## Visual failure conditions

- branches form visible helices;
- dense grass ignores terrain height or clump-level variation;
- every child emerges at the same relative height;
- bark texture scale changes with branch radius;
- leaves reveal flat card normals under rotation;
- leaf wind moves card roots instead of remaining anchored;
- branch wind is claimed to match a reference whose branches are static;
- different seeds change species identity rather than controlled variation;
- geometry cost grows without a per-level budget;
- surface-following stems are offset from the host or flip normals across seams;
- ivy branches ignore the tangent plane while attached;
- leaf wind rotates around the card center instead of the petiole.

## Routing boundary

Use [`procedural-geometry`](../procedural_geometry/GUIDE.md) for generic branch-ring emission without a
growth model. This module owns species tables, vine and branch topology,
surface-following growth, foliage, grass fields, roots, and rooted wind.
