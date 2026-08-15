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

Versioned configuration lives here. Writable Pi state is generated under
`~/.pi/agent/`; credentials stay in the environment.

```text
<repo>
├── extensions/            # global extension source
├── .pi/AGENTS.md          # global Pi instructions
├── .pi/settings.base.json # stable global settings
├── .pi/models.json        # custom providers and models
├── .pi/skills/            # reviewed skills
├── install.sh             # install/sync entrypoint
├── scripts/               # settings generator
├── knowledge-base/        # workflows
└── koder/STATE.md         # session hand-off
```

## Setup On A Fresh Machine

```bash
git clone git@github.com:jikkuatwork/pi-config.git && cd pi-config
./install.sh
```

`install.sh` installs Pi when needed, generates writable `settings.json` and
`models.json` under `~/.pi/agent/`, and links global instructions, extensions,
and reviewed global skills. Repo-specific `open`/`close` skills stay local to
avoid collisions. Custom providers read credentials from environment variables such
as `FOUNDRY_API_KEY`, `OPENROUTER_API_KEY`, `SAKANA_API_KEY`, and
`BASETEN_API_KEY`; no credential values belong in this repo.

Use `./install.sh --sync` after editing versioned config. `--no-install` is an
alias for config-only sync. Existing local generated files receive one-time
`*.bak-pre-versioned` backups.

Run plain Pi and choose configured models with `/model`, Ctrl+L, or Ctrl+P:

```bash
pi
```

## Generated Runtime Settings

`.pi/settings.base.json` contains stable, portable settings, including the
`foundry-zyt/gpt-5.6-sol:max` default. The generated
`~/.pi/agent/settings.json` is a normal local file, not a symlink. Pi may change
its local default after model selection; sync restores the versioned default
while preserving machine-local changelog/analytics metadata. Normal Pi usage
never dirties this repository.

`.pi/models.json` is the complete versioned custom provider/model catalog.
Sync copies it to `~/.pi/agent/models.json`; providers resolve credentials from
the environment. Built-in Pi providers continue to use their standard
environment variables or `/login` authentication.

`.pi/AGENTS.md` remains symlinked into `~/.pi/agent/` because Pi does not mutate
that file.

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
