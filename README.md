# Pi Config

Why I prefer pi: its extensions.

A coding harness that can change itself feels like a superpower.

Ask what needs to change.
It appears.
Then it gets refined.
Again and again.

That is the joy here:

- tools shaped by real use
- small tweaks that compound
- a setup that keeps getting sharper

## Extensions

Source: [`extensions/`](extensions/)

- `vim.ts`
  - modal editing
  - normal/insert mode
  - Vim motions
  - small edits
  - quick model/thinking switcher

- `footer-highlights.ts`
  - token usage
  - session cost
  - context usage
  - model name
  - thinking level

- `azure-retry-normalizer.ts`
  - normalizes flaky Azure/OpenAI responses
  - turns opaque transient failures into retryable errors
  - shows retry status in the UI

- `vim-model-switch.example.json`
  - example quick-switch config

Workflow:

- edit here
- commit here
- reload pi
- never patch global copies by hand

More detail: [`extensions/README.md`](extensions/README.md)

## Skills

Source: [`.pi/skills/`](.pi/skills/)

Skills land here first.

Flow:

- find or write
- vendor locally
- review manually
- check runnable parts
- check install steps
- trim noisy behavior
- promote only after review

Possible promotion targets:

- another repo
- project-local `.pi/skills/`
- global/user-level pi config

## Source Of Truth

Files live here.
Other places link here.

No drift.
No hidden copies.
No guessing.

```text
<repo>
├── extensions/      # extension source
├── .pi/skills/      # reviewed skills
├── knowledge-base/  # workflows
└── koder/STATE.md   # session hand-off
```

## Skill Import Policy

Third-party skills are vendored manually.
No blind installs.

Review for:

- executables
- installers
- dependency setup
- MCP/plugin hooks
- package scripts
- binaries
- autocomplete spam

Policy: [`knowledge-base/workflows/skill-import.md`](knowledge-base/workflows/skill-import.md)

Hard rule:

- do not use Vercel's Skills CLI here

## Layout

- [`extensions/`](extensions/) — extensions I use
- [`.pi/skills/`](.pi/skills/) — skills I use or review
- [`knowledge-base/workflows/`](knowledge-base/workflows/) — local workflows
- [`koder/STATE.md`](koder/STATE.md) — session state

## License

MIT. See [`LICENSE`](LICENSE).
