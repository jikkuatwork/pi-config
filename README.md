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

This is the canonical, synced home for reusable skills I adopt or import. When a
request starts in another repo, the reviewed skill is built here and that repo
gets a relative `.pi/skills/<name>` symlink for testing—not a duplicate copy.
Inherently repo-specific skills such as `open` and `close` stay with their repo.

Flow:

- find or write
- review provenance, license, executables, and install steps
- adapt under `.pi/skills/` with a frontmatter-only `SKILL.md`
- route details through `references/INDEX.md` to keep startup context small
- symlink into the requesting repo for testing
- globally promote with `./install.sh --sync` only when intended

## Source Of Truth

Versioned configuration lives here. Writable Pi state is generated under
`~/.pi/agent/`; credentials stay in the environment or private local `auth.json`.

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
avoid collisions. Custom providers read credentials from environment variables such as `FOUNDRY_API_KEY`, `OPENROUTER_API_KEY`, and
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
`foundry-zyt/gpt-6-astra:max` default. The generated
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

## Direct Anthropic and Harnex

The saved model scope includes these built-in Anthropic models:

- `anthropic/claude-opus-5-5`
- `anthropic/claude-sonnet-5-5`
- `anthropic/claude-fable-5-1`

Use `/login anthropic` to connect a Claude account. Pi saves OAuth credentials
in private local `~/.pi/agent/auth.json`, not this repository. Restart Pi after
syncing the model scope, then choose an `[anthropic]` model in `/model`.
`openrouter/anthropic/...` is a separate route and does not use that login.

**Billing:** Pi 0.87.1 warns that third-party subscription authentication draws
from paid Extra Usage, not the Claude plan's included allowance. Check
[Claude usage settings](https://claude.ai/settings/usage) for account limits and
Extra Usage spending before running prompts. `/session` reports session tokens,
cache usage, and estimated cost, with a provider/model breakdown when multiple
models were used. The footer's percentage is context fullness, not plan quota.

Harnex's Pi adapter can use the same saved OAuth login when launched as the same
user with the same Pi agent directory. No credential values belong in task
briefs, model configuration, or dispatch metadata. Before a run, check
`pi auth check --provider anthropic --json --no-refresh` without credential-output
flags; require `authType: oauth` if that is the intended route. A different
user, container, or `PI_CODING_AGENT_DIR` needs its own approved auth setup.

Harnex `--model anthropic/claude-opus-5-5 --effort high` maps to Pi startup
controls and verifies the effective model/effort before prompting, without
changing the saved default. Use visible, identically named `--id` / `--tmux`
workers, a bounded task brief, an explicit project-trust choice, and a runtime
budget. Harnex 0.14.0 / Pi 0.87.1 passed static compatibility checks; no Anthropic
dispatch or paid inference test was run. Harnex dispatch history/receipts capture
worker token/cost telemetry, not remaining account allowance or billing proof.

The [koder-pattern dispatch policy](.pi/skills/koder-pattern/references/queues/model.md#dispatch-model-policy)
still defaults automatic dispatches to GPT-family models. Claude needs explicit
owner-approved `dispatch_models` permission in the queue; enabling it in Pi's
picker does not authorize automatic workers or change that policy.

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
