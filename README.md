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

- `message-bar.ts`
  - persistent one-line workflow notices below the editor
  - agent-selectable progress, working, waiting, blocked, complete, and note variants
  - session restore with a strict sub-160-character display limit

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
├── extensions/        # extension source
├── .pi/AGENTS.md      # global Pi instructions (symlinked from ~/.pi/agent/)
├── .pi/settings.json  # global pi settings (symlinked from ~/.pi/agent/)
├── .pi/skills/        # reviewed skills
├── knowledge-base/    # workflows
└── koder/STATE.md     # session hand-off
```

## Global Settings

`.pi/settings.json` is the single source for pi's global settings file.
On this machine `~/.pi/agent/settings.json` is a symlink to it:

    ln -s <repo>/.pi/settings.json ~/.pi/agent/settings.json

So every repo and `pi-zyt` read the same shared model cycle and settings.
Writes pi makes to global settings (e.g. changelog bumps) land here as
git-visible diffs. On a fresh clone, recreate the symlink; the pre-link
file is backed up at `~/.pi/agent/settings.json.bak-pre-symlink`.

`.pi/AGENTS.md` is likewise the source for Pi-only global instructions and is
symlinked from `~/.pi/agent/AGENTS.md`, keeping other agent harnesses unaffected.

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
