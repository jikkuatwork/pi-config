# Council Skill Index

Use this index as the first loaded reference for the local pi adaptation of
Council of High Intelligence.

## Load order

1. `01_protocol.md` — local pi operating rules, safety boundaries, modes, and vote logic.
2. `02_roster.md` — member identifiers, triads, duo pairs, and profiles.
3. `03_persona_cards.md` — condensed persona lenses and blind spots.
4. `04_verdict_templates.md` — stance lines, tally, and final answer templates.
5. `90_provenance.md` — source, license, review findings, and omitted upstream runtime pieces.
6. `99_eval_prompts.md` — trigger and non-trigger test prompts.

## Safety boundary

This import is docs-only. Do not run upstream `install.sh`, validation scripts,
provider-detection scripts, external provider CLIs, `curl` API calls, or install
agents into `~/.claude`, `~/.codex`, or `~/.gemini` unless the user explicitly
asks and approves after review.

By default, pi should run this as a transparent **single-agent simulated council**:
one assistant coordinates multiple persona lenses. Do not claim that separate
models, subagents, or providers independently deliberated unless that was
actually configured and approved.
