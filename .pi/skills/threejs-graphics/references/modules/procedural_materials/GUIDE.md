# Procedural Materials

> Docs-only local adaptation. Load numbered references only when exact formulas, numeric contracts, or failure diagnostics are needed; upstream executable examples and assets are intentionally omitted.

Build a material from surface identity and causes. Color, roughness, metalness, normal, transmission, and emission should describe the same surface—not unrelated noise textures.

## Material graph order

```text
stable coordinates
  → structural fields
  → material identity weights
  → causal modifiers
  → filtered microstructure
  → PBR channels
  → lighting/shadow extensions
```

Read [references/procedural-pbr-system.md](02_procedural_pbr_system.md)
for atlas filtering, specular AA, planetary coordinates,
world-height wetness, per-instance dissolve, and authored PBR response bundles.

Read [the hybrid soil and moss contract](01_hybrid_soil_moss_surface.md)
for texture-backed PBR identity coupled to mound displacement, moisture,
cellular cracks, ground moss, and model-locked upward-face accumulation.

## Required controls

- real or perceptual texture scale;
- material identity weights;
- roughness range and micro-normal strength;
- the causal fields required by the selected material pattern;
- distance/derivative filtering;
- specular antialiasing;
- channel and mask debug modes.
- emissive-material debug modes when the material owns glow or volumetric
accumulation.

## Failure conditions

- every PBR channel samples independent noise;
- roughness is a scalar afterthought;
- high-frequency normals survive below one pixel;
- triplanar projection has visible orientation or scale seams;
- atlas padding is ignored under mipmapping;
- custom lighting removes energy conservation without an explicit stylized goal;
- post-processing is used to hide unstable highlights.

## Routing boundary

Use [`procedural-fields`](../procedural_fields/GUIDE.md) when the main problem is designing shared
scalar/vector causes. Use [`procedural-planets`](../procedural_planets/GUIDE.md) for a complete
orbit-to-close-approach body, not merely its material. Use
[`parallax-occlusion-mapping`](../parallax_occlusion_mapping/GUIDE.md) when a height field must own ray-marched
intersection, silhouette coverage, or relief-aware shadows.
