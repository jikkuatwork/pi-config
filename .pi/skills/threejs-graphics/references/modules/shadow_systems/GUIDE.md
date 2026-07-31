# Shadow Systems

> Docs-only local adaptation. Load numbered references only when exact formulas, numeric contracts, or failure diagnostics are needed; upstream executable examples and assets are intentionally omitted.

Use a single shadow map only when its receiver region is genuinely bounded. For large moving views, make shadow coverage an explicit spatial hierarchy.

## Cached clipmap workflow

1. Define concentric light-space square levels.
2. Snap each level center to its own texel grid.
3. Cross-fade adjacent levels in shader space.
4. Refresh near levels continuously.
5. Cache coarse levels and update them under a frame budget.
6. Invalidate intersecting levels when important casters or streamed terrain change.
7. Scale normal bias by world-space texel width.

Read [references/cached-clipmap-shadows.md](01_cached_clipmap_shadows.md) before implementing a large-world directional light.

## Failure conditions

- projection centers move by fractions of a texel;
- shader containment does not match the map's committed center;
- all cascades refresh every frame without evidence;
- coarse levels freeze moving casters indefinitely;
- depth texture samples occur in divergent fragment control flow;
- the same normal bias is used across radically different texel sizes;
- level boundaries become visible under camera motion.

## Routing boundary

Use this module for light-space directional shadow maps. Use
[`screen-space-ambient-occlusion`](../screen_space_ambient_occlusion/GUIDE.md) for view-dependent ambient
visibility; AO is not a replacement for cast shadows.
