# Motion Improvement Plan Template

Use only when the user asks for a self-contained plan. Render in the response by
default; write a file only when durable plan output is explicitly requested.
The executor may have no conversation context, so every required fact must be in
the plan.

````markdown
# <NNN — Short imperative title>

- **Status**: TODO
- **Commit**: <current short commit, if available>
- **Severity**: HIGH | MEDIUM | LOW
- **Category**: <audit category>
- **Estimated scope**: <files and rough size>

## Problem

Explain the confirmed behavior, location, and user impact. Include current code:

```css
/* src/components/dropdown.css:14 — current */
.dropdown { transition: all 400ms ease-in; }
```

State what was rendered/profiled and what remains unverified.

## Target

Describe observable end behavior. Reuse project tokens. Include exact values only
when the repository already establishes them or the plan explains why a reviewed
starting value fits this interaction:

```css
.dropdown {
  transition:
    transform 200ms var(--ease-out),
    opacity 200ms var(--ease-out);
  transform-origin: var(--popover-origin);
}
```

Include reduced-motion, pointer, interruption, and state behavior that applies.

## Repository conventions

- <where motion tokens/components live>
- <exact exemplar file:line to imitate>
- <installed library/version or raw/BFBB constraint>

## Steps

1. <One concrete edit: file, change, intended result.>
2. <Next edit.>

## Boundaries

- Do not touch <out-of-scope files/components>.
- Do not add dependencies unless separately approved.
- Preserve markup/semantics unless a named step requires a change.
- If cited code has drifted materially, stop and report rather than improvising.

## Verification

- **Mechanical**: <safe exact commands and expected result>.
- **Rendered**: <interaction, normal/slow playback, origin/path/state checks>.
- **Interruption**: <rapid toggle/reversal/gesture check>.
- **Accessibility**: <reduced motion, keyboard/focus, pointer/touch check>.
- **Performance**: <trace/frame evidence when performance is part of the claim>.
- **Done when**: <observable completion criteria>.
````

## Author rules

- One systemic root cause per plan; merge locations only when they share the same
  fix and verification.
- Copy current code exactly and cite paths/lines.
- Do not say “use nicer easing,” “optimize,” or “follow the audit above.”
- Do not prescribe source-pack constants without target justification.
- A feel check is required for motion whose quality cannot be proved statically.
