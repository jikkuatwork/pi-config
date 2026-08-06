# Performance

Transition specificity and GPU compositing hints.

## Transition Only What Changes

Prefer explicit transition properties over `transition: all` or Tailwind's `transition-all`. Broad transitions can animate later property changes unintentionally. Tailwind's bare `transition` maps to a curated list rather than literal `all`, but the narrowest intentional property set is still easier to reason about.

### Why

- Broad transitions can pick up properties added later.
- Layout, paint, color, padding, or shadow changes may animate unexpectedly.
- Explicit properties document intent and make profiling easier.

### CSS Example

```css
/* Good: only transition what changes */
.button {
  transition-property: scale, background-color;
  transition-duration: 150ms;
  transition-timing-function: ease-out;
}

/* Bad: transition everything */
.button {
  transition: all 150ms ease-out;
}
```

### Tailwind

```tsx
// Good: explicit properties
<button className="transition-[scale,background-color] duration-150 ease-out">

// Bad: transition all
<button className="transition-all duration-150 ease-out">
```

### Tailwind `transition-transform` Note

`transition-transform` in Tailwind maps to `transition-property: transform, translate, scale, rotate`, so it covers all transform-related properties, not just `transform`. Use this when you're only animating transforms. For multiple non-transform properties, use the bracket syntax: `transition-[scale,opacity,filter]`.

## Use `will-change` Sparingly

`will-change` hints that a property is likely to change and may let the browser prepare an optimization such as a compositing layer. The browser chooses what to do; the hint is not a guarantee and each extra layer can consume memory.

It is most plausible for properties such as `transform` and `opacity`, but add it only after profiling shows a repeatable first-frame problem. Do not infer GPU behavior solely from the declaration.

### Rules

```css
/* Good: specific property that benefits from GPU compositing */
.animated-card {
  will-change: transform;
}

/* Good: multiple compositor-friendly properties */
.animated-card {
  will-change: transform, opacity;
}

/* Bad: never use will-change: all */
.animated-card {
  will-change: all;
}

/* Bad: properties that can't be GPU-composited anyway */
.animated-card {
  will-change: background-color, padding;
}
```

### Useful Properties

| Property | Typical posture |
| --- | --- |
| `transform`, `opacity` | Common compositor candidates; profile before hinting |
| `filter` | Can be expensive despite compositing; test target browsers/devices |
| `clip-path` | Behavior varies by shape/browser; profile |
| `top`, `left`, `width`, `height` | Usually involve layout/paint; avoid on hot paths when an equivalent transform exists |
| `background`, `border`, `color` | Paint work may be acceptable for short, small transitions; `will-change` rarely helps |

### When to Skip

Modern browsers are already good at optimizing on their own. Only add `will-change` when you notice first-frame stutter; Safari in particular benefits from it. Don't add it preemptively to every animated element; each extra compositing layer costs memory.
