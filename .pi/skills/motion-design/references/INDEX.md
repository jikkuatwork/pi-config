# Motion Design Router

Read `02_review.md` first for every task. It records the limits that turn the
upstream's universal-looking recipes into safe, contextual guidance. Then read
`01_core.md` for the default workflow and load only the smallest relevant route.

## Routes

- **Purpose, emotion, timing, easing, personality, and quick recipes:**
  `01_core.md`
- **Whether motion belongs and how to decide:**
  `director/decision-framework.md`, then `director/core-philosophy.md`
- **Brand/personality and emotional character:**
  `director/motion-personality.md`, `director/emotion-mapping.md`
- **Narrative or multi-element sequencing:**
  `director/narrative-structure.md`, `director/choreography.md`
- **Disney principles adapted to UI:** `director/disney-principles.md`
- **Platform, performance, responsive, and reduced-motion concerns:**
  `director/context-adaptation.md`
- **Entrances/exits, state feedback, ambient motion, and stagger recipes:**
  `patterns/entrance-exit.md`, `patterns/state-feedback.md`,
  `patterns/ambient-continuous.md`, `patterns/multi-element.md`
- **Property, timing/easing, quality, and troubleshooting lookups:**
  `reference/property-selection.md`, `reference/timing-easing-tables.md`,
  `reference/quality-checklist.md`, `reference/troubleshooting.md`
- **Source, license, omissions, and safety review:** `90_provenance.md`
- **Routing and behavior test prompts:** `99_eval_prompts.md`

## Operating order

1. Name the user-facing purpose: feedback, spatial continuity, state legibility,
   explanation, or rare delight. If none applies, do not animate.
2. Inspect the target's existing motion tokens, interaction frequency, input
   methods, browser/runtime constraints, and accessibility requirements.
3. Select one motion personality only when it supports the product context.
4. Choose the cheapest compatible tool and the fewest properties needed.
5. Add interruption behavior, pointer gating, and a useful reduced-motion state.
6. Verify at normal and slowed playback, repeated use, narrow and wide viewports,
   keyboard input, and `prefers-reduced-motion`.

## Hard boundaries

- No dependency, Lottie runtime, package install, or external service is implied.
- Target-project conventions and measured behavior outrank imported recipes.
- Numeric durations, bezier curves, element counts, and “1/3” rules are starting
  points, not standards.
- Secondary and ambient motion are optional. Never add them when they compete
  with the task, repeat too often, cost performance, or undermine accessibility.
- Reduced motion may legitimately use opacity-only feedback or no animation.
- Do not convey status or required information through motion alone.

## Output contract

For implementation, state the motion's purpose and frequency, then provide the
smallest compatible change plus reduced-motion behavior. Report what was
verified and identify subjective feel checks rather than claiming them from code
alone. For reviews, separate confirmed accessibility/performance defects from
style preferences and cite exact locations.
