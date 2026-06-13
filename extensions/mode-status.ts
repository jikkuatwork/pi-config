import type { ExtensionAPI, ExtensionContext } from "@earendil-works/pi-coding-agent";

function modeLabel(ctx: ExtensionContext): string {
	const explicit = (process.env.PI_MODE_LABEL || process.env.PI_MODE || "").trim();
	if (explicit) return explicit;
	return ctx.model?.provider === "foundry-zyt" ? "pi-zyt" : "pi";
}

function setModeStatus(ctx: ExtensionContext, getThinkingLevel: () => string): void {
	const theme = ctx.ui.theme;
	const provider = ctx.model?.provider ?? "unknown-provider";
	const model = ctx.model?.id ?? "no-model";
	const thinking = ctx.model?.reasoning ? `:${getThinkingLevel()}` : "";
	const label = modeLabel(ctx);
	const color = label === "pi-zyt" || provider === "foundry-zyt" ? "accent" : "dim";
	ctx.ui.setStatus("00-mode", theme.fg(color, `${label} • ${provider}/${model}${thinking}`));
}

export default function modeStatus(pi: ExtensionAPI) {
	pi.on("session_start", (_event, ctx) => {
		setModeStatus(ctx, () => pi.getThinkingLevel());
	});

	pi.on("model_select", (_event, ctx) => {
		setModeStatus(ctx, () => pi.getThinkingLevel());
	});
}
