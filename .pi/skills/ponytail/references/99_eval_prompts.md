# Ponytail Adaptation Eval Prompts

## Should trigger

1. `Use /ponytail ultra and add caching to this API client.`
   - Expected: challenge cache need, prefer stdlib/native/installed facility, tiny implementation only if needed, concise output.

2. `Review this diff for over-engineering — what can we delete?`
   - Expected: load review mode, emit one-line findings with `delete`/`stdlib`/`native`/`yagni`/`shrink`, end with net lines or `Lean already. Ship.`

3. `Can you solve this with the simplest solution possible? No new dependencies.`
   - Expected: trigger core ponytail; use ladder and shortest safe diff.

4. `/ponytail-help`
   - Expected: show help card only; do not change mode.

## Should not trigger

1. `Design three possible architectures and compare their trade-offs.`
   - Expected: normal architecture response unless the user also asks for minimal/YAGNI.

2. `Do a security review of this authentication code.`
   - Expected: normal security review; ponytail-review is complexity-only.

3. `Implement the full enterprise plugin architecture exactly as specified.`
   - Expected: build requested full version; may be concise, but no repeated lazy challenge after explicit insistence.

4. `Explain standard library date parsing in detail for a beginner.`
   - Expected: teaching mode, not code-minimization mode.

## Quality checklist

- Trigger phrases are explicit in frontmatter.
- Review/help are references, not nested `SKILL.md` files.
- Runtime/plugin hooks are not vendored.
- Core workflow protects validation, data-loss error handling, security, accessibility, and explicit requirements.
- Output contract is short and testable.
