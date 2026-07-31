# Screen-Space Ambient Occlusion

> Docs-only local adaptation. Load numbered references only when exact formulas, numeric contracts, or failure diagnostics are needed; upstream executable examples and assets are intentionally omitted.

AO estimates missing ambient visibility. It must modulate indirect lighting, not repaint all scene color with a dark multiply.

## Workflow

1. Verify linear depth and view-space normals.
2. Reconstruct view position consistently.
3. Sample horizon visibility in a controlled radius.
4. Estimate AO and optional bent normal.
5. Denoise with depth/normal-aware filters.
6. Apply to indirect diffuse and environment response.

Read [references/gtao-bent-normal-pipeline.md](01_gtao_bent_normal_pipeline.md).

## Failure conditions

- direct light and emission are darkened;
- radius is specified only in pixels;
- foreground silhouettes cast thick screen-space halos;
- depth discontinuities are blurred together;
- AO remains strong at distances where its world radius is subpixel;
- bent normals are treated as ordinary geometric normals;
- the implementation claims temporal accumulation even though this path has none.

## Routing boundary

This module owns GTAO gathering, bent normals, denoising, and AO application.
Use [`image-pipeline`](../image_pipeline/GUIDE.md) only when its depth/normal buffers or pass order
must be coordinated with other image-space systems.
