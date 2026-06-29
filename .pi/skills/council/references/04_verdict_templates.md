# Verdict Templates and Tally Rules

Use these templates after `01_protocol.md` and the roster/persona references.
Keep the transcript proportional to the user's requested depth.

## Stance line

Every full/quick council member ends the final round with:

```text
STANCE: <short option label> | CONFIDENCE: high|med|low | DEALBREAKER: yes|no
```

Rules:

- Reuse the same short label where members agree.
- Use `STANCE: abstain` only when the member backs no option.
- `DEALBREAKER: yes` means the opposing option is actively harmful, not merely
  suboptimal.
- Do not infer missing stance lines from prose in a real multi-agent runtime; in
  this local simulated runtime, generate the stance line explicitly.

## Weighted tally

- Each member has weight `1.0`.
- The domain-weight seat, if designated before analysis, has weight `1.5`.
- Abstentions count toward total weight but toward no option.
- Consensus requires `option_weight >= 2/3 * total_weight`.
- If no option clears the bar, report a genuine split instead of forcing a
  verdict.

## Full verdict template

```md
## Simulated Council Verdict

### Selected Panel
- Mode: full
- Members: ...
- Domain-weight seat: ...
- Reliability: single-agent simulated council unless otherwise configured

### Restate Gate
- Member: restatement; alternative framing

### Key Round 1 Insights
- Member: strongest independent point

### Cross-Examination Cruxes
- Member A challenged Member B on ...
- Remaining live disagreements: ...

### Vote Tally
- Option label: weight, members
- Consensus threshold: ...
- Result: consensus / no consensus

### Unresolved Questions
1. ...

### Key Agreements
- ...

### Key Disagreements
- ...

### Recommended Verdict
State the decision or "No consensus". Preserve minority/dealbreaker objections.

### Acceptable Compromises
What this verdict gives up or tolerates.

### Kill Criteria
Observable invalidation conditions, e.g.:
- If <X> happens by <date/event>, invalidate this verdict and switch to <Y>.

### Concrete Next Step
Exactly one artifact-producing action.

### Confidence
High / medium / low, with why.
```

## Quick verdict template

```md
## Quick Simulated Council

- Panel: ...
- Why this panel: ...
- Vote tally: ...

### Verdict
...

### Main Dissent
...

### Next Step
...

### Confidence / Missing Facts
...
```

## Duo verdict template

```md
## Duo Debate: <Member A> vs <Member B>

### Opening Tension
- A: ...
- B: ...

### Strongest Exchange
- A challenges B: ...
- B challenges A: ...

### Crux
What would change the decision?

### Synthesis
Least-regret recommendation or live split.

### Next Step
One action that produces evidence.
```

## Direct persona template

```md
## <Persona> Lens

### Essential Question
...

### Key Lens
...

### Assumptions / Risks / Tradeoffs
...

### Verdict
...

### Confidence
...

### Where This Lens May Be Wrong
...
```
