# Pi extensions (source of truth)

This directory is the source-of-truth for global pi extensions on this machine.

## Workflow

- Edit extensions here (versioned in git).
- Pi loads this directory via `~/.pi/agent/settings.json`:
  - `"extensions": ["/home/glasscube/Projects/pi/extensions"]`
- Reload in pi with `/reload` (or restart pi).

## Included extensions

- `vim.ts` - custom Vim-style modal editing keybindings/behavior, including normal-mode model/thinking quick-switch (`tab`, `↑/↓`, `enter`, `esc`). Supports optional config via `~/.pi/agent/vim-model-switch.json` (and project override `.pi/vim-model-switch.json`).
- `azure-retry-normalizer.ts` - rewrites Azure transient failure shapes into retryable errors (opaque `Unknown error (no error details in response)` and generic refusal placeholder responses), and logs retry start/end in UI status/notifications.
- `footer-highlights.ts` - replaces the footer with colorized stats so cost and context usage are easier to scan.
- `hide-clone-autocomplete.ts` - removes the built-in `/clone` command from slash autocomplete so `/skill:close` is easier to complete.

## Optional experiments

Symlink-gated experimental extensions live in `../extension-experiments/` instead of this auto-loaded directory. Enable one by symlinking it into `~/.pi/agent/extensions/`, then `/reload`; disable it by removing that symlink.

## Notes

- Vim quick-switch config file format example: `extensions/vim-model-switch.example.json`
- Avoid editing installed extension files under `~/.pi/agent/extensions/` directly.
- Keep extension changes committed here for reproducibility.
