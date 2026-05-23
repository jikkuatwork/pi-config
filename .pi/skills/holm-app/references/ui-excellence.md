---
title: Holm App UI Excellence
updated: 2026-05-23
holm_version: 0.119.3
holm_source_commit: de9e73f4
---

# Holm App UI Excellence

Use this when the user asks for a polished, exemplar, showcase, production-grade, or "nice" Holm app. Keep the posture generic: build the actual product workflow with excellent interaction quality, not a skin over Zippy demos.

## Live UI references

When UI quality matters, read the live Holm/Zippy UI references in addition to this file:

- `/home/glasscube/Projects/holmhq/holm/master/knowledge-base/skills/app/recipes/shared/visual-polish.md`
- `/home/glasscube/Projects/holmhq/holm/master/knowledge-base/skills/app/recipes/shared/component-patterns.md`
- `/home/glasscube/Projects/holmhq/holm/master/knowledge-base/skills/app/patterns/ui-patterns.md`
- `/home/glasscube/Projects/holmhq/holm/master/knowledge-base/skills/app/patterns/layout.md`
- `/home/glasscube/Projects/holmhq/holm/master/knowledge-base/skills/app/recipes/shared/pwa.md`

Use Zippy's tokens, layout, icons, auth, realtime, and settings patterns unless the app has a deliberate alternative design system.

## Product-first screen

The first useful screen should be the product workflow, not a generic marketing page or unpruned demo hub unless the task is explicitly marketing/showcase.

Before finishing, search for stale strings and surfaces:

- `Zippy`
- `demo`
- `boilerplate`
- placeholder title/description/social metadata
- unused sidebar routes
- example agents not part of the app

## Layout quality

Use stable, mobile-first layouts:

- fixed app shell when appropriate: header/footer fixed, inner content scrolls;
- `scrollbar-gutter: stable` or equivalent to prevent scroll jumps;
- safe-area support for mobile/PWA shells;
- responsive navigation that works at phone width;
- stable card, row, toolbar, counter, and avatar dimensions;
- no controls that appear/disappear and shift layout when state changes;
- full-width mobile inputs and touch targets; dense desktop affordances only where useful.

## Required UI states

Every non-trivial page/component should cover:

- loading and skeleton state;
- empty state with a next action;
- normal/success state;
- validation errors close to the relevant control;
- network/server errors with retry path;
- signed-out state;
- forbidden/read-only state;
- destructive-action confirmation;
- upload progress and upload failure, when applicable;
- async job queued/running/succeeded/failed/canceled, when applicable;
- realtime connected/reconnecting/offline/reconciled states, when applicable;
- conflict/stale-write state for collaborative editing, when applicable;
- mobile and desktop layouts.

Do not hide important failures in console logs. Surface actionable errors in the UI and keep API errors machine-readable.

## Visual polish rules

Follow Zippy's semantic design tokens and polish rules:

- use semantic tokens (`bg-surface-alt`, `text-text`, `border-border/50`, `accent-*`), not raw Tailwind colors;
- use semi-transparent borders (`border-border/50`), not hard opaque lines;
- cards are flat by default and lift on hover (`hover:shadow-md transition-all duration-150`);
- hoverable rows/cards/badges include `transition-all duration-150`;
- metadata uses `text-[10px] uppercase tracking-wide text-text-faint`;
- focus states use visible rings such as `focus:ring-2 focus:ring-accent-500/50`;
- scrollable regions use the app scrollbar class/pattern;
- avoid ornamental gradients/decorations unless they serve the product workflow;
- keep animations under 300ms.

For strict offline/sovereign apps, replace external font links with system fonts or self-hosted assets.

## Interaction quality

Polished Holm apps should be usable without fragile browser state:

- forms have labels, descriptions, disabled states, validation, and submission feedback;
- primary/secondary/destructive actions are visually distinct;
- keyboard focus order and modal/dropdown escape behavior are sane;
- click-outside-to-close overlays use correct z-index layering;
- important actions are not hover-only;
- optimistic actions show pending and rollback/reconcile states;
- filters/search/sort/pagination are explicit for large lists;
- tables collapse to mobile cards or horizontal scroll intentionally.

## Themes, motion, sounds, and PWA polish

For apps that request themes, animations, sounds, or native/mobile feel:

- keep theme implementation token-based; no raw Tailwind colors in product UI;
- persist theme/motion/sound preferences intentionally, using member-private storage when the preference is private and cross-device;
- respect `prefers-reduced-motion` and keep animations under 300ms;
- never autoplay sounds; trigger subtle synthesized or local sounds only after user interaction and provide a visible mute control;
- keep sound feedback non-essential: all success/error/status information must also be visual and accessible;
- add PWA artifacts deliberately (`manifest.webmanifest`, root `sw.js`, icons, safe-area shell) and document install/offline/update smoke status;
- for strict offline/sovereign apps, self-host fonts and all runtime/PWA assets.

## Realtime and async UX

For live apps:

- show connection status without alarm fatigue;
- show pending local edits separately from confirmed edits;
- reconcile after reconnect and explain when updates were refreshed;
- show who changed what when domain-appropriate;
- expose job IDs/status URLs in operator/debug surfaces;
- provide retry/cancel where the backend supports it.

## App README / handoff quality

A polished app handoff should include:

- app purpose and primary workflows;
- screenshots or route list if useful;
- raw BFBB deploy command;
- optional built mirror command;
- auth/provider/member setup notes;
- no-browser walkthrough command;
- realtime smoke instructions when applicable;
- logs/debug commands;
- known limitations and provider/secret placeholders without secret values.

## Done means

- The app feels like a product, not a renamed boilerplate.
- All required UI states are implemented for core workflows.
- Mobile and desktop layouts are intentional.
- Visual polish follows semantic tokens and current Zippy rules.
- Browser UX maps to documented API/state contracts.
- No unpruned demo routes/copy/assets remain unless intentionally retained.
