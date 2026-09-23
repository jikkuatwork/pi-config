import assert from "node:assert/strict";
import test from "node:test";
import secretOutputGuard, {
	collectEnvironmentSecrets,
	redactText,
	redactValue,
} from "./secret-output-guard.ts";

const DUMMY_SECRET = "dummy-secret-value-123456789";
const DUMMY_JWT = "eyJheader123456.payload123456.signature123456";

test("collectEnvironmentSecrets selects credential names without broad path values", () => {
	const secrets = collectEnvironmentSecrets({
		OPENAI_API_KEY: DUMMY_SECRET,
		CLOUDINARY_URL: "cloudinary://user:password@example.invalid",
		AGENT_CODE_API_BASE_URL: "https://owner.example.invalid/v1",
		RABATA_KEY_ID: "public-key-identifier",
		TESTMAN_SSH_KEY: "ssh-ed25519 public-material",
		PATH: "/bin:/usr/bin",
		PUBLIC_VALUE: "ordinary-public-value",
	});
	assert.deepEqual(secrets.map((secret) => secret.name).sort(), ["CLOUDINARY_URL", "OPENAI_API_KEY"]);
});

test("redactText removes raw, escaped, encoded, and recognizable credential forms", () => {
	const multiline = "line-one\nline-two-secret";
	const secrets = collectEnvironmentSecrets({ TEST_API_KEY: multiline });
	const input = [
		multiline,
		JSON.stringify(multiline).slice(1, -1),
		encodeURIComponent(multiline),
		"AccountKey=abcdefghijklmnopqrstuvwxyz012345;EndpointSuffix=example.invalid",
		`Bearer ${DUMMY_SECRET}`,
		DUMMY_JWT,
	].join("\n");
	const result = redactText(input, secrets);
	assert.equal(result.value.includes(multiline), false);
	assert.equal(result.value.includes(JSON.stringify(multiline).slice(1, -1)), false);
	assert.equal(result.value.includes(encodeURIComponent(multiline)), false);
	assert.equal(result.value.includes("abcdefghijklmnopqrstuvwxyz012345"), false);
	assert.equal(result.value.includes(DUMMY_SECRET), false);
	assert.equal(result.value.includes(DUMMY_JWT), false);
	assert.match(result.value, /AccountKey=\[REDACTED:AZURE_ACCOUNT_KEY\]/);
	assert.ok(result.redactions >= 6);
	assert.deepEqual(redactText(result.value, secrets), { value: result.value, redactions: 0 });
});

test("redactText removes broad child-process environment dumps without knowing their values", () => {
	const pythonDump = "AssertionError: key unexpectedly found in {'SHELL': '/bin/bash', 'HOME': '/home/test', 'PATH': '/bin', 'USER': 'test', 'PWD': '/tmp', 'TERM': 'xterm', 'LANG': 'C', 'CHILD_API_KEY': 'unknown-child-secret', 'SHLVL': '1'}";
	const shellDump = [
		"SHELL=/bin/bash",
		"HOME=/home/test",
		"PATH=/bin",
		"USER=test",
		"PWD=/tmp",
		"TERM=xterm",
		"LANG=C",
		"CHILD_TOKEN=unknown-child-token",
	].join("\n");
	assert.deepEqual(redactText(pythonDump, []), { value: "[REDACTED:ENVIRONMENT_DUMP]", redactions: 1 });
	assert.deepEqual(redactText(shellDump, []), { value: "[REDACTED:ENVIRONMENT_DUMP]", redactions: 1 });
});

test("redactValue recursively sanitizes text while leaving image payloads untouched", () => {
	const secrets = collectEnvironmentSecrets({ TEST_API_KEY: DUMMY_SECRET });
	const image = { type: "image", data: DUMMY_SECRET, mimeType: "image/png" };
	const input = {
		content: [{ type: "text", text: `token=${DUMMY_SECRET}` }, image],
		details: { nested: [DUMMY_SECRET] },
	};
	const result = redactValue(input, secrets);
	assert.equal(JSON.stringify(result.value.content[0]).includes(DUMMY_SECRET), false);
	assert.equal(JSON.stringify(result.value.details).includes(DUMMY_SECRET), false);
	assert.equal(result.value.content[1], image);
	assert.equal(result.redactions, 2);

	const unchanged = { content: [{ type: "text", text: "ordinary output" }] };
	assert.equal(redactValue(unchanged, secrets).value, unchanged);
});

test("extension sanitizes tool persistence, historical context, and final provider payload", () => {
	const handlers = new Map();
	const notifications = [];
	const pi = {
		on(name, handler) {
			handlers.set(name, handler);
		},
	};
	secretOutputGuard(pi);

	const previous = process.env.TEST_GUARD_API_KEY;
	process.env.TEST_GUARD_API_KEY = DUMMY_SECRET;
	try {
		const toolResult = handlers.get("tool_result")(
			{
				content: [{ type: "text", text: `stdout ${DUMMY_SECRET}` }],
				details: { output: DUMMY_SECRET },
			},
			{ hasUI: true, ui: { notify: (...args) => notifications.push(args) } },
		);
		assert.equal(JSON.stringify(toolResult).includes(DUMMY_SECRET), false);
		assert.equal(notifications.length, 1);

		const contextResult = handlers.get("context")({
			messages: [{ role: "toolResult", content: [{ type: "text", text: DUMMY_SECRET }] }],
		});
		assert.equal(JSON.stringify(contextResult).includes(DUMMY_SECRET), false);

		const payloadResult = handlers.get("before_provider_request")({
			payload: { input: [{ role: "tool", content: DUMMY_SECRET }] },
		});
		assert.equal(JSON.stringify(payloadResult).includes(DUMMY_SECRET), false);
	} finally {
		if (previous === undefined) delete process.env.TEST_GUARD_API_KEY;
		else process.env.TEST_GUARD_API_KEY = previous;
	}
});
