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
