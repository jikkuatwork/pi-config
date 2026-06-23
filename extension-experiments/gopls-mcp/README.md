# gopls MCP Pi experiment

Thin, disposable Pi bridge to the experimental `gopls mcp` server.

## Load path

Source of truth:

```text
~/Projects/pi/extension-experiments/gopls-mcp
```

Pi loads it only through this global symlink:

```text
~/.pi/agent/extensions/gopls-mcp -> ~/Projects/pi/extension-experiments/gopls-mcp
```

## Enable / disable

Enable:

```bash
ln -sfn ~/Projects/pi/extension-experiments/gopls-mcp ~/.pi/agent/extensions/gopls-mcp
```

Disable:

```bash
rm ~/.pi/agent/extensions/gopls-mcp
```

Then run `/reload` in Pi or restart Pi.

## Runtime state

The extension source and npm dependency manifest live here. Runtime state does not:

```text
~/.pi/agent/devtools/gopls-mcp/bin/gopls
~/.pi/agent/devtools/gopls-mcp/gocache
~/.pi/agent/devtools/gopls-mcp/gomod
```

Remove both the symlink and devtools directory to fully unplug:

```bash
rm ~/.pi/agent/extensions/gopls-mcp
rm -rf ~/.pi/agent/devtools/gopls-mcp
```

## Pi commands

```text
/gopls-mcp-status
/gopls-mcp-stop
```

## Pi tools

- `gopls_workspace`
- `gopls_search`
- `gopls_package_api`
- `gopls_file_context`
- `gopls_symbol_references`
- `gopls_diagnostics`
- `gopls_vulncheck`

The upstream `go_rename_symbol` MCP tool is intentionally not exposed in this first experiment.
