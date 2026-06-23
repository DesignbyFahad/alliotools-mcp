/**
 * Update checker — entirely separate from tool usage.
 *
 * What this does: once every 24h at most, fetches a small static JSON file
 * (changelog.json) from this project's own GitHub repo to see if a newer
 * version of alliotools-mcp has been published, and what changed.
 *
 * What this does NOT do: send any usage data, tool-call history, arguments,
 * results, machine identifiers, or anything else about how this server is
 * being used. The request is a plain anonymous GET of a public file —
 * nothing is attached to it beyond what any HTTP request inherently carries
 * (e.g. your IP, same as visiting any webpage). No telemetry, no analytics,
 * no tracking pixel. This is a one-way "is there a newer version" check
 * between this local server and our own GitHub-hosted file, not a usage
 * report.
 *
 * Fails silently and never blocks a tool call — a network hiccup or an
 * offline machine should never slow down or break the actual tools.
 */

import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';

const CHANGELOG_URL = 'https://raw.githubusercontent.com/DesignbyFahad/alliotools-mcp/master/changelog.json';
const CHECK_INTERVAL_MS = 24 * 60 * 60 * 1000; // at least once every 24h
const FETCH_TIMEOUT_MS = 3000;
const CACHE_DIR = join(homedir(), '.alliotools-mcp');
const CACHE_FILE = join(CACHE_DIR, 'update-check.json');

interface ChangelogVersion {
  version: string;
  date: string;
  toolCount?: number;
  highlights?: string[];
  fixes?: string[];
}

interface Changelog {
  latest: string;
  versions: ChangelogVersion[];
}

interface CheckCache {
  lastCheckedAt: string;
  latestKnownVersion: string;
}

function getCurrentVersion(): string {
  try {
    const pkg = JSON.parse(readFileSync(join(__dirname, '..', 'package.json'), 'utf8'));
    return pkg.version as string;
  } catch {
    return '0.0.0';
  }
}

function compareVersions(a: string, b: string): number {
  const pa = a.split('.').map(Number);
  const pb = b.split('.').map(Number);
  for (let i = 0; i < 3; i++) {
    if ((pa[i] || 0) !== (pb[i] || 0)) return (pa[i] || 0) - (pb[i] || 0);
  }
  return 0;
}

function readCache(): CheckCache | null {
  try {
    if (!existsSync(CACHE_FILE)) return null;
    return JSON.parse(readFileSync(CACHE_FILE, 'utf8'));
  } catch {
    return null;
  }
}

function writeCache(cache: CheckCache): void {
  try {
    if (!existsSync(CACHE_DIR)) mkdirSync(CACHE_DIR, { recursive: true });
    writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
  } catch {
    // Non-fatal — worst case we re-check next launch instead of waiting the full 24h.
  }
}

function isCheckDue(cache: CheckCache | null): boolean {
  if (!cache) return true;
  const last = new Date(cache.lastCheckedAt).getTime();
  if (Number.isNaN(last)) return true;
  return Date.now() - last >= CHECK_INTERVAL_MS;
}

function buildBanner(currentVersion: string, changelog: Changelog): string | null {
  if (compareVersions(changelog.latest, currentVersion) <= 0) return null;

  // Collect every version entry newer than what's installed, newest first.
  const newer = changelog.versions
    .filter(v => compareVersions(v.version, currentVersion) > 0)
    .sort((a, b) => compareVersions(b.version, a.version));

  const highlights = newer.flatMap(v => v.highlights || []).slice(0, 4);
  const fixes = newer.flatMap(v => v.fixes || []).slice(0, 3);

  const lines = [
    `🔔 alliotools-mcp update available: v${currentVersion} → v${changelog.latest}`
  ];
  if (highlights.length) lines.push(`   New: ${highlights.join(' ')}`);
  if (fixes.length) lines.push(`   Fixed: ${fixes.join(' ')}`);
  lines.push(`   Run: npm install -g alliotools-mcp@latest`);

  return lines.join('\n');
}

let primed = false;
let cachedBanner: string | null = null;

/**
 * Kick off the check in the background. Never await this from a tool call —
 * call it once at server startup and let it resolve on its own time.
 */
export function primeUpdateCheck(): void {
  if (primed) return;
  primed = true;

  const currentVersion = getCurrentVersion();
  const cache = readCache();

  if (!isCheckDue(cache)) {
    // Still within the 24h window — reuse the last known result without a network call.
    if (cache && compareVersions(cache.latestKnownVersion, currentVersion) > 0) {
      // We know an update exists, but don't have the descriptive changelog
      // without re-fetching. A short, content-light banner is enough here.
      cachedBanner = `🔔 alliotools-mcp update available: v${currentVersion} → v${cache.latestKnownVersion}\n   Run: npm install -g alliotools-mcp@latest`;
    }
    return;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  fetch(CHANGELOG_URL, { signal: controller.signal })
    .then(res => (res.ok ? res.json() : null))
    .then((changelog: unknown) => {
      const parsed = changelog as Changelog | null;
      if (!parsed || !parsed.latest) return;
      cachedBanner = buildBanner(currentVersion, parsed);
      writeCache({ lastCheckedAt: new Date().toISOString(), latestKnownVersion: parsed.latest });
    })
    .catch(() => {
      // Offline, DNS failure, GitHub hiccup — silently skip. We'll try again
      // on the next launch (cache is only written on success, so isCheckDue
      // stays true until a check actually succeeds).
    })
    .finally(() => clearTimeout(timeout));
}

let bannerShownThisSession = false;

/** Returns the update banner once per process if one is ready and not yet shown, else null. */
export function takeBannerIfReady(): string | null {
  if (bannerShownThisSession || !cachedBanner) return null;
  bannerShownThisSession = true;
  return cachedBanner;
}
