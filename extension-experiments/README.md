# Extension experiments

Optional Pi extensions live here when they need source control but should not be enabled by default.

Pi loads selected extensions from symlinks in the global auto-discovery directory, not by loading this source directory directly.

Enable an experiment by symlinking it into Pi's global auto-discovery directory:

```bash
ln -sfn ~/Projects/pi/extension-experiments/<name> ~/.pi/agent/extensions/<name>
```

Disable it by removing only the symlink:

```bash
rm ~/.pi/agent/extensions/<name>
```

Then run `/reload` in Pi, or restart Pi.

## Current experiments

- `gopls-mcp/` — thin MCP bridge for `gopls mcp`; keeps source here, loads through `~/.pi/agent/extensions/gopls-mcp`, and stores the `gopls` binary/cache under `~/.pi/agent/devtools/gopls-mcp`.
