# alliotools-mcp

**Privacy-first MCP server for [allio Tools](https://allio.tools) — 176+ utilities that run entirely on your machine.**

No API keys. No accounts. No data leaves your device.

---

## What is this?

[Model Context Protocol (MCP)](https://modelcontextprotocol.io) lets AI assistants (Claude, Cursor, Windsurf, and others) use external tools. This package brings allio Tools' calculators, converters, developer tools, text utilities, and date/time tools directly into your AI agent — running entirely as a local process on your machine.

> **Privacy first:** Every tool in this server computes results locally in Node.js. Nothing is sent to allio.tools or any third-party service. The only exceptions are the network tools (marked with 🌐), which make external calls by design — for example, a DNS lookup must contact a DNS server.

---

## Tools included

### Calculators (local ✓)
| Tool | Description |
|---|---|
| `percentage_calculator` | X% of Y, X is what % of Y, percentage change |
| `compound_interest_calculator` | Final amount, interest earned, year-by-year breakdown |
| `bmi_calculator` | BMI and weight category (metric or imperial) |
| `age_calculator` | Exact age in years/months/days + next birthday |
| `tip_calculator` | Tip amount and split between people |
| `discount_calculator` | Discounted price and amount saved |
| `profit_margin_calculator` | Gross margin and markup percentage |
| `salary_calculator` | Convert between hourly/daily/weekly/monthly/annual |
| `loan_calculator` | Monthly payment and total interest |
| `break_even_calculator` | Break-even units and revenue |
| `markup_calculator` | Selling price from markup or markup from price |
| `area_calculator` | Area of 8 shapes: rectangle, circle, triangle… |
| `fuel_cost_calculator` | Trip fuel cost (metric or imperial) |
| `inflation_calculator` | Inflation-adjusted value 1913–2024 (embedded CPI data) |
| `calorie_calculator` | TDEE, BMR, and macro targets |

### Converters (local ✓)
| Tool | Description |
|---|---|
| `unit_converter` | Length, weight, temperature, volume, speed, area, data |
| `number_base_converter` | Binary ↔ Octal ↔ Decimal ↔ Hex |
| `roman_numeral_converter` | Roman numerals ↔ integers (1–3999) |
| `number_to_words` | 1234 → "one thousand two hundred thirty-four" |
| `color_converter` | HEX ↔ RGB ↔ HSL ↔ HSV ↔ CMYK |

### Developer Tools (local ✓)
| Tool | Description |
|---|---|
| `base64_encode_decode` | Encode/decode Base64 |
| `hash_generator` | MD5, SHA-1, SHA-256, SHA-384, SHA-512 |
| `uuid_generator` | Generate 1–100 UUIDs (v4, cryptographically random) |
| `json_formatter` | Format, minify, or validate JSON |
| `url_encoder_decoder` | Encode/decode URLs and URL components |
| `html_encoder_decoder` | Encode/decode HTML entities |
| `regex_tester` | Test regex patterns with match positions and groups |
| `jwt_decoder` | Decode JWT header and payload, check expiry |
| `timestamp_converter` | Unix timestamp ↔ human-readable date |
| `sql_formatter` | Format and beautify SQL queries |
| `text_minifier` | Minify CSS, JavaScript, or HTML |
| `hex_rgb_converter` | HEX ↔ RGB color conversion |
| `cron_parser` | Parse cron expressions in plain English + next 5 runs |

### Text Tools (local ✓)
| Tool | Description |
|---|---|
| `word_counter` | Words, characters, sentences, paragraphs, reading time |
| `case_converter` | UPPER, lower, Title, camelCase, snake_case, kebab-case, PascalCase |
| `text_diff` | Line-by-line diff between two texts |
| `lorem_ipsum_generator` | Generate placeholder text (paragraphs/sentences/words) |
| `text_to_slug` | Convert text to URL-friendly slug |
| `palindrome_checker` | Check if text reads the same forwards and backwards |
| `text_reverser` | Reverse by characters, words, or lines |
| `duplicate_line_remover` | Remove duplicate lines from text |
| `text_sorter` | Sort lines alphabetically, by length, or randomly |
| `morse_code_converter` | Text ↔ Morse code |
| `character_counter` | Character count with frequency breakdown |

### Date & Time (local ✓)
| Tool | Description |
|---|---|
| `date_calculator` | Days between dates, add/subtract days |
| `time_zone_converter` | Convert times between any IANA time zones |
| `unix_timestamp_converter` | Unix timestamp ↔ human-readable |
| `week_number_calculator` | ISO week number and week date range |
| `time_duration_calculator` | Duration between times, add durations |

### Network Tools (🌐 makes external calls)
These tools work by contacting external services. No data is stored or logged by allio Tools — the call goes directly from your machine to the target.

| Tool | External call made |
|---|---|
| `dns_lookup` | DNS query to resolve A, MX, TXT, NS records |
| `http_header_checker` | HTTP HEAD request to target URL |
| `website_status_checker` | HTTP request to check if site is up |
| `ip_address_lookup` | DNS lookup + optional geolocation API |
| `open_graph_preview` | HTTP GET to extract OG/Twitter Card meta tags |

---

## Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org) v18 or higher

No other dependencies. No API keys. No configuration files.

---

### Claude Desktop

Edit `~/AppData/Roaming/Claude/claude_desktop_config.json` (Windows) or `~/Library/Application Support/Claude/claude_desktop_config.json` (Mac):

```json
{
  "mcpServers": {
    "alliotools": {
      "command": "npx",
      "args": ["-y", "alliotools-mcp"]
    }
  }
}
```

Restart Claude Desktop. You'll see "alliotools" in the tools panel.

---

### Cursor

Edit `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "alliotools": {
      "command": "npx",
      "args": ["-y", "alliotools-mcp"]
    }
  }
}
```

---

### Windsurf

Edit `~/.codeium/windsurf/mcp_config.json`:

```json
{
  "mcpServers": {
    "alliotools": {
      "command": "npx",
      "args": ["-y", "alliotools-mcp"]
    }
  }
}
```

---

### VS Code (with Cline, Roo Code, or Continue)

Add to your `.vscode/mcp.json` or the extension's config file:

```json
{
  "mcpServers": {
    "alliotools": {
      "command": "npx",
      "args": ["-y", "alliotools-mcp"]
    }
  }
}
```

---

### Zed

In `~/.config/zed/settings.json`:

```json
{
  "context_servers": {
    "alliotools": {
      "command": {
        "path": "npx",
        "args": ["-y", "alliotools-mcp"]
      }
    }
  }
}
```

---

### Amazon Q Developer

Edit `~/.aws/amazonq/mcp.json`:

```json
{
  "mcpServers": {
    "alliotools": {
      "command": "npx",
      "args": ["-y", "alliotools-mcp"]
    }
  }
}
```

---

### GitHub Copilot (VS Code agent mode)

Add to `.vscode/mcp.json` in your workspace:

```json
{
  "servers": {
    "alliotools": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "alliotools-mcp"]
    }
  }
}
```

---

### JetBrains AI

Go to **Settings → Tools → AI Assistant → Model Context Protocol** and add:

- **Command:** `npx`
- **Arguments:** `-y alliotools-mcp`

---

## Privacy

This MCP server was built with privacy as the primary design constraint.

- **Local tools (all calculators, converters, developer tools, text tools, date/time tools):** All computation happens in the Node.js process on your machine. No network requests are made. No data is transmitted anywhere.
- **Network tools (DNS lookup, HTTP header checker, website status, IP lookup, OG preview):** These tools exist to query external resources — that's their purpose. The request goes directly from your machine to the target. allio Tools never sees the request.
- **No telemetry.** No analytics. No usage tracking. No crash reporting.
- **Open source.** You can read every line of this code and verify it yourself.

---

## Using with your AI

Once installed, just ask your AI agent naturally:

- *"Calculate compound interest on $10,000 at 5% for 20 years, compounded monthly"*
- *"Convert 180 lbs to kg"*
- *"How many days between March 15 2024 and November 30 2024?"*
- *"Generate 5 UUIDs"*
- *"What is the SHA-256 hash of 'hello world'?"*
- *"Convert 9:30 AM New York time to London time"*
- *"Look up DNS records for allio.tools"*
- *"Is https://example.com up?"*

---

## License

MIT — see [LICENSE](LICENSE)

---

Built with ❤️ by [allio Tools](https://allio.tools) — free online tools for everyone.
