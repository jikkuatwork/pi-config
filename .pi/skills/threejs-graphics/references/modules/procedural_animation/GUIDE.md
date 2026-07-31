# Procedural Animation

> Docs-only local adaptation. Load numbered references only when exact formulas, numeric contracts, or failure diagnostics are needed; upstream executable examples and assets are intentionally omitted.

Animate semantic state, not unrelated transform curves. Define phases,
coordinate frames, velocities, and ownership before writing per-frame updates.

## Build order

1. Define the timeline phases and event boundaries.
2. Choose the frame for each motion: world, subject local, orbital radial,
   docking axis, or camera shot.
3. Derive target position/orientation from that frame.
4. Use analytic kinematics for authored travel and springs for responsive
   convergence.
5. Preserve world transforms when detaching children from a hierarchy.
6. Separate translation, alignment, spin, and secondary debris state.
7. Clamp integration delta and reset every state variable on replay/disposal.

Read [references/procedural-motion-and-docking-systems.md](01_procedural_motion_and_docking_systems.md)
for the launch, staging, docking, debris, spring, quaternion, and
frame-rate-independent response implementations.

## Non-negotiable rules

- Use elapsed seconds and `deltaSeconds`; do not make motion frame-count based.
- Derive orientation from direction/frame, then apply roll or spin as a
  separate quaternion.
- Decompose docking error into axial and radial components.
- Switch from spring convergence to an exact terminal pose at the end of a
  sequence.
- When reparenting an animated object, capture world position, quaternion, and
  scale before removal.
- Use seeded randomness when motion must be reproducible.
- Keep visual shake in a bounded envelope and separate it from trajectory.

## Routing boundary

Use [`camera-direction`](../camera_direction/GUIDE.md) for shot composition and camera handoffs.
Use [`procedural-vfx`](../procedural_vfx/GUIDE.md) when the deliverable is primarily plasma, sparks,
or effect pooling rather than object transform motion.
