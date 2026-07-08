---
title: Koder Unblock Packets
updated: 2026-07-08
---

# Koder Unblock Packets

Unblock packets collect the human decisions that block autonomous queue drain.
They let the user answer many decisions asynchronously while agents keep mining,
planning, and draining safe work.

## Use when

- The user asks for `unblock`, an unblock packet, or "what decisions do you need
  from me?".
- Queue mining finds `human-gated` or `red-risk` choices that prevent otherwise
  queueable slices.
- Preparing round-clock/away-window work where the user's job should be
  priority/permission/product decisions, not implementation supervision.
- A queue, issue, or plan is blocked by choices the agent cannot safely infer.

## Do not use when

- The answer is discoverable from source, tests, docs, logs, or existing
  artifacts.
- The agent can choose a safe reversible default and proceed without user risk.
- The question is really an implementation detail; encode it in the plan instead.
- The user asked for a normal proposal/issue/plan/review, not a decision packet.

## Path

```text
koder/unblock/NNN_short_slug/
  INDEX.md       # question packet + answer/application status
  answers.md     # optional user-filled answer file
```

Use the repo's local convention if it already has an unblock/question artifact.
Otherwise use the folder-first shape above. Do not create `turns/` unless a
substantial discussion needs history.

## Frontmatter

```yaml
---
status: open        # open | answered | applied | closed
created: YYYY-MM-DD
updated: YYYY-MM-DD
type: unblock-packet
tags: queue, decisions
scope: "Queue 066 / Issue 452"
related:
  - koder/queue/066_example/INDEX.md
  - koder/issues/452_example/INDEX.md
answer_file: answers.md
---
```

## Workflow

### 1. Mine blockers

Inspect the source issues, plans, queues, reviews, and active queue state. Read
code only when a blocker cannot be understood from artifacts. Classify each
possible question:

| Bucket | Action |
| --- | --- |
| User decision required | Put in the unblock packet. |
| Agent can decide safely | Choose the safe default; do not ask. |
| Source missing shape | Write/update a plan or issue slice instead of asking. |
| Red-risk permission | Ask explicitly with the safest option first. |
| Not needed for next queues | Defer unless it blocks the target window. |

### 2. Write the packet

Keep the packet small enough to answer quickly. Default cap: 12 questions. If
there are more, split into multiple packets by queue/window/domain.

Rules:

- One decision per question.
- Simple/terse question text.
- Include `Unblocks:` so the user sees throughput impact.
- Put the recommended option first as `a.` whenever there is a recommendation.
- If the safest recommendation is "do not proceed", put that as `a.`.
- Use 2-4 options. Add free-text allowance instead of inventing many variants.
- Keep option labels stable after publishing; if a question changes materially,
  append a new question or create a v2 packet.
- Never hide risk in a recommended option.

Question format:

```markdown
1. Should queue runners continue into low-risk overflow work after primary entries drain?
   Unblocks: `koder/queue/066_example/INDEX.md` continuation policy.
   Recommended: a
   a. Yes, continue into pre-approved overflow until the timebox gate. // maximizes safe throughput
   b. No, stop when primary entries drain. // safest but leaves idle time
   c. Only continue if the tree is clean and tests are green. // conservative middle path
```

If no option is clearly recommended, write `Recommended: none` and list the
safest/reversible option first.

### 3. Create an answer file

Create `answers.md` beside the packet when useful. Keep it easy for the user to
edit:

```markdown
# Answers for Unblock NNN

Reply format examples:

1. a
2. c
3. need more explanation
4. custom: Allow docs-only changes, but no runtime behavior changes.

## Answers

1.
2.
3.
```

The user may answer with letters, free text, `need more explanation`, `defer`,
or `blocked`. Do not require perfect syntax.

### 4. Process answers

When an answer file or chat reply appears:

1. Parse leniently: `1. a`, `1) a`, `1: a`, and `1 a` all count.
2. For letter answers, record the selected option in the packet's Decision Log.
3. For free text, preserve the user's wording and translate it into the nearest
   operational decision.
4. For `need more explanation`, add a short explanation and keep that question
   open or emit a smaller follow-up packet.
5. For `defer` / `blocked`, mark the affected slice/queue entry blocked and
   route around it.
6. Update the highest source-of-truth artifact: issue, plan, queue, proposal, or
   review. The unblock packet is a decision capture tool, not the permanent
   home for implementation detail.
7. Move newly unblocked slices into plans/queues when safe.
8. Mark the packet `applied` once source artifacts are updated; mark `closed`
   when no open questions remain.

Decision log format:

```markdown
## Decision Log

| # | Answer | Decision | Applied refs | Status |
| ---: | --- | --- | --- | --- |
| 1 | a | Continue into pre-approved overflow until timebox gate. | `koder/queue/066_example/INDEX.md` | applied |
```

### 5. Suggest queue movement

After applying answers, report the queue impact:

```markdown
Unblock result:
- Decisions applied: 7
- Queues unblocked: `koder/queue/066_example/INDEX.md`
- Slices now queueable: 5
- Still blocked: 2 (`need more explanation`)
- Next action: refill Queue 066 overflow or build Queue 067.
```

## Output contract for a new packet

A new packet should contain:

1. Frontmatter.
2. `## Purpose` — one sentence.
3. `## How to answer` — answer file path and accepted syntax.
4. `## Questions` — numbered, terse, options labeled `a`, `b`, `c`.
5. `## Decision Log` — initially `Pending`.
6. `## Application Notes` — source artifacts to update after answers.

Template:

~~~markdown
---
status: open
created: YYYY-MM-DD
updated: YYYY-MM-DD
type: unblock-packet
tags: queue, decisions
scope: "<scope>"
related: []
answer_file: answers.md
---

# Unblock NNN: Short title

## Purpose

Collect decisions needed to unblock <queue/window/slices>.

## How to answer

Edit `answers.md` or reply in chat:

```text
1. a
2. c
3. need more explanation
```

## Questions

1. <terse question>
   Unblocks: `<path>` / <slice>
   Recommended: a
   a. <recommended option>. // why
   b. <other option>. // tradeoff

## Decision Log

Pending.

## Application Notes

- After answers, update <source artifact paths>.
~~~

## Quality bar

Good unblock packets:

- reduce future human interruptions;
- maximize safe queue drain and reversible defaults;
- ask only decisions the agent cannot safely make;
- make the recommended path obvious without hiding risk;
- keep user answers durable and easy to apply;
- convert answers into source artifact updates, not chat-only memory.

## Anti-patterns

- Asking the user to debug implementation details.
- Asking questions already answered in repo artifacts.
- Bundling multiple decisions in one numbered question.
- Leaving recommendations implicit or burying them after lower-value options.
- Publishing 30-question packets instead of splitting by queue/window.
- Treating the unblock packet as canonical after applying decisions elsewhere.
- Blocking all work because one red-risk decision is unresolved; route around it
  and keep safe queues draining.
