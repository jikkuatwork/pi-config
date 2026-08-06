# Reviewing Motion

Use for a focused review of animation, transition, or gesture code. Stay
read-only unless the user also asks to implement fixes. Read
`03_standards.md` whenever a finding needs a concrete value or technical
boundary.

## Review posture

Motion earns approval by serving the task without delaying, disorienting, or
excluding users. Default neither to praise nor to finding-count inflation.
Rendered feel, interruption, input frequency, reduced motion, and measured frame
behavior matter; source inspection alone cannot prove all of them.

## Review dimensions

1. **Purpose:** What feedback, continuity, state, explanation, or orientation job
   does each animation perform? Decorative motion on a routine task needs strong
   justification.
2. **Frequency:** Very frequent and keyboard-driven actions should usually be
   instant or nearly so; occasional/rare moments have more motion budget.
3. **Timing:** Check project tokens, response latency, travel distance, and
   whether easing/duration fit the product. A pronounced ease-in or long routine
   transition may feel delayed, but is not a finding without target context.
4. **Origin and continuity:** Trigger-anchored surfaces should preserve their
   spatial relationship; centered modals are a valid exception. Avoid ordinary
   surface entrances collapsing from `scale(0)`.
5. **Interruptibility:** Rapid toggles and gestures should retarget/reverse
   without snapping, restarting, or locking input.
6. **Performance:** Prefer compositor-friendly movement, but profile actual
   browser/library output. Layout, paint, filters, JavaScript scheduling, and
   style invalidation all matter.
7. **Accessibility/input:** Verify reduced motion, hover/touch behavior, focus,
   keyboard paths, autoplay/timed UI, and static state cues.
8. **Cohesion:** Motion should match product personality and shared tokens.
9. **Restraint:** Deletion or reduction outranks ornamental repair when motion
   has no useful purpose.

## High-risk patterns to investigate

- `transition: all`;
- ordinary surface entrances from `scale(0)`;
- delayed direct response or unexplained long durations;
- decorative motion on keyboard/high-frequency actions;
- wrong transform origin on trigger-anchored UI;
- keyframes restarting rapidly reversible state;
- unprofiled large layout/filter/blur animations;
- input locked until animation completion;
- movement without a reduced-motion path;
- hover-only movement leaking onto touch;
- group stagger that delays routine interaction.

These are investigation leads, not automatic failures. Confirm location,
runtime behavior, user impact, and whether the project documents an intentional
tradeoff.

## Remedial order

Prefer the earliest move that solves the root cause:

1. delete motion that lacks purpose or burdens a frequent task;
2. reduce distance, duration, effects, or frequency;
3. align with existing easing/duration tokens;
4. correct origin and spatial path;
5. make reversal/interruption continuous;
6. reduce measured layout/paint/main-thread cost;
7. add or repair reduced-motion and pointer behavior;
8. add optional polish only after the interaction is sound.

## Required output

### Scope and evidence

State the exact diff/components/interactions, stack/library versions, project
motion conventions, frequency assumptions, rendered states inspected, and any
boundary. Mark runtime checks not performed as **Not verified**.

### Findings

Use one table ordered by severity and reach:

| # | Severity | Location | Before | After | Why |
| --- | --- | --- | --- | --- | --- |
| 1 | MEDIUM | `src/Popover.css:42` | `transform-origin: center` | Use the primitive's trigger-origin variable | The trigger-anchored panel currently appears from an unrelated point |

Cite `path:line` and current evidence. One root cause is one row; consolidate
confirmed repeats. Do not prescribe an exact replacement merely because it
appears in the source pack—reuse project tokens or cite why the standard's
starting value fits.

### Considered but rejected

List real candidates left unchanged, such as a centered modal, a short built-in
ease consistent with the product, or a layout transition whose measured cost is
acceptable.

### Verification

List exact static checks, rendered interactions, slow-playback observations,
reversal spam, performance traces, reduced-motion tests, and real-device gesture
checks. Separate passed checks from **Not verified** items.

### Verdict

- **Block:** a HIGH issue remains, such as inaccessible motion, interaction
  blockage/misleading state, or verified severe repeated jank.
- **Needs changes:** only MEDIUM/LOW actionable findings remain.
- **Approve:** no actionable findings remain and claimed runtime coverage was
  actually verified.
