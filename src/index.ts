#!/usr/bin/env node
/**
 * alliotools-mcp — Privacy-first MCP server for allio Tools
 * https://allio.tools/mcp
 *
 * 176+ tools that run entirely on your machine.
 * No API keys. No accounts. No data leaves your device.
 * (Network tools marked with 🌐 make external calls by design.)
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ErrorCode,
  McpError
} from '@modelcontextprotocol/sdk/types.js';

import { readFileSync } from 'fs';
import { join } from 'path';

import { calculatorTools, runCalculator } from './tools/calculators.js';
import { converterTools, runConverter } from './tools/converters.js';
import { developerTools, runDeveloper } from './tools/developer.js';
import { textTools, runText } from './tools/text.js';
import { datetimeTools, runDatetime } from './tools/datetime.js';
import { networkTools, runNetwork } from './tools/network.js';
import { healthTools, runHealth } from './tools/health.js';
import { funTools, runFun } from './tools/fun.js';
import { primeUpdateCheck, takeBannerIfReady } from './update-checker.js';

const PKG_VERSION: string = JSON.parse(
  readFileSync(join(__dirname, '..', 'package.json'), 'utf8')
).version;

const ALL_TOOLS = [
  ...calculatorTools,
  ...converterTools,
  ...developerTools,
  ...textTools,
  ...datetimeTools,
  ...networkTools,
  ...healthTools,
  ...funTools
];

const LOCAL_TOOLS = new Set([
  ...calculatorTools.map(t => t.name),
  ...converterTools.map(t => t.name),
  ...developerTools.map(t => t.name),
  ...textTools.map(t => t.name),
  ...datetimeTools.map(t => t.name),
  ...healthTools.map(t => t.name),
  ...funTools.map(t => t.name)
]);

const NETWORK_TOOLS = new Set(networkTools.map(t => t.name));

const server = new Server(
  {
    name: 'alliotools-mcp',
    version: PKG_VERSION
  },
  {
    capabilities: { tools: {} }
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: ALL_TOOLS
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args = {} } = request.params;

  try {
    let result: string;

    if (LOCAL_TOOLS.has(name)) {
      if (calculatorTools.some(t => t.name === name)) {
        result = runCalculator(name, args as Record<string, unknown>);
      } else if (converterTools.some(t => t.name === name)) {
        result = runConverter(name, args as Record<string, unknown>);
      } else if (developerTools.some(t => t.name === name)) {
        result = runDeveloper(name, args as Record<string, unknown>);
      } else if (textTools.some(t => t.name === name)) {
        result = runText(name, args as Record<string, unknown>);
      } else if (healthTools.some(t => t.name === name)) {
        result = runHealth(name, args as Record<string, unknown>);
      } else if (funTools.some(t => t.name === name)) {
        result = runFun(name, args as Record<string, unknown>);
      } else {
        result = runDatetime(name, args as Record<string, unknown>);
      }
    } else if (NETWORK_TOOLS.has(name)) {
      result = await runNetwork(name, args as Record<string, unknown>);
    } else {
      throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${name}`);
    }

    const banner = takeBannerIfReady();
    if (banner) result = `${banner}\n\n${result}`;

    return {
      content: [{ type: 'text', text: result }]
    };
  } catch (error) {
    if (error instanceof McpError) throw error;
    throw new McpError(
      ErrorCode.InternalError,
      `Tool "${name}" failed: ${(error as Error).message}`
    );
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  // Kicked off in the background — never awaited, never blocks a tool call.
  // See update-checker.ts for exactly what this does and does not send.
  primeUpdateCheck();
  // Startup message goes to stderr so it doesn't interfere with MCP stdio protocol
  process.stderr.write(`alliotools-mcp running — ${ALL_TOOLS.length} tools, zero data collection\n`);
}

main().catch(err => {
  process.stderr.write(`Fatal error: ${err.message}\n`);
  process.exit(1);
});
