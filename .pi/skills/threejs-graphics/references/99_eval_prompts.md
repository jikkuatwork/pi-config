# Eval Prompts

Use these to check trigger precision and progressive routing.

## Should trigger

1. `Build a Three.js FFT ocean with spectral cascades, persistent Jacobian foam, underwater absorption, and debug views.`
   - Expected route: `01_core.md`, `spectral_ocean`, then `visual_validation`.

2. `Review this Three.js procedural planet: the terrain, biome colors, normals, and atmosphere drift apart between orbit and close-up.`
   - Expected route: `procedural_planets`; add `procedural_fields` and `atmosphere_aerial_perspective` only for the diagnosed boundaries.

3. `Create a stable Three.js chase/orbit camera with body-relative up, explicit handoffs, and a floating origin.`
   - Expected route: `camera_direction`, not general post-processing.

4. `Our Three.js scene has GTAO, bloom, exposure, and LUT grading but pass ownership and tone mapping are wrong.`
   - Expected route: `image_pipeline` plus only the affected atomic image modules.

## Should not trigger

1. `What arguments does THREE.BoxGeometry accept?`
   - Expected: use current Three.js documentation; this skill is not an API cheat sheet.

2. `Build the same water effect in Babylon.js.`
   - Expected: do not trigger; this adaptation is Three.js-specific.

3. `Polish the responsive CSS and accessibility of this dashboard.`
   - Expected: use the UI/UX skill, not Three.js graphics, unless the dashboard contains a Three.js visualization being changed.

4. `Install the upstream Threejs Awesome Graphics npm package globally.`
   - Expected: do not execute an install through this skill; explain the docs-only boundary and request explicit approval under package-install safety rules.

## Edge cases

1. `Make this Three.js scene beautiful.`
   - Trigger, but first establish a visual contract and identify the smallest missing authored system. Do not route directly to bloom or load every module.

2. `Add rain to this Three.js scene.`
   - Route to `precipitation_surfaces` for world-space rain affecting ground/materials; route to `temporal_surfaces` for wet-window screen-space refraction.

3. `The ocean is only a small pool seen from above.`
   - Route to `water_optics`, not `spectral_ocean`, unless directional FFT synthesis is explicitly required.

4. `Implement one bloom pass.`
   - Route to `bloom` alone. Load `image_pipeline` only if shared buffers/order with other effects are part of the task.

5. `Copy the exact upstream cloud example and run its gallery.`
   - Explain that examples/runtime/assets were intentionally omitted; perform a fresh executable, dependency, network, and license review and ask permission before fetching or running them.

## Expected behavior

- Loads `references/INDEX.md` and `01_core.md` first.
- Loads only the smallest relevant `modules/*/GUIDE.md` set.
- Opens numbered deep references only for concrete implementation details.
- Inspects the target Three.js version/backend before choosing exact APIs.
- Does not install dependencies, run upstream examples, or claim visual validation that did not occur.
- Produces a visual contract, mechanism, diagnostics, evidence, and caveats.
