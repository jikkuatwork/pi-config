# Synthesis: Framework7 v9 + Vue 3 no-build research drafts

## Purpose

This note consolidates the two draft documents in this folder and identifies what to keep/fix before publishing a canonical, agent-facing reference.

## Draft comparison

| Dimension | `gemini.md` | `qwen.md` |
| --- | --- | --- |
| Alignment to requested sectioned deliverable | High | Medium |
| Explicit no-build constraints | High | Medium |
| Copy/paste code density | High | Medium |
| Narrative explainers and rationale | Medium | High |
| Formatting quality/readability as-is | Medium (artifacts present) | High |
| Immediate readiness for canonical manual | Medium-High | Medium |

## Notable strengths

### `gemini.md`

- Closely tracks the required section flow.
- Includes concrete snippets for app shell, app init, template rules, components, routing, and full boilerplate.
- Better suited as the primary source for final output assembly.

### `qwen.md`

- Better prose quality and readability.
- Good contextual explanations for architecture choices and plugin integration.
- Useful secondary source for clarifications and explanatory framing.

## Gaps and defects to resolve

1. **Formatting normalization in `gemini.md`**
   - Several headings/paragraphs are compressed and harder to scan.

2. **Snippet correctness pass**
   - Fix malformed/incomplete snippets (e.g., `const appRoutes =;`).

3. **Strict constraints consistency pass**
   - Ensure final output contains no npm/build-step leakage.
   - Keep all examples in global-script/no-build style.

4. **Version pinning consistency**
   - Confirm all CDN links and version assumptions are internally consistent for Framework7 v9 + Vue 3 global production build.

## Proposed assembly strategy

1. Use `gemini.md` section order as canonical scaffold.
2. Pull select explanatory language from `qwen.md` where clarity improves operational guidance.
3. Run a final strict checklist (`CHECKLIST.md`) against the assembled final file.
4. Emit one canonical file (`FRAMEWORK7_VUE_NO_BUILD.md`) and keep both drafts as provenance.
