# Core UX Workflow

Use this for every design, implementation, review, and polish task. Optimize for
a clear product workflow and a small safe diff, not for decorative novelty or
exhaustive theory.

## 1. Resolve the task

State the answers you can infer before changing code:

- **Product and audience:** operator, member, customer, collaborator, or public visitor.
- **Primary job:** the first useful action and the outcome the user needs.
- **Task mode:** build, fix, focused review, holistic review, motion audit,
  prototype exploration, or advice.
- **Surface and states:** screen/component/flow plus loading, empty, success,
  validation, network failure, auth/permission, destructive, async-job, and
  offline/realtime states that apply.
- **Constraints:** framework, styling system, existing component library/tokens,
  supported browsers/viewports, localization, BFBB/raw requirements, and
  dependency policy.

If this is Holm/Zippy/BFBB UI, load `02_bfbb_holm_patterns.md` now.

## 2. Recon before judgment

Inspect the target rather than imposing a generic system:

- locate the app shell, semantic tokens, spacing/type scales, reusable
  components, icons, motion tokens, and nearby product copy;
- identify existing dependencies and whether the path is built or raw-loaded;
- preserve deliberate density and platform conventions when they remain usable;
- inspect rendered behavior when a claim depends on layout, focus, motion,
  contrast, or interaction—not source code alone.

Do not introduce a second styling approach, icon family, token vocabulary, or
motion system for one local fix.

## 3. Choose one coherent direction

For substantial work, capture a compact brief:

```text
Product: <workflow and audience>
Primary screen/action: <first useful action>
Style: <one direction>
Density: <low | medium | data-dense>
Tokens: surface/text/muted/border/accent/danger/success/warning
Typography: <existing/system family and compact scale>
Layout: <mobile-first shell, nav, content width, card/table strategy>
States: <applicable loading/empty/error/auth/offline/destructive/job states>
Motion: <none/subtle/standard and the purpose; reduced-motion equivalent>
Runtime constraints: <BFBB/build/dependency/browser limits>
```

Pick one primary visual direction and one supporting accent. Product workflow
comes before effects. Use `03_compact_design_catalog.md` only when direction is
actually undecided.

## 4. Route rules to their owners

Load only what the task needs from `INDEX.md`. For cross-domain issues, report
the root cause once under its owner and mention secondary effects rather than
duplicating findings.

Canonical order for broad work:

1. accessibility and interaction correctness;
2. layout, reading order, and responsiveness;
3. UX writing and recovery paths;
4. typography and color legibility;
5. surfaces, icons, motion, and final polish.

A holistic review uses the interface-review module and all six domain owners.
A motion-only task uses the motion module plus accessibility where reduced
motion, focus, input, or timed UI is involved.

## 5. Implement the smallest safe diff

- Reuse the existing shell, tokens, helpers, components, and browser APIs first.
- Do not add a dependency merely to implement a small visual behavior.
- If a dependency may be justified, route through the library-selection module,
  verify it, and ask before installation.
- Keep user control and recovery visible. Destructive actions name the
  consequence; long jobs expose progress/result/failure; realtime surfaces show
  reconnect/offline/reconciled state.
- Avoid layout shifts and hover/pressed states that move surrounding content.
- Motion must have a named purpose, fit its frequency, be interruptible where
  users can reverse it, and have a reduced-motion equivalent. No motion is a
  valid—and often superior—decision.

## 6. Verify before done

Use the checks relevant to the changed surface:

- phone width near 375px, intermediate width, and desktop/large width;
- keyboard order, visible focus, accessible names, semantic controls, and focus
  restoration for overlays;
- text zoom/reflow, long content, localization growth, and RTL when supported;
- rendered foreground/background contrast in every relevant theme/state;
- loading, empty, error, permission, destructive, async, and offline states;
- pointer and touch targets, including hover behavior on touch devices;
- motion at normal and slowed playback, interruption/reversal, and
  `prefers-reduced-motion`;
- no new build/CDN/package requirement on BFBB/raw paths;
- no stale boilerplate/demo copy when adapting an existing template.

Report exact checks and observed results. Mark anything not exercised as **Not
verified** rather than converting uncertainty into a finding or a pass.

## Review priority

1. **Blocked usability/accessibility:** hidden content, unreadable text,
   unlabeled controls, keyboard traps, data-loss risk.
2. **Interaction correctness:** missing states, unsafe actions, misleading
   feedback, broken focus/gesture behavior.
3. **Responsive/adaptive stability:** clipping, horizontal overflow, covered
   content, localization or zoom failure.
4. **System coherence:** inconsistent tokens, spacing, type, iconography,
   terminology, or motion language.
5. **Polish:** optical alignment, transitions, skeletons, chart labels, and
   microcopy.

## Common anti-patterns

- Generic dashboard/landing boilerplate in place of the requested product.
- Decorative gradients, glass, blur, 3D, or motion without a workflow reason.
- Raw colors, spacing, durations, or radii scattered outside the token system.
- Emoji as structural icons; mixed icon libraries on one surface.
- Placeholder-only labels, color-only status, hover-only affordances.
- Public runtime CDNs or package-only imports in a raw BFBB app.
- Treating imported numeric recipes as universal laws despite target evidence.
- Claiming a visual, accessibility, or performance result without rendering or
  measuring what determines it.
