import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

type Environment = Record<string, string | undefined>;
type SecretValue = { name: string; variants: string[] };
type RedactionResult<T> = { value: T; redactions: number };
type RecoveryResult<T> = { value: T; recoveries: number };

const MIN_SECRET_LENGTH = 8;
const SENSITIVE_NAME = /(?:^|_)(?:API_KEY|KEY|TOKEN|SECRET|PASSWORD|PASSWD|PRIVATE_KEY|ACCESS_KEY|AUTH_TOKEN)(?:$|_)/i;
const NON_SECRET_NAME = /(?:_KEY_ID|_PUBLIC_KEY|_SSH_KEY)$/i;
const EXPLICIT_SENSITIVE_NAMES = new Set([
	"ASSEMBLY_AI",
	"AZURE_CONNECTION_STRING",
	"CLOUDINARY_URL",
	"CONVERT_API",
	"SCRAPE_DO",
]);

const OPAQUE_PROVIDER_FIELDS = new Set([
	"encrypted_content",
	"signature",
	"textSignature",
	"thinkingSignature",
	"thoughtSignature",
]);
const REDACTION_MARKER = /\[REDACTED:[A-Z0-9_]+\]/;
const OMIT_VALUE = Symbol("omit-value");

const PATTERN_REDACTIONS: Array<[RegExp, (...args: unknown[]) => string]> = [
	[/-----BEGIN [A-Z0-9 ]*PRIVATE KEY-----[\s\S]*?-----END [A-Z0-9 ]*PRIVATE KEY-----/g, () => "[REDACTED:PRIVATE_KEY]"],
	[/\bBearer\s+[A-Za-z0-9._~+/=-]{12,}/gi, () => "Bearer [REDACTED:BEARER_TOKEN]"],
	[/(AccountKey=)(?!\[REDACTED:AZURE_ACCOUNT_KEY\])[^;\s"']+/gi, (_match, prefix) => `${String(prefix)}[REDACTED:AZURE_ACCOUNT_KEY]`],
	[/(SharedAccessSignature=)(?!\[REDACTED:AZURE_SAS\])[^\s"']+/gi, (_match, prefix) => `${String(prefix)}[REDACTED:AZURE_SAS]`],
	[/\bAIza[A-Za-z0-9_-]{20,}\b/g, () => "[REDACTED:GOOGLE_API_KEY]"],
	[/\b(?:sk|gsk|xai|hf|sbp|fnd|tvly|rubygems|ctx7sk|fish|swai)[-_][A-Za-z0-9._~+/=-]{12,}\b/gi, () => "[REDACTED:API_TOKEN]"],
	[/\beyJ[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\b/g, () => "[REDACTED:JWT]"],
];

function isSensitiveName(name: string): boolean {
	if (EXPLICIT_SENSITIVE_NAMES.has(name)) return true;
	return SENSITIVE_NAME.test(name) && !NON_SECRET_NAME.test(name);
}

function escapedVariant(value: string): string {
	return JSON.stringify(value).slice(1, -1);
}

function looksLikeEnvironmentDump(text: string): boolean {
	const names = new Set<string>();
	for (const match of text.matchAll(/["']([A-Z][A-Z0-9_]{2,})["']\s*:/g)) names.add(match[1]);
	for (const match of text.matchAll(/(?:^|\n)([A-Z][A-Z0-9_]{2,})=/g)) names.add(match[1]);
	if (names.size < 8) return false;
	return [...names].some(isSensitiveName);
}

export function collectEnvironmentSecrets(environment: Environment = process.env): SecretValue[] {
	const byValue = new Map<string, string>();
	for (const [name, value] of Object.entries(environment)) {
		if (!isSensitiveName(name) || typeof value !== "string" || value.length < MIN_SECRET_LENGTH) continue;
		if (!byValue.has(value)) byValue.set(value, name);
	}

	return [...byValue.entries()]
		.map(([value, name]) => {
			const variants = new Set([value, escapedVariant(value)]);
			try {
				const encoded = encodeURIComponent(value);
				if (encoded.length >= MIN_SECRET_LENGTH) variants.add(encoded);
			} catch {
				// The raw and JSON-escaped forms still protect this value.
			}
			return { name, variants: [...variants].filter((variant) => variant.length >= MIN_SECRET_LENGTH) };
		})
		.sort((left, right) => Math.max(...right.variants.map((value) => value.length)) - Math.max(...left.variants.map((value) => value.length)));
}

export function redactText(text: string, secrets: SecretValue[] = collectEnvironmentSecrets()): RedactionResult<string> {
	if (looksLikeEnvironmentDump(text)) {
		return { value: "[REDACTED:ENVIRONMENT_DUMP]", redactions: 1 };
	}
	let value = text;
	let redactions = 0;
	for (const secret of secrets) {
		for (const variant of secret.variants) {
			if (!value.includes(variant)) continue;
			const pieces = value.split(variant);
			redactions += pieces.length - 1;
			value = pieces.join(`[REDACTED:${secret.name}]`);
		}
	}
	for (const [pattern, replacement] of PATTERN_REDACTIONS) {
		value = value.replace(pattern, (...args) => {
			redactions += 1;
			return replacement(...args);
		});
	}
	return { value, redactions };
}

export function redactValue<T>(input: T, secrets: SecretValue[] = collectEnvironmentSecrets()): RedactionResult<T> {
	let redactions = 0;
	const seen = new WeakMap<object, unknown>();

	const visit = (value: unknown, key?: string): unknown => {
		if (typeof value === "string") {
			if (key && OPAQUE_PROVIDER_FIELDS.has(key)) return value;
			const result = redactText(value, secrets);
			redactions += result.redactions;
			return result.value;
		}
		if (value === null || typeof value !== "object") return value;
		if (seen.has(value)) return seen.get(value);
		if (!Array.isArray(value) && (value as { type?: unknown }).type === "image") return value;
		if (Array.isArray(value)) {
			const copy: unknown[] = [];
			seen.set(value, copy);
			let changed = false;
			for (const item of value) {
				const next = visit(item);
				copy.push(next);
				changed ||= next !== item;
			}
			const result = changed ? copy : value;
			seen.set(value, result);
			return result;
		}
		const copy: Record<string, unknown> = {};
		seen.set(value, copy);
		let changed = false;
		for (const [key, item] of Object.entries(value)) {
			const next = visit(item, key);
			copy[key] = next;
			changed ||= next !== item;
		}
		const result = changed ? copy : value;
		seen.set(value, result);
		return result;
	};

	return { value: visit(input) as T, redactions };
}

function hasCorruptedEncryptedContent(value: unknown): boolean {
	return typeof value === "string" && REDACTION_MARKER.test(value);
}

function hasCorruptedThinkingSignature(value: unknown): boolean {
	if (typeof value !== "string") return false;
	try {
		const parsed = JSON.parse(value) as { encrypted_content?: unknown };
		return hasCorruptedEncryptedContent(parsed.encrypted_content);
	} catch {
		return false;
	}
}

export function recoverCorruptedReasoning<T>(input: T): RecoveryResult<T> {
	let recoveries = 0;
	const seen = new WeakMap<object, unknown>();

	const visit = (value: unknown): unknown | typeof OMIT_VALUE => {
		if (value === null || typeof value !== "object") return value;
		if (seen.has(value)) return seen.get(value);

		if (!Array.isArray(value)) {
			const record = value as Record<string, unknown>;
			if (record.type === "reasoning" && hasCorruptedEncryptedContent(record.encrypted_content)) {
				recoveries += 1;
				return OMIT_VALUE;
			}
			if (record.type === "thinking" && hasCorruptedThinkingSignature(record.thinkingSignature)) {
				const copy = { ...record };
				delete copy.thinkingSignature;
				recoveries += 1;
				return copy;
			}
		}

		if (Array.isArray(value)) {
			const copy: unknown[] = [];
			seen.set(value, copy);
			let changed = false;
			for (const item of value) {
				const next = visit(item);
				if (next === OMIT_VALUE) {
					changed = true;
					continue;
				}
				copy.push(next);
				changed ||= next !== item;
			}
			const result = changed ? copy : value;
			seen.set(value, result);
			return result;
		}

		const copy: Record<string, unknown> = {};
		seen.set(value, copy);
		let changed = false;
		for (const [key, item] of Object.entries(value)) {
			const next = visit(item);
			if (next === OMIT_VALUE) {
				changed = true;
				continue;
			}
			copy[key] = next;
			changed ||= next !== item;
		}
		const result = changed ? copy : value;
		seen.set(value, result);
		return result;
	};

	const value = visit(input);
	return { value: (value === OMIT_VALUE ? undefined : value) as T, recoveries };
}

function sanitizeReplayValue<T>(input: T): RedactionResult<T> & { recoveries: number } {
	const recovered = recoverCorruptedReasoning(input);
	const redacted = redactValue(recovered.value);
	return { ...redacted, recoveries: recovered.recoveries };
}

export default function secretOutputGuard(pi: ExtensionAPI) {
	let warnedCorruptedReasoning = false;
	const warnAboutRecovery = (
		recoveries: number,
		ctx: { hasUI?: boolean; ui?: { notify: (message: string, level: "warning") => void } } | undefined,
	) => {
		if (recoveries === 0 || warnedCorruptedReasoning || !ctx?.hasUI || !ctx.ui) return;
		warnedCorruptedReasoning = true;
		ctx.ui.notify(
			`Secret-output guard omitted ${recoveries} corrupted encrypted reasoning block(s) from replay`,
			"warning",
		);
	};

	pi.on("tool_result", (event, ctx) => {
		const result = redactValue({ content: event.content, details: event.details });
		if (result.redactions === 0) return;
		if (ctx.hasUI) ctx.ui.notify(`Secret-output guard redacted ${result.redactions} value(s)`, "warning");
		return result.value;
	});

	pi.on("context", (event, ctx) => {
		const result = sanitizeReplayValue(event.messages);
		warnAboutRecovery(result.recoveries, ctx);
		return result.redactions > 0 || result.recoveries > 0 ? { messages: result.value } : undefined;
	});

	pi.on("before_provider_request", (event, ctx) => {
		const result = sanitizeReplayValue(event.payload);
		warnAboutRecovery(result.recoveries, ctx);
		return result.redactions > 0 || result.recoveries > 0 ? result.value : undefined;
	});
}
