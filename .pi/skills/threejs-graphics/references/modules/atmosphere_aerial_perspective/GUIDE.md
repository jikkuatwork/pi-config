# Atmosphere and Aerial Perspective

> Docs-only local adaptation. Load numbered references only when exact formulas, numeric contracts, or failure diagnostics are needed; upstream executable examples and assets are intentionally omitted.

Treat sky rendering and aerial perspective as two views of the same scattering model. They must share radii, density profiles, coefficients, sun direction, exposure scale, and coordinate transforms.

## Choose the implementation tier

- Small scene with no orbital camera: analytic height/distance approximation.
- Planetary ground-to-space camera: ray integration or precomputed LUTs.
- Large geospatial world: LUTs plus world-to-planet transform, altitude correction, and depth-aware aerial perspective.

Read [references/atmosphere-system-contract.md](01_atmosphere_system_contract.md)
before implementation. It separates the LUT/ellipsoid architecture from
dynamic integration and the shell/post handoff.

## Required outputs

- sky radiance;
- sun transmittance/color;
- segment transmittance from camera to visible surface;
- segment inscattering;
- optional sky irradiance for materials;
- explicit scale conversion between world units and atmosphere units.

## Failure conditions

- sky and terrain haze use different sun directions or coefficients;
- the atmosphere is a uniformly transparent sphere;
- camera altitude is measured in a local flat frame during orbital motion;
- scene depth is treated as linear when it is not;
- exposure is used to hide incorrect radiance scale;
- atmosphere fades abruptly at shell entry.

## Routing boundary

This module owns molecular/aerosol sky scattering and surface-segment aerial
perspective. Use [`volumetric-clouds`](../volumetric_clouds/GUIDE.md) for weather-shaped cloud density,
temporal cloud reconstruction, and cloud shadows.
