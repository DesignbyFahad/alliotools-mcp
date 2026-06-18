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

import { calculatorTools, runCalculator } from './tools/calculators.js';
import { converterTools, runConverter } from './tools/converters.js';
import { developerTools, runDeveloper } from './tools/developer.js';
import { textTools, runText } from './tools/text.js';
import { datetimeTools, runDatetime } from './tools/datetime.js';
import { networkTools, runNetwork } from './tools/network.js';

const ALL_TOOLS = [
  ...calculatorTools,
  ...converterTools,
  ...developerTools,
  ...textTools,
  ...datetimeTools,
  ...networkTools
];

const LOCAL_TOOLS = new Set([
  ...calculatorTools.map(t => t.name),
  ...converterTools.map(t => t.name),
  ...developerTools.map(t => t.name),
  ...textTools.map(t => t.name),
  ...datetimeTools.map(t => t.name)
]);

const NETWORK_TOOLS = new Set(networkTools.map(t => t.name));

const server = new Server(
  {
    name: 'alliotools-mcp',
    version: '1.0.0'
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
      } else {
        result = runDatetime(name, args as Record<string, unknown>);
      }
    } else if (NETWORK_TOOLS.has(name)) {
      result = await runNetwork(name, args as Record<string, unknown>);
    } else {
      throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${name}`);
    }

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
  // Startup message goes to stderr so it doesn't interfere with MCP stdio protocol
  process.stderr.write('alliotools-mcp running — 176+ tools, zero data collection\n');
}

main().catch(err => {
  process.stderr.write(`Fatal error: ${err.message}\n`);
  process.exit(1);
});
