# Spectral Ocean

> Docs-only local adaptation. Load numbered references only when exact formulas, numeric contracts, or failure diagnostics are needed; upstream executable examples and assets are intentionally omitted.

Treat an ocean as a sampled stochastic wave field with explicit frequency-space ownership. Do not approximate this target with a pile of Gerstner waves, scrolling normal maps, or unrelated foam noise.

## Build order

1. Define the sea-state spectrum and deterministic Gaussian seed.
2. Partition wavelengths into disjoint cascades.
3. Validate the inverse FFT independently with analytic inputs.
4. Generate and conjugate-pack the initial spectrum.
5. Evolve packed displacement and derivative fields in frequency space.
6. Inverse-transform every packed field with explicit inter-step barriers.
7. Assemble displacement, derivatives, and persistent Jacobian foam maps.
8. Shade from summed cascade displacement and derivatives.
9. Add sub-grid detail only below the resolved simulation bands.
10. Expose spectrum, height, slopes, Jacobian, and foam-history diagnostics.

Read [references/spectral-cascade-ocean-system.md](01_spectral_cascade_ocean_system.md) before implementing or auditing a spectral ocean.

## Non-negotiable gates

- Require a power-of-two grid and a passing FFT impulse/frequency test.
- Keep cascade wavenumber intervals disjoint.
- Derive normals from transformed derivatives, not a detached normal texture.
- Detect breaking from the horizontal-displacement Jacobian.
- Persist foam in simulation state; do not infer all foam anew per frame.
- Submit FFT stages with the synchronization required by the active backend.
- Share sun and sky parameters between the visible sky and ocean reflection.
- Transport opposite-medium structures by FORWARD projection: rasterize their own vertices at their refracted screen positions. On an open interface, never trace a water pixel backward to a source screen position, and never gate transported radiance on whether a direction's vanishing point lands on screen. (A bounded pool seen only from air can still use the screen-space offset in [`water-optics`](../water_optics/GUIDE.md); an ocean whose camera changes medium cannot.)
- Bracket a water-side crossing solve by the critical angle (`tan θc ≈ 1.1346` times the ray's own distance from the interface), not by the camera-to-source span.
- Scale spectral LOD by PIXEL FOOTPRINT — `distance² · pixelAngle / heightGap` — and apply it to vertex displacement, derivatives, and every band that rides them. Fade each band to its own mean when the band is an albedo or radiance term.
- Filter the critical-angle domain test over about one output pixel; never filter the interface normal itself to stabilize what is transported through it.
- Gate the entire optical side from one camera-medium state; do not choose above/below behavior per triangle.
- Terminate distant underwater sightlines with a safely submerged terrain rim; do not mask an empty seabed/ocean horizon with a view-aligned scattering layer.
- Keep a deterministic seed and fixed-camera capture for comparisons.

## Route elsewhere

- Use [`water-optics`](../water_optics/GUIDE.md) for bounded water, screen-space refraction, depth thickness, shoreline absorption, and analytic wave surfaces. Its screen-space refraction is valid there because the camera stays in air and the volume is bounded; it is not a substitute for this module's forward projection across an open interface.
- Add [`procedural-vfx`](../procedural_vfx/GUIDE.md) only when crest spray or interaction splashes are required.
- Add [`visual-validation`](../visual_validation/GUIDE.md) for cross-seed, temporal, and GPU evidence.
