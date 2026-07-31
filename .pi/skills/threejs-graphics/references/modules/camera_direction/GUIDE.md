# Camera Direction

> Docs-only local adaptation. Load numbered references only when exact formulas, numeric contracts, or failure diagnostics are needed; upstream executable examples and assets are intentionally omitted.

Treat the camera as an authored visual system, not a passive viewport. Compose
the subject, establish scale, choose a stable up frame, and make every mode
handoff explicit.

## Build order

1. Define the design frame: subject size, screen occupancy, lens, near/far,
   motion, and horizon/up convention.
2. Build camera targets in semantic frames: ship, body surface, docking axis,
   or scene-authored shot.
3. Derive position and orientation independently, then combine them once.
4. Add input orbit/look only inside declared yaw/pitch and spatial constraints.
5. Add frame-rate-independent follow or a bounded spring where the reference
   uses inertia.
6. Snapshot and restore camera projection/state when a scene owns it.
7. Test mode transitions, cuts, pointer-lock reacquisition, resize, and large
   coordinates.

Read [references/camera-rig-and-cinematic-systems.md](01_camera_rig_and_cinematic_systems.md)
for exact chase/side/orbit rigs, projection values, transition
rules, floating-origin shot, pointer controls, and implementation limits.

## Non-negotiable rules

- Use subject dimensions to derive offsets; do not tune one fixed distance for
  differently scaled assets.
- For planetary motion, derive up from the dominant body rather than global Y.
- Interpolate position with `lerp` and orientation with `slerp`.
- During an explicit handoff, use one interpolation stage. Do not stack a
  transition blend and a second follow smoother over the same interval.
- Re-sync yaw/pitch from the camera when pointer lock is acquired.
- Update the projection matrix whenever FOV, near, far, or aspect changes.
- Keep stars or infinite backgrounds camera-relative when large translation
  would create false parallax or precision loss.
- Restore camera and input ownership on scene disposal.

## Routing boundary

Use [`procedural-animation`](../procedural_animation/GUIDE.md) for object motion timelines, springs,
docking, staging, and debris. This module owns how the scene is viewed and how
camera modes hand off.
