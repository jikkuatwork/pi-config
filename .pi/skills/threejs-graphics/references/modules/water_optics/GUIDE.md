# Water Optics

> Docs-only local adaptation. Load numbered references only when exact formulas, numeric contracts, or failure diagnostics are needed; upstream executable examples and assets are intentionally omitted.

Treat water as geometry motion, surface orientation, and a participating optical layer. A blue transparent material is not a water system.

For large stochastic seas driven by directional spectra and GPU FFTs, use
[`spectral-ocean`](../spectral_ocean/GUIDE.md) instead.

## Analytic surface build order

1. Define wave bands and evaluate displacement.
2. Derive the normal analytically from the same waves.
3. Choose displaced geometry or explicitly normal-only water.
4. Establish scene-color ownership for heuristic refraction.
5. Declare whether absorption uses true depth or a fallback path-length estimate.
6. Blend analytic reflection/refraction through side-aware Fresnel.
7. Derive foam and glints from the shared wave response.
8. Filter unresolved normal bands from derivatives.

Read [references/water-surface-system.md](01_water_surface_system.md)
for the exact five-wave displaced ocean, six-band normal-only water, optical
hierarchy, and the limits that distinguish both from the spectral-ocean module.

## Failure conditions

- normal texture motion does not agree with displaced crests;
- heuristic refraction can sample foreground objects but the limitation is undisclosed;
- fallback path length is presented as reconstructed scene thickness;
- bounded pool caustics are a decorative projection detached from simulated
  height normals;
- micro-waves alias into sparkling noise;
- foam is a scrolling texture unrelated to the shared crest metric;
- Fresnel is replaced by constant opacity;
- reflection, refraction, and transparency are all added without energy control.

## Routing boundary

Use [`spectral-ocean`](../spectral_ocean/GUIDE.md) for stochastic directional spectra, FFT
cascades, Jacobian breaking, persistent ocean foam, and any interface the camera
crosses — this module's heuristic screen-refraction offset assumes a bounded
volume seen from air, and an open interface needs that module's forward
projection instead. Use
[`precipitation-surfaces`](../precipitation_surfaces/GUIDE.md) for rain-driven puddle wetness, ripple masks,
and weather-coupled splashes on ground surfaces. This module owns authored
analytic waves, bounded heightfield simulation, ray-traced pool-volume optics,
and bounded-water optics.
