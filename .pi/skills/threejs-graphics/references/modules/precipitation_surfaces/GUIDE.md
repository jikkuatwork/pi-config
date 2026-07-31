# Precipitation Surfaces

> Docs-only local adaptation. Load numbered references only when exact formulas, numeric contracts, or failure diagnostics are needed; upstream executable examples and assets are intentionally omitted.

Treat weather as a coupled event, particle, and surface-response system. Do not
add rain or snow particles that are visually disconnected from the ground.

## Build order

```text
weather envelope
  -> falling precipitation volume
  -> world/object surface mask
  -> displaced or optical surface response
  -> impact residue and splashes
  -> shared lighting/post presentation
```

Read [references/precipitation-surface-systems.md](01_precipitation_surface_systems.md)
for snow accumulation, object capping, wrapped precipitation volumes, wet
puddle masks, procedural ripple normals, splash placement, debug outputs, and
licensing boundaries.

## Required controls

- precipitation density and speed;
- wind direction and strength;
- shared weather progress or coverage;
- wetness, snow, or puddle mask threshold and softness;
- ripple or drift normal strength;
- surface roughness response;
- particle/splash opacity;
- debug modes for masks, normals, particles, and event progress.

## Failure conditions

- falling precipitation ignores the wind or timing used by surface response;
- snow height and snow normals come from different fields;
- model snow sticks to vertical faces without an upward-facing filter;
- puddles only lower roughness without a mask, normal response, or ripples;
- splashes appear on downward or hidden faces;
- rain streaks allocate per drop or fail to wrap around the camera;
- temporal wetness is faked with unrelated time noise;
- the license boundary for GPL-derived rain code is removed or obscured.

## Routing boundary

Use [`water-optics`](../water_optics/GUIDE.md) for bounded pool simulation, caustics, Fresnel,
refraction, and Beer-Lambert water volumes. Use [`procedural-vfx`](../procedural_vfx/GUIDE.md) for
general sparks, plasma, trails, and non-weather particles. Use
[`temporal-surfaces`](../temporal_surfaces/GUIDE.md) for screen-space touch history or frost clearing.
This module owns precipitation events and the surfaces they visibly alter.
