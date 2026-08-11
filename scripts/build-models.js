#!/usr/bin/env node
// build-models.js — generate ~/.pi/agent/models.json from .pi/providers.json.
//
// Reads a providers.json ({"providers": {...}}) and, when OPENAI_API_KEY and
// OPENAI_BASEURL are both set in the environment, injects an `openai` override
// so pi's built-in OpenAI models point at your custom base URL. Writes the
// merged document to stdout.
//
// Usage: node build-models.js <providers.json>

const fs = require("fs");

const src = process.argv[2];
if (!src) {
  console.error("usage: node build-models.js <providers.json>");
  process.exit(1);
}

const doc = JSON.parse(fs.readFileSync(src, "utf8"));
if (!doc.providers || typeof doc.providers !== "object") {
  console.error("providers.json must contain a top-level `providers` object");
  process.exit(1);
}

const apiKey = process.env.OPENAI_API_KEY;
const baseUrl = process.env.OPENAI_BASEURL;

if (apiKey && baseUrl) {
  doc.providers.openai = {
    baseUrl,
    apiKey: "$OPENAI_API_KEY",
  };
  console.error(
    `[build-models] added openai override -> ${baseUrl} (from OPENAI_BASEURL)`
  );
} else {
  console.error(
    "[build-models] OPENAI_API_KEY/OPENAI_BASEURL not both set; skipping openai override"
  );
}

process.stdout.write(JSON.stringify(doc, null, 2) + "\n");
