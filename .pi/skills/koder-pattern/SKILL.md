---
name: koder-pattern
description: Direct-use only. Use only when the user explicitly asks to use koder-pattern, /koder-pattern, to file/manage koder/ issues, plans, reviews, queues, harnex dispatches, research, analysis, notes, or task artifacts, or says to do one turn in a koder artifact.
updated: 2026-05-24
---

# Koder Pattern

Folder-first meta-workflow for durable agent artifacts under `koder/`.
“File” means create/update a canonical artifact with frontmatter, source links, acceptance/validation, and no secrets.
Issue = problem/decision record; plan = thin implementation map; review = verdict/findings; queue = ordered orchestration batch; harnex = bounded worker dispatch; research/analysis = source-backed findings.
Turn = one next-numbered contribution; use `turns/` for any artifact when separate discussion/history helps, while reviews already use numbered files.
Read `references/INDEX.md` first, then only task-relevant references. Do not act from this file alone.
Do not auto-load at session init; use only on explicit invocation or when the user explicitly asks to file/manage `koder/` artifacts.
