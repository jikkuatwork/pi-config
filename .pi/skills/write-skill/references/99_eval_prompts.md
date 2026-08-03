# Eval Prompts: write-skill

## Should trigger

1. "I want to create a new skill — how should I structure it and write the description so it actually triggers?"
   - Expect: load `01_core.md`; consult section 4 (SKILL.md anatomy), 6 (description as routing contract), 8 (authoring workflow).
2. "My skill isn't firing and I don't know why. How do I debug skill triggering / execution?"
   - Expect: load `01_core.md`; apply section 9 (Testing and debugging) — routing vs execution split.
3. "What belongs in SKILL.md vs in references? Explain progressive disclosure."
   - Expect: load `01_core.md`; section 3 (progressive disclosure) + 6 (keep references one level deep).

## Should NOT trigger

4. "Import this skill from GitHub into our repo, vet it, and vendor it under .pi/skills."
   - Expect: NOT write-skill → route to `skill-import` instead. (write-skill is the authoring craft reference, not the vendoring workflow.)
5. "Build me a new skill following our strict template and give me eval prompts for it."
   - Expect: NOT write-skill → route to `create-skill` (hands-on builder). write-skill is reference-only.
6. "Skim our koder/STATE.md and open the repo."
   - Expect: NOT write-skill → `open` skill.

## Edge case

7. "Write a skill description that contains a colon and an apostrophe."
   - Expect: load `01_core.md`; apply the frontmatter YAML rule — single-quote the value and double inner apostrophes (Pi strict YAML).

## Validation

- `references/INDEX.md` routes clearly to `01_core.md` / `90_provenance.md` / `99_eval_prompts.md`.
- No executable or network-call content in the skill tree.
