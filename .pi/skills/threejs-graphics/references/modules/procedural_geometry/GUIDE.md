# Procedural Geometry

> Docs-only local adaptation. Load numbered references only when exact formulas, numeric contracts, or failure diagnostics are needed; upstream executable examples and assets are intentionally omitted.

Generate geometry from a semantic plan and an explicit coordinate frame. Triangle emission is the final compilation step, not the design model.

## Build order

1. Define dimensions and semantic segments.
2. Generate a centerline, boundary, profile, or placement plan.
3. Build the mechanism-appropriate local parameterization or branch orientation.
4. Emit vertices with intentional seams and material ownership.
5. Generate UVs from real distance.
6. Validate winding, normals, tangents, bounds, and degenerates.
7. Select merging, instancing, or LOD by update and material behavior.

Read [references/profile-sweeps-and-mesh-writers.md](02_profile_sweeps_and_mesh_writers.md)
for the exact sculpted-frame profile, rail emission, tree rings, semantic mesh
writer, and their observed scaling limits.

Read
[references/complete-submarine-assembly.md](01_complete_submarine_assembly.md)
for the exact dimensioned object contract, shared loft/sweep kernel, UV-owned
apertures, semantic subassemblies, generated fittings, and complete-model
diagnostics.

Read
[references/vehicle-loft-and-projector-contract.md](03_vehicle_loft_and_projector_contract.md)
for parameter-curve section tracks, recess-opening sections, superellipse
volumes, spanwise airfoil lofts, warped outline plates, the two-plane paint
projector, load-deflected tyre carcasses, and their measured limits.

## Failure conditions

- profile orientation flips along a curve;
- caps reuse side vertices and create averaged edge normals;
- UV scale changes with segment count;
- arbitrary vertex merging destroys hard edges or material boundaries;
- generated dimensions are hidden in magic multipliers;
- instancing is used despite per-instance topology differences;
- triangle count is the only reported complexity metric;
- apertures, frames, and glazing use unrelated coordinate systems;
- complete object parts are positioned by late visual nudges instead of a
  shared dimension contract;
- a closed body ships inside-out because winding was never audited — check the
  enclosed signed volume, since a wireframe pass cannot see it;
- a section track uses per-segment easing, so every knot has zero slope and the
  lofted surface terraces under grazing light;
- a projected surface graphic is blended between planes without normalising the
  weights, printing the same graphic twice on a 45-degree shoulder.

## Routing boundary

This module owns reusable mesh emission. Use
[`procedural-materials`](../procedural_materials/GUIDE.md) when surface identity is primary,
[`procedural-architecture`](../procedural_architecture/GUIDE.md) for a building grammar, and
[`procedural-vegetation`](../procedural_vegetation/GUIDE.md) for a growth hierarchy; those subject modules
may then apply these geometry mechanisms.
