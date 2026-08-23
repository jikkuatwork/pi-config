# Layout Systems

Choose one grammar for the page. A grid is useful only when it makes hierarchy and relationships easier to read.

## Editorial chapters

Use when the work, product, or evidence should lead the story.

1. Open with one strong focal composition and a concise position.
2. Move into selected proof before explaining the organization.
3. Give major projects or ideas distinct chapter pacing rather than equal cards.
4. Use an asymmetrical process or point-of-view section after proof.
5. Hand off to capabilities with oversized but semantic headings.
6. End with one decisive contact or conversion chapter.

Alternate scale, crop, and background only when each change marks a narrative boundary. Keep titles, role, year, and actions available without hover.

## Framed grid

Use when the page should feel precise, technical, or catalog-like.

- Define the parent grid and shared content edges first.
- Reuse one spacing scale, border token, bracket size, and texture strength.
- Use thin low-contrast lines for structure; do not combine them with heavy elevation everywhere.
- Align heading, media, metadata, and controls to the same columns.
- Keep diagonal or graph texture barely visible and removable without harming hierarchy.
- Collapse to one column when the content no longer fits; do not preserve a desktop grid as miniature columns.

A 12-column desktop grid is a useful starting point, not a requirement. Derive breakpoints from content.

## Split technical stage

Use when one side can carry the focal experience and the other can carry explanation or controls.

- Give each side a distinct role; a vertical rule alone does not create a split system.
- Start near 50/50, then bias the ratio toward the dominant task.
- Let one panel be spatial and the other information-dense.
- Use compact mono metadata for coordinates, states, versions, or specs.
- Stack in logical DOM order on small screens. Put the part needed to understand the action first.
- Reserve intrinsic media size so the split does not jump while loading.

## Documentary collage

Use for a human, process-led story with irregular media.

- Keep DOM order equal to narrative order even when CSS Grid changes visual placement.
- Vary image scale and alignment, not basic legibility.
- Reserve every media box and retain the grid when media is absent.
- Put captions and project actions in the static layout; hover may repeat or emphasize them, not reveal them exclusively.
- Keep parallax shallow and never let it reorder or obscure the story.

## Nested frames

Use one outer shell to establish page bounds and inner frames to separate levels. The inset between a child and parent should make their corner geometry feel intentional. Use borders for structure and shadow only when a layer genuinely floats.

Avoid nesting frames around every paragraph. Preserve large unframed regions so the system can breathe.

## Responsive rules

- Keep content and controls inside logical inline gutters; media may bleed when purposeful.
- Use `minmax(0, 1fr)` on grid tracks that contain text or media.
- Avoid fixed heights on text containers and test long labels.
- Maintain useful source order at 320–390 px, 200% zoom, and with styles partially unavailable.
- Do not let sticky or fixed chrome cover anchors, headings, actions, or the footer.
- Remove decorative rails and brackets before compressing readable content.
- Use safe-area insets when controls touch viewport edges.

## Interaction rules

- A clickable card is a real link or button with visible focus.
- Hover and pressed states do not shift surrounding layout.
- Touch users receive the same title, metadata, and action as fine-pointer users.
- Decorative grid marks are hidden from assistive technology.
- Section navigation uses real anchors and scroll margins; passive scrolling never moves focus.

## Verification

Check 320/390, an intermediate tablet width, and a wide desktop. Inspect shared edges, wrapping, reading order, horizontal overflow, media placeholders, anchor offsets, keyboard order, and touch targets. Remove the texture and animation temporarily: the composition should still make sense.
