# Raymarched Space Effects

> Docs-only local adaptation. Load numbered references only when exact formulas, numeric contracts, or failure diagnostics are needed; upstream executable examples and assets are intentionally omitted.

Treat these effects as numerical renderers with explicit integration state. The visual character depends on coordinate choice, step policy, and how rays interact with emissive structures.

## Workflow

1. Define the effect-space transform and camera ray.
2. Choose a physical, physically inspired, or purely artistic bending model.
3. Bound the integration domain.
4. Track ray position, direction, throughput, and accumulated radiance.
5. Detect crossings with disks, shells, throats, or event boundaries.
6. Sample the background only after integration terminates.
7. Add diagnostics for trajectory, step count, and termination reason.

Read [references/curved-ray-integrators.md](01_curved_ray_integrators.md)
for the RK4 wormhole, artistic curved-ray accretion integrator, disk
composition, and implementation defects.

## Constraints

- Do not call a UV swirl “gravitational lensing.”
- Cap iterations and provide early termination.
- Use continuous crossing tests for thin structures.
- Keep numerical stability independent from frame rate.
- Separate the integrator from shading of the accretion disk or wormhole interior.
- Provide a cheaper approximation for non-hero views.

## Routing boundary

Use [`procedural-vfx`](../procedural_vfx/GUIDE.md) for ordinary particles, trails, plasma, and event
effects. This module is for per-pixel numerical ray integration through curved
or bounded space-effect domains.
