# Design Craft

> Docs-only local adaptation of the non-duplicative parts of upstream
> `emil-design-eng`. Use this as judgment guidance, then route concrete rules to
> the owning UX modules. It adds no runtime or package requirement.

## Core posture

Taste is trained through close observation, comparison, implementation, and
iteration. “Looks good” is not an explanation: identify the product goal,
interaction frequency, intended feeling, target convention, and evidence that
makes one choice stronger than another.

Unseen details compound. Good defaults, predictable behavior, stable layout,
clear copy, correct focus, appropriate motion, and handled edge cases matter
more than one showcase effect. Beauty is useful only when it improves trust,
comprehension, perceived quality, or product identity without taxing the
primary task.

## Component craft

1. **Start with the common path.** Make the default state useful and obvious
   before adding customization or rare variants.
2. **Keep adoption simple.** Prefer a small, native API and reuse the target's
   established components/tokens; avoid parallel context, hooks, wrappers, or
   dependencies unless the behavior truly needs them.
3. **Make good behavior the default.** Accessibility, responsive layout,
   loading/error/empty states, reduced motion, and cleanup should not depend on
   every caller remembering an option.
4. **Handle edge cases invisibly.** Preserve focus and input, pause timed UI
   when appropriate, account for hidden tabs/offline/reconnect, prevent gesture
   jumps, and keep stacked/overlapping hit areas correct.
5. **Use one identity.** Naming, copy, iconography, timing, surfaces, and docs
   should feel like one product—not separately optimized fragments.
6. **Prefer restraint.** Delete effects, variants, controls, and abstractions
   that do not improve the user's task.

## Decision questions

Before proposing a visual or interaction change, answer:

- What user problem or product feeling does it serve?
- How often will the user encounter it?
- Which existing product convention should it extend?
- What is the lowest-complexity implementation that preserves correctness?
- Which state, viewport, input method, locale, or failure mode could break it?
- What rendered or measured evidence would prove it is better?

If those answers are weak, do not disguise uncertainty with an exact-looking
radius, easing, shadow, or dependency choice.

## Review method

- Inspect the complete task flow, not isolated screenshots.
- Compare before/after with exact locations and one root cause per finding.
- Slow motion down when reviewing movement; use fresh eyes and a real touch
  device for gesture feel when possible.
- Record plausible changes deliberately rejected because the existing behavior
  is correct, evidence is missing, or complexity outweighs benefit.
- A short review—or no findings—is valid. Do not pad it with taste preferences.

## Routing

- Product workflow and smallest-safe-diff process: `../../01_core.md`
- Surfaces, icons, and optical details: `../ui_polish/GUIDE.md`
- Motion decisions and implementation: `../motion/GUIDE.md`
- Accessibility floor: `../accessibility/GUIDE.md`
- Layout, type, color, and copy: their owning sibling modules
- Several defensible directions for a live comparison:
  `../prototyping/GUIDE.md`
