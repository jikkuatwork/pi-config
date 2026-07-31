# Procedural Planets

> Docs-only local adaptation. Load numbered references only when exact formulas, numeric contracts, or failure diagnostics are needed; upstream executable examples and assets are intentionally omitted.

Build a planet as a coupled field system evaluated on a unit direction. The same geological causes must drive geometry, color, roughness, normal, atmosphere handoff, and distance filtering.

## Required build order

1. Establish planet-space direction, radius, sea level, and world-unit scale.
2. Build macro silhouette fields before any surface material.
3. Add named geological structures: continents, basins, ridges, craters, lava fields, or ice.
4. Derive slope, cavity, altitude, latitude, exposure, and shoreline fields.
5. Classify broad biomes from those causes.
6. Derive displacement, color, roughness, and normal from the shared field bundle.
7. Filter bands by represented mesh scale and camera altitude.
8. Couple the material to atmosphere and lighting using the same planet transform.

Read [references/planet-field-and-atmosphere-systems.md](01_planet_field_and_atmosphere_systems.md) for terrain, biome, gas-giant, material, altitude-LOD, and atmosphere-handoff mechanisms, including a known CPU/GPU field-parity failure mode.

## Non-negotiable constraints

- Domain-warp tangentially and renormalize; do not distort the sphere radially.
- Craters need floor, wall, rim, and optional ejecta—not dark circles.
- Continents and biomes must be region fields, not isolated threshold bubbles.
- Geometry displacement and shader normals must describe the same height function.
- Close detail may disappear with altitude; the macro silhouette may not.
- Expose individual field views and a displacement exaggeration mode.

## Completion test

The body must remain intentional in:

- unlit silhouette;
- flat albedo with no atmosphere;
- grazing directional light;
- orbit view;
- close approach;
- biome-mask and normal-only views;
- at least three seeds without losing the chosen planetary identity.

## Routing boundary

Use [`procedural-fields`](../procedural_fields/GUIDE.md) for a reusable field bundle without a complete
body, and [`atmosphere-aerial-perspective`](../atmosphere_aerial_perspective/GUIDE.md) for scattering independent
of planet generation. This module owns the coupled planetary surface.
