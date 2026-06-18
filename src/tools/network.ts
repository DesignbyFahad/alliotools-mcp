// Network tools — Tier 2: these make external network calls
// Users are informed of this in the tool descriptions
import { createRequire } from 'module';
import * as https from 'https';
import * as dns from 'dns';
import { promisify } from 'util';

const dnsLookup = promisify(dns.lookup);
const dnsResolve4 = promisify(dns.resolve4);
const dnsResolveMx = promisify(dns.resolveMx);
const dnsResolveTxt = promisify(dns.resolveTxt);
const dnsResolveNs = promisify(dns.resolveNs);

export const networkTools = [
  {
    name: 'dns_lookup',
    description: '🌐 Network tool: resolves DNS records for a domain. Makes a DNS query to resolve A, MX, TXT, and NS records.',
    inputSchema: {
      type: 'object',
      properties: {
        domain: { type: 'string', description: 'Domain name to look up (e.g. example.com)' },
        record_type: { type: 'string', enum: ['A', 'MX', 'TXT', 'NS', 'all'], description: 'DNS record type to query', default: 'all' }
      },
      required: ['domain']
    }
  },
  {
    name: 'http_header_checker',
    description: '🌐 Network tool: fetches HTTP response headers from any URL. Makes an HTTP HEAD request to the target URL.',
    inputSchema: {
      type: 'object',
      properties: {
        url: { type: 'string', description: 'Full URL to check headers for (e.g. https://example.com)' }
      },
      required: ['url']
    }
  },
  {
    name: 'website_status_checker',
    description: '🌐 Network tool: checks if a website is up or down. Makes an HTTP request to the target URL.',
    inputSchema: {
      type: 'object',
      properties: {
        url: { type: 'string', description: 'Website URL to check (e.g. https://example.com)' }
      },
      required: ['url']
    }
  },
  {
    name: 'ip_address_lookup',
    description: '🌐 Network tool: resolves a hostname to its IP address, or looks up geolocation for an IP. Makes a DNS query and optional geolocation API call.',
    inputSchema: {
      type: 'object',
      properties: {
        input: { type: 'string', description: 'Hostname (e.g. google.com) or IP address to look up' }
      },
      required: ['input']
    }
  },
  {
    name: 'open_graph_preview',
    description: '🌐 Network tool: fetches a URL and extracts Open Graph and Twitter Card meta tags for social sharing preview.',
    inputSchema: {
      type: 'object',
      properties: {
        url: { type: 'string', description: 'URL to fetch OG and Twitter Card data from' }
      },
      required: ['url']
    }
  }
];

export async function runNetwork(name: string, args: Record<string, unknown>): Promise<string> {
  switch (name) {
    case 'dns_lookup': return dnsLookupTool(args);
    case 'http_header_checker': return httpHeaderChecker(args);
    case 'website_status_checker': return websiteStatus(args);
    case 'ip_address_lookup': return ipLookup(args);
    case 'open_graph_preview': return ogPreview(args);
    default: return 'Unknown tool';
  }
}

function httpsGet(url: string, method = 'GET', timeout = 8000): Promise<{ status: number; headers: Record<string, string | string[]>; body: string }> {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const options = { hostname: parsed.hostname, path: parsed.pathname + parsed.search, method, timeout, headers: { 'User-Agent': 'alliotools-mcp/1.0' } };
    const req = https.request(options, res => {
      let body = '';
      res.on('data', chunk => { if (body.length < 50000) body += chunk; });
      res.on('end', () => resolve({ status: res.statusCode || 0, headers: res.headers as Record<string, string | string[]>, body }));
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('Request timed out')); });
    req.end();
  });
}

async function dnsLookupTool(args: Record<string, unknown>): Promise<string> {
  const { domain, record_type = 'all' } = args as { domain: string; record_type?: string };
  const d = domain.replace(/^https?:\/\//, '').split('/')[0];
  const results: string[] = [`DNS records for: ${d}`, ``];

  try {
    if (record_type === 'A' || record_type === 'all') {
      const addrs = await dnsResolve4(d).catch(() => [] as string[]);
      results.push(`A records: ${addrs.length ? addrs.join(', ') : 'none'}`);
    }
    if (record_type === 'MX' || record_type === 'all') {
      const mx = await dnsResolveMx(d).catch(() => [] as dns.MxRecord[]);
      results.push(`MX records: ${mx.length ? mx.sort((a,b)=>a.priority-b.priority).map(r=>`${r.exchange} (priority ${r.priority})`).join(', ') : 'none'}`);
    }
    if (record_type === 'TXT' || record_type === 'all') {
      const txt = await dnsResolveTxt(d).catch(() => [] as string[][]);
      results.push(`TXT records: ${txt.length ? txt.map(r=>r.join('')).join(' | ') : 'none'}`);
    }
    if (record_type === 'NS' || record_type === 'all') {
      const ns = await dnsResolveNs(d).catch(() => [] as string[]);
      results.push(`NS records: ${ns.length ? ns.join(', ') : 'none'}`);
    }
  } catch (e) {
    return `DNS lookup failed for "${d}": ${(e as Error).message}`;
  }

  return results.join('\n');
}

async function httpHeaderChecker(args: Record<string, unknown>): Promise<string> {
  const { url } = args as { url: string };
  try {
    const { status, headers } = await httpsGet(url, 'HEAD');
    const important = ['content-type','cache-control','x-frame-options','strict-transport-security',
      'x-content-type-options','content-security-policy','server','x-powered-by','location',
      'access-control-allow-origin','last-modified','etag'];

    const lines = [`URL: ${url}`, `Status: ${status}`, ``];
    important.forEach(h => {
      if (headers[h]) lines.push(`${h}: ${headers[h]}`);
    });
    const other = Object.keys(headers).filter(h => !important.includes(h));
    if (other.length) { lines.push('', 'Other headers:'); other.forEach(h => lines.push(`${h}: ${headers[h]}`)); }
    return lines.join('\n');
  } catch (e) {
    return `Error fetching headers for "${url}": ${(e as Error).message}`;
  }
}

async function websiteStatus(args: Record<string, unknown>): Promise<string> {
  const { url } = args as { url: string };
  const start = Date.now();
  try {
    const { status, headers } = await httpsGet(url, 'HEAD');
    const elapsed = Date.now() - start;
    const isUp = status >= 200 && status < 400;
    return [
      `URL: ${url}`,
      `Status: ${isUp ? '✓ UP' : '✗ DOWN'} (HTTP ${status})`,
      `Response time: ${elapsed}ms`,
      headers.server ? `Server: ${headers.server}` : null,
      headers['content-type'] ? `Content-Type: ${headers['content-type']}` : null
    ].filter(Boolean).join('\n');
  } catch (e) {
    const elapsed = Date.now() - start;
    return `URL: ${url}\nStatus: ✗ UNREACHABLE\nError: ${(e as Error).message}\nTime: ${elapsed}ms`;
  }
}

async function ipLookup(args: Record<string, unknown>): Promise<string> {
  const { input } = args as { input: string };
  const clean = input.trim().replace(/^https?:\/\//, '').split('/')[0];
  const isIP = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(clean);

  try {
    let ip = clean;
    if (!isIP) {
      const result = await dnsLookup(clean);
      ip = result.address;
    }

    const lines = [isIP ? `IP: ${ip}` : `Hostname: ${clean}\nIP: ${ip}`];

    // Try ip-api.com (free, no key needed)
    try {
      const geo = await httpsGet(`https://ip-api.com/json/${ip}?fields=country,regionName,city,isp,org,as,query`);
      const data = JSON.parse(geo.body);
      if (data.country) {
        lines.push('', `Country: ${data.country}`, `Region: ${data.regionName}`, `City: ${data.city}`, `ISP: ${data.isp}`, `Org: ${data.org}`);
      }
    } catch {
      lines.push('(Geolocation unavailable)');
    }

    return lines.join('\n');
  } catch (e) {
    return `Lookup failed for "${clean}": ${(e as Error).message}`;
  }
}

async function ogPreview(args: Record<string, unknown>): Promise<string> {
  const { url } = args as { url: string };
  try {
    const { status, body } = await httpsGet(url);
    if (status !== 200) return `HTTP ${status} — could not fetch ${url}`;

    const extract = (prop: string): string => {
      const m = body.match(new RegExp(`<meta[^>]+(?:property|name)=["']${prop}["'][^>]+content=["']([^"']+)["']`, 'i'))
        || body.match(new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${prop}["']`, 'i'));
      return m ? m[1] : '';
    };

    const title = extract('og:title') || body.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1] || '';
    const desc = extract('og:description') || extract('description');
    const image = extract('og:image');
    const siteName = extract('og:site_name');
    const ogType = extract('og:type');
    const twitterCard = extract('twitter:card');
    const twitterTitle = extract('twitter:title');
    const twitterDesc = extract('twitter:description');
    const twitterImage = extract('twitter:image');

    const lines = [`URL: ${url}`, ``];
    if (title) lines.push(`og:title: ${title}`);
    if (desc) lines.push(`og:description: ${desc.slice(0,200)}${desc.length>200?'...':''}`);
    if (image) lines.push(`og:image: ${image}`);
    if (siteName) lines.push(`og:site_name: ${siteName}`);
    if (ogType) lines.push(`og:type: ${ogType}`);
    if (twitterCard) { lines.push('', `twitter:card: ${twitterCard}`); }
    if (twitterTitle) lines.push(`twitter:title: ${twitterTitle}`);
    if (twitterDesc) lines.push(`twitter:description: ${twitterDesc.slice(0,200)}`);
    if (twitterImage) lines.push(`twitter:image: ${twitterImage}`);

    if (lines.length <= 2) return `No Open Graph or Twitter Card meta tags found at ${url}`;
    return lines.join('\n');
  } catch (e) {
    return `Error fetching "${url}": ${(e as Error).message}`;
  }
}
