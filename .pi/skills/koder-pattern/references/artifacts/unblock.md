---
title: Koder Inline Unblock Questions
updated: 2026-07-15
---

# Koder Inline Unblock Questions

Inline unblock questions collect only the human decisions that block safe
queue/task/slice progress. Ask in the current chat. Do **not** create
`koder/unblock/` folders, packet files, or required answer files; if the user
wants to answer asynchronously they may use any temporary file under
`koder/scratch/` and tell you the path.

Ask only when the answer is not discoverable from source/artifacts, no safe
reversible default exists, and the choice genuinely gates progress (priority,
permission, product direction, red-risk approval). Implementation details go
in the plan, not to the user. When the agent can decide safely, decide.

## Format

Cap at 8 questions per response; split larger sets by queue/window. One
decision per question, 2–4 options, recommended option first as `a.` (or the
safest option first with `Recommended: none`), never hide risk in a
recommendation, and include what each answer unblocks:

```markdown
Unblock questions for <scope>:

1. Should queue runners continue into low-risk overflow work after primary entries drain?
   Unblocks: `koder/queue/066_example/INDEX.md` continuation policy.
   Recommended: a
   a. Yes, continue into pre-approved overflow until the timebox gate.
   b. No, stop when primary entries drain.

Reply like: `1a`, or put answers in `koder/scratch/tmp-unblock.md` and tell me the path.
```

## Processing answers

Parse leniently (`1a`, `1. a`, `1: a` all count; free text, `defer`,
`blocked`, and `need more explanation` are valid). Apply each decision to the
highest source-of-truth artifact — issue, plan, queue, proposal, review, or
run log; chat and scratch files are input, never canonical state. Mark
deferred/blocked items blocked and route around them rather than stalling
everything on one unresolved decision. Then report: decisions applied, queues/
slices unblocked, still blocked, next action.

## Anti-patterns

Durable question artifacts; requiring file edits before progress; questions
already answered in artifacts; bundled decisions; buried recommendations;
30-question walls; treating chat/scratch as canonical after applying
decisions.
