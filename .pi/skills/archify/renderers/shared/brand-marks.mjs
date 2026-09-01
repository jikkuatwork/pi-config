import { BRAND_MARKS } from './generated-brand-marks.mjs';
import { throwDiagnosticError } from './diagnostics.mjs';
import { esc, textUnits } from './utils.mjs';

const COLLECTIONS = Object.freeze({
  architecture: 'components',
  workflow: 'nodes',
  sequence: 'participants',
  dataflow: 'nodes',
  lifecycle: 'states',
});
const MARK_BY_LOOKUP = new Map();
const RESOLVED_BY_NODE = new WeakMap();
const RESOLVED_MARK = Symbol('archify.brandMark');

function lookupForms(value) {
  const raw = String(value ?? '').trim().toLocaleLowerCase('en-US');
  if (!raw) return [];
  const dashed = raw.replace(/[\s_]+/g, '-');
  const compact = raw.replace(/[\s_.-]+/g, '');
  return [...new Set([raw, dashed, compact])];
}

for (const mark of BRAND_MARKS) {
  for (const value of [mark.id, mark.title, ...mark.aliases]) {
    for (const form of lookupForms(value)) {
      if (!MARK_BY_LOOKUP.has(form)) MARK_BY_LOOKUP.set(form, mark);
    }
  }
}

function isHttpUrl(value) {
  try {
    return ['https:', 'http:'].includes(new URL(String(value)).protocol);
  } catch {
    return false;
  }
}

export function findBrandMark(value) {
  if (isHttpUrl(value)) return null;
  for (const form of lookupForms(value)) {
    const mark = MARK_BY_LOOKUP.get(form);
    if (mark) return mark;
  }
  return null;
}

export function listBrandMarks(query = '') {
  const needle = String(query).trim().toLocaleLowerCase('en-US');
  return BRAND_MARKS.filter((mark) => {
    if (!needle) return true;
    return [mark.id, mark.title, mark.category, ...mark.aliases, ...mark.domains]
      .some((value) => String(value).toLocaleLowerCase('en-US').includes(needle));
  }).map(({ path, ...mark }) => mark);
}

function suggestions(value) {
  const needle = lookupForms(value)[0] || '';
  return BRAND_MARKS.map((mark) => ({
    id: mark.id,
    score: lookupForms(mark.id).some((form) => form.includes(needle) || needle.includes(form)) ? 0 : 1,
  })).sort((left, right) => left.score - right.score || left.id.localeCompare(right.id))
    .slice(0, 5)
    .map((entry) => entry.id);
}

// This local edition never resolves authored URLs or digest-pinned remote
// objects. Brand lookup is restricted to the generated in-package catalogue.
export async function prepareDiagramBrandMarks(diagramType, diagram) {
  const collection = COLLECTIONS[diagramType];
  const nodes = collection && Array.isArray(diagram[collection]) ? diagram[collection] : [];
  const diagnostics = [];

  nodes.forEach((node, index) => {
    if (!node.brand) return;
    const subject = { diagramType, collection, path: `/${collection}/${index}/brand` };

    if (typeof node.brand !== 'string' || isHttpUrl(node.brand)) {
      diagnostics.push({
        code: 'privacy/remote-brand-disabled',
        severity: 'error',
        message: `${subject.path} must use a bundled brand ID; URL and remote brand capture are disabled by the no-egress policy.`,
        subject,
        evidence: { suppliedType: typeof node.brand },
        supportedFixes: ['choose an ID from `node bin/archify.mjs brands --json`', 'omit the brand field'],
      });
      return;
    }

    const preset = findBrandMark(node.brand);
    if (!preset) {
      diagnostics.push({
        code: 'brand/unknown',
        severity: 'error',
        message: `${subject.path} ${JSON.stringify(node.brand)} is not a bundled brand; closest IDs: ${suggestions(node.brand).join(', ')}`,
        subject,
        evidence: {},
        supportedFixes: ['choose an ID from `node bin/archify.mjs brands --json`', 'omit the brand field'],
      });
      return;
    }

    const resolved = { ...preset, kind: 'preset', status: 'preset' };
    node[RESOLVED_MARK] = resolved;
    RESOLVED_BY_NODE.set(node, resolved);
  });

  if (diagnostics.length) {
    throwDiagnosticError(
      `Brand mark validation failed:\n- ${diagnostics.map((entry) => entry.message).join('\n- ')}`,
      diagnostics,
    );
  }
}

export function brandMarkFor(node) {
  return node?.[RESOLVED_MARK] || RESOLVED_BY_NODE.get(node) || null;
}

export function brandMetadataFor(node) {
  const mark = brandMarkFor(node);
  return mark ? {
    brand: mark.title,
    brandId: mark.id,
    brandStatus: mark.status,
  } : {};
}

export function brandLabelFitWidth(node, width) {
  return brandMarkFor(node) ? Math.max(1, width - 48) : width;
}

export function brandTopRailProblem(node, width, minimumFontSize, subject = 'Node') {
  if (!brandMarkFor(node)) return null;
  const available = width - 48;
  const required = textUnits(node.label) * minimumFontSize * 0.6;
  if (available >= required) return null;
  return `${subject} "${node.id}" brand top rail leaves ${Math.max(0, available)}px for its label, but `
    + `"${node.label}" needs ~${Math.ceil(required)}px at the ${minimumFontSize}px legible minimum — widen the node or shorten the label.`;
}

function markAttrs(mark) {
  return [
    `data-brand-mark="${esc(mark.id)}"`,
    `data-brand-title="${esc(mark.title)}"`,
    `data-brand-status="${esc(mark.status)}"`,
  ].filter(Boolean).join(' ');
}

export function renderBrandMark(node, { x, y, size = 16 } = {}) {
  const mark = brandMarkFor(node);
  if (!mark) return '';
  const inset = 3;
  const scale = (size - inset * 2) / mark.viewBox;
  const content = `<path d="${esc(mark.path)}" transform="translate(${inset} ${inset}) scale(${scale})" fill="#${esc(mark.hex)}"/>`;
  return `<g aria-hidden="true" ${markAttrs(mark)} class="brand-mark" transform="translate(${x} ${y})">
            <rect width="${size}" height="${size}" rx="4" class="brand-mark-badge"/>
            ${content}
            <rect width="${size}" height="${size}" rx="4" class="brand-mark-frame"/>
          </g>`;
}
