# Volumetric Clouds

> Docs-only local adaptation. Load numbered references only when exact formulas, numeric contracts, or failure diagnostics are needed; upstream executable examples and assets are intentionally omitted.

Cloud quality comes from density organization, lighting, and temporal stability—not from increasing march steps over unstructured noise.

## System order

1. Define the cloud volume and layer bounds.
2. Generate or source weather, base-shape, detail, and turbulence fields.
3. Build a density function with vertical and weather profiles.
4. Raymarch only the bounded occupied segment.
5. Integrate transmittance and lighting front-to-back.
6. Reconstruct low-resolution output temporally.
7. Project a separate low-cost cloud-shadow solution.

Read [references/weather-volume-and-reconstruction.md](01_weather_volume_and_reconstruction.md) before implementing or auditing the cloud system.

## Required controls

- coverage, cloud type, precipitation, and anvil bias;
- base/top altitude and vertical density profile;
- shape/detail scales and erosion;
- wind for each field;
- primary step count, light step count, and empty-space policy;
- history weight and disocclusion threshold;
- cloud-shadow extent, resolution, and update rate.

## Failure conditions

- density is only `fbm(position)`;
- the raymarch traverses the full camera range;
- detail noise adds density instead of eroding shaped masses;
- temporal history is accepted across disocclusion;
- shadows use the full beauty raymarch;
- every cloud layer shares the same wind and density profile.

## Routing boundary

Use [`atmosphere-aerial-perspective`](../atmosphere_aerial_perspective/GUIDE.md) for molecular/aerosol scattering
without weather density. This module owns weather-shaped cloud volumes,
reconstruction, cloud lighting, and cloud shadows.
