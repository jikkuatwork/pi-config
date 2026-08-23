# Local Review and Interpretation

This local adaptation preserves LottieFiles' motion vocabulary and recipes while
narrowing several claims that are too absolute for production UI work.

## What is strong

- Starts with emotional intent and narrative rather than a framework API.
- Gives a coherent vocabulary for personality, timing, easing, hierarchy, and
  multi-element sequencing.
- Includes concrete state-feedback, entrance/exit, ambient, and troubleshooting
  patterns that can accelerate first drafts.
- Calls out transform/opacity performance, repeated-use context, viewport
  adaptation, and `prefers-reduced-motion`.
- Is implementation-agnostic and contains no required runtime code.

## Treat as hypotheses, not laws

1. **“Always three motion layers.”** Primary, secondary, and ambient layers are a
   useful illustration/marketing lens, but routine product UI often needs only
   direct feedback. Extra shadow, background, or looping motion can dilute
   hierarchy and increase cognitive or rendering cost.
2. **“Never opacity-only.”** Important state changes need more than a visual fade
   as their only communication, but opacity can be the correct animation
   property—especially for reduced motion. Semantics, text, and focus behavior
   carry the state; displacement is not mandatory.
3. **The 1/3 rules.** Distance and concurrent-element fractions are memorable
   heuristics, not researched accessibility thresholds. Test hierarchy,
   comprehension, and performance in the actual container.
4. **Fixed timing and easing tables.** Use them to seed a prototype, then prefer
   target-project tokens and verify perceived latency, interruption, input
   method, distance, refresh rate, and repeated exposure.
5. **Entrance/exit easing.** Directional easing is contextual. The upstream favors
   ease-out entrances and ease-in exits; direct UI response may feel better with
   a responsive ease-out or an existing system curve in both directions. Judge
   the full interaction, not the label.
6. **Decorative loops.** Ambient movement needs a clear atmosphere/attention
   budget, a pause or removal path where applicable, and should normally stop
   under reduced motion.

## Missing gate added locally

Before applying any recipe, ask whether motion belongs. Very frequent actions,
keyboard-driven tools, dense data, and content users are actively reading often
benefit from instant state changes. “No animation” is a valid result.

## Accessibility interpretation

- Use native controls and preserve visible keyboard focus.
- Motion cannot be the sole carrier of state or error information.
- Remove non-essential displacement, zoom, parallax, and looping under
  `prefers-reduced-motion`; keep only useful opacity/color feedback if needed.
- Keep interactions operable while animation is running and make rapid actions
  retarget or interrupt safely.
- Avoid large-field zoom, rapid direction changes, and other vestibular triggers
  unless an equivalent low-motion path exists.

## Security and runtime review

The reviewed upstream snapshot is documentation-only: no scripts, executable
files, dependencies, hooks, package manifests, installers, credential requests,
or runtime network calls were present. Its README's `npx skills add` command was
not copied or run. This adaptation requires no package installation.
