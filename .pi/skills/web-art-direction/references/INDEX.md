# Web Art Direction Router

Read `01_core.md` for every task, then load only the smallest route that matches the requested page.

## Scope

This skill owns the visual thesis and end-to-end composition of distinctive public-facing web experiences: marketing pages, launch sites, editorial stories, portfolios, campaigns, and interactive showcases. It combines selected design principles from Meng To's broad Skills library into one reviewed, docs-only workflow.

It does **not** replace:

- `ux` for application workflows, forms, dashboards, accessibility audits, or routine interface fixes;
- `motion-design` for focused timing, easing, choreography, or motion critique;
- `threejs-graphics` for advanced Three.js scene construction and rendering diagnosis.

Use those specialist skills alongside this one when their domain becomes substantial. This skill remains the art director: it keeps the page concept, hierarchy, and effects coherent.

## Routes

1. **Always:** `01_core.md` — brief, concept selection, implementation order, and output contract.
2. **References, originality, visual thesis, content sequence:** `02_art_direction.md`.
3. **Editorial chapters, framed grids, split layouts, and responsive composition:** `modules/layout_systems/GUIDE.md`.
4. **Entrances, timelines, word reveals, and scrubbed visual stories:** `modules/motion_scroll/GUIDE.md`.
5. **Pointer reveals, particles, ambient layers, and the WebGL gate:** `modules/interactive_effects/GUIDE.md`.
6. **Paper, glass, ink, borders, shadows, textures, and token discipline:** `modules/surface_systems/GUIDE.md`.
7. **Before handoff:** `03_quality_delivery.md` — accessibility, performance, responsive, provenance, and browser checks.
8. **Source and safety record:** `90_provenance.md`.
9. **Routing evaluation:** `99_eval_prompts.md`.

## Default operating choices

- Start from the user's audience and desired outcome, not an effect list.
- Choose one visual system and at most one signature interaction before coding.
- Make a complete semantic first frame; animation and WebGL are progressive enhancement.
- Prefer the target project's stack and existing dependencies. Plain CSS and browser APIs are valid high-craft tools.
- Do not install packages, run imported helpers, deploy, or call paid/network services without the normal repository and user permission gates.
- Preserve concepts from references, not their identity, copy, media, distinctive composition, or code.
- Never fabricate customers, testimonials, awards, metrics, or product proof.

## Output contract

For implementation work, report:

1. the compact art-direction brief and selected route modules;
2. the concrete files and interactions created;
3. asset provenance and dependency/runtime choices;
4. responsive, keyboard, reduced-motion, no-JS, and browser checks performed;
5. subjective feel checks or remaining limitations without overstating them.
