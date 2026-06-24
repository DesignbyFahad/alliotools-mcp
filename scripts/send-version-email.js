#!/usr/bin/env node
// Sends a "new version published" email straight to AWS SES — no public
// endpoint involved, since this is a standalone repo with no website behind
// it. Fired by .github/workflows/notify-on-publish.yml once a version is
// confirmed actually live on npm (not just pushed to GitHub).
//
// Required env: AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, SES_FROM_EMAIL
// Optional env: AWS_REGION (default us-east-1), NOTIFY_TO (default alliotools@gmail.com)

const fs = require('fs');
const path = require('path');

const NOTIFY_TO = process.env.NOTIFY_TO || 'alliotools@gmail.com';

async function main() {
  const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
  const changelog = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'changelog.json'), 'utf8'));
  const version = pkg.version;
  const entry = changelog.versions.find(v => v.version === version);

  const highlights = entry?.highlights || [];
  const fixes = entry?.fixes || [];
  const toolCount = entry?.toolCount ?? pkg.toolCount;

  const subject = `[alliotools-mcp] v${version} published — ${toolCount} tools`;
  const listHtml = (label, items) => items.length
    ? `<p><strong>${label}:</strong></p><ul>${items.map(i => `<li>${i}</li>`).join('')}</ul>` : '';
  const listText = (label, items) => items.length
    ? `${label}:\n${items.map(i => `- ${i}`).join('\n')}\n` : '';

  const html = `<p>alliotools-mcp v${version} just published to npm (${toolCount} tools).</p>${listHtml('New', highlights)}${listHtml('Fixed', fixes)}<p><a href="https://www.npmjs.com/package/alliotools-mcp">View on npm</a></p>`;
  const text = `alliotools-mcp v${version} just published to npm (${toolCount} tools).\n\n${listText('New', highlights)}${listText('Fixed', fixes)}\nhttps://www.npmjs.com/package/alliotools-mcp`;

  const { sesSendEmail } = require('./ses-send.js');

  try {
    await sesSendEmail({
      region:    process.env.AWS_REGION || 'us-east-1',
      accessKey: process.env.AWS_ACCESS_KEY_ID,
      secretKey: process.env.AWS_SECRET_ACCESS_KEY,
      from:      process.env.SES_FROM_EMAIL,
      to:        NOTIFY_TO,
      subject,
      html,
      text
    });
    console.log(`Sent: ${subject}`);
  } catch (err) {
    console.error('SES send failed:', err.message);
    process.exit(1);
  }
}

main();
