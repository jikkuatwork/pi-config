import type { AssistantMessage } from "@earendil-works/pi-ai";
import type { ExtensionAPI, ExtensionContext } from "@earendil-works/pi-coding-agent";
import { truncateToWidth, visibleWidth } from "@earendil-works/pi-tui";

function formatTokens(count: number): string {
	if (count < 1000) return count.toString();
	if (count < 10000) return `${(count / 1000).toFixed(1)}k`;
	if (count < 1000000) return `${Math.round(count / 1000)}k`;
	if (count < 10000000) return `${(count / 1000000).toFixed(1)}M`;
	return `${Math.round(count / 1000000)}M`;
}

function sanitizeStatusText(text: string): string {
	return text
		.replace(/[\r\n\t]/g, " ")
		.replace(/ +/g, " ")
		.trim();
}

function setColorizedFooter(ctx: ExtensionContext, getThinkingLevel: () => string): void {
	ctx.ui.setFooter((tui, theme, footerData) => {
		const unsub = footerData.onBranchChange(() => tui.requestRender());

		return {
			dispose: unsub,
			invalidate() {},
			render(width: number): string[] {
				let totalInput = 0;
				let totalOutput = 0;
				let totalCost = 0;

				for (const entry of ctx.sessionManager.getEntries()) {
					if (entry.type === "message" && entry.message.role === "assistant") {
						const message = entry.message as AssistantMessage;
						totalInput += message.usage.input;
						totalOutput += message.usage.output;
						totalCost += message.usage.cost.total;
					}
				}

				const stats: string[] = [];
				if (totalInput > 0) stats.push(theme.fg("dim", `↑${formatTokens(totalInput)}`));
				if (totalOutput > 0) stats.push(theme.fg("dim", `↓${formatTokens(totalOutput)}`));
				stats.push(theme.fg("error", `$${totalCost.toFixed(3)}`));

				const usage = ctx.getContextUsage();
				const contextWindow = usage?.contextWindow ?? ctx.model?.contextWindow ?? 0;
				const percent = usage?.percent ?? null;
				const percentNumber = percent === null ? "?" : percent.toFixed(1);
				const contextTail = `%/${formatTokens(contextWindow)}`;
				stats.push(`${theme.fg("warning", percentNumber)}${theme.fg("dim", contextTail)}`);

				let left = stats.join(" ");
				const modelId = ctx.model?.id ?? "no-model";
				const rightText = ctx.model?.reasoning
					? `${modelId} • ${getThinkingLevel()}`
					: modelId;
				const right = theme.fg("dim", rightText);
				const leftWidth = visibleWidth(left);
				const rightWidth = visibleWidth(right);

				if (leftWidth + 2 + rightWidth > width) {
					const maxLeft = Math.max(0, width - rightWidth - 1);
					left = truncateToWidth(left, maxLeft, "");
				}

				const pad = " ".repeat(Math.max(1, width - visibleWidth(left) - rightWidth));
				const statsLine = truncateToWidth(left + pad + right, width, "");

				const sessionManager = ctx.sessionManager as unknown as {
					getCwd?: () => string;
					getSessionName?: () => string | undefined;
				};
				let location = sessionManager.getCwd?.() ?? ctx.cwd;
				const home = process.env.HOME || process.env.USERPROFILE;
				if (home && location.startsWith(home)) {
					location = `~${location.slice(home.length)}`;
				}

				const gitBranch = footerData.getGitBranch();
				if (gitBranch) location += ` (${gitBranch})`;
				const sessionName = sessionManager.getSessionName?.();
				if (sessionName) location += ` • ${sessionName}`;

				const lines = [
					truncateToWidth(theme.fg("dim", location), width, theme.fg("dim", "...")),
					statsLine,
				];

				const extensionStatuses = footerData.getExtensionStatuses();
				if (extensionStatuses.size > 0) {
					const statusLine = Array.from(extensionStatuses.entries())
						.sort(([a], [b]) => a.localeCompare(b))
						.map(([, text]) => sanitizeStatusText(text))
						.join(" ");
					lines.push(truncateToWidth(statusLine, width, theme.fg("dim", "...")));
				}

				return lines;
			},
		};
	});
}

export default function footerHighlights(pi: ExtensionAPI) {
	pi.on("session_start", (_event, ctx) => {
		setColorizedFooter(ctx, () => pi.getThinkingLevel());
	});
}
