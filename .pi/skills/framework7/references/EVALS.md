---
title: Framework7 Skill Eval Prompts
updated: 2026-05-27
---

# Framework7 Skill Eval Prompts

Use these prompts when reviewing trigger behavior or editing the skill.

## Should trigger

1. "Build me a Framework7 Vue mobile UI that runs without npm or Vite."
   - Expected: load this skill; produce browser ESM/import-map Framework7 v9 + Vue 3 code.

2. "I want a BFBB-compatible Framework7 frontend option for a Holm app."
   - Expected: load this skill and `HOLM_BFBB_ORIENTATION.md`; if explicitly asked for Holm/Zippy runtime details, also load `holm-app`.

3. "Make a mobile/PWA-like settings screen with Framework7 components and Vue state."
   - Expected: load this skill; use `f7-page`, `f7-navbar`, `f7-list`, `v-model:value`, and `v-model:checked` patterns.

4. "Convert this vanilla mobile page to a build-free Framework7 Vue app."
   - Expected: load this skill; preserve no-build constraints and Framework7 router/component structure.

5. "Make this Framework7 app look good on desktop with a centered phone frame and thin scrollbars."
   - Expected: load this skill; apply the desktop app-frame and `.page-content` scrollbar CSS without changing the no-build architecture.

## Should not trigger

1. "Build a generic Vue 3 dashboard with Vite and Pinia."
   - Expected: do not load this skill unless Framework7/no-build mobile UI is requested.

2. "Create a native iOS SwiftUI screen."
   - Expected: do not load; Framework7 is mobile-web, not native SwiftUI.

3. "Deploy my Holm app and configure providers."
   - Expected: do not load this skill unless Framework7 UI work is part of the task; use Holm guidance and permission gates.

4. "Explain CSS flexbox for responsive cards."
   - Expected: do not load unless the cards are specifically Framework7 components.

## Edge cases

- "No-build Vue app" alone should not always trigger; trigger when mobile UI, Framework7, BFBB-compatible frontend, or app-shell wording makes Framework7 likely.
- "Framework7 with React/Svelte" should trigger only for Framework7 conceptual help, then state that this skill's implementation reference is Vue 3 no-build and ask before switching stack.
- "Production Framework7 app" should not introduce npm/build steps automatically; first ask whether the user wants to leave the no-build/BFBB paradigm.
- "Mobile preview frame" without Framework7 may be ordinary CSS work; trigger only when Framework7/mobile-web app context is present.

## Checklist result for current version

- [x] At least 2 should-trigger prompts.
- [x] At least 2 should-not-trigger near-miss prompts.
- [x] Description separates Framework7/no-build mobile UI from generic Vue or Holm operations.
- [x] Output contract is explicit: runnable browser files plus smoke-test checklist.
- [x] Workflow avoids loading Holm details unless relevant.
- [x] Scope limits are explicit: no npm/build/SFCs unless explicitly requested.
