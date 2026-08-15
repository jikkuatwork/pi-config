#!/usr/bin/env node
// Build Pi's writable global settings from versioned base settings while
// preserving machine-local changelog and analytics metadata.

const fs = require("fs");

const [basePath, existingPath] = process.argv.slice(2);
if (!basePath) {
  console.error("usage: node build-settings.js <settings.base.json> [existing-settings.json]");
  process.exit(1);
}

const localStateKeys = [
  "lastChangelogVersion",
  "enableAnalytics",
  "trackingId",
];

const readJson = (path) => JSON.parse(fs.readFileSync(path, "utf8"));
const base = readJson(basePath);
const existing = existingPath && fs.existsSync(existingPath) ? readJson(existingPath) : {};

for (const key of localStateKeys) {
  if (Object.hasOwn(base, key)) {
    throw new Error(`${basePath} must not contain machine-local key: ${key}`);
  }
}

const output = {};
for (const key of localStateKeys) {
  if (Object.hasOwn(existing, key)) output[key] = existing[key];
}
Object.assign(output, base);

process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);
