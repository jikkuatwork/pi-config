# Three.js Graphics Router

Use this index as the first loaded reference. Read `01_core.md`, then load only the smallest relevant module set. Open a module's numbered references only when its `GUIDE.md` says the task needs exact formulas, numeric contracts, or deeper diagnostics.

## Scope

This is a docs-only, thin-head adaptation of a 24-skill Three.js graphics pack. One discoverable skill replaces 24 always-visible descriptions; detailed expertise remains behind topic routes. It assumes ordinary Three.js fundamentals and does not replace current official API documentation.

## Direction and motion

- **Camera composition, chase/orbit rigs, handoffs, floating origins, pointer look:** `modules/camera_direction/GUIDE.md`
- **Phase-based transforms, launch/docking, springs, staging, debris:** `modules/procedural_animation/GUIDE.md`

## Procedural content

- **Shared scalar/vector fields, domain warping, causal masks, coherent normals:** `modules/procedural_fields/GUIDE.md`
- **PBR channel assembly, hybrid texture/procedural surfaces, wetness, lava, emission:** `modules/procedural_materials/GUIDE.md`
- **Silhouette-aware parallax occlusion mapping and relief shadows:** `modules/parallax_occlusion_mapping/GUIDE.md`
- **Mesh writers, sweeps, lofts, profiles, hard-surface assemblies:** `modules/procedural_geometry/GUIDE.md`
- **Trees, grass, ivy, growth hierarchies, rooted wind:** `modules/procedural_vegetation/GUIDE.md`
- **Building massing, facade grammars, modules, material-slot compilation:** `modules/procedural_architecture/GUIDE.md`
- **Planet terrain, craters, biomes, altitude filtering, surface coupling:** `modules/procedural_planets/GUIDE.md`

## Environment and fluids

- **Rayleigh/Mie sky scattering and depth-aware aerial perspective:** `modules/atmosphere_aerial_perspective/GUIDE.md`
- **Weather-shaped volumetric clouds, reconstruction, cloud shadows:** `modules/volumetric_clouds/GUIDE.md`
- **FFT oceans, spectral cascades, Jacobian foam, open-interface underwater optics:** `modules/spectral_ocean/GUIDE.md`
- **Analytic waves, bounded pools, ripples, caustics, reflection/refraction:** `modules/water_optics/GUIDE.md`
- **World-space rain/snow coupled to puddles, wetness, or accumulation:** `modules/precipitation_surfaces/GUIDE.md`

## Effects

- **Curved-ray black holes, accretion disks, wormholes, bounded integration:** `modules/raymarched_space_effects/GUIDE.md`
- **Plasma, wakes, sparks, pooled debris, holographic shells:** `modules/procedural_vfx/GUIDE.md`
- **Screen-space frost history or wet-window refraction and blur:** `modules/temporal_surfaces/GUIDE.md`

## Lighting and final image

- **Stable directional cascades and cached clipmap shadows:** `modules/shadow_systems/GUIDE.md`
- **GTAO, bent normals, bilateral reconstruction, indirect-light application:** `modules/screen_space_ambient_occlusion/GUIDE.md`
- **HDR bloom and selective contribution ownership:** `modules/bloom/GUIDE.md`
- **Metered exposure, tone mapping, LUT grading, output color:** `modules/exposure_color_grading/GUIDE.md`
- **Shared depth/normal/history buffers and multi-effect pass ordering:** `modules/image_pipeline/GUIDE.md`

## Validation

- **Fixed-view contracts, debug mosaics, seed/scale sweeps, temporal and GPU evidence:** `modules/visual_validation/GUIDE.md`

## Boundary decisions

- Use `spectral_ocean` for open seas, FFT cascades, Jacobian breaking, or a camera crossing the interface; use `water_optics` for analytic waves and bounded pools viewed under a declared optical model.
- Use `precipitation_surfaces` for world-space weather affecting surfaces; use `temporal_surfaces` for view-aligned wet glass or screen-space persistent history.
- Use `procedural_fields` when shared causes are the main design problem, `procedural_materials` for channel response, and `procedural_planets` for a complete body.
- Load `image_pipeline` only when multiple image-space systems share buffers or ordering; one isolated effect should use its atomic module.
- Add `visual_validation` after the implementation module for non-trivial graphics work.

## Safety and provenance

- No upstream installer, package manifest, executable script, gallery, implementation example, shader file, or binary asset is included.
- Do not install or run upstream code without a fresh review and explicit user approval.
- Exact Three.js, WebGPU, TSL, and post-processing APIs are version-sensitive. Inspect the target project's installed version and renderer path.
- Read `90_provenance.md` for the source revision, mixed-license boundary, scans, and omissions.
- Read `99_eval_prompts.md` only when evaluating trigger or routing behavior.
