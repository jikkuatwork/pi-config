---
status: active
topic: Framework7 v9 + Vue 3 no-build reference manual compilation
tags: framework7, vue3, no-build, cdn, mobile-web, documentation
created: 2026-05-27
updated: 2026-05-27
---

# Research 002: Framework7 + Vue no-build docs compilation

## Question

How do we produce a production-grade, single-file reference manual for **Framework7 v9 + Vue 3** in a strict **no-build (CDN/UMD/global scripts)** environment that an AI coding agent can follow without toolchain drift?

## Source artifacts in this folder

- Primary draft: [`gemini.md`](./gemini.md)
- Secondary draft: [`qwen.md`](./qwen.md)
- Synthesis and gap analysis: [`SYNTHESIS.md`](./SYNTHESIS.md)
- Prompt compliance checklist: [`CHECKLIST.md`](./CHECKLIST.md)

## Findings summary

1. **`gemini.md` is closer to the requested output shape**
   - Explicitly structured around the required sections (HTML shell/CDNs, init, template parsing rules, components, routing, full boilerplate).
   - Provides concrete code blocks for no-build usage.

2. **`qwen.md` is useful as contextual background, but weaker as direct output**
   - Strong narrative explanation and ecosystem context.
   - Less strict to the exact requested deliverable shape and includes more general guidance not optimized for immediate copy/paste execution.

3. **Both drafts need normalization before final canonical handoff**
   - `gemini.md` includes formatting artifacts and at least one malformed snippet (`const appRoutes =;`) that must be corrected in final canonical output.
   - CDN/version pinning and strict no-build constraints should be revalidated against Framework7 v9 + Vue 3 global production builds.

## Recommendation

Use **`gemini.md` as base**, cross-check with `qwen.md` for conceptual completeness, then produce a cleaned canonical manual (`FRAMEWORK7_VUE_NO_BUILD.md`) with:

- strict section ordering from the original request,
- corrected runnable code,
- explicit no-build constraints,
- single copy/pasteable `index.html` ground-truth example.

## Follow-ups

- [ ] Create finalized canonical `FRAMEWORK7_VUE_NO_BUILD.md` from cleaned synthesis.
- [ ] Validate all snippets by opening directly in browser (no npm, no bundler).
- [ ] Optionally add a tiny smoke-test checklist for agent users (router, form bindings, modal/sheet state, platform theme auto-switch).

## Sources

- Local: `koder/research/002_framework7_docs/gemini.md`
- Local: `koder/research/002_framework7_docs/qwen.md`
