# OKLCH Colors

> Docs-only local adaptation. Follow the UX umbrella core and target-project conventions; load only the references needed for the task. Do not add dependencies or run project tooling without the user’s request and the repository’s permission gates.

OKLCH is a perceptually uniform color space where lightness, chroma, and hue are useful design controls. Use it when the project already uses OKLCH, when creating a new color system, or when the user asks for conversion or palette work. Otherwise preserve the project's established tokens and notation: a consistent hex or RGB token system is better than introducing a second color representation for an isolated fix. To explore interactively, visit [oklch.fyi](https://oklch.fyi).

## Quick Reference

| Category | When to use | Reference |
| --- | --- | --- |
| Conversion | Hex/rgb/hsl to oklch | [01_color_conversion.md](01_color_conversion.md) |
| Palettes | Generate scales, multi-hue, dark mode | [02_palette_generation.md](02_palette_generation.md) |
| Contrast | APCA/WCAG checks, reporting failures, fixing on request | [03_accessibility_contrast.md](03_accessibility_contrast.md) |
| Gamut & Tailwind | P3 fallbacks, `@theme` scales, gamut clamping | [04_gamut_and_tailwind.md](04_gamut_and_tailwind.md) |
| Usage | Semantic tokens, one meaning per color, primary-action emphasis, appearance variants | [05_color_usage.md](05_color_usage.md) |

## Core Principles

### 1. Use a Perceptual Color Space

- **Respect the existing system.** Do not convert notation merely because this module was loaded. Reuse the project's semantic tokens and authoring format unless the task includes a color-system migration.
- **Perceptual control.** OKLCH lightness is designed to track perceived lightness more consistently than HSL, though equal numeric steps are still a design starting point to verify on the actual colors and display.
- **Stable authored hue.** Holding the OKLCH hue coordinate constant reduces the drift common in HSL ramps; gamut mapping and extreme lightness/chroma can still change the rendered result.
- **Independent chroma.** Chroma is an absolute measure of colorfulness that doesn't depend on lightness. HSL saturation does.
- **Finite gamut.** Not every oklch value maps to a displayable sRGB color. High-chroma values at certain hues will clip; gamut awareness is required.

### 2. Write and Format OKLCH Consistently

```
oklch(L C H)
oklch(L C H / alpha)
```

| Channel | Range | Description |
| --- | --- | --- |
| L (Lightness) | 0–1 | 0 = black, 1 = white. Perceptually uniform. |
| C (Chroma) | 0–~0.4 | Colorfulness. 0 = gray. Max depends on L and H. |
| H (Hue) | 0–360 | Hue angle in degrees. |
| alpha | 0–1 | Optional transparency. Slash syntax. |

```css
oklch(0.637 0.237 25.331)
oklch(0.8 0.05 200 / 0.5)
```

Use three decimal places for L and C and up to three for H. Drop trailing zeros and format `-0` as `0`. OKLCH is Baseline 2023; when support requirements are unusually broad, check the target project's browser matrix instead of relying on a fixed global-coverage percentage.

### 3. Measure Contrast, Gamut, and Palette Behavior

Use the standard and version required by the target. For a WCAG 2.x claim, use its rendered-pair contrast rules; APCA can be a supplemental perceptual signal but does not replace the required conformance check.

| Check | Local rule |
| --- | --- |
| Foreground/background contrast | Measure the rendered pair in every relevant theme and state using the target's required standard |
| Lightness-gap and polarity heuristics | Use only to choose a candidate; never report a pass without calculation |
| Hue drift | Compare rendered ramp steps; a large coordinate spread is a review clue, not an automatic failure |
| Gamut | Verify the target color space and fallback behavior; reduce chroma when clipping changes the intended result |
| Contrast fix (only when asked) | Adjust L first when appropriate; preserve C and H where possible, then remeasure |

## Common Mistakes

| Issue | Fix |
| --- | --- |
| Raw color bypasses the project's semantic token system | Reuse or add the correct role token in the project's existing notation |
| Isolated OKLCH value introduced into a hex/RGB codebase | Preserve the established notation unless the task includes a color-system migration |
| HSL palette ramp with hue drift | Rebuild with constant oklch hue |
| Failing contrast | Report the rendered pair, method/version, measured result, and threshold missed; change colors only when asked, then remeasure |
| High chroma without gamut check | Clamp to max chroma for the L/H in sRGB |
| Same absolute C across different hues | Use same C% (percentage of max) for consistent vividness |
| P3 color without sRGB fallback | Add `@media (color-gamut: p3)` pattern |
| Dark mode created by mechanically reversing the light palette | Use the light palette as a starting point, then tune chroma and lightness and recheck every foreground/background pair |
| Hex in Tailwind v4 `@theme` | Convert to oklch values |
| Alpha with comma syntax | Use slash: `oklch(L C H / alpha)` |
| Same hue means two different things (link color reused decoratively) | One color, one meaning; give the second use a neutral |
| Semantic token used outside its role (separator as text) | Add a token for the missing role; never borrow by value |
| Several colored control backgrounds in one view | Fill only the single primary action; secondaries stay neutral |
| Palette verified only in light mode | Recheck every foreground/background pair in both appearances |

## Review Output Format

Use this format only when the user asks for a standalone color review. When the interface-review module orchestrates the review, provide domain evidence and findings to that module and let its output format, severity scale, consolidation rules, cap, and verdict take precedence.

Present the standalone review in two parts.

### Findings

Group all confirmed findings by principle. Use a markdown table with **Severity**, **Location**, **Before**, **After**, and **Why** columns. Never use separate "Before:" / "After:" lines.

- **Severity**: `HIGH` makes content unreadable or assigns a misleading semantic color; `MEDIUM` creates a noticeable theme, gamut, or consistency failure; `LOW` is isolated polish.
- **Location**: cite `path/to/file:line`. If the artifact has no source files, cite the exact screen and component instead.
- **Before / After**: show the current value or token and the exact replacement.
- **Why**: name the violated principle and include measured contrast or gamut evidence when relevant.

Consolidate a repeated systemic issue into one row and list every affected location. Omit principles with no findings.

| Severity | Location | Before | After | Why |
| --- | --- | --- | --- | --- |
| MEDIUM | `src/theme.css:18` | Raw `#3b82f6` bypasses the project's accent token | Use the existing semantic accent token | The isolated value will drift across themes and states |
| MEDIUM | `src/palette.ts:31` | Same absolute C across hues | Tune each hue against its gamut and intended visual weight | Equal chroma coordinates do not guarantee equal rendered vividness |
| HIGH | `src/theme.css:52` | Required P3-only color has no fallback in the supported browser matrix | Add and verify an sRGB fallback before the P3 enhancement | Supported non-P3 clients otherwise lose the intended foreground/color |

### Verification and Verdict

After the findings:

1. **Verification**: list the exact checks run and their observed results, including contrast measurements, gamut checks, and both light and dark appearances when applicable. If a check was not run, state what still needs verification.
2. **Verdict**: `Block` if any `HIGH` finding remains, `Needs changes` if only `MEDIUM` or `LOW` findings remain, and `Approve` only when no actionable findings remain.

When there are no findings, omit the table, state "No actionable color findings", report verification, and end with `Approve`.
