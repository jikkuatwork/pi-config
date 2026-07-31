# Temporal Surfaces

> Docs-only local adaptation. Load numbered references only when exact formulas, numeric contracts, or failure diagnostics are needed; upstream executable examples and assets are intentionally omitted.

Choose persistent history or procedural screen-space evolution explicitly. Do
not fake accumulation with time-only noise, and do not allocate history for an
effect whose complete state is analytic in time.

## Pipeline

```text
persistent surface: input -> ping-pong state -> blur -> structure -> refraction
procedural surface: time/coverage -> analytic field -> optical normal -> refraction/blur
```

Read [references/ping-pong-accumulation.md](01_ping_pong_accumulation.md)
for an exact frost pass graph, pointer-history channels, blur and refraction
coupling, and implementation defects that must be corrected.

Read [the refractive-window rain contract](02_refractive_window_rain.md)
for analytic droplet layers, optical normals, background refraction,
resolution-bounded blur, controls, and failure modes.

## Rules

- Separate persistent state, analytic procedural state, and scene color.
- Preserve separate visible-mask and tilt-response channels.
- Use half-float for this history path unless a measured lower format is equivalent.
- Convert per-frame history decay to frame-rate-independent decay.
- Run the two-pass scene blur at reduced resolution.
- Pre-render static procedural textures once.
- Define and test resize/reset behavior for both history targets and static targets.
- Do not route world footprints, object-UV paint, or simulation-plane wetness here; this module is view-aligned or screen-space.

## Routing boundary

Use [`procedural-vfx`](../procedural_vfx/GUIDE.md) for world- or object-space residue and particles.
Use [`precipitation-surfaces`](../precipitation_surfaces/GUIDE.md) for world-space rain, puddles, snow, and
weather-surface coupling. This module owns view-aligned wet-glass optics and
screen-space persistent history.
