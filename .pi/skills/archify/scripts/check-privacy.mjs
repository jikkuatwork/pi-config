import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptPath = fileURLToPath(import.meta.url);
const skillRoot = path.resolve(path.dirname(scriptPath), '..');

function source(relativePath) {
  return fs.readFileSync(path.join(skillRoot, relativePath), 'utf8');
}

function addIf(violations, condition, message) {
  if (condition) violations.push(message);
}

export function auditPrivacy() {
  const violations = [];
  const forbiddenFiles = [
    'scripts/check-update.mjs',
    'scripts/update-contract.mjs',
    'skill-release.json',
    'package.json',
    'package-lock.json',
  ];
  for (const relativePath of forbiddenFiles) {
    addIf(violations, fs.existsSync(path.join(skillRoot, relativePath)), `${relativePath} must be absent`);
  }

  const brandRuntime = source('renderers/shared/brand-marks.mjs');
  for (const pattern of [
    /node:(?:dns|http|https|net|tls)/,
    /\bfetch\s*\(/,
    /\.request\s*\(/,
    /captureBrandReference/,
    /ARCHIFY_BRAND_/,
  ]) {
    addIf(violations, pattern.test(brandRuntime), `brand runtime contains forbidden network surface ${pattern}`);
  }
  addIf(
    violations,
    !brandRuntime.includes("code: 'privacy/remote-brand-disabled'"),
    'brand runtime lacks the fail-closed remote-brand diagnostic',
  );

  const cli = source('bin/archify.mjs');
  addIf(violations, cli.includes('captureBrandReference'), 'CLI still imports remote brand capture');
  addIf(
    violations,
    !cli.includes('Remote brand capture is disabled by the local no-egress policy.'),
    'CLI lacks an explicit remote-capture refusal',
  );

  const template = source('assets/template.html');
  addIf(
    violations,
    !template.includes('<meta http-equiv="x-dns-prefetch-control" content="off">'),
    'artifact template does not disable DNS prefetch',
  );
  addIf(
    violations,
    !template.includes('<meta name="referrer" content="no-referrer">'),
    'artifact template lacks global no-referrer policy',
  );
  addIf(
    violations,
    !template.includes("style-src 'unsafe-inline' https://fonts.googleapis.com"),
    'artifact template permits an unexpected stylesheet source',
  );
  addIf(
    violations,
    !template.includes("font-src 'self' data: https://fonts.gstatic.com"),
    'artifact template permits an unexpected font source',
  );
  addIf(
    violations,
    !template.includes("connect-src 'none'"),
    'artifact template does not block script connection APIs',
  );
  addIf(
    violations,
    !template.includes("img-src 'self' data: blob:"),
    'artifact template does not block remote images',
  );
  const remoteAttributes = [...template.matchAll(/\b(?:href|src)=["'](https?:\/\/[^"']+)["']/g)]
    .map((match) => match[1]);
  const allowedPrefixes = [
    'https://fonts.googleapis.com/css2?family=JetBrains+Mono',
    'https://fonts.gstatic.com',
  ];
  for (const value of remoteAttributes) {
    addIf(
      violations,
      !allowedPrefixes.some((prefix) => value.startsWith(prefix)),
      `artifact template contains unapproved remote resource ${value}`,
    );
  }
  const googleFontLinks = template.match(/<link\b[^>]+https:\/\/fonts\.(?:googleapis|gstatic)\.com[^>]*>/g) || [];
  addIf(violations, googleFontLinks.length !== 3, 'artifact template must contain exactly three fixed Google Fonts link elements');
  addIf(
    violations,
    googleFontLinks.some((tag) => !tag.includes('referrerpolicy="no-referrer"')),
    'every Google Fonts link must use no-referrer',
  );
  addIf(violations, /<script\b[^>]+\bsrc=["']https?:\/\//i.test(template), 'artifact template contains a remote script');
  addIf(violations, /<img\b[^>]+\bsrc=["']https?:\/\//i.test(template), 'artifact template contains a remote image');
  addIf(
    violations,
    /\b(?:fetch|XMLHttpRequest|sendBeacon|WebSocket|EventSource)\s*\(/.test(template),
    'artifact template contains a script connection primitive',
  );

  const preview = source('bin/preview.mjs');
  addIf(violations, !preview.includes("const loopbackHost = '127.0.0.1';"), 'preview is not pinned to IPv4 loopback');
  addIf(violations, !preview.includes('server.listen(0, loopbackHost'), 'preview does not bind through the pinned loopback host');
  addIf(violations, !preview.includes("connect-src 'self'"), 'preview page does not restrict connections to itself');
  addIf(violations, /http\.(?:request|get)\s*\(|\bfetch\s*\(/.test(preview), 'preview contains an outbound HTTP client');

  const runtimeFiles = [];
  for (const directory of ['bin', 'delta', 'migrations', 'recipes', 'renderers', 'scripts']) {
    const pending = [path.join(skillRoot, directory)];
    while (pending.length) {
      const current = pending.pop();
      for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
        const absolute = path.join(current, entry.name);
        if (entry.isDirectory()) pending.push(absolute);
        else if (entry.isFile() && absolute.endsWith('.mjs') && absolute !== scriptPath) runtimeFiles.push(absolute);
      }
    }
  }
  for (const absolute of runtimeFiles) {
    const relative = path.relative(skillRoot, absolute).split(path.sep).join('/');
    const text = fs.readFileSync(absolute, 'utf8');
    addIf(violations, /from ['"]node:(?:https|dns|tls|net|dgram|http2)['"]/.test(text), `${relative} imports an outbound network module`);
    if (relative !== 'bin/preview.mjs') {
      addIf(violations, /from ['"]node:http['"]/.test(text), `${relative} imports node:http outside the loopback preview`);
      addIf(violations, /\bEventSource\s*\(/.test(text), `${relative} creates EventSource outside the loopback preview`);
    }
    addIf(violations, /\b(?:fetch|XMLHttpRequest|sendBeacon|WebSocket)\s*\(/.test(text), `${relative} contains an outbound browser/network primitive`);
    addIf(violations, /(?:spawn|spawnSync|exec|execFile|execFileSync)\s*\([^\n]*(?:curl|wget|nc|socat)/.test(text), `${relative} launches a network client`);
  }

  return {
    ok: violations.length === 0,
    policy: 'no_repo_data_egress_v1',
    allowedExternalResources: [
      'https://fonts.googleapis.com/css2?family=JetBrains+Mono…',
      'https://fonts.gstatic.com (font files selected by the fixed stylesheet)',
    ],
    violations,
  };
}

if (path.resolve(process.argv[1] || '') === scriptPath) {
  const result = auditPrivacy();
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  if (!result.ok) process.exitCode = 1;
}
