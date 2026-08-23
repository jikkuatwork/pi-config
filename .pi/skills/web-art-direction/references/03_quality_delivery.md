# Quality and Delivery

A polished still is not a finished site. Validate the complete page, its alternate states, and its resource lifecycle.

## Content and originality

- Search for placeholders, copied reference names, stale source copy, unsupported claims, invented metrics, fake customers, and fake awards.
- Confirm every external image, font, icon, logo, video, and audio asset has a known source and usable license.
- Verify meaningful media has useful alt text; decorative media has an empty alt or is hidden appropriately.
- Make sure the final CTA matches the page promise and does not imply unavailable functionality.
- Compare the final output with supplied references across identity, copy, media, structure, and distinctive motion—not only palette.

## Semantic and keyboard pass

- One visible primary `main`, a coherent heading outline, and a skip link when repeated chrome precedes content.
- Native links for navigation and buttons for actions.
- Every control has a visible label or accessible name and a visible `:focus-visible` indicator.
- Pointer interactions have keyboard and touch alternatives.
- Dialogs and menus follow the correct focus, Escape, and return-focus behavior.
- Dynamic confirmations use a stable, restrained live region only when an announcement is useful.
- Status never depends on color or motion alone.

## Responsive pass

At minimum inspect approximately 320 or 390 px, an intermediate width, and a wide desktop.

- No accidental horizontal scrolling.
- Hero copy, billboard headings, and intentional line breaks remain readable.
- Grid and split layouts collapse in logical DOM order.
- Fixed or sticky chrome does not cover content, anchors, actions, or safe areas.
- Text survives 200% zoom and long-content growth without fixed-height clipping.
- Touch controls are large and separated enough to activate reliably.
- Media crops preserve the focal subject and reserved dimensions prevent layout shift.

## Motion and interaction pass

- Name the purpose and frequency of every nontrivial motion.
- Test normal speed and 2–5× slow playback for choreography and abrupt stops.
- Rapid interactions retarget or interrupt safely.
- Fine-pointer effects clear on leave, cancel, blur, and visibility changes.
- Reduced motion removes nonessential displacement, parallax, scrubbing, and loops while preserving useful state feedback.
- With JavaScript disabled, content is visible, ordered, and actionable where the product allows.

## Performance and lifecycle pass

- Inspect actual network requests; document every remote runtime and asset.
- Keep first paint independent from below-fold media and heavy renderers.
- Pause offscreen canvas, WebGL, media, CSS loops, and timers.
- Cap canvas/WebGL device pixel ratio and avoid per-frame allocations or layout reads.
- On teardown, cancel frames and timers, disconnect observers, remove global listeners, stop streams, kill timelines, and dispose render resources.
- Check console errors at narrow and wide viewports.
- For performance claims, capture a measured baseline and comparison; source review and screenshots are not performance proof.

## Build and dependency pass

- Use the repository's existing lint, test, typecheck, and production build gates when present.
- Do not add a package for a small CSS or browser-native interaction.
- Verify license, maintenance, browser support, bundle/runtime cost, and teardown before proposing a new dependency.
- Ask before package installation, external API calls, deployment, analytics changes, or paid services.
- Never run vendored example scripts merely because they accompany design guidance.

## Visual inspection

Capture or inspect at least:

1. first viewport before interaction;
2. one representative content chapter;
3. every signature interaction in its active state;
4. the final action and footer;
5. narrow-screen and reduced-motion states.

Check hierarchy at a glance, then read a full paragraph. Inspect focus, selection, missing media, and hover/touch behavior. Label subjective judgments as feel checks rather than automated passes.

## Completion report

Keep the handoff concise but evidence-based:

- **Direction:** visual thesis, layout grammar, and signature interaction.
- **Files:** exact paths changed.
- **Runtime/assets:** dependencies, remote requests, and provenance.
- **Validation:** commands, viewports, interactions, accessibility modes, and observed result.
- **Limits:** anything not tested, subjective feel decisions, or deployment still requiring approval.

Do not call the result award-winning, production-ready, accessible, or performant without evidence matching that claim.
