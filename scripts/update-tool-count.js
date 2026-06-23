#!/usr/bin/env node
// Computes the live tool count from compiled dist/tools/*.js and writes it into
// package.json ("toolCount" field). Runs after every `npm run build`, so the
// count published to npm — and read by allio.tools at site-build time — is
// always derived from the actual tool arrays, never hand-typed.

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const distToolsDir = path.join(root, 'dist', 'tools');
const moduleFiles = ['calculators', 'converters', 'developer', 'text', 'datetime', 'network', 'health', 'fun'];

let total = 0;
const breakdown = {};

for (const file of moduleFiles) {
  const modPath = path.join(distToolsDir, file + '.js');
  if (!fs.existsSync(modPath)) {
    throw new Error(`Expected compiled module not found: ${modPath}. Run "tsc" before this script.`);
  }
  const mod = require(modPath);
  const arrayKey = Object.keys(mod).find(k => Array.isArray(mod[k]));
  if (!arrayKey) {
    throw new Error(`No tool-definitions array exported from ${file}.js`);
  }
  const count = mod[arrayKey].length;
  breakdown[file] = count;
  total += count;
}

const pkgPath = path.join(root, 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

pkg.toolCount = total;
pkg.toolBreakdown = breakdown;
pkg.description = pkg.description.replace(/— \d+ utilities/, `— ${total} utilities`);

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');

const manifest = {
  version: pkg.version,
  toolCount: total,
  breakdown,
  updatedAt: new Date().toISOString()
};
fs.writeFileSync(path.join(root, 'tools-manifest.json'), JSON.stringify(manifest, null, 2) + '\n');

// Stub a changelog.json entry for this version if one doesn't exist yet — never
// overwrites an existing entry, so highlights/fixes written by hand before
// publishing are never clobbered by a re-build. This is what the MCP server's
// update-checker (src/update-checker.ts) reads to tell users what's new.
const changelogPath = path.join(root, 'changelog.json');
const changelog = fs.existsSync(changelogPath)
  ? JSON.parse(fs.readFileSync(changelogPath, 'utf8'))
  : { latest: pkg.version, versions: [] };

if (!changelog.versions.some(v => v.version === pkg.version)) {
  changelog.versions.unshift({
    version: pkg.version,
    date: new Date().toISOString().slice(0, 10),
    toolCount: total,
    highlights: [],
    fixes: []
  });
  console.log(`changelog.json: stubbed entry for v${pkg.version} — fill in "highlights"/"fixes" before publishing.`);
}
changelog.latest = pkg.version;
fs.writeFileSync(changelogPath, JSON.stringify(changelog, null, 2) + '\n');

console.log(`tool count: ${total} (package.json + tools-manifest.json updated)`);
console.log(JSON.stringify(breakdown, null, 2));
