# Local Pi Council Protocol

This is a pi-native, docs-only adaptation of Council of High Intelligence. It
preserves the deliberation pattern and persona roster, but it does **not** depend
on Claude subagents, Codex/Gemini/Ollama/Cursor CLIs, provider routing scripts,
or network API calls.

## Runtime contract

- Default runtime: one assistant simulates multiple council seats from the
  persona cards.
- Be explicit when relevant: "Simulated council" means multiple analytical
  lenses, not independently sampled models.
- Do not run/install upstream scripts or external provider calls by default.
- Use normal repo tools only when the user task itself permits them; do not use
  tools merely to imitate upstream multi-provider routing.
- Do not fabricate facts. If the decision depends on unknown facts, surface them
  as unresolved questions or ask for data.

## Invocation patterns

Recognize explicit requests such as:

```text
/council Should we open-source this?
/council --quick Should we add caching here?
/council --duo Should we use microservices or a monolith?
/council --triad architecture Should we split this package?
/council --members socrates,feynman,ada Is this debugging plan sound?
Use the council to stress-test this decision.
Ask a Torvalds/Ada duo to review this abstraction.
```

Supported flags and aliases:

- `--quick`: compact 2-round deliberation.
- `--duo`: 2-person polarity debate.
- `--full`: use all 18 members. Only do this when explicitly requested.
- `--triad <domain>`: use a predefined 3-person panel from `02_roster.md`.
- `--members a,b,c`: manual member list; accept hyphen or underscore aliases
  such as `sun-tzu`/`sun_tzu` and `lao-tzu`/`lao_tzu`.
- `--profile classic|exploration-orthogonal|execution-lean`: use a profile.

If no problem statement is provided, ask the user for the decision/problem.
If no panel is specified, auto-select the best triad and state why.

## Panel selection

1. Parse mode: `quick`, `duo`, or `full`.
2. Parse panel: `--members`, `--triad`, `--profile`, `--full`, or auto-triad.
3. For `--duo` without explicit members, choose a polarity pair from keyword
   matches in `02_roster.md`; default to Socrates + Feynman.
4. Designate a domain-weight seat before analysis when one member is clearly
   most on-domain. That seat counts as `1.5x` for full/quick vote tally. If
   ambiguous, designate no weighted seat.
5. For large panels, keep each seat very short. If the user asks for `--full`,
   prefer summaries over long transcripts unless they requested full detail.

## Full mode

Use when the user wants a serious deliberation and did not request `--quick` or
`--duo`.

1. **Selection checkpoint** — state selected panel, mode, and domain-weight seat.
2. **Restate gate** — each member gives:
   - one-sentence restatement through their lens;
   - one-sentence alternative framing.
3. **Round 1: independent lenses** — each member gives its strongest analysis.
   Keep each to roughly 100-180 words for triads, shorter for larger panels.
4. **Round 2: cross-examination** — each member must engage at least one other
   member's claim. For 4+ members, first evaluate claims as `Member A/B/C` to
   reduce status/persona bias, then reveal names in the final transcript.
5. **Round 3: stance** — each member emits a final crystallized position ending
   with exactly:
   `STANCE: <short label> | CONFIDENCE: high|med|low | DEALBREAKER: yes|no`
6. **Tally** — normalize equivalent stance labels; apply the domain-weight seat;
   consensus requires at least `2/3` of total weight. Abstentions count toward
   total weight but toward no option.
7. **Verdict** — lead with unresolved questions, then agreements, disagreements,
   vote tally, recommendation, concrete next step, kill criteria, confidence,
   and reliability note.

## Quick mode

Use for simpler decisions or when the user requests speed.

1. Select panel, usually the best triad unless user supplied members/profile.
2. Each member gives a 1-sentence restatement and 3-5 bullets of rapid analysis.
3. Each member emits one final stance line.
4. Return a compact verdict with the same tally rules as full mode.

## Duo mode

Use for tensions, tradeoffs, or when the user asks for a debate.

1. Pick two polarity members.
2. Opening positions: each frames the decision and strongest argument.
3. Direct response: each attacks the other's strongest point and concedes one
   valid concern if present.
4. Synthesis: name the crux, what evidence would flip each side, and the least
   regret next step. Duo mode is dialectic, not consensus voting.

## Direct persona mode

If the user explicitly asks for one named council member, use that persona as a
standalone analytical lens. Suggested output:

1. `Essential Question`
2. `Key Lens`
3. `Assumptions / Risks / Tradeoffs`
4. `Verdict`
5. `Confidence`
6. `Where This Lens May Be Wrong`

## Evidence discipline

- Label important claims when useful: `empirical`, `mechanistic`, `strategic`,
  `ethical`, or `heuristic`.
- Distinguish facts from persona-flavored interpretations.
- For code/repo tasks, inspect actual files before letting personas speculate.
- Preserve dissent; do not collapse real disagreement into fake consensus.
- If the council cannot decide without missing facts, say so and propose the
  smallest artifact-producing next step to resolve uncertainty.
