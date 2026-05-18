/**
 * Vim Editor - vim-like modal editing
 *
 * Usage: pi --extension ./examples/extensions/vim.ts
 *
 * - Escape: insert → normal mode (in normal mode, aborts agent)
 * - i/a/A/I/o/O: enter insert / append / append-at-line-end / insert-at-line-start / open-line-below / open-line-above
 * - hjkl, 0/$, gg/G, w/b/E, f/F: navigation in normal mode
 * - x, c/C/cc, d/D/dd, dw/db/d0/d$, cw/cb/c0/c$: basic edits
 * - ctrl+c, ctrl+d, etc. work in both modes
 * - normal mode quick switch: tab (cycle model), ↑/↓ (thinking level), enter (apply), esc (cancel), i (cancel + insert)
 */

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { Api, Model } from "@earendil-works/pi-ai";
import { CustomEditor, getAgentDir, type ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { matchesKey, truncateToWidth, visibleWidth } from "@earendil-works/pi-tui";

type EditorState = {
	lines: string[];
	cursorLine: number;
	cursorCol: number;
};

type PrivateEditor = {
	state: EditorState;
	preferredVisualCol?: number | null;
	snappedFromCursorCol?: number | null;
};

type Position = { line: number; col: number };
type Operator = "c" | "d";
type FindDirection = "forward" | "backward";
type ThinkingLevel = "off" | "minimal" | "low" | "medium" | "high" | "xhigh";
type QuickModelOption = { provider: string; id: string; label: string };
type QuickSwitchConfig = {
	modelPatterns: string[];
	thinkingLevels: ThinkingLevel[];
	showProviderInLabel: boolean;
};
type QuickSwitcherCallbacks = {
	getOptions: () => QuickModelOption[];
	getCurrentModel: () => QuickModelOption | undefined;
	getCurrentThinking: () => ThinkingLevel;
	getThinkingLevels: () => ThinkingLevel[];
	apply: (model: QuickModelOption, thinking: ThinkingLevel) => Promise<{ success: boolean; message: string }>;
	notify: (message: string, type: "info" | "warning" | "error") => void;
};

const ALL_THINKING_LEVELS: ThinkingLevel[] = ["off", "minimal", "low", "medium", "high", "xhigh"];
const DEFAULT_QUICK_SWITCH_CONFIG: QuickSwitchConfig = {
	modelPatterns: ["gpt-5.5", "gpt-5.3-codex"],
	thinkingLevels: [...ALL_THINKING_LEVELS],
	showProviderInLabel: false,
};

// Normal mode key mappings: key -> escape sequence.
const NORMAL_KEYS: Record<string, string> = {
	h: "\x1b[D", // left
	j: "\x1b[B", // down
	k: "\x1b[A", // up
	l: "\x1b[C", // right
	"0": "\x01", // line start
	$: "\x05", // line end
	x: "\x1b[3~", // delete char
};

// Colors aligned with your Neovim colorscheme (Tomorrow-Night-Bright).
const ANSI_RESET = "\x1b[0m";
const FG_BLACK = "\x1b[38;2;0;0;0m";
const FG_BLUE = "\x1b[38;2;122;166;218m"; // s:blue
const FG_GREEN = "\x1b[38;2;185;202;74m"; // s:green
const BG_BLUE = "\x1b[48;2;122;166;218m"; // s:blue
const BG_GREEN = "\x1b[48;2;185;202;74m"; // s:green
const BG_ORANGE = "\x1b[48;2;231;140;69m"; // s:orange

class ModalEditor extends CustomEditor {
	private mode: "normal" | "insert" = "insert";
	private pendingOperator: Operator | null = null;
	private pendingFind: FindDirection | null = null;
	private pendingGoto = false;
	private quickSwitcher: QuickSwitcherCallbacks | null = null;
	private quickSwitch = {
		active: false,
		applying: false,
		modelIndex: 0,
		thinkingIndex: 0,
		candidates: [] as QuickModelOption[],
		thinkingLevels: [...DEFAULT_QUICK_SWITCH_CONFIG.thinkingLevels] as ThinkingLevel[],
	};

	setQuickSwitcher(quickSwitcher: QuickSwitcherCallbacks): void {
		this.quickSwitcher = quickSwitcher;
	}

	handleInput(data: string): void {
		if (this.quickSwitch.active) {
			if (matchesKey(data, "escape")) {
				this.quickSwitch.active = false;
				this.requestRender();
				return;
			}
			if (data === "i") {
				this.quickSwitch.active = false;
				this.mode = "insert";
				this.requestRender();
				return;
			}
			if (matchesKey(data, "enter")) {
				this.applyQuickSwitchSelection();
				return;
			}
			if (matchesKey(data, "tab")) {
				this.cycleQuickSwitchModel(1);
				return;
			}
			if (matchesKey(data, "shift+tab")) {
				this.cycleQuickSwitchModel(-1);
				return;
			}
			if (matchesKey(data, "up")) {
				this.cycleQuickSwitchThinking(1);
				return;
			}
			if (matchesKey(data, "down")) {
				this.cycleQuickSwitchThinking(-1);
				return;
			}
			return;
		}

		// Escape toggles to normal mode, cancels pending vim commands, or passes
		// through for app handling (abort agent, etc.) when already idle in normal.
		if (matchesKey(data, "escape")) {
			if (this.mode === "insert") {
				this.mode = "normal";
			} else if (this.pendingOperator || this.pendingFind || this.pendingGoto) {
				this.pendingOperator = null;
				this.pendingFind = null;
				this.pendingGoto = false;
				this.requestRender();
			} else {
				super.handleInput(data);
			}
			return;
		}

		// Insert mode: pass everything through.
		if (this.mode === "insert") {
			super.handleInput(data);
			return;
		}

		if (matchesKey(data, "tab")) {
			this.openQuickSwitch();
			return;
		}

		// Normal mode f/F: wait for a following printable character.
		if (this.pendingFind) {
			const char = this.printableChar(data);
			const direction = this.pendingFind;
			this.pendingFind = null;
			if (char !== null) this.findChar(char, direction);
			return;
		}

		// Normal mode gg: wait for the second g.
		if (this.pendingGoto) {
			this.pendingGoto = false;
			if (data === "g") this.setCursor({ line: 0, col: 0 });
			else this.requestRender();
			return;
		}

		// Normal mode c/d operators (cc, dd, cw, dw, c$, d$, etc.).
		if (this.pendingOperator) {
			const operator = this.pendingOperator;
			this.pendingOperator = null;
			this.handleOperator(operator, data);
			return;
		}

		// Mode switches and vim-ish commands that need custom state handling.
		if (data === "i") {
			this.mode = "insert";
			this.requestRender();
			return;
		}
		if (data === "a") {
			this.append();
			this.mode = "insert";
			return;
		}
		if (data === "A") {
			this.appendAtLineEnd();
			this.mode = "insert";
			return;
		}
		if (data === "I") {
			this.insertAtLineStart();
			this.mode = "insert";
			return;
		}
		if (data === "o") {
			this.openLineBelow();
			this.mode = "insert";
			return;
		}
		if (data === "O") {
			this.openLineAbove();
			this.mode = "insert";
			return;
		}
		if (data === "w") {
			this.setCursor(this.nextWordPosition());
			return;
		}
		if (data === "b") {
			this.setCursor(this.previousWordPosition());
			return;
		}
		if (data === "E") {
			this.setCursor(this.endWORDPosition());
			return;
		}
		if (data === "g") {
			this.pendingGoto = true;
			this.requestRender();
			return;
		}
		if (data === "G") {
			this.goToLastLine();
			return;
		}
		if (data === "f") {
			this.pendingFind = "forward";
			this.requestRender();
			return;
		}
		if (data === "F") {
			this.pendingFind = "backward";
			this.requestRender();
			return;
		}
		if (data === "C") {
			this.changeToLineEnd();
			return;
		}
		if (data === "D") {
			this.deleteToLineEnd();
			return;
		}
		if (data === "c" || data === "d") {
			this.pendingOperator = data;
			this.requestRender();
			return;
		}

		// Normal mode: check simple mapped keys.
		if (data in NORMAL_KEYS) {
			super.handleInput(NORMAL_KEYS[data]!);
			return;
		}

		// Pass control sequences (ctrl+c, etc.) to super, ignore printable chars.
		if (data.length === 1 && data.charCodeAt(0) >= 32) return;
		super.handleInput(data);
	}

	private openQuickSwitch(): void {
		const quickSwitcher = this.quickSwitcher;
		if (!quickSwitcher) return;

		const candidates = quickSwitcher.getOptions();
		if (candidates.length === 0) {
			quickSwitcher.notify("No quick-switch models configured.", "warning");
			return;
		}

		const thinkingLevels = quickSwitcher.getThinkingLevels();
		if (thinkingLevels.length === 0) {
			quickSwitcher.notify("No quick-switch thinking levels configured.", "warning");
			return;
		}

		const currentModel = quickSwitcher.getCurrentModel();
		const currentThinking = quickSwitcher.getCurrentThinking();
		const foundIndex =
			currentModel !== undefined
				? candidates.findIndex(
					(candidate) => candidate.provider === currentModel.provider && candidate.id === currentModel.id,
				)
				: -1;
		const modelIndex = foundIndex >= 0 ? foundIndex : 0;
		const thinkingIndex = Math.max(0, thinkingLevels.indexOf(currentThinking));

		this.quickSwitch.active = true;
		this.quickSwitch.applying = false;
		this.quickSwitch.candidates = candidates;
		this.quickSwitch.thinkingLevels = [...thinkingLevels];
		this.quickSwitch.modelIndex = modelIndex;
		this.quickSwitch.thinkingIndex = thinkingIndex;
		this.requestRender();
	}

	private currentQuickSwitchModel(): QuickModelOption | undefined {
		if (this.quickSwitch.candidates.length === 0) return undefined;
		const index = Math.max(0, Math.min(this.quickSwitch.modelIndex, this.quickSwitch.candidates.length - 1));
		return this.quickSwitch.candidates[index];
	}

	private cycleQuickSwitchModel(delta: number): void {
		const count = this.quickSwitch.candidates.length;
		if (count === 0) return;
		this.quickSwitch.modelIndex = (this.quickSwitch.modelIndex + delta + count) % count;
		this.requestRender();
	}

	private cycleQuickSwitchThinking(delta: number): void {
		const count = this.quickSwitch.thinkingLevels.length;
		if (count === 0) return;
		this.quickSwitch.thinkingIndex = (this.quickSwitch.thinkingIndex + delta + count) % count;
		this.requestRender();
	}

	private applyQuickSwitchSelection(): void {
		const quickSwitcher = this.quickSwitcher;
		const selectedModel = this.currentQuickSwitchModel();
		if (!quickSwitcher || !selectedModel) {
			this.quickSwitch.active = false;
			this.requestRender();
			return;
		}

		const thinkingLevel = this.quickSwitch.thinkingLevels[this.quickSwitch.thinkingIndex] ?? "high";
		this.quickSwitch.active = false;
		this.quickSwitch.applying = true;
		this.requestRender();

		void quickSwitcher.apply(selectedModel, thinkingLevel).then(({ success, message }) => {
			this.quickSwitch.applying = false;
			quickSwitcher.notify(message, success ? "info" : "error");
			this.requestRender();
		});
	}

	render(width: number): string[] {
		const borderFg = this.mode === "normal" ? FG_BLUE : FG_GREEN;
		this.borderColor = (text: string) => `${borderFg}${text}${ANSI_RESET}`;

		const lines = super.render(width);
		if (lines.length === 0) return lines;

		// Keep the editor content untouched, and render mode on its own line so
		// prompt text never touches the mode block.
		let rawLabel = this.mode === "normal" ? " NORMAL " : " INSERT ";
		let bg = this.mode === "normal" ? BG_BLUE : BG_GREEN;
		if (this.quickSwitch.active) {
			rawLabel = " MODEL ";
			bg = BG_ORANGE;
		} else if (this.quickSwitch.applying) {
			rawLabel = " APPLY… ";
			bg = BG_ORANGE;
		} else if (this.pendingOperator) {
			rawLabel = ` ${this.pendingOperator}… `;
			bg = BG_ORANGE;
		} else if (this.pendingFind) {
			rawLabel = ` ${this.pendingFind === "forward" ? "f" : "F"}… `;
			bg = BG_ORANGE;
		} else if (this.pendingGoto) {
			rawLabel = " g… ";
			bg = BG_ORANGE;
		}

		const styledLabel = `${bg}${FG_BLACK}${rawLabel}${ANSI_RESET}`;
		const clipped = truncateToWidth(styledLabel, width, "");
		const pad = " ".repeat(Math.max(0, width - visibleWidth(clipped)));
		const statusLine = `${clipped}${pad}`;

		const extraLines: string[] = [];
		if (this.quickSwitch.active) {
			const selectedModel = this.currentQuickSwitchModel();
			const thinkingLevel = this.quickSwitch.thinkingLevels[this.quickSwitch.thinkingIndex] ?? "high";
			const details = selectedModel ? ` ${selectedModel.label} [${thinkingLevel}] ` : " model unavailable ";
			const detailsStyled = `${FG_BLUE}${details}${ANSI_RESET}`;
			const detailsClipped = truncateToWidth(detailsStyled, width, "");
			const detailsPad = " ".repeat(Math.max(0, width - visibleWidth(detailsClipped)));
			extraLines.push(`${detailsClipped}${detailsPad}`);
		}

		return [...lines, statusLine, ...extraLines];
	}

	private get privateEditor(): PrivateEditor {
		return this as unknown as PrivateEditor;
	}

	private get editorState(): EditorState {
		return this.privateEditor.state;
	}

	private requestRender(): void {
		this.tui.requestRender();
	}

	private printableChar(data: string): string | null {
		return data.length === 1 && data.charCodeAt(0) >= 32 ? data : null;
	}

	private setCursor(position: Position): void {
		const state = this.editorState;
		const line = Math.max(0, Math.min(position.line, state.lines.length - 1));
		const lineText = state.lines[line] ?? "";
		state.cursorLine = line;
		state.cursorCol = Math.max(0, Math.min(position.col, lineText.length));
		this.privateEditor.preferredVisualCol = null;
		this.privateEditor.snappedFromCursorCol = null;
		this.requestRender();
	}

	private setLines(lines: string[], cursor: Position): void {
		const nextLines = lines.length > 0 ? lines : [""];
		this.setText(nextLines.join("\n"));
		this.setCursor(cursor);
	}

	private append(): void {
		const { line, col } = this.getCursor();
		const lineText = this.getLines()[line] ?? "";
		this.setCursor({ line, col: col < lineText.length ? col + 1 : col });
	}

	private appendAtLineEnd(): void {
		const { line } = this.getCursor();
		const lineText = this.getLines()[line] ?? "";
		this.setCursor({ line, col: lineText.length });
	}

	private insertAtLineStart(): void {
		const { line } = this.getCursor();
		const lineText = this.getLines()[line] ?? "";
		const firstNonWhitespace = lineText.search(/\S/);
		this.setCursor({ line, col: firstNonWhitespace === -1 ? 0 : firstNonWhitespace });
	}

	private openLineBelow(): void {
		const lines = this.getLines();
		const { line } = this.getCursor();
		const insertAt = Math.min(line + 1, lines.length);
		lines.splice(insertAt, 0, "");
		this.setLines(lines, { line: insertAt, col: 0 });
	}

	private openLineAbove(): void {
		const lines = this.getLines();
		const { line } = this.getCursor();
		lines.splice(line, 0, "");
		this.setLines(lines, { line, col: 0 });
	}

	private goToLastLine(): void {
		const lines = this.getLines();
		const line = Math.max(0, lines.length - 1);
		this.setCursor({ line, col: 0 });
	}

	private changeLine(): void {
		const lines = this.getLines();
		const { line } = this.getCursor();
		lines[line] = "";
		this.setLines(lines, { line, col: 0 });
		this.mode = "insert";
	}

	private deleteLine(): void {
		const lines = this.getLines();
		const { line } = this.getCursor();
		if (lines.length <= 1) {
			this.setLines([""], { line: 0, col: 0 });
			return;
		}
		lines.splice(line, 1);
		this.setLines(lines, { line: Math.min(line, lines.length - 1), col: 0 });
	}

	private deleteToLineEnd(): void {
		const start = this.getCursor();
		const lineText = this.getLines()[start.line] ?? "";
		this.deleteRange(start, { line: start.line, col: lineText.length });
	}

	private changeToLineEnd(): void {
		this.deleteToLineEnd();
		this.mode = "insert";
		this.requestRender();
	}

	private handleOperator(operator: Operator, motion: string): void {
		if (motion === operator) {
			if (operator === "c") this.changeLine();
			else this.deleteLine();
			return;
		}

		const start = this.getCursor();
		let end: Position | null = null;
		if (motion === "w") end = this.nextWordPosition();
		else if (motion === "b") end = this.previousWordPosition();
		else if (motion === "$") end = { line: start.line, col: (this.getLines()[start.line] ?? "").length };
		else if (motion === "0") end = { line: start.line, col: 0 };

		if (!end) return;
		this.deleteRange(start, end);
		if (operator === "c") this.mode = "insert";
	}

	private deleteRange(a: Position, b: Position): void {
		let start = a;
		let end = b;
		if (this.comparePositions(end, start) < 0) [start, end] = [end, start];
		if (this.comparePositions(start, end) === 0) return;

		const lines = this.getLines();
		if (start.line === end.line) {
			const line = lines[start.line] ?? "";
			lines[start.line] = line.slice(0, start.col) + line.slice(end.col);
		} else {
			const first = lines[start.line] ?? "";
			const last = lines[end.line] ?? "";
			lines.splice(start.line, end.line - start.line + 1, first.slice(0, start.col) + last.slice(end.col));
		}
		this.setLines(lines, start);
	}

	private comparePositions(a: Position, b: Position): number {
		return a.line === b.line ? a.col - b.col : a.line - b.line;
	}

	private isWhitespace(char: string | undefined): boolean {
		return char === undefined || /\s/.test(char);
	}

	private charKind(char: string | undefined): "word" | "punct" | "space" {
		if (this.isWhitespace(char)) return "space";
		return /[A-Za-z0-9_]/.test(char!) ? "word" : "punct";
	}

	private nextWordPosition(): Position {
		const lines = this.getLines();
		let { line, col } = this.getCursor();

		while (line < lines.length) {
			const text = lines[line] ?? "";
			if (col >= text.length) {
				if (line >= lines.length - 1) return { line, col: text.length };
				line++;
				const nextLine = lines[line] ?? "";
				col = 0;
				while (col < nextLine.length && this.charKind(nextLine[col]) === "space") col++;
				if (col < nextLine.length) return { line, col };
				continue;
			}

			const kind = this.charKind(text[col]);
			if (kind !== "space") {
				while (col < text.length && this.charKind(text[col]) === kind) col++;
			}
			while (col < text.length && this.charKind(text[col]) === "space") col++;
			if (col < text.length) return { line, col };
		}

		const lastLine = lines.length - 1;
		return { line: lastLine, col: (lines[lastLine] ?? "").length };
	}

	private previousWordPosition(): Position {
		const lines = this.getLines();
		let { line, col } = this.getCursor();

		while (line >= 0) {
			const text = lines[line] ?? "";
			if (col === 0) {
				if (line === 0) return { line: 0, col: 0 };
				line--;
				col = (lines[line] ?? "").length;
				continue;
			}

			col--;
			while (col > 0 && this.charKind(text[col]) === "space") col--;
			const kind = this.charKind(text[col]);
			while (col > 0 && this.charKind(text[col - 1]) === kind) col--;
			return { line, col };
		}

		return { line: 0, col: 0 };
	}

	private endWORDPosition(): Position {
		const lines = this.getLines();
		let { line, col } = this.getCursor();

		while (line < lines.length) {
			const text = lines[line] ?? "";
			if (col >= text.length) {
				if (line >= lines.length - 1) return { line, col: text.length };
				line++;
				col = 0;
				continue;
			}

			while (col < text.length && this.charKind(text[col]) === "space") col++;
			if (col < text.length) {
				while (col + 1 < text.length && this.charKind(text[col + 1]) !== "space") col++;
				return { line, col };
			}

			if (line >= lines.length - 1) return { line, col: text.length };
			line++;
			col = 0;
		}

		const lastLine = lines.length - 1;
		return { line: lastLine, col: (lines[lastLine] ?? "").length };
	}

	private findChar(char: string, direction: FindDirection): void {
		const lines = this.getLines();
		const { line, col } = this.getCursor();
		const text = lines[line] ?? "";
		const idx = direction === "forward" ? text.indexOf(char, col + 1) : text.lastIndexOf(char, col - 1);
		if (idx !== -1) this.setCursor({ line, col: idx });
		else this.requestRender();
	}
}

function quickSwitchMatchScore(model: Model<Api>, pattern: string): number {
	const [providerPattern, idPattern] = pattern.includes("/")
		? (pattern.split("/", 2) as [string, string])
		: (["", pattern] as const);

	if (providerPattern && model.provider.toLowerCase() !== providerPattern.toLowerCase()) {
		return 0;
	}

	const modelId = model.id.toLowerCase();
	const candidate = idPattern.toLowerCase();
	if (modelId === candidate) return 30;
	if (modelId.startsWith(candidate)) return 20;
	if (modelId.includes(candidate)) return 10;
	return 0;
}

function pickQuickModelForPattern(
	models: Model<Api>[],
	pattern: string,
	preferredProvider: string | undefined,
): Model<Api> | undefined {
	const matches = models
		.map((model) => ({
			model,
			score: quickSwitchMatchScore(model, pattern),
			preferredProviderBoost: preferredProvider && model.provider === preferredProvider ? 1 : 0,
		}))
		.filter((item) => item.score > 0)
		.sort((a, b) => {
			if (b.preferredProviderBoost !== a.preferredProviderBoost) {
				return b.preferredProviderBoost - a.preferredProviderBoost;
			}
			return b.score - a.score;
		});

	return matches[0]?.model;
}

function toQuickModelOption(model: Model<Api>, includeProviderInLabel: boolean): QuickModelOption {
	return {
		provider: model.provider,
		id: model.id,
		label: includeProviderInLabel ? `${model.id} @ ${model.provider}` : model.id,
	};
}

function parseQuickSwitchConfigFile(path: string): unknown | undefined {
	if (!existsSync(path)) return undefined;
	try {
		return JSON.parse(readFileSync(path, "utf-8"));
	} catch (error) {
		console.error(`[vim] failed to parse quick-switch config at ${path}: ${String(error)}`);
		return undefined;
	}
}

function normalizeThinkingLevels(value: unknown): ThinkingLevel[] {
	if (!Array.isArray(value)) return [];
	return value
		.filter((item): item is string => typeof item === "string")
		.map((item) => item.trim())
		.filter((item): item is ThinkingLevel => (ALL_THINKING_LEVELS as string[]).includes(item));
}

function normalizeModelPatterns(value: unknown): string[] {
	if (!Array.isArray(value)) return [];
	const patterns = value
		.filter((item): item is string => typeof item === "string")
		.map((item) => item.trim())
		.filter((item) => item.length > 0);
	return Array.from(new Set(patterns));
}

function mergeQuickSwitchConfig(base: QuickSwitchConfig, patch: unknown): QuickSwitchConfig {
	if (!patch || typeof patch !== "object") return base;
	const input = patch as {
		modelPatterns?: unknown;
		thinkingLevels?: unknown;
		showProviderInLabel?: unknown;
	};

	const next: QuickSwitchConfig = {
		modelPatterns: [...base.modelPatterns],
		thinkingLevels: [...base.thinkingLevels],
		showProviderInLabel: base.showProviderInLabel,
	};

	const modelPatterns = normalizeModelPatterns(input.modelPatterns);
	if (modelPatterns.length > 0) next.modelPatterns = modelPatterns;

	const thinkingLevels = normalizeThinkingLevels(input.thinkingLevels);
	if (thinkingLevels.length > 0) next.thinkingLevels = thinkingLevels;

	if (typeof input.showProviderInLabel === "boolean") {
		next.showProviderInLabel = input.showProviderInLabel;
	}

	return next;
}

function loadQuickSwitchConfig(cwd: string): QuickSwitchConfig {
	const globalPath = join(getAgentDir(), "vim-model-switch.json");
	const projectPath = join(cwd, ".pi", "vim-model-switch.json");

	let config = {
		modelPatterns: [...DEFAULT_QUICK_SWITCH_CONFIG.modelPatterns],
		thinkingLevels: [...DEFAULT_QUICK_SWITCH_CONFIG.thinkingLevels],
		showProviderInLabel: DEFAULT_QUICK_SWITCH_CONFIG.showProviderInLabel,
	};

	config = mergeQuickSwitchConfig(config, parseQuickSwitchConfigFile(globalPath));
	config = mergeQuickSwitchConfig(config, parseQuickSwitchConfigFile(projectPath));
	return config;
}

export default function (pi: ExtensionAPI) {
	let latestModel: Model<Api> | undefined;
	let quickSwitchConfig: QuickSwitchConfig = {
		modelPatterns: [...DEFAULT_QUICK_SWITCH_CONFIG.modelPatterns],
		thinkingLevels: [...DEFAULT_QUICK_SWITCH_CONFIG.thinkingLevels],
		showProviderInLabel: DEFAULT_QUICK_SWITCH_CONFIG.showProviderInLabel,
	};

	pi.on("model_select", (event) => {
		latestModel = event.model;
	});

	pi.on("session_start", (_event, ctx) => {
		latestModel = ctx.model;
		quickSwitchConfig = loadQuickSwitchConfig(ctx.cwd);

		ctx.ui.setEditorComponent((tui, theme, kb) => {
			const editor = new ModalEditor(tui, theme, kb);
			editor.setQuickSwitcher({
				getOptions: () => {
					const available = ctx.modelRegistry.getAvailable();
					const models = available.length > 0 ? available : ctx.modelRegistry.getAll();
					const preferredProvider = latestModel?.provider;
					const selected: Model<Api>[] = [];

					for (const pattern of quickSwitchConfig.modelPatterns) {
						const picked = pickQuickModelForPattern(models, pattern, preferredProvider);
						if (!picked) continue;
						const alreadySelected = selected.some(
							(model) => model.provider === picked.provider && model.id === picked.id,
						);
						if (!alreadySelected) selected.push(picked);
					}

					if (selected.length === 0 && latestModel) {
						const fallback = ctx.modelRegistry.find(latestModel.provider, latestModel.id);
						if (fallback) selected.push(fallback);
					}

					return selected.map((model) => toQuickModelOption(model, quickSwitchConfig.showProviderInLabel));
				},
				getCurrentModel: () => {
					if (!latestModel) return undefined;
					return toQuickModelOption(latestModel, quickSwitchConfig.showProviderInLabel);
				},
				getCurrentThinking: () => pi.getThinkingLevel(),
				getThinkingLevels: () => [...quickSwitchConfig.thinkingLevels],
				apply: async (modelOption, thinkingLevel) => {
					const model = ctx.modelRegistry.find(modelOption.provider, modelOption.id);
					if (!model) {
						return {
							success: false,
							message: `Model not found: ${modelOption.id}`,
						};
					}

					const selected = await pi.setModel(model);
					if (!selected) {
						return {
							success: false,
							message: `No API key configured for ${modelOption.id}`,
						};
					}

					pi.setThinkingLevel(thinkingLevel);
					latestModel = model;
					return {
						success: true,
						message: `Model: ${modelOption.id} (${thinkingLevel})`,
					};
				},
				notify: (message, type) => ctx.ui.notify(message, type),
			});
			return editor;
		});
	});
}
