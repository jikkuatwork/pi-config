import { StringEnum } from "@earendil-works/pi-ai";
import type { ExtensionAPI, ExtensionContext } from "@earendil-works/pi-coding-agent";
import { Text, truncateToWidth } from "@earendil-works/pi-tui";
import { Type } from "typebox";

const TOOL_NAME = "message_bar";
const WIDGET_KEY = "message-bar";
const ENTRY_TYPE = "message-bar-state";
const MAX_TOTAL_CHARACTERS = 159;
const MAX_MESSAGE_CHARACTERS = 156; // One leading space, one icon, and one separating space.

const VARIANTS = ["progress", "working", "waiting", "blocked", "complete", "note"] as const;
type MessageBarVariant = (typeof VARIANTS)[number];

interface MessageBarState {
	version: 1;
	visible: true;
	message: string;
	variant: MessageBarVariant;
	updatedAt: string;
}

const VARIANT_STYLE = {
	progress: { icon: "◆", color: "accent" },
	working: { icon: "●", color: "accent" },
	waiting: { icon: "◷", color: "warning" },
	blocked: { icon: "!", color: "error" },
	complete: { icon: "✓", color: "success" },
	note: { icon: "•", color: "muted" },
} as const;

function isVariant(value: unknown): value is MessageBarVariant {
	return typeof value === "string" && (VARIANTS as readonly string[]).includes(value);
}

function normalizeMessage(value: string): string {
	return value
		.replace(/[\u0000-\u001f\u007f-\u009f]/gu, " ")
		.replace(/\s+/gu, " ")
		.trim();
}

function characterCount(value: string): number {
	return [...value].length;
}

function validateMessage(value: string): { message: string } | { error: string } {
	const message = normalizeMessage(value);
	if (!message) return { error: "Message bar text cannot be empty." };

	const count = characterCount(message);
	if (count > MAX_MESSAGE_CHARACTERS) {
		return {
			error: `Message bar text is ${count} characters; shorten it to ${MAX_MESSAGE_CHARACTERS} so the whole bar stays under 160.`,
		};
	}

	return { message };
}

function restoreState(ctx: ExtensionContext): MessageBarState | undefined {
	let restored: MessageBarState | undefined;

	for (const entry of ctx.sessionManager.getBranch()) {
		if (entry.type !== "custom" || entry.customType !== ENTRY_TYPE) continue;
		if (!entry.data || typeof entry.data !== "object") continue;
		const data = entry.data as Partial<MessageBarState> & { visible?: boolean };

		if (data.visible === false) {
			restored = undefined;
			continue;
		}

		if (data.visible === true && typeof data.message === "string" && isVariant(data.variant)) {
			const validated = validateMessage(data.message);
			if ("message" in validated) {
				restored = {
					version: 1,
					visible: true,
					message: validated.message,
					variant: data.variant,
					updatedAt: typeof data.updatedAt === "string" ? data.updatedAt : entry.timestamp,
				};
			}
		}
	}

	return restored;
}

function renderMessageBar(ctx: ExtensionContext, state: MessageBarState | undefined): void {
	if (!ctx.hasUI) return;
	if (!state) {
		ctx.ui.setWidget(WIDGET_KEY, undefined);
		return;
	}

	const style = VARIANT_STYLE[state.variant];
	if (ctx.mode !== "tui") {
		ctx.ui.setWidget(WIDGET_KEY, [`${style.icon} ${state.message}`], { placement: "belowEditor" });
		return;
	}

	ctx.ui.setWidget(
		WIDGET_KEY,
		(_tui, theme) => ({
			invalidate() {},
			render(width: number): string[] {
				const line = ` ${theme.fg(style.color, style.icon)} ${state.message}`;
				return [truncateToWidth(line, Math.max(0, width), theme.fg("dim", "…"))];
			},
		}),
		{ placement: "belowEditor" },
	);
}

export default function messageBarExtension(pi: ExtensionAPI) {
	let state: MessageBarState | undefined;

	function persistVisible(next: MessageBarState): void {
		pi.appendEntry(ENTRY_TYPE, next);
	}

	function persistCleared(): void {
		pi.appendEntry(ENTRY_TYPE, {
			version: 1,
			visible: false,
			updatedAt: new Date().toISOString(),
		});
	}

	function setMessage(ctx: ExtensionContext, message: string, variant: MessageBarVariant): void {
		state = {
			version: 1,
			visible: true,
			message,
			variant,
			updatedAt: new Date().toISOString(),
		};
		renderMessageBar(ctx, state);
		persistVisible(state);
	}

	function clearMessage(ctx: ExtensionContext): void {
		state = undefined;
		renderMessageBar(ctx, undefined);
		persistCleared();
	}

	pi.registerTool({
		name: TOOL_NAME,
		label: "Message Bar",
		description: `Set or clear Pi's persistent one-line session message bar below the editor. Choose the variant that best matches the state and adapt these examples rather than copying them blindly:
- progress: Q042 [████······] 40% | review | ETA 23m | elapsed 1h35m
- working: Refactoring auth boundaries | 6 files touched | tests next
- waiting: Waiting for review worker | 8m elapsed | next check 14:30
- blocked: Need owner choice: migration path a or b
- complete: Queue Q042 drained | 8/8 approved | 1 blocker parked
- note: Context at 71% | compact after current validation
Use only for user-useful state that should remain visible, not routine narration. Never include secrets or sensitive identifiers. Text is limited to ${MAX_MESSAGE_CHARACTERS} characters so the rendered bar stays at or below ${MAX_TOTAL_CHARACTERS} characters.`,
		promptSnippet: "Set or clear a compact persistent Pi session message bar",
		promptGuidelines: [
			"Use message_bar only in Pi for user-useful progress, active work, waits, blockers, completions, or persistent notes; choose the fitting variant and update only at meaningful checkpoints.",
			`Keep message_bar text at or below ${MAX_MESSAGE_CHARACTERS} characters, never include secrets or sensitive identifiers, and clear the bar when it becomes stale.`,
		],
		parameters: Type.Object(
			{
				action: StringEnum(["set", "clear"] as const),
				variant: Type.Optional(StringEnum(VARIANTS)),
				message: Type.Optional(
					Type.String({
						minLength: 1,
						maxLength: MAX_MESSAGE_CHARACTERS,
						description: `Single-line message text, at most ${MAX_MESSAGE_CHARACTERS} characters. Required for set.`,
					}),
				),
			},
			{ additionalProperties: false },
		),
		async execute(_toolCallId, params, _signal, _onUpdate, ctx) {
			if (ctx.mode !== "tui") {
				return {
					content: [{ type: "text", text: "Message bar is available only in interactive Pi." }],
					details: { available: false },
				};
			}

			if (params.action === "clear") {
				clearMessage(ctx);
				return {
					content: [{ type: "text", text: "Message bar cleared." }],
					details: { visible: false },
				};
			}

			if (typeof params.message !== "string") {
				throw new Error("message is required when action is set");
			}
			const validated = validateMessage(params.message);
			if ("error" in validated) throw new Error(validated.error);

			const variant = params.variant ?? "note";
			setMessage(ctx, validated.message, variant);
			return {
				content: [{ type: "text", text: `Message bar updated (${variant}).` }],
				details: { visible: true, variant, characters: characterCount(validated.message) + 3 },
			};
		},
		renderCall(args, theme) {
			const detail = args.action === "clear" ? "clear" : (args.variant ?? "note");
			return new Text(
				`${theme.fg("toolTitle", theme.bold(TOOL_NAME))} ${theme.fg("muted", detail)}`,
				0,
				0,
			);
		},
	});

	pi.registerCommand("message-bar", {
		description: "Inspect, set, or clear the Pi message bar",
		handler: async (args, ctx) => {
			if (ctx.mode !== "tui") return;
			const input = args.trim();

			if (!input) {
				ctx.ui.notify(
					state
						? `${state.variant}: ${state.message}`
						: `Message bar is empty. Usage: /message-bar [${VARIANTS.join("|")}] <message>`,
					"info",
				);
				return;
			}

			if (input.toLowerCase() === "clear") {
				clearMessage(ctx);
				return;
			}

			const firstSpace = input.indexOf(" ");
			const candidateVariant = firstSpace === -1 ? input : input.slice(0, firstSpace);
			const hasVariant = isVariant(candidateVariant);
			const variant = hasVariant ? candidateVariant : "note";
			const rawMessage = hasVariant ? (firstSpace === -1 ? "" : input.slice(firstSpace + 1)) : input;
			const validated = validateMessage(rawMessage);
			if ("error" in validated) {
				ctx.ui.notify(validated.error, "warning");
				return;
			}

			setMessage(ctx, validated.message, variant);
		},
	});

	pi.on("session_start", (_event, ctx) => {
		const activeTools = pi.getActiveTools();
		if (ctx.mode === "tui" && !activeTools.includes(TOOL_NAME)) {
			pi.setActiveTools([...activeTools, TOOL_NAME]);
		} else if (ctx.mode !== "tui" && activeTools.includes(TOOL_NAME)) {
			pi.setActiveTools(activeTools.filter((name) => name !== TOOL_NAME));
		}

		state = restoreState(ctx);
		renderMessageBar(ctx, state);
	});

	pi.on("session_tree", (_event, ctx) => {
		state = restoreState(ctx);
		renderMessageBar(ctx, state);
	});
}
