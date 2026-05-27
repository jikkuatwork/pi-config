---
updated_at: "27 May 2026 | 12:53 PM IST"
---

# Koder State

## Past

- Session handoff open/close flow is active; `koder/STATE.md` remains source-of-truth.
- Earlier durable work includes kodemachine design issue `koder/issues/001_kodemachine_namespaced_resources_and_storage_vm/INDEX.md` and Framework7 research scaffold under `koder/research/002_framework7_docs/`.
- This session created a separate project-local `.pi/skills/framework7/` skill for Framework7 v9 + Vue 3 no-build/browser-ESM mobile UI work.
- Framework7 skill shape:
  - `SKILL.md` is intentionally tiny (<10 lines) for low context load.
  - `references/FRAMEWORK7_VUE_NO_BUILD.md` is the canonical build-free Vue/Framework7 manual with import-map ESM boilerplate.
  - `references/HOLM_BFBB_ORIENTATION.md` isolates Holm/Zippy/BFBB guidance so generic Framework7 files stay clean.
  - `references/EVALS.md` captures trigger/non-trigger prompts.
- Integrated user-added `koder/research/002_framework7_docs/scrollbar_app_frame.md` into the skill as desktop phone-frame + thin scrollbar guidance.

## Present

- Repo has no root test/build harness.
- `koder-pattern` is direct-use only; invoke explicitly when filing/managing `koder/` artifacts.
- Current intentional changes for commit:
  - `.pi/skills/framework7/SKILL.md`
  - `.pi/skills/framework7/references/FRAMEWORK7_VUE_NO_BUILD.md`
  - `.pi/skills/framework7/references/HOLM_BFBB_ORIENTATION.md`
  - `.pi/skills/framework7/references/EVALS.md`
  - `koder/research/002_framework7_docs/scrollbar_app_frame.md`
  - `koder/STATE.md`

## Future

- Next session: build an app using the new Framework7 skill.
- For standalone apps, follow `FRAMEWORK7_VUE_NO_BUILD.md` and keep no npm/build/SFC constraints.
- For Holm/Zippy/BFBB apps, also read `HOLM_BFBB_ORIENTATION.md`; load `holm-app` only when explicitly requested or when Holm runtime/deploy/API details are needed.
- If using BFBB/raw deploy, vendor browser runtime assets locally instead of making public CDN runtime dependencies mandatory.
