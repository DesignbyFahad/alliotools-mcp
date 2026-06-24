#!/usr/bin/env node
// AWS SES sender — hand-rolled SigV4, no AWS SDK. Same approach as the
// allio.tools website's src/shared/ses.mjs, kept as its own copy here since
// this is a genuinely separate, standalone repo (no shared package between
// the two). Pure Web Crypto API (`crypto.subtle`, `fetch`) — Node 18+ only.

async function sesSendEmail({ region, accessKey, secretKey, from, to, subject, html, text }) {
  if (!from || !accessKey || !secretKey) {
    console.warn('SES not configured — email not sent');
    return;
  }
  const endpoint = `https://email.${region}.amazonaws.com/v2/email/outbound-emails`;
  const payload = JSON.stringify({
    FromEmailAddress: from,
    Destination: { ToAddresses: [to] },
    Content: { Simple: {
      Subject: { Data: subject, Charset: 'UTF-8' },
      Body: {
        Html: { Data: html, Charset: 'UTF-8' },
        Text: { Data: text, Charset: 'UTF-8' }
      }
    }}
  });

  const now = new Date();
  const date = now.toISOString().replace(/[:-]|\.\d{3}/g, '').slice(0, 15) + 'Z';
  const dateStamp = date.slice(0, 8);
  const hdrs = { 'Content-Type': 'application/json', 'Host': `email.${region}.amazonaws.com`, 'X-Amz-Date': date };
  const signedHdrs = 'content-type;host;x-amz-date';
  const payloadHash = await sha256hex(payload);

  const canonicalReq = ['POST', '/v2/email/outbound-emails', '',
    `content-type:${hdrs['Content-Type']}\nhost:${hdrs['Host']}\nx-amz-date:${hdrs['X-Amz-Date']}\n`,
    signedHdrs, payloadHash].join('\n');

  const credScope = `${dateStamp}/${region}/ses/aws4_request`;
  const stringToSign = `AWS4-HMAC-SHA256\n${date}\n${credScope}\n${await sha256hex(canonicalReq)}`;
  const sigKey = await getSigningKey(secretKey, dateStamp, region, 'ses');
  const sig = await hmacHex(sigKey, stringToSign);
  const auth = `AWS4-HMAC-SHA256 Credential=${accessKey}/${credScope}, SignedHeaders=${signedHdrs}, Signature=${sig}`;

  const res = await fetch(endpoint, { method: 'POST', headers: { ...hdrs, Authorization: auth }, body: payload });
  if (!res.ok) throw new Error(`SES ${res.status}: ${await res.text()}`);
}

async function sha256hex(data) {
  const buf = await crypto.subtle.digest('SHA-256', typeof data === 'string' ? new TextEncoder().encode(data) : data);
  return Array.from(new Uint8Array(buf), b => b.toString(16).padStart(2, '0')).join('');
}
async function hmac(key, data) {
  const k = typeof key === 'string' ? new TextEncoder().encode(key) : key;
  const ck = await crypto.subtle.importKey('raw', k, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return new Uint8Array(await crypto.subtle.sign('HMAC', ck, new TextEncoder().encode(data)));
}
async function hmacHex(key, data) {
  return Array.from(await hmac(key, data), b => b.toString(16).padStart(2, '0')).join('');
}
async function getSigningKey(secret, dateStamp, region, service) {
  const kDate = await hmac(`AWS4${secret}`, dateStamp);
  const kRegion = await hmac(kDate, region);
  const kService = await hmac(kRegion, service);
  return hmac(kService, 'aws4_request');
}

module.exports = { sesSendEmail };
