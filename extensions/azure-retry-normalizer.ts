import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

/**
 * Normalizes opaque Azure/OpenAI errors so pi's transient auto-retry can kick in,
 * and surfaces retry lifecycle telemetry in the UI.
 *
 * Target symptom:
 *   Error: Unknown error (no error details in response)
 */
const AZURE_PROVIDER = "azure-openai-responses";
const OPAQUE_ERROR_PATTERN = /unknown error \(no error details in response\)/i;

export default function azureRetryNormalizer(pi: ExtensionAPI) {
  pi.on("message_end", (event, ctx) => {
    const message = event.message;

    // Only assistant failures
    if (message.role !== "assistant") return;
    if (message.stopReason !== "error") return;

    // Scope strictly to Azure OpenAI Responses provider
    const provider = message.provider ?? ctx.model?.provider;
    if (provider !== AZURE_PROVIDER) return;

    const errorMessage = message.errorMessage ?? "";
    if (!OPAQUE_ERROR_PATTERN.test(errorMessage)) return;

    // If already normalized, do nothing
    if (/\b(overloaded_error|rate limit|too many requests|\b5\d\d\b|\b529\b)\b/i.test(errorMessage)) {
      return;
    }

    // Rewrite to a known transient-shape string so agent auto-retry can classify it.
    return {
      message: {
        ...message,
        errorMessage: `529 overloaded_error: ${errorMessage}`,
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
