---
name: create-skill
description: Create, rewrite, and improve agent skills with strict structure, explicit trigger wording, and repeatable evaluation. Use when the user asks to build a new skill, merge existing skills, refactor a SKILL.md, or improve when a skill should and should not trigger.
license: MIT
metadata:
  sources:
    - https://www.skills.sh/anthropics/skills/skill-creator
    - https://www.skills.sh/mattpocock/skills/write-a-skill
  adapted-for: pi-local-no-skills-cli
---

# Create Skill

Opinionated workflow for building high-signal skills quickly, then hardening them.

## Default Operating Policy

Unless the user says otherwise, run in **Vibe Mode (default)**:

1. Ask only the minimum clarifying questions needed.
2. Produce a usable draft in the same turn.
3. Run a lightweight eval checklist.
4. Iterate fast with short diffs.

Escalate to stricter modes only when needed.

## Modes

### 1) Vibe Mode (default)

Use when the user wants speed and collaborative drafting.

- 3–6 quick clarifying questions max
- Draft `SKILL.md` immediately
- Add 4 eval prompts (2 should-trigger, 2 should-not)
- Revise once based on feedback

### 2) Structured Mode

Use when the skill will be reused often by a team.

- Full scope + boundaries + output contract
- Split advanced docs into `references/`
- Add 6–10 eval prompts
- Perform at least 2 revision passes

### 3) Benchmark Mode

Use only when user explicitly asks for rigorous comparison.

- Compare versions (old/new or with/without)
- Record quality, speed, and token/cost tradeoffs
- Keep results in a reproducible workspace

## Required Workflow (always)

## Step 1 — Capture intent and boundaries

Extract from conversation first; then ask gaps:

- Goal: what capability must this skill unlock?
- Triggers: what user wording should invoke it?
- Non-triggers: what similar requests should NOT invoke it?
- Output: what deliverable format is expected?
- Scope guardrails: what is explicitly out-of-scope?
- Runtime: docs-only vs includes deterministic scripts

## Step 2 — Draft with strict structure

Use the template below. Keep `SKILL.md` concise and action-oriented.

### Strict SKILL Template

```md
---
name: <skill-name>
description: <what it does>. Use when <specific triggers, contexts, file types, or user phrases>.
---

# <Skill Name>

## Purpose
<1 short paragraph>

## Use when
- <trigger 1>
- <trigger 2>

## Do not use when
- <near-miss 1>
- <near-miss 2>

## Inputs expected
- <input type / files / context>

## Workflow
1. <step>
2. <step>
3. <step>

## Output contract
- <exact output format or checklist>

## References
- `references/<topic>.md` — read when <condition>
```

## Step 3 — Keep context clean

- Put only high-frequency instructions in `SKILL.md`.
- Move heavy/rare material to `references/*.md`.
- Add scripts only for deterministic repeated work.
- Avoid nested discoverable `SKILL.md` files in large domains; use `references/modules/*/GUIDE.md`.

## Step 4 — Run mandatory eval checklist

Create realistic prompts (not toy prompts), then check:

### Trigger correctness

- [ ] At least 2 should-trigger prompts
- [ ] At least 2 should-not-trigger near-miss prompts
- [ ] Description clearly separates trigger vs non-trigger boundaries

### Output quality

- [ ] Output format is explicit and testable
- [ ] Workflow avoids busywork / redundant steps
- [ ] Instructions are understandable without hidden context

### Robustness

- [ ] Includes at least one edge case prompt
- [ ] Scope limits are explicit
- [ ] Terminology is consistent

If any box fails, revise and rerun checklist.

## Step 5 — Iterate with minimal diffs

When feedback arrives:

1. Identify root cause (trigger miss, structure issue, or output mismatch).
2. Apply the smallest effective change.
3. Explain **why** the change improves general behavior.
4. Re-check mandatory eval checklist.

Avoid overfitting to one prompt.

## Style Rules

- Prefer clear, imperative instructions.
- Explain intent (“why”), not just rigid commands.
- Keep tone practical; avoid fluff and vague promises.
- Prefer specific trigger phrases over abstract wording.

## Repo Safety + Import Policy

- Never use or suggest Vercel Skills CLI in this repo.
- Vendor skills manually under `.pi/skills/`.
- Treat third-party runnable/installable content as untrusted.
- Warn and ask before running anything installable/executable.
- Never include secrets, credentials, or private operational state.

## Deliverables

When creating or rewriting a skill, provide:

1. Updated skill files
2. A short “what changed and why” summary
3. The eval prompt set used for verification
4. Any follow-up improvements still recommended

## Upstream References

For full upstream context, read on demand:

- `references/upstream/anthropic-skill-creator.GUIDE.md`
- `references/upstream/mattpocock-write-a-skill.GUIDE.md`
