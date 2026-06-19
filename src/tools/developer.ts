// Developer tools — all run locally, zero network calls
import { createHash, randomUUID } from 'crypto';

export const developerTools = [
  {
    name: 'base64_encode_decode',
    description: 'Encode text to Base64 or decode Base64 back to text.',
    inputSchema: {
      type: 'object',
      properties: {
        input: { type: 'string', description: 'Text to encode or Base64 string to decode' },
        mode: { type: 'string', enum: ['encode', 'decode'], description: 'encode or decode' }
      },
      required: ['input', 'mode']
    }
  },
  {
    name: 'hash_generator',
    description: 'Generate MD5, SHA-1, SHA-256, SHA-384, or SHA-512 hash of any text.',
    inputSchema: {
      type: 'object',
      properties: {
        text: { type: 'string', description: 'Text to hash' },
        algorithm: { type: 'string', enum: ['md5', 'sha1', 'sha256', 'sha384', 'sha512'], description: 'Hash algorithm', default: 'sha256' }
      },
      required: ['text']
    }
  },
  {
    name: 'uuid_generator',
    description: 'Generate one or more UUIDs (v4, cryptographically random).',
    inputSchema: {
      type: 'object',
      properties: {
        count: { type: 'number', description: 'Number of UUIDs to generate (1–100)', default: 1 },
        uppercase: { type: 'boolean', description: 'Return UUIDs in uppercase', default: false }
      }
    }
  },
  {
    name: 'json_formatter',
    description: 'Format, validate, and minify JSON. Returns pretty-printed JSON or a minified version.',
    inputSchema: {
      type: 'object',
      properties: {
        json: { type: 'string', description: 'JSON string to format or minify' },
        mode: { type: 'string', enum: ['format', 'minify', 'validate'], description: 'format = pretty-print | minify = compact | validate = check validity only', default: 'format' },
        indent: { type: 'number', description: 'Indent spaces for format mode', default: 2 }
      },
      required: ['json']
    }
  },
  {
    name: 'url_encoder_decoder',
    description: 'Encode or decode URL components and full URLs.',
    inputSchema: {
      type: 'object',
      properties: {
        input: { type: 'string', description: 'URL or string to encode/decode' },
        mode: { type: 'string', enum: ['encode', 'decode', 'encode_component', 'decode_component'], description: 'encode/decode = full URL | encode_component/decode_component = URL component only' }
      },
      required: ['input', 'mode']
    }
  },
  {
    name: 'html_encoder_decoder',
    description: 'Encode special characters to HTML entities or decode HTML entities back to characters.',
    inputSchema: {
      type: 'object',
      properties: {
        input: { type: 'string', description: 'Text or HTML to encode/decode' },
        mode: { type: 'string', enum: ['encode', 'decode'] }
      },
      required: ['input', 'mode']
    }
  },
  {
    name: 'regex_tester',
    description: 'Test a regular expression against text. Returns all matches, groups, and match positions.',
    inputSchema: {
      type: 'object',
      properties: {
        pattern: { type: 'string', description: 'Regular expression pattern (without delimiters)' },
        text: { type: 'string', description: 'Text to test against' },
        flags: { type: 'string', description: 'Regex flags: g=global, i=case-insensitive, m=multiline, s=dotAll', default: 'g' }
      },
      required: ['pattern', 'text']
    }
  },
  {
    name: 'jwt_decoder',
    description: 'Decode a JWT token and display its header, payload, and expiry status. Does not verify signature.',
    inputSchema: {
      type: 'object',
      properties: {
        token: { type: 'string', description: 'JWT token string (Bearer prefix optional)' }
      },
      required: ['token']
    }
  },
  {
    name: 'timestamp_converter',
    description: 'Convert Unix timestamps to human-readable dates and vice versa.',
    inputSchema: {
      type: 'object',
      properties: {
        input: { type: 'string', description: 'Unix timestamp (seconds or ms) OR a date string like "2024-01-15 09:30:00"' },
        timezone: { type: 'string', description: 'IANA timezone name e.g. "America/New_York", "Europe/London" (default: UTC)' }
      },
      required: ['input']
    }
  },
  {
    name: 'sql_formatter',
    description: 'Format and beautify SQL queries with proper indentation and keyword casing.',
    inputSchema: {
      type: 'object',
      properties: {
        sql: { type: 'string', description: 'SQL query to format' },
        keyword_case: { type: 'string', enum: ['upper', 'lower'], description: 'Keyword casing', default: 'upper' }
      },
      required: ['sql']
    }
  },
  {
    name: 'text_minifier',
    description: 'Minify CSS, JavaScript, or HTML by removing whitespace and comments.',
    inputSchema: {
      type: 'object',
      properties: {
        code: { type: 'string', description: 'Code to minify' },
        type: { type: 'string', enum: ['css', 'js', 'html'], description: 'Type of code' }
      },
      required: ['code', 'type']
    }
  },
  {
    name: 'hex_rgb_converter',
    description: 'Convert between HEX color codes and RGB values.',
    inputSchema: {
      type: 'object',
      properties: {
        input: { type: 'string', description: 'HEX color (#FF5733) or RGB (255, 87, 51)' }
      },
      required: ['input']
    }
  },
  {
    name: 'cron_parser',
    description: 'Parse a cron expression into plain English and show the next 5 execution times.',
    inputSchema: {
      type: 'object',
      properties: {
        expression: { type: 'string', description: 'Cron expression (5 or 6 fields, e.g. "0 9 * * 1-5")' }
      },
      required: ['expression']
    }
  },
  {
    name: 'json_to_yaml',
    description: 'Convert a JSON string to YAML format.',
    inputSchema: {
      type: 'object',
      properties: {
        json: { type: 'string', description: 'JSON string to convert to YAML' }
      },
      required: ['json']
    }
  },
  {
    name: 'yaml_to_json',
    description: 'Convert a basic YAML document to JSON format.',
    inputSchema: {
      type: 'object',
      properties: {
        yaml: { type: 'string', description: 'YAML string to convert to JSON' }
      },
      required: ['yaml']
    }
  },
  {
    name: 'xml_formatter',
    description: 'Format or minify XML. Pretty-prints with configurable indent or strips all whitespace between tags.',
    inputSchema: {
      type: 'object',
      properties: {
        xml: { type: 'string', description: 'XML string to format or minify' },
        indent: { type: 'number', description: 'Number of spaces for indentation (format mode)', default: 2 },
        mode: { type: 'string', enum: ['format', 'minify'], description: 'format = pretty-print | minify = compact', default: 'format' }
      },
      required: ['xml']
    }
  },
  {
    name: 'meta_tag_generator',
    description: 'Generate HTML meta tags including Open Graph and Twitter Card tags ready to paste into <head>.',
    inputSchema: {
      type: 'object',
      properties: {
        title: { type: 'string', description: 'Page title' },
        description: { type: 'string', description: 'Page description (keep under 160 characters)' },
        url: { type: 'string', description: 'Canonical page URL (optional)' },
        image: { type: 'string', description: 'Open Graph / Twitter image URL (optional)' },
        type: { type: 'string', description: 'Open Graph type (website, article, product, etc.)', default: 'website' },
        twitter_handle: { type: 'string', description: 'Twitter/X handle, e.g. @mysite (optional)' }
      },
      required: ['title', 'description']
    }
  },
  {
    name: 'robots_txt_generator',
    description: 'Generate a robots.txt file from crawl rules for one or more user agents.',
    inputSchema: {
      type: 'object',
      properties: {
        rules: {
          type: 'array',
          description: 'Array of crawl rule objects',
          items: {
            type: 'object',
            properties: {
              user_agent: { type: 'string', description: 'User agent name (use * for all)' },
              allow: { type: 'array', items: { type: 'string' }, description: 'Paths to allow' },
              disallow: { type: 'array', items: { type: 'string' }, description: 'Paths to disallow' }
            },
            required: ['user_agent']
          }
        },
        sitemap: { type: 'string', description: 'Full URL to sitemap.xml (optional)' }
      },
      required: ['rules']
    }
  },
  {
    name: 'email_validator',
    description: 'Validate an email address format and identify specific issues. No network calls — format check only.',
    inputSchema: {
      type: 'object',
      properties: {
        email: { type: 'string', description: 'Email address to validate' }
      },
      required: ['email']
    }
  },
  {
    name: 'subnet_calculator',
    description: 'Calculate subnet details from a CIDR notation: network/broadcast addresses, usable host range, masks, and binary representation.',
    inputSchema: {
      type: 'object',
      properties: {
        cidr: { type: 'string', description: 'CIDR notation, e.g. "192.168.1.0/24" or "10.0.0.0/8"' }
      },
      required: ['cidr']
    }
  },
  {
    name: 'utm_builder',
    description: 'Build a UTM-tagged URL for campaign tracking. Appends utm_source, utm_medium, utm_campaign, and optionally utm_term and utm_content.',
    inputSchema: {
      type: 'object',
      properties: {
        base_url: { type: 'string', description: 'The destination URL without UTM parameters' },
        source: { type: 'string', description: 'Traffic source (e.g. google, newsletter, twitter)' },
        medium: { type: 'string', description: 'Marketing medium (e.g. cpc, email, social)' },
        campaign: { type: 'string', description: 'Campaign name (e.g. spring_sale, product_launch)' },
        term: { type: 'string', description: 'Paid keyword term (optional)' },
        content: { type: 'string', description: 'Ad content identifier for A/B testing (optional)' }
      },
      required: ['base_url', 'source', 'medium', 'campaign']
    }
  }
];

export function runDeveloper(name: string, args: Record<string, unknown>): string {
  switch (name) {
    case 'base64_encode_decode': return base64Tool(args);
    case 'hash_generator': return hashGenerator(args);
    case 'uuid_generator': return uuidGenerator(args);
    case 'json_formatter': return jsonFormatter(args);
    case 'url_encoder_decoder': return urlTool(args);
    case 'html_encoder_decoder': return htmlTool(args);
    case 'regex_tester': return regexTester(args);
    case 'jwt_decoder': return jwtDecoder(args);
    case 'timestamp_converter': return timestampConverter(args);
    case 'sql_formatter': return sqlFormatter(args);
    case 'text_minifier': return textMinifier(args);
    case 'hex_rgb_converter': return hexRgbConverter(args);
    case 'cron_parser': return cronParser(args);
    case 'json_to_yaml': return jsonToYaml(args);
    case 'yaml_to_json': return yamlToJson(args);
    case 'xml_formatter': return xmlFormatter(args);
    case 'meta_tag_generator': return metaTagGenerator(args);
    case 'robots_txt_generator': return robotsTxtGenerator(args);
    case 'email_validator': return emailValidator(args);
    case 'subnet_calculator': return subnetCalculator(args);
    case 'utm_builder': return utmBuilder(args);
    default: return 'Unknown tool';
  }
}

function base64Tool(args: Record<string, unknown>): string {
  const { input, mode } = args as { input: string; mode: string };
  try {
    if (mode === 'encode') {
      const encoded = Buffer.from(input, 'utf8').toString('base64');
      return `Encoded:\n${encoded}`;
    } else {
      const decoded = Buffer.from(input.replace(/\s/g,''), 'base64').toString('utf8');
      return `Decoded:\n${decoded}`;
    }
  } catch {
    return `Error: Invalid input for ${mode} operation.`;
  }
}

function hashGenerator(args: Record<string, unknown>): string {
  const { text, algorithm = 'sha256' } = args as { text: string; algorithm?: string };
  try {
    const alg = algorithm === 'md5' ? 'md5' : algorithm === 'sha1' ? 'sha1' : algorithm as string;
    const hash = createHash(alg).update(text, 'utf8').digest('hex');
    return `Algorithm: ${algorithm.toUpperCase()}\nInput: "${text.length > 60 ? text.substring(0,60)+'...' : text}"\nHash: ${hash}`;
  } catch {
    return `Error: Unsupported algorithm "${algorithm}". Use: md5, sha1, sha256, sha384, sha512`;
  }
}

function uuidGenerator(args: Record<string, unknown>): string {
  const { count = 1, uppercase = false } = args as { count?: number; uppercase?: boolean };
  const n = Math.min(Math.max(1, Math.round(count as number)), 100);
  const uuids = Array.from({ length: n }, () => {
    const id = randomUUID();
    return uppercase ? id.toUpperCase() : id;
  });
  return uuids.join('\n');
}

function jsonFormatter(args: Record<string, unknown>): string {
  const { json, mode = 'format', indent = 2 } = args as { json: string; mode?: string; indent?: number };
  try {
    const parsed = JSON.parse(json);
    if (mode === 'validate') {
      const keys = typeof parsed === 'object' && parsed !== null ? Object.keys(parsed).length : 0;
      return `✓ Valid JSON\nType: ${Array.isArray(parsed) ? 'array' : typeof parsed}${typeof parsed === 'object' && parsed !== null ? `\nTop-level keys: ${keys}` : ''}`;
    }
    if (mode === 'minify') return JSON.stringify(parsed);
    return JSON.stringify(parsed, null, indent as number);
  } catch (e) {
    return `✗ Invalid JSON: ${(e as Error).message}`;
  }
}

function urlTool(args: Record<string, unknown>): string {
  const { input, mode } = args as { input: string; mode: string };
  try {
    switch (mode) {
      case 'encode': return `Encoded:\n${encodeURI(input)}`;
      case 'decode': return `Decoded:\n${decodeURI(input)}`;
      case 'encode_component': return `Encoded component:\n${encodeURIComponent(input)}`;
      case 'decode_component': return `Decoded component:\n${decodeURIComponent(input)}`;
      default: return 'Invalid mode';
    }
  } catch (e) {
    return `Error: ${(e as Error).message}`;
  }
}

function htmlTool(args: Record<string, unknown>): string {
  const { input, mode } = args as { input: string; mode: string };
  if (mode === 'encode') {
    const result = input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
    return `Encoded:\n${result}`;
  } else {
    const result = input
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&#(\d+);/g, (_,n) => String.fromCharCode(parseInt(n)))
      .replace(/&nbsp;/g, ' ');
    return `Decoded:\n${result}`;
  }
}

function regexTester(args: Record<string, unknown>): string {
  const { pattern, text, flags = 'g' } = args as { pattern: string; text: string; flags?: string };
  try {
    const regex = new RegExp(pattern, flags as string);
    const matches: RegExpExecArray[] = [];
    if ((flags as string).includes('g')) {
      let m: RegExpExecArray | null;
      while ((m = regex.exec(text)) !== null) { matches.push(m); if (!regex.global) break; }
    } else {
      const m = regex.exec(text);
      if (m) matches.push(m);
    }

    if (matches.length === 0) return `Pattern: /${pattern}/${flags}\nResult: No matches found`;

    const lines = [`Pattern: /${pattern}/${flags}`, `Matches: ${matches.length}`, ``];
    matches.slice(0, 20).forEach((m, i) => {
      lines.push(`Match ${i+1}: "${m[0]}" at index ${m.index}`);
      if (m.length > 1) {
        m.slice(1).forEach((g, gi) => lines.push(`  Group ${gi+1}: ${g === undefined ? '(unmatched)' : `"${g}"`}`));
      }
    });
    if (matches.length > 20) lines.push(`... and ${matches.length - 20} more matches`);
    return lines.join('\n');
  } catch (e) {
    return `Invalid regex: ${(e as Error).message}`;
  }
}

function jwtDecoder(args: Record<string, unknown>): string {
  const { token } = args as { token: string };
  const clean = token.trim().replace(/^Bearer\s+/i, '');
  const parts = clean.split('.');
  if (parts.length !== 3) return 'Invalid JWT: must have exactly 3 parts (header.payload.signature)';

  try {
    const header = JSON.parse(Buffer.from(parts[0], 'base64url').toString('utf8'));
    const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf8'));
    const now = Math.floor(Date.now() / 1000);

    const lines = [
      '─── HEADER ───',
      JSON.stringify(header, null, 2),
      '',
      '─── PAYLOAD ───',
      JSON.stringify(payload, null, 2),
      '',
      '─── STATUS ───',
      payload.exp ? (payload.exp < now
        ? `✗ EXPIRED — expired ${new Date(payload.exp * 1000).toISOString()}`
        : `✓ Valid until ${new Date(payload.exp * 1000).toISOString()}`)
        : 'No expiry (exp claim absent)',
      payload.iat ? `Issued at: ${new Date(payload.iat * 1000).toISOString()}` : null,
      payload.iss ? `Issuer: ${payload.iss}` : null,
      payload.sub ? `Subject: ${payload.sub}` : null,
      '',
      '⚠ Signature not verified — decode only'
    ];
    return lines.filter(l => l !== null).join('\n');
  } catch {
    return 'Error decoding JWT: malformed base64 or JSON in token.';
  }
}

function timestampConverter(args: Record<string, unknown>): string {
  const { input, timezone = 'UTC' } = args as { input: string; timezone?: string };
  const s = input.trim();

  if (/^\d{10}$/.test(s)) {
    const d = new Date(parseInt(s) * 1000);
    return formatTimestampResult(d, 'seconds', timezone as string);
  }
  if (/^\d{13}$/.test(s)) {
    const d = new Date(parseInt(s));
    return formatTimestampResult(d, 'milliseconds', timezone as string);
  }

  const d = new Date(s);
  if (isNaN(d.getTime())) return `Cannot parse: "${s}". Use a Unix timestamp (10 or 13 digits) or ISO date string.`;

  return [
    `Input: ${s}`,
    `Unix timestamp (seconds): ${Math.floor(d.getTime() / 1000)}`,
    `Unix timestamp (ms): ${d.getTime()}`,
    `ISO 8601: ${d.toISOString()}`,
    `UTC: ${d.toUTCString()}`
  ].join('\n');
}

function formatTimestampResult(d: Date, unit: string, tz: string): string {
  try {
    const local = d.toLocaleString('en-US', { timeZone: tz, dateStyle: 'full', timeStyle: 'long' });
    return [
      `Unix timestamp (${unit}): ${unit === 'seconds' ? Math.floor(d.getTime()/1000) : d.getTime()}`,
      `ISO 8601: ${d.toISOString()}`,
      `UTC: ${d.toUTCString()}`,
      `${tz}: ${local}`
    ].join('\n');
  } catch {
    return [`Unix timestamp: ${Math.floor(d.getTime()/1000)}`, `ISO 8601: ${d.toISOString()}`, `UTC: ${d.toUTCString()}`].join('\n');
  }
}

function sqlFormatter(args: Record<string, unknown>): string {
  const { sql, keyword_case = 'upper' } = args as { sql: string; keyword_case?: string };
  const keywords = ['SELECT','FROM','WHERE','JOIN','LEFT JOIN','RIGHT JOIN','INNER JOIN',
    'OUTER JOIN','CROSS JOIN','ON','AND','OR','NOT','IN','IS','NULL','LIKE','BETWEEN',
    'GROUP BY','ORDER BY','HAVING','LIMIT','OFFSET','INSERT INTO','VALUES','UPDATE','SET',
    'DELETE FROM','CREATE TABLE','ALTER TABLE','DROP TABLE','INDEX','DISTINCT','AS',
    'UNION','UNION ALL','EXCEPT','INTERSECT','CASE','WHEN','THEN','ELSE','END'];

  let result = sql.trim();
  keywords.forEach(kw => {
    const re = new RegExp(`\\b${kw.replace(/ /g,'\\s+')}\\b`, 'gi');
    result = result.replace(re, keyword_case === 'upper' ? kw : kw.toLowerCase());
  });

  // Basic newlines before major clauses
  const majorClauses = keyword_case === 'upper'
    ? ['FROM','WHERE','JOIN','LEFT JOIN','RIGHT JOIN','INNER JOIN','GROUP BY','ORDER BY','HAVING','LIMIT']
    : ['from','where','join','left join','right join','inner join','group by','order by','having','limit'];

  majorClauses.forEach(kw => {
    const re = new RegExp(`\\s+${kw.replace(/ /g,'\\s+')}\\b`, 'gi');
    result = result.replace(re, `\n${kw}`);
  });

  return result.trim();
}

function textMinifier(args: Record<string, unknown>): string {
  const { code, type } = args as { code: string; type: string };
  let result: string;
  const before = code.length;

  if (type === 'css') {
    result = code
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\s*([{}:;,>~+])\s*/g, '$1')
      .replace(/\s+/g, ' ')
      .trim();
  } else if (type === 'js') {
    result = code
      .replace(/\/\/[^\n]*/g, '')
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\s+/g, ' ')
      .replace(/\s*([{}();,=+\-*/<>!&|?:])\s*/g, '$1')
      .trim();
  } else if (type === 'html') {
    result = code
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/\s+/g, ' ')
      .replace(/>\s+</g, '><')
      .trim();
  } else {
    return 'Unknown type. Use: css, js, html';
  }

  const after = result.length;
  const savings = (((before - after) / before) * 100).toFixed(1);
  return `Minified (${type.toUpperCase()}):\n${result}\n\n─── Stats ───\nOriginal: ${before} chars\nMinified: ${after} chars\nReduction: ${savings}%`;
}

function hexRgbConverter(args: Record<string, unknown>): string {
  const { input } = args as { input: string };
  const s = input.trim();

  if (/^#?[0-9a-f]{3,6}$/i.test(s)) {
    const hex = s.replace('#','');
    const full = hex.length === 3 ? hex.split('').map(c=>c+c).join('') : hex;
    const r = parseInt(full.slice(0,2),16);
    const g = parseInt(full.slice(2,4),16);
    const b = parseInt(full.slice(4,6),16);
    return `HEX: #${full.toUpperCase()}\nRGB: rgb(${r}, ${g}, ${b})\nRGB values: R=${r} G=${g} B=${b}`;
  }

  const m = s.match(/(\d+)[,\s]+(\d+)[,\s]+(\d+)/);
  if (m) {
    const [r,g,b] = [parseInt(m[1]),parseInt(m[2]),parseInt(m[3])];
    const hex = [r,g,b].map(v=>Math.min(255,v).toString(16).padStart(2,'0')).join('').toUpperCase();
    return `RGB: rgb(${r}, ${g}, ${b})\nHEX: #${hex}`;
  }

  return 'Cannot parse. Use: #FF5733 or 255, 87, 51';
}

function cronParser(args: Record<string, unknown>): string {
  const { expression } = args as { expression: string };
  const parts = expression.trim().split(/\s+/);

  if (parts.length < 5 || parts.length > 6) {
    return 'Invalid cron: must have 5 fields (min hour dom month dow) or 6 fields (sec min hour dom month dow)';
  }

  const offset = parts.length === 6 ? 1 : 0;
  const [min, hour, dom, month, dow] = parts.slice(offset);

  const describe = (val: string, unit: string, names?: string[]) => {
    if (val === '*') return `every ${unit}`;
    if (val.startsWith('*/')) return `every ${val.slice(2)} ${unit}s`;
    if (val.includes('-')) {
      const [a,b] = val.split('-');
      return `${unit}s ${names ? names[parseInt(a)] : a}–${names ? names[parseInt(b)] : b}`;
    }
    if (val.includes(',')) {
      const list = val.split(',').map(v => names ? (names[parseInt(v)] || v) : v);
      return `${unit}s ${list.join(', ')}`;
    }
    return names && !isNaN(parseInt(val)) ? `${unit} ${names[parseInt(val)]}` : `${unit} ${val}`;
  };

  const months = ['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  const parts6 = parts.length === 6 ? `Second ${parts[0]}, ` : '';
  const desc = `${parts6}${describe(min,'minute')} past ${describe(hour,'hour')}, on ${describe(dom,'day-of-month')}, in ${describe(month,'month',months)}, on ${describe(dow,'day-of-week',days)}`;

  // Next 5 run times (approximate — does not handle all edge cases)
  const now = new Date();
  const nextRuns: string[] = [];
  const candidate = new Date(now);
  candidate.setSeconds(0,0);
  candidate.setMinutes(candidate.getMinutes() + 1);

  let tries = 0;
  while (nextRuns.length < 5 && tries < 100000) {
    tries++;
    if (matchesCron(candidate, min, hour, dom, month, dow)) {
      nextRuns.push(candidate.toISOString().replace('T',' ').slice(0,16) + ' UTC');
    }
    candidate.setMinutes(candidate.getMinutes() + 1);
  }

  return [
    `Expression: ${expression}`,
    `Meaning: ${desc}`,
    ``,
    `Next 5 executions (UTC):`,
    ...nextRuns.map((r,i) => `${i+1}. ${r}`)
  ].join('\n');
}

function matchesCron(d: Date, min: string, hour: string, dom: string, month: string, dow: string): boolean {
  const match = (val: string, actual: number, max: number): boolean => {
    if (val === '*') return true;
    if (val.startsWith('*/')) return actual % parseInt(val.slice(2)) === 0;
    if (val.includes('-')) { const [a,b]=val.split('-').map(Number); return actual>=a&&actual<=b; }
    if (val.includes(',')) return val.split(',').map(Number).includes(actual);
    return parseInt(val) === actual;
  };
  return match(min,d.getUTCMinutes(),59) && match(hour,d.getUTCHours(),23) &&
    match(dom,d.getUTCDate(),31) && match(month,d.getUTCMonth()+1,12) &&
    match(dow,d.getUTCDay(),6);
}

// ─── NEW TOOLS ───────────────────────────────────────────────────────────────

function yamlNeedsQuotes(s: string): boolean {
  // Quote if contains special YAML characters or looks like another type
  if (s === '') return true;
  if (/^(true|false|null|yes|no|on|off)$/i.test(s)) return true;
  if (/^-?\d/.test(s) && !isNaN(Number(s))) return true;
  if (/[:#{}\[\],&*?|\-<>=!%@`]/.test(s)) return true;
  if (/^\s|\s$/.test(s)) return true;
  return false;
}

function valueToYaml(value: unknown, indent: number): string {
  const pad = ' '.repeat(indent);

  if (value === null) return 'null';
  if (typeof value === 'boolean') return value ? 'true' : 'false';
  if (typeof value === 'number') return String(value);

  if (typeof value === 'string') {
    if (yamlNeedsQuotes(value)) {
      return `"${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
    }
    return value;
  }

  if (Array.isArray(value)) {
    if (value.length === 0) return '[]';
    return '\n' + value.map(item => {
      const rendered = valueToYaml(item, indent + 2);
      if (rendered.startsWith('\n')) {
        // nested object/array
        return `${pad}- ${rendered.trimStart()}`;
      }
      return `${pad}- ${rendered}`;
    }).join('\n');
  }

  if (typeof value === 'object' && value !== null) {
    const obj = value as Record<string, unknown>;
    const keys = Object.keys(obj);
    if (keys.length === 0) return '{}';
    return '\n' + keys.map(key => {
      const rendered = valueToYaml(obj[key], indent + 2);
      if (rendered.startsWith('\n')) {
        return `${pad}${key}:${rendered}`;
      }
      return `${pad}${key}: ${rendered}`;
    }).join('\n');
  }

  return String(value);
}

function jsonToYaml(args: Record<string, unknown>): string {
  const { json } = args as { json: string };
  try {
    const parsed = JSON.parse(json);
    if (Array.isArray(parsed)) {
      const lines = parsed.map(item => {
        const rendered = valueToYaml(item, 2);
        if (rendered.startsWith('\n')) {
          return `- ${rendered.trimStart()}`;
        }
        return `- ${rendered}`;
      });
      return lines.join('\n');
    }
    if (typeof parsed === 'object' && parsed !== null) {
      const obj = parsed as Record<string, unknown>;
      const lines = Object.keys(obj).map(key => {
        const rendered = valueToYaml(obj[key], 2);
        if (rendered.startsWith('\n')) {
          return `${key}:${rendered}`;
        }
        return `${key}: ${rendered}`;
      });
      return lines.join('\n');
    }
    // Scalar root
    return valueToYaml(parsed, 0);
  } catch (e) {
    return `Error: Invalid JSON — ${(e as Error).message}`;
  }
}

function parseYamlValue(raw: string): unknown {
  const s = raw.trim();
  if (s === 'null' || s === '~') return null;
  if (s === 'true' || s === 'yes' || s === 'on') return true;
  if (s === 'false' || s === 'no' || s === 'off') return false;
  if (s !== '' && !isNaN(Number(s))) return Number(s);
  // Quoted string
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    return s.slice(1, -1);
  }
  return s;
}

function yamlToJson(args: Record<string, unknown>): string {
  const { yaml } = args as { yaml: string };
  try {
    const lines = yaml.split('\n');
    // Remove document separator and trailing comments
    const cleaned = lines.filter(l => l.trim() !== '---' && l.trim() !== '...' && !l.trim().startsWith('#'));

    // Build indented structure
    type YamlNode = Record<string, unknown> | unknown[];
    const stack: Array<{ indent: number; obj: YamlNode; key?: string }> = [];
    let root: unknown = undefined;

    const getParent = (): YamlNode | undefined => stack.length > 0 ? stack[stack.length - 1].obj : undefined;

    const assignToParent = (parent: YamlNode | undefined, key: string | undefined, value: unknown) => {
      if (!parent) {
        root = value;
      } else if (Array.isArray(parent)) {
        parent.push(value);
      } else if (key !== undefined) {
        (parent as Record<string, unknown>)[key] = value;
      }
    };

    for (const rawLine of cleaned) {
      if (rawLine.trim() === '') continue;

      const indent = rawLine.search(/\S/);
      const line = rawLine.trim();

      // Pop stack to current indent level
      while (stack.length > 0 && stack[stack.length - 1].indent >= indent) {
        stack.pop();
      }

      const parent = getParent();

      if (line.startsWith('- ')) {
        // Array item
        const itemRaw = line.slice(2).trim();
        if (!Array.isArray(parent)) {
          // Need to create array
          const arr: unknown[] = [];
          if (stack.length > 0) {
            const top = stack[stack.length - 1];
            if (!Array.isArray(top.obj) && top.key !== undefined) {
              (top.obj as Record<string, unknown>)[top.key] = arr;
            }
          } else {
            root = arr;
          }
          stack.push({ indent, obj: arr });
        }
        const arrParent = getParent() as unknown[];
        if (itemRaw.includes(':')) {
          const colonIdx = itemRaw.indexOf(':');
          const subKey = itemRaw.slice(0, colonIdx).trim();
          const subVal = itemRaw.slice(colonIdx + 1).trim();
          const obj: Record<string, unknown> = {};
          if (subVal !== '') obj[subKey] = parseYamlValue(subVal);
          else obj[subKey] = null;
          arrParent.push(obj);
          stack.push({ indent: indent + 2, obj, key: subKey });
        } else {
          arrParent.push(parseYamlValue(itemRaw));
        }
      } else if (line.includes(':')) {
        const colonIdx = line.indexOf(':');
        const key = line.slice(0, colonIdx).trim();
        const valRaw = line.slice(colonIdx + 1).trim();

        if (valRaw === '' || valRaw === '|' || valRaw === '>') {
          // Nested object ahead
          const obj: Record<string, unknown> = {};
          assignToParent(parent, stack.length > 0 ? stack[stack.length - 1].key : undefined, undefined);
          if (parent && !Array.isArray(parent)) {
            (parent as Record<string, unknown>)[key] = obj;
          } else if (!parent) {
            if (root === undefined) root = {};
            (root as Record<string, unknown>)[key] = obj;
          } else {
            // array parent — shouldn't normally happen here
          }
          if (root === undefined) root = !Array.isArray(parent) && parent ? parent : obj;
          stack.push({ indent, obj: (parent && !Array.isArray(parent) ? parent : (root as Record<string, unknown>)) as YamlNode, key });
          // Push the new nested object
          stack.push({ indent: indent + 2, obj, key });
        } else {
          const value = parseYamlValue(valRaw);
          if (!parent) {
            if (root === undefined) root = {};
            (root as Record<string, unknown>)[key] = value;
            stack.push({ indent, obj: root as YamlNode, key });
          } else if (!Array.isArray(parent)) {
            (parent as Record<string, unknown>)[key] = value;
            stack.push({ indent, obj: parent, key });
          }
        }
      }
    }

    if (root === undefined) root = {};
    return JSON.stringify(root, null, 2);
  } catch (e) {
    return `Error parsing YAML: ${(e as Error).message}`;
  }
}

function xmlFormatter(args: Record<string, unknown>): string {
  const { xml, indent = 2, mode = 'format' } = args as { xml: string; indent?: number; mode?: string };

  if (mode === 'minify') {
    const minified = xml
      .replace(/>\s+</g, '><')
      .replace(/\s+/g, ' ')
      .trim();
    return minified;
  }

  // Format mode: tokenize and re-indent
  const indentStr = ' '.repeat(indent as number);
  const tokens: string[] = [];
  const tokenRe = /(<\?[\s\S]*?\?>|<!--[\s\S]*?-->|<!\[CDATA\[[\s\S]*?\]\]>|<\/[^>]+>|<[^>]+\/>|<[^>]+>|[^<]+)/g;
  let m: RegExpExecArray | null;
  while ((m = tokenRe.exec(xml)) !== null) {
    const tok = m[0].trim();
    if (tok) tokens.push(tok);
  }

  let level = 0;
  const output: string[] = [];

  for (const tok of tokens) {
    if (tok.startsWith('</')) {
      // Closing tag
      level = Math.max(0, level - 1);
      output.push(indentStr.repeat(level) + tok);
    } else if (tok.startsWith('<?') || tok.startsWith('<!--') || tok.startsWith('<![CDATA[')) {
      // Declaration / comment / CDATA
      output.push(indentStr.repeat(level) + tok);
    } else if (tok.startsWith('<') && tok.endsWith('/>')) {
      // Self-closing tag
      output.push(indentStr.repeat(level) + tok);
    } else if (tok.startsWith('<')) {
      // Opening tag
      output.push(indentStr.repeat(level) + tok);
      level++;
    } else {
      // Text content
      output.push(indentStr.repeat(level) + tok);
    }
  }

  return output.join('\n');
}

function metaTagGenerator(args: Record<string, unknown>): string {
  const { title, description, url, image, type = 'website', twitter_handle } =
    args as { title: string; description: string; url?: string; image?: string; type?: string; twitter_handle?: string };

  const lines: string[] = ['<!-- Basic Meta Tags -->'];
  lines.push(`<meta charset="UTF-8">`);
  lines.push(`<meta name="viewport" content="width=device-width, initial-scale=1.0">`);
  lines.push(`<title>${title}</title>`);
  lines.push(`<meta name="description" content="${description}">`);
  if (url) lines.push(`<link rel="canonical" href="${url}">`);

  lines.push('');
  lines.push('<!-- Open Graph Tags -->');
  lines.push(`<meta property="og:title" content="${title}">`);
  lines.push(`<meta property="og:description" content="${description}">`);
  lines.push(`<meta property="og:type" content="${type}">`);
  if (url) lines.push(`<meta property="og:url" content="${url}">`);
  if (image) lines.push(`<meta property="og:image" content="${image}">`);

  lines.push('');
  lines.push('<!-- Twitter Card Tags -->');
  lines.push(`<meta name="twitter:card" content="${image ? 'summary_large_image' : 'summary'}">`);
  lines.push(`<meta name="twitter:title" content="${title}">`);
  lines.push(`<meta name="twitter:description" content="${description}">`);
  if (image) lines.push(`<meta name="twitter:image" content="${image}">`);
  if (twitter_handle) {
    const handle = (twitter_handle as string).startsWith('@') ? twitter_handle : `@${twitter_handle}`;
    lines.push(`<meta name="twitter:site" content="${handle}">`);
  }

  return lines.join('\n');
}

function robotsTxtGenerator(args: Record<string, unknown>): string {
  const { rules, sitemap } = args as {
    rules: Array<{ user_agent: string; allow?: string[]; disallow?: string[] }>;
    sitemap?: string;
  };

  const lines: string[] = [];

  for (const rule of rules) {
    lines.push(`User-agent: ${rule.user_agent}`);
    if (rule.allow && rule.allow.length > 0) {
      for (const path of rule.allow) {
        lines.push(`Allow: ${path}`);
      }
    }
    if (rule.disallow && rule.disallow.length > 0) {
      for (const path of rule.disallow) {
        lines.push(`Disallow: ${path}`);
      }
    } else if (!rule.allow || rule.allow.length === 0) {
      // Default: no disallow means allow all
      lines.push(`Disallow:`);
    }
    lines.push('');
  }

  if (sitemap) {
    lines.push(`Sitemap: ${sitemap}`);
  }

  return lines.join('\n').trimEnd();
}

function emailValidator(args: Record<string, unknown>): string {
  const { email } = args as { email: string };
  const s = email.trim();

  const issues: string[] = [];

  // Count @ signs
  const atCount = (s.match(/@/g) || []).length;
  if (atCount === 0) issues.push('Missing @ symbol');
  if (atCount > 1) issues.push('Multiple @ symbols');

  if (atCount !== 1) {
    return `Invalid: ${issues.join('; ')}\nInput: ${s}`;
  }

  const [local, domain] = s.split('@');

  if (!local || local.length === 0) issues.push('Empty local part (before @)');
  if (local.length > 64) issues.push(`Local part too long (${local.length} chars, max 64)`);
  if (local.startsWith('.')) issues.push('Local part starts with a dot');
  if (local.endsWith('.')) issues.push('Local part ends with a dot');
  if (/\.\./.test(local)) issues.push('Consecutive dots in local part');

  if (!domain || domain.length === 0) issues.push('Empty domain (after @)');
  if (domain && !domain.includes('.')) issues.push('Domain has no dot (no TLD)');
  if (domain && domain.startsWith('.')) issues.push('Domain starts with a dot');
  if (domain && domain.endsWith('.')) issues.push('Domain ends with a dot');
  if (domain && /\.\./.test(domain)) issues.push('Consecutive dots in domain');

  // TLD length check
  if (domain && domain.includes('.')) {
    const tld = domain.split('.').pop() || '';
    if (tld.length < 2) issues.push(`TLD "${tld}" too short (minimum 2 characters)`);
    if (tld.length > 24) issues.push(`TLD "${tld}" suspiciously long`);
    if (!/^[a-zA-Z]+$/.test(tld)) issues.push(`TLD "${tld}" contains non-letter characters`);
  }

  // General format check
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
  const formatValid = emailRegex.test(s);

  if (!formatValid && issues.length === 0) {
    issues.push('Does not match standard email format');
  }

  const tld = domain && domain.includes('.') ? domain.split('.').pop() : '';
  const result = issues.length === 0 ? 'Valid' : 'Invalid';

  const lines = [
    `Result: ${result}`,
    `Input: ${s}`,
    `Local part: ${local || '(empty)'}`,
    `Domain: ${domain || '(empty)'}`,
    `TLD: ${tld || '(none)'}`,
  ];

  if (issues.length > 0) {
    lines.push('');
    lines.push('Issues:');
    issues.forEach(issue => lines.push(`  - ${issue}`));
  }

  return lines.join('\n');
}

function subnetCalculator(args: Record<string, unknown>): string {
  const { cidr } = args as { cidr: string };
  const parts = cidr.trim().split('/');
  if (parts.length !== 2) return 'Error: Use CIDR notation, e.g. "192.168.1.0/24"';

  const ipParts = parts[0].split('.').map(Number);
  const prefix = parseInt(parts[1]);

  if (ipParts.length !== 4 || ipParts.some(p => isNaN(p) || p < 0 || p > 255)) {
    return 'Error: Invalid IP address in CIDR notation';
  }
  if (isNaN(prefix) || prefix < 0 || prefix > 32) {
    return 'Error: Prefix length must be 0–32';
  }

  const ipNum = (ipParts[0] << 24 | ipParts[1] << 16 | ipParts[2] << 8 | ipParts[3]) >>> 0;
  const maskNum = prefix === 0 ? 0 : (0xFFFFFFFF << (32 - prefix)) >>> 0;
  const wildcardNum = (~maskNum) >>> 0;
  const networkNum = (ipNum & maskNum) >>> 0;
  const broadcastNum = (networkNum | wildcardNum) >>> 0;
  const firstHost = prefix < 31 ? (networkNum + 1) >>> 0 : networkNum;
  const lastHost = prefix < 31 ? (broadcastNum - 1) >>> 0 : broadcastNum;
  const totalHosts = Math.pow(2, 32 - prefix);
  const usableHosts = prefix < 31 ? totalHosts - 2 : totalHosts;

  const numToIp = (n: number) => [
    (n >>> 24) & 0xFF,
    (n >>> 16) & 0xFF,
    (n >>> 8) & 0xFF,
    n & 0xFF
  ].join('.');

  const numToBin = (n: number) => [
    ((n >>> 24) & 0xFF).toString(2).padStart(8, '0'),
    ((n >>> 16) & 0xFF).toString(2).padStart(8, '0'),
    ((n >>> 8) & 0xFF).toString(2).padStart(8, '0'),
    (n & 0xFF).toString(2).padStart(8, '0')
  ].join('.');

  return [
    `─── Subnet Details ───`,
    `CIDR:              ${cidr}`,
    `Network address:   ${numToIp(networkNum)}`,
    `Broadcast address: ${numToIp(broadcastNum)}`,
    `Subnet mask:       ${numToIp(maskNum)}`,
    `Wildcard mask:     ${numToIp(wildcardNum)}`,
    `First usable host: ${numToIp(firstHost)}`,
    `Last usable host:  ${numToIp(lastHost)}`,
    `Total hosts:       ${totalHosts.toLocaleString()}`,
    `Usable hosts:      ${usableHosts.toLocaleString()}`,
    `Prefix length:     /${prefix}`,
    ``,
    `─── Binary ───`,
    `Network: ${numToBin(networkNum)}`,
    `Mask:    ${numToBin(maskNum)}`
  ].join('\n');
}

function utmBuilder(args: Record<string, unknown>): string {
  const { base_url, source, medium, campaign, term, content } =
    args as { base_url: string; source: string; medium: string; campaign: string; term?: string; content?: string };

  const params: Array<[string, string]> = [
    ['utm_source', source],
    ['utm_medium', medium],
    ['utm_campaign', campaign],
  ];
  if (term) params.push(['utm_term', term]);
  if (content) params.push(['utm_content', content]);

  const queryString = params.map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join('&');
  const separator = (base_url as string).includes('?') ? '&' : '?';
  const finalUrl = `${base_url}${separator}${queryString}`;

  const lines = [
    `UTM URL:`,
    finalUrl,
    ``,
    `─── Parameter Breakdown ───`,
  ];
  params.forEach(([k, v]) => {
    lines.push(`${k}: ${v}`);
  });

  return lines.join('\n');
}
