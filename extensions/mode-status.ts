import type { ExtensionAPI, ExtensionContext } from "@earendil-works/pi-coding-agent";

function setModeStatus(ctx: ExtensionContext, getThinkingLevel: () => string): void {
	const theme = ctx.ui.theme;
	const provider = ctx.model?.provider ?? "unknown-provider";
	const model = ctx.model?.id ?? "no-model";
	const thinking = ctx.model?.reasoning ? `:${getThinkingLevel()}` : "";
	ctx.ui.setStatus("00-mode", theme.fg("dim", `pi • ${provider}/${model}${thinking}`));
}

export default function modeStatus(pi: ExtensionAPI) {
	pi.on("session_start", (_event, ctx) => {
		setModeStatus(ctx, () => pi.getThinkingLevel());
	});

	pi.on("model_select", (_event, ctx) => {
		setModeStatus(ctx, () => pi.getThinkingLevel());
	});
}
