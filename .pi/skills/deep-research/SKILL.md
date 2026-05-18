---
name: deep-research
description: Conduct structured deep research with sub-questions, source gathering (local + optional web), contradiction checks, evidence grading, and synthesis.
argument-hint: "<topic> [--depth quick|standard|deep] [--local-only]"
allowed-tools: read bash grep find ls write edit
---

# Deep Research (pi-native)

Run multi-phase research and produce a structured, evidence-graded result.

## When to use

Use this skill when the user asks for:
- deep investigation of a technical/product topic,
- comparison of options with trade-offs,
- evidence-backed recommendation,
- synthesis across multiple sources.

## Capability and model check (first)

1. Parse arguments:
   - Topic (required)
   - `--depth` (default: `standard`)
   - `--local-only` (optional)
2. State available capability before researching:
   - Local sources: repository/files/tools (always possible)
   - Web sources: only if reachable via current tools/runtime
3. If web access is unavailable and `--local-only` is not set, ask whether to continue local-only.
4. Model preference:
   - If user asks for model routing (e.g., Gemini/Qwen), confirm and proceed with the current runtime model unless the user switches models.
   - Do not block research solely because a preferred model is unavailable.

## Research depth profiles

- **quick (2-5 min):** 2-3 sub-questions, minimal source set, concise recommendation.
- **standard (5-15 min):** 3-6 sub-questions, local + web when available, contradiction check.
- **deep (15-40 min):** 5-8 sub-questions, broader source diversity, explicit uncertainty map and next experiments.

## Workflow

1. **Define scope**
   - Rewrite the user question into a clear objective.
   - Break into sub-questions (3-8 depending on depth).
   - Define output shape (decision memo, comparison table, action plan, etc.).

2. **Create a research plan**
   - Build a short plan table:
     - sub-question
     - intended source types (local code/docs, vendor docs, benchmarks, issues/blogs)
     - target confidence

3. **Gather local evidence first**
   - Use `find`/`grep`/`read`/`ls`/`bash` to inspect the codebase and docs.
   - Capture concrete references (file path, section, snippet summary).

4. **Gather web evidence when available**
   - Prefer reliable primary sources (official docs, specs, release notes).
   - Add secondary sources only for context.
   - Record URL + claim supported by that URL.
   - Never fabricate links or claims.

5. **Cross-reference and challenge findings**
   - Identify agreement/disagreement across sources.
   - Prefer newer, primary, and reproducible evidence.
   - Explicitly mark unresolved contradictions.

6. **Grade evidence**
   - **High:** multiple independent reliable sources OR direct reproducible local evidence.
   - **Medium:** one reliable source, or indirect but consistent evidence.
   - **Low:** anecdotal/single unverified claim/speculation.

7. **Synthesize**
   - Produce a concise, decision-oriented report.
   - Include uncertainty and what would change the recommendation.

8. **Optional persistence (only if user wants it)**
   - Save report to a repo file (for example `koder/research/<topic-slug>.md`).

## Output format

Use this exact structure:

```markdown
## Executive summary
- 2-4 bullets answering the main question.

## Key findings
1. Finding — Evidence: High/Medium/Low
   - Why: ...
   - Sources: [path-or-url, ...]

## Contradictions and uncertainty
- Claim A vs Claim B — status: resolved/unresolved
- Unknowns: ...

## Recommendation
- Preferred option: ...
- Trade-offs: ...
- When to choose alternative: ...

## Next steps
1. ...
2. ...

## Sources consulted
- Local: `path/to/file` (what it contributed)
- Web: `https://...` (what it contributed)
```

## Rules

- Do not pretend web research happened if it did not.
- Do not cite sources you did not inspect.
- Keep the report scoped to the user question.
- Prefer concrete evidence over broad claims.
- If confidence is low, say so clearly and propose how to de-risk.
