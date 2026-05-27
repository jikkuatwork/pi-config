# Prompt compliance checklist (for final canonical manual)

Use this checklist before declaring `FRAMEWORK7_VUE_NO_BUILD.md` final.

## Hard constraints

- [ ] No npm install steps.
- [ ] No Vite/Webpack/bundler setup.
- [ ] No `.vue` single-file component examples.
- [ ] No `import ... from node_modules` examples.
- [ ] All examples are browser-native (CDN/UMD/global objects/script tags).

## Required sections coverage

- [ ] 1) HTML shell and exact CDN dependency tags.
- [ ] 2) App initialization blueprint (`Vue.createApp`, `app.use(Framework7Vue, Framework7)`, `theme: 'auto'`).
- [ ] 3) Strict browser template parsing rules (kebab-case attributes, `v-model` nuances like `v-model:checked`).
- [ ] 4) Component syntax guide (app shell, navbar, lists/forms, overlays).
- [ ] 5) Multi-page routing without build step (plain JS routes + inline template strategy + programmatic navigation).
- [ ] 6) Complete copy/pasteable single-file `index.html` master boilerplate.

## Output quality

- [ ] Headings are clean and scannable.
- [ ] Code blocks are syntactically valid.
- [ ] `routes` array is complete and valid.
- [ ] Overlay examples are state-driven with Vue `ref()`/reactive state.
- [ ] Final boilerplate runs by opening directly in browser.

## Provenance links

- [ ] Mentions source drafts: `gemini.md` and `qwen.md`.
- [ ] Keeps draft files unmodified for traceability.
