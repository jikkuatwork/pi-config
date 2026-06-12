# Ponytail Review Mode

Use for `/ponytail-review`, "review for over-engineering", "what can we delete",
"is this over-engineered", or "simplify review".

Review diffs/code for unnecessary complexity only. Do not do a general
correctness/security/performance review in this mode unless complexity creates
the issue. The best outcome is a shorter diff.

## Format

One finding per line:

```text
<file>:L<line>: <tag>: <what to cut>. <replacement>.
```

For single-file context, `L<line>:` is enough.

Tags:

- `delete:` — dead code, unused flexibility, speculative feature. Replacement: nothing.
- `stdlib:` — hand-rolled thing the standard library ships. Name the function/module.
- `native:` — dependency or code doing what the platform already does. Name the feature.
- `yagni:` — abstraction with one implementation, config nobody sets, layer with one caller.
- `shrink:` — same logic, fewer lines. Show the shorter form.

End with:

```text
net: -<N> lines possible.
```

If nothing should be cut:

```text
Lean already. Ship.
```

## Examples

```text
L12-38: stdlib: 27-line validator class. "@" in email, 1 line — real validation is the confirmation mail.
L4: native: moment.js imported for one format call. Intl.DateTimeFormat, 0 deps.
repo.py:L88: yagni: AbstractRepository with one implementation. Inline it until a second one exists.
L52-71: delete: retry wrapper around an idempotent local call. Nothing replaces it.
L30-44: shrink: manual loop builds dict. dict(zip(keys, values)), 1 line.
net: -96 lines possible.
```

## Boundaries

- A single smoke test or assert-based self-check is the ponytail minimum, not bloat.
- Do not flag security validation, data-loss prevention, accessibility basics, or explicit user requirements.
- Do not apply fixes unless the user asks; list deletions/replacements only.
