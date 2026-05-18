import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

/**
 * Normalizes opaque Azure/OpenAI failures so pi's transient auto-retry can kick in,
 * and surfaces retry lifecycle telemetry in the UI.
 *
 * Target symptoms:
 *   1) Error: Unknown error (no error details in response)
 *   2) Generic refusal placeholder: "I'm sorry, but I cannot assist with that request."
 */
const AZURE_PROVIDER = "azure-openai-responses";
const OPAQUE_ERROR_PATTERN = /unknown error \(no error details in response\)/i;
const GENERIC_REFUSAL_PATTERNS = [
	/^i'?m sorry, but i cannot assist with that request\.?$/i,
	/^sorry, i cannot assist with that request\.?$/i,
	/^i cannot assist with that request\.?$/i,
];

function extractText(message: any): string {
	if (message.role !== "assistant") return "";
	if (typeof message.content === "string") return message.content;
	if (!Array.isArray(message.content)) return "";

	return message.content
		.filter((item): item is { type: "text"; text: string } => item?.type === "text" && typeof item.text === "string")
		.map((item) => item.text)
		.join("\n")
		.trim();
}

function isGenericRefusal(text: string): boolean {
	const normalized = text.replace(/\s+/g, " ").trim();
	return GENERIC_REFUSAL_PATTERNS.some((pattern) => pattern.test(normalized));
}

export default function azureRetryNormalizer(pi: ExtensionAPI) {
	pi.on("message_end", (event, ctx) => {
		const message = event.message;

		// Only assistant messages
		if (message.role !== "assistant") return;

		// Scope strictly to Azure OpenAI Responses provider
		const provider = message.provider ?? ctx.model?.provider;
		if (provider !== AZURE_PROVIDER) return;

		// Case 1: Opaque Azure errors that should be retried.
		if (message.stopReason === "error") {
			const errorMessage = message.errorMessage ?? "";
			if (!OPAQUE_ERROR_PATTERN.test(errorMessage)) return;

			// If already normalized, do nothing
			if (/\b(overloaded_error|rate limit|too many requests|\b5\d\d\b|\b529\b)\b/i.test(errorMessage)) {
				return;
			}

			return {
				message: {
					...message,
					errorMessage: `529 overloaded_error: ${errorMessage}`,
				},
			};
		}

		// Case 2: Generic refusal placeholders that appear intermittently on Azure.
		// Convert to a known transient-shape error so built-in auto-retry can recover.
		const text = extractText(message);
		if (!text || !isGenericRefusal(text)) return;

		return {
			message: {
				...message,
				stopReason: "error",
				errorMessage: `529 overloaded_error: generic refusal placeholder: ${text}`,
			},
		};
	});

	pi.on("auto_retry_start", (event, ctx) => {
		if (ctx.model?.provider !== AZURE_PROVIDER) return;

		const seconds = Math.max(1, Math.round(event.delayMs / 1000));
		const status = `azure retry ${event.attempt}/${event.maxAttempts} in ${seconds}s`;
		ctx.ui.setStatus("azure-retry", status);
		ctx.ui.notify(status, "warning");
	});

	pi.on("auto_retry_end", (event, ctx) => {
		if (ctx.model?.provider !== AZURE_PROVIDER) return;

		if (event.success) {
			const msg = `azure retry recovered on attempt ${event.attempt}`;
			ctx.ui.setStatus("azure-retry", msg);
			ctx.ui.notify(msg, "info");
			return;
		}

		const msg = `azure retry exhausted at attempt ${event.attempt}${
			event.finalError ? `: ${event.finalError}` : ""
		}`;
		ctx.ui.setStatus("azure-retry", msg);
		ctx.ui.notify(msg, "error");
	});
}
