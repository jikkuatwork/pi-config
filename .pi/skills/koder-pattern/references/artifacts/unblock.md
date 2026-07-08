---
title: Koder Inline Unblock Questions
updated: 2026-07-08
---

# Koder Inline Unblock Questions

Inline unblock questions collect only the human decisions that block safe
queue/task/slice progress. Default to asking in the current chat. Do **not**
create `koder/unblock/`, `INDEX.md` packet folders, or required answer files.

If the user wants to answer asynchronously, let them use any temporary scratch
file under `koder/scratch/` and tell you the path. Scratch replies are input,
not canonical state: apply decisions back to the highest source-of-truth
artifact such as the issue, plan, queue, proposal, review, or run log.

## Use when

- The user asks for `unblock`, inline decisions, or "what decisions do you need
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
- The user asked for a normal proposal/issue/plan/review, not decisions.

## Workflow

### 1. Mine blockers

Inspect the source issues, plans, queues, reviews, and active queue state. Read
code only when a blocker cannot be understood from artifacts. Classify each
possible question:

| Bucket | Action |
| --- | --- |
| User decision required | Ask inline in one compact numbered question block. |
| Agent can decide safely | Choose the safe default; do not ask. |
| Source missing shape | Write/update a plan or issue slice instead of asking. |
| Red-risk permission | Ask explicitly with the safest option first. |
| Not needed for next queues | Defer unless it blocks the target window. |

### 2. Ask inline

Keep questions quick to answer. Default cap: 8 questions in one response. If
there are more, split by queue/window/domain and ask the highest-throughput set
first.

Rules:

- One decision per question.
- Simple/terse question text.
- Include `Unblocks:` so the user sees throughput impact.
- Put the recommended option first as `a.` whenever there is a recommendation.
- If the safest recommendation is "do not proceed", put that as `a.`.
- Use 2-4 options. Add free-text allowance instead of inventing many variants.
- Keep option labels stable during the exchange; if a question changes
  materially, ask a new follow-up question.
- Never hide risk in a recommended option.
- End with a low-friction reply hint: `Reply like: 1a 2c 3 defer` or `put
  answers in koder/scratch/<tmp>.md and tell me the path`.

Question format:

```markdown
Unblock questions for <scope>:

1. Should queue runners continue into low-risk overflow work after primary entries drain?
   Unblocks: `koder/queue/066_example/INDEX.md` continuation policy.
   Recommended: a
   a. Yes, continue into pre-approved overflow until the timebox gate. // maximizes safe throughput
   b. No, stop when primary entries drain. // safest but leaves idle time
   c. Only continue if the tree is clean and tests are green. // conservative middle path

Reply like: `1a`, or put answers in `koder/scratch/tmp-unblock.md` and tell me the path.
```

If no option is clearly recommended, write `Recommended: none` and list the
safest/reversible option first.

### 3. Optional scratch reply

Do not create a durable question artifact. If the user wants a file, use a flat,
temporary scratch file only when useful, for example:

```text
koder/scratch/tmp-unblock.md
koder/scratch/YYYY-MM-DD-unblock-answers.md
```

The user may create the scratch file themselves. If you create it at their
request, keep it minimal:

```markdown
# Temporary unblock answers

Reply examples:

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

When a chat reply or scratch file appears:

1. Parse leniently: `1a`, `1. a`, `1) a`, `1: a`, and `1 a` all count.
2. For letter answers, record the selected operational decision in your working
   notes and in any affected canonical artifact.
3. For free text, preserve the user's wording when updating artifacts and
   translate it into the nearest operational decision.
4. For `need more explanation`, answer briefly and keep only that question open.
5. For `defer` / `blocked`, mark the affected slice/queue entry blocked and
   route around it.
6. Update the highest source-of-truth artifact: issue, plan, queue, proposal,
   review, or run log. Scratch/chat is not permanent implementation truth.
7. Move newly unblocked slices into plans/queues when safe.
8. Report the applied decisions and remaining blockers.

### 5. Report queue movement

After applying answers, report the queue impact:

```markdown
Unblock result:
- Decisions applied: 7
- Queues unblocked: `koder/queue/066_example/INDEX.md`
- Slices now queueable: 5
- Still blocked: 2 (`need more explanation`)
- Next action: refill Queue 066 overflow or build Queue 067.
```

## Output contract for new questions

A new inline unblock request should output only:

1. A short scope line.
2. Numbered terse questions with options labeled `a`, `b`, `c`.
3. `Unblocks:` refs for each question.
4. `Recommended:` labels when useful.
5. A single reply hint that accepts chat or any `koder/scratch/` temp file.

## Quality bar

Good inline unblock questions:

- reduce future human interruptions;
- maximize safe queue drain and reversible defaults;
- ask only decisions the agent cannot safely make;
- make the recommended path obvious without hiding risk;
- let the user answer in chat or a scratch temp file;
- convert answers into source artifact updates, not chat-only memory.

## Anti-patterns

- Creating `koder/unblock/` or an `INDEX.md`/`answers.md` packet folder.
- Requiring the user to edit an answer file before progress can continue.
- Asking the user to debug implementation details.
- Asking questions already answered in repo artifacts.
- Bundling multiple decisions in one numbered question.
- Leaving recommendations implicit or burying them after lower-value options.
- Publishing 30-question walls instead of splitting by queue/window.
- Treating chat or scratch as canonical after applying decisions elsewhere.
- Blocking all work because one red-risk decision is unresolved; route around it
  and keep safe queues draining.
