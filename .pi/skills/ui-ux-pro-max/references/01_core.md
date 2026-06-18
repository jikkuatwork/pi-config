# Core UI/UX Workflow

Use for design, implementation, review, and polish of app UI. Optimize for shippable Holm/BFBB apps, not exhaustive design theory.

## Trigger fit

Use this skill when the task changes how an app looks, feels, moves, or is interacted with:

- new pages, flows, dashboards, landing/product screens, settings, auth, onboarding;
- components: nav, sidebar, cards, forms, modals, tables, charts, uploaders, realtime panels;
- design-system choices: style, color, type scale, spacing, icons, motion;
- review/fix work: accessibility, mobile responsiveness, visual consistency, polish, perceived quality.

Skip for pure backend/API/storage/deploy work unless UI behavior or user feedback is part of the change.

## Lean workflow

1. **Classify the product**
   - What is the primary workflow? What should the first useful screen let the user do?
   - Who is the user: operator, member, customer, collaborator, public visitor?
   - What density is right: dashboard/data-dense, consumer/simple, content-first, realtime/collab?
   - Is this Holm/Zippy/BFBB raw mode? If yes, read `02_bfbb_holm_patterns.md`.

2. **Choose one design direction**
   - Pick one primary style and one supporting accent. Do not mix unrelated trends.
   - Use a semantic token set before adding components: surface, text, muted, border, accent, danger, success, warning.
   - Prefer system fonts for strict BFBB/offline apps unless local fonts already exist.
   - Use SVG/vector icons from the app's existing icon path; never use emoji as structural icons.

3. **Map screens to states**
   Every non-trivial UI should handle:
   - loading/skeleton;
   - empty state with next action;
   - normal/success state;
   - validation errors near fields;
   - network/server error with retry path;
   - signed-out and forbidden/read-only states when auth applies;
   - destructive confirmation;
   - queued/running/succeeded/failed/canceled states for jobs;
   - connected/reconnecting/offline/reconciled states for realtime.

4. **Implement smallest safe diff**
   - Reuse app shell, tokens, helper components, and existing patterns first.
   - Avoid new dependencies; if a library is not already vendored/available, use HTML/CSS/SVG/browser APIs.
   - Keep motion purposeful and under 300ms; respect `prefers-reduced-motion`.
   - Preserve layout stability: no hover/pressed states that change surrounding layout.

5. **Review before done**
   - Test phone width first, then tablet/desktop.
   - Check keyboard focus order and visible focus rings.
   - Check text contrast: body >= 4.5:1, large/graphic UI >= 3:1.
   - Check touch targets: about 44px minimum, with enough spacing.
   - Ensure fixed headers/footers do not cover content; include safe-area padding for PWA/mobile shells.

## Design-system brief template

Use this compact brief before coding a substantial UI:

```text
Product: <workflow and audience>
Primary screen: <first useful action>
Style: <one direction, e.g. enterprise SaaS / calm minimal / bento dashboard>
Density: <low | medium | data-dense>
Tokens: surface/text/muted/border/accent/danger/success/warning
Typography: <system stack or existing local font> with scale <12/14/16/20/24/32>
Layout: <mobile-first shell, nav, content max width, card/table strategy>
States: loading, empty, error, auth, offline/realtime, destructive, async job
BFBB constraints: no build-required imports; no CDN; no new package unless approved
```

## Review rubric

Prioritize findings in this order:

1. **Blocked usability/accessibility**: unreadable text, unlabeled controls, keyboard traps, hidden content.
2. **Interaction correctness**: missing loading/error/disabled states, unsafe destructive actions, hover-only behavior.
3. **Responsive stability**: horizontal scroll, clipped fixed bars, unsafe mobile/touch layout.
4. **Visual coherence**: inconsistent tokens, icon styles, spacing scale, typography hierarchy.
5. **Polish**: transition timing, skeletons, empty states, chart labels, microcopy.

## Common anti-patterns

- Python/npm/search-tool setup in the middle of a UI task.
- Public CDN runtime dependencies for raw BFBB apps.
- Raw hex colors scattered through components instead of semantic tokens.
- Emoji used as nav/action icons.
- Placeholder-only form labels.
- Text below 16px for mobile body copy or cramped tap targets.
- Glass/blur effects with poor light-mode contrast.
- Decorative animations that delay input or ignore reduced-motion.
- Multiple primary CTAs on one screen.
- Unpruned boilerplate/demo routes in a product app.
