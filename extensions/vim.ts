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
 */

import { CustomEditor, type ExtensionAPI } from "@earendil-works/pi-coding-agent";
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

	handleInput(data: string): void {
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

	render(width: number): string[] {
		const borderFg = this.mode === "normal" ? FG_BLUE : FG_GREEN;
		this.borderColor = (text: string) => `${borderFg}${text}${ANSI_RESET}`;

		const lines = super.render(width);
		if (lines.length === 0) return lines;

		// Keep the editor content untouched, and render mode on its own line so
		// prompt text never touches the mode block.
		let rawLabel = this.mode === "normal" ? " NORMAL " : " INSERT ";
		let bg = this.mode === "normal" ? BG_BLUE : BG_GREEN;
		if (this.pendingOperator) {
			rawLabel = ` ${this.pendingOperator}… `;
			bg = BG_ORANGE;
		}
		if (this.pendingFind) {
			rawLabel = ` ${this.pendingFind === "forward" ? "f" : "F"}… `;
			bg = BG_ORANGE;
		}
		if (this.pendingGoto) {
			rawLabel = " g… ";
			bg = BG_ORANGE;
		}

		const styledLabel = `${bg}${FG_BLACK}${rawLabel}${ANSI_RESET}`;
		const clipped = truncateToWidth(styledLabel, width, "");
		const pad = " ".repeat(Math.max(0, width - visibleWidth(clipped)));
		const statusLine = `${clipped}${pad}`;

		return [...lines, statusLine];
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

export default function (pi: ExtensionAPI) {
	pi.on("session_start", (_event, ctx) => {
		ctx.ui.setEditorComponent((tui, theme, kb) => new ModalEditor(tui, theme, kb));
	});
}
