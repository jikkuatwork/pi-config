import type { ExtensionAPI, ExtensionContext } from "@earendil-works/pi-coding-agent";
import { Type } from "typebox";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { ListRootsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { basename, isAbsolute, join, resolve } from "node:path";
import { homedir } from "node:os";
import { pathToFileURL } from "node:url";

const DEFAULT_ROOT = join(homedir(), ".pi", "agent", "devtools", "gopls-mcp");
const ROOT = process.env.PI_GOPLS_MCP_ROOT ?? DEFAULT_ROOT;
const GOPLS = process.env.PI_GOPLS_MCP_BIN ?? join(ROOT, "bin", "gopls");
const MAX_RESULT_CHARS = 50_000;
const TOOL_TIMEOUT_MS = 60_000;

type McpState = {
  cwd: string;
  client: Client;
  stderr: string;
};

type TextContent = { type: "text"; text: string };

type ToolParams = Record<string, unknown>;

let state: McpState | undefined;
let connecting: Promise<McpState> | undefined;

export default function (pi: ExtensionAPI) {
  async function closeState() {
    const current = state;
    state = undefined;
    connecting = undefined;
    if (current) {
      await current.client.close().catch(() => undefined);
    }
  }

  async function connect(cwd: string): Promise<McpState> {
    const client = new Client(
      { name: "pi-gopls-mcp-experiment", version: "0.1.0" },
      { capabilities: { roots: { listChanged: false } } },
    );

    client.setRequestHandler(ListRootsRequestSchema, async () => ({
      roots: [{ uri: pathToFileURL(cwd).href, name: basename(cwd) || cwd }],
    }));

    const transport = new StdioClientTransport({
      command: GOPLS,
      args: ["mcp"],
      cwd,
      env: {
        ...process.env,
        GOCACHE: process.env.PI_GOPLS_MCP_GOCACHE ?? join(ROOT, "gocache"),
        GOMODCACHE: process.env.PI_GOPLS_MCP_GOMODCACHE ?? join(ROOT, "gomod"),
        GOTOOLCHAIN: process.env.GOTOOLCHAIN ?? "auto",
      },
      stderr: "pipe",
    });

    const next: McpState = { cwd, client, stderr: "" };
    transport.stderr?.on("data", (chunk) => {
      next.stderr = trimHead((next.stderr + String(chunk)), 8_000);
    });
    client.onclose = () => {
      if (state?.client === client) state = undefined;
    };

    await client.connect(transport, { timeout: 20_000 });
    state = next;
    return next;
  }

  async function getState(ctx: ExtensionContext): Promise<McpState> {
    if (state?.cwd === ctx.cwd) return state;
    if (state && state.cwd !== ctx.cwd) await closeState();
    if (!connecting) connecting = connect(ctx.cwd);
    try {
      return await connecting;
    } finally {
      connecting = undefined;
    }
  }

  async function callGopls(ctx: ExtensionContext, signal: AbortSignal | undefined, name: string, params: ToolParams) {
    const current = await getState(ctx);
    try {
      return await current.client.callTool(
        { name, arguments: params },
        undefined,
        { signal, timeout: TOOL_TIMEOUT_MS, resetTimeoutOnProgress: true },
      );
    } catch (error) {
      const suffix = current.stderr ? `\n\ngopls stderr tail:\n${current.stderr}` : "";
      throw new Error(`${formatError(error)}${suffix}`);
    }
  }

  function registerBridgeTool(options: {
    name: string;
    label: string;
    mcpTool: string;
    description: string;
    parameters: ReturnType<typeof Type.Object>;
    prepare?: (params: ToolParams, ctx: ExtensionContext) => ToolParams;
  }) {
    pi.registerTool({
      name: options.name,
      label: options.label,
      description: `${options.description}\n\nExperimental zero-repo gopls MCP bridge. Starts an isolated \`gopls mcp\` process on first use for the current Pi cwd. Does not modify repository files; some tools may run normal Go commands and update Go/gopls caches under \`${ROOT}\`.`,
      parameters: options.parameters,
      async execute(_toolCallId, params, signal, _onUpdate, ctx) {
        const prepared = options.prepare ? options.prepare(params as ToolParams, ctx) : (params as ToolParams);
        const result = await callGopls(ctx, signal, options.mcpTool, prepared);
        return {
          content: [{ type: "text", text: formatMcpResult(result) }],
          details: { mcpTool: options.mcpTool, cwd: ctx.cwd },
        };
      },
    });
  }

  registerBridgeTool({
    name: "gopls_workspace",
    label: "gopls workspace",
    mcpTool: "go_workspace",
    description: "Summarize the Go workspace/module layout using gopls MCP.",
    parameters: Type.Object({}),
  });

  registerBridgeTool({
    name: "gopls_search",
    label: "gopls search",
    mcpTool: "go_search",
    description: "Fuzzy-search Go symbols in the workspace using gopls MCP.",
    parameters: Type.Object({
      query: Type.String({ description: "Case-insensitive fuzzy symbol query." }),
    }),
  });

  registerBridgeTool({
    name: "gopls_package_api",
    label: "gopls package API",
    mcpTool: "go_package_api",
    description: "Summarize public APIs for Go package import paths using gopls MCP.",
    parameters: Type.Object({
      packagePaths: Type.Array(Type.String(), { description: "Go package import paths to describe." }),
    }),
  });

  registerBridgeTool({
    name: "gopls_file_context",
    label: "gopls file context",
    mcpTool: "go_file_context",
    description: "Summarize a Go file's cross-file dependencies within its package using gopls MCP.",
    parameters: Type.Object({
      file: Type.String({ description: "Absolute or repo-relative Go file path." }),
    }),
    prepare: (params, ctx) => ({ ...params, file: normalizePath(ctx, String(params.file ?? "")) }),
  });

  registerBridgeTool({
    name: "gopls_symbol_references",
    label: "gopls symbol refs",
    mcpTool: "go_symbol_references",
    description: "Find references to a Go package-level symbol using gopls MCP.",
    parameters: Type.Object({
      file: Type.String({ description: "Absolute or repo-relative Go file path containing/importing the symbol." }),
      symbol: Type.String({ description: "Symbol name, qualified symbol, field, or method (for example Server.Run)." }),
    }),
    prepare: (params, ctx) => ({ ...params, file: normalizePath(ctx, String(params.file ?? "")) }),
  });

  registerBridgeTool({
    name: "gopls_diagnostics",
    label: "gopls diagnostics",
    mcpTool: "go_diagnostics",
    description: "Run gopls workspace diagnostics. Pass edited files for deeper active-file diagnostics.",
    parameters: Type.Object({
      files: Type.Optional(Type.Array(Type.String(), { description: "Absolute or repo-relative paths for edited/active files." })),
    }),
    prepare: (params, ctx) => ({
      ...params,
      files: Array.isArray(params.files) ? params.files.map((file) => normalizePath(ctx, String(file))) : undefined,
    }),
  });

  registerBridgeTool({
    name: "gopls_vulncheck",
    label: "gopls vulncheck",
    mcpTool: "go_vulncheck",
    description: "Run Go vulnerability analysis through gopls MCP. Use only when dependency/security checking is relevant.",
    parameters: Type.Object({
      dir: Type.Optional(Type.String({ description: "Directory to run within; defaults to workspace root." })),
      pattern: Type.Optional(Type.String({ description: "Go package pattern; defaults to ./...." })),
    }),
    prepare: (params, ctx) => ({
      ...params,
      dir: typeof params.dir === "string" && params.dir ? normalizePath(ctx, params.dir) : undefined,
    }),
  });

  pi.registerCommand("gopls-mcp-status", {
    description: "Show gopls MCP experiment status",
    handler: async (_args, ctx) => {
      const version = await pi.exec(GOPLS, ["version"], { timeout: 10_000 }).catch((error) => ({
        stdout: "",
        stderr: formatError(error),
        code: 1,
      }));
      let message = `gopls MCP experiment\n\nBinary: ${GOPLS}\nRoot: ${ROOT}\nVersion:\n${version.stdout || version.stderr || "unknown"}`;
      try {
        const current = await getState(ctx);
        const tools = await current.client.listTools(undefined, { timeout: 15_000 });
        message += `\nMCP tools: ${tools.tools.map((tool) => tool.name).join(", ")}`;
      } catch (error) {
        message += `\nMCP connect/list failed: ${formatError(error)}`;
      }
      pi.sendMessage({ customType: "gopls-mcp-status", content: message, display: true });
    },
  });

  pi.registerCommand("gopls-mcp-stop", {
    description: "Stop the current gopls MCP helper process",
    handler: async (_args, _ctx) => {
      await closeState();
      pi.sendMessage({ customType: "gopls-mcp-status", content: "Stopped gopls MCP helper process.", display: true });
    },
  });

  pi.on("session_shutdown", async () => {
    await closeState();
  });
}

function normalizePath(ctx: ExtensionContext, raw: string): string {
  const path = raw.startsWith("@") ? raw.slice(1) : raw;
  if (!path) return path;
  return isAbsolute(path) ? path : resolve(ctx.cwd, path);
}

function formatMcpResult(result: unknown): string {
  const payload = result as {
    isError?: boolean;
    content?: Array<Record<string, unknown>>;
    structuredContent?: unknown;
  };
  const chunks: string[] = [];
  if (payload.isError) chunks.push("MCP tool reported an error.");
  if (Array.isArray(payload.content)) {
    for (const item of payload.content) {
      if (item.type === "text" && typeof item.text === "string") {
        chunks.push(item.text);
      } else {
        chunks.push(JSON.stringify(item, null, 2));
      }
    }
  }
  if (payload.structuredContent !== undefined) {
    chunks.push(`structuredContent:\n${JSON.stringify(payload.structuredContent, null, 2)}`);
  }
  const text = chunks.length > 0 ? chunks.join("\n\n") : JSON.stringify(result, null, 2);
  return trimTail(text, MAX_RESULT_CHARS);
}

function trimTail(text: string, maxChars: number): string {
  if (text.length <= maxChars) return text;
  return `${text.slice(0, maxChars)}\n\n[truncated ${text.length - maxChars} chars from gopls MCP result]`;
}

function trimHead(text: string, maxChars: number): string {
  if (text.length <= maxChars) return text;
  return text.slice(text.length - maxChars);
}

function formatError(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}
