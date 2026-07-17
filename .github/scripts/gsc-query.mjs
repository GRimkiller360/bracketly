// Queries Google Search Console via a service account (JWT bearer flow) and
// prints {top_queries, top_pages} as JSON. Requires GSC_SERVICE_ACCOUNT_KEY
// (the full service-account JSON) in the environment. Search Console data
// has a ~2-3 day lag, so this always looks back from 3 days ago.
import crypto from 'crypto';

function b64url(input) {
  return Buffer.from(input).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function getAccessToken(key) {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const claims = {
    iss: key.client_email,
    scope: 'https://www.googleapis.com/auth/webmasters.readonly',
    aud: key.token_uri,
    exp: now + 3600,
    iat: now,
  };
  const unsigned = `${b64url(JSON.stringify(header))}.${b64url(JSON.stringify(claims))}`;
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(unsigned);
  const signature = signer.sign(key.private_key).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  const jwt = `${unsigned}.${signature}`;

  const resp = await fetch(key.token_uri, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });
  const data = await resp.json();
  if (!data.access_token) throw new Error('No access token: ' + JSON.stringify(data));
  return data.access_token;
}

async function querySearchAnalytics(accessToken, dimensions) {
  const siteUrl = 'https://bracketly.pages.dev/';
  const end = new Date();
  end.setUTCDate(end.getUTCDate() - 3);
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - 28);
  const fmt = (d) => d.toISOString().slice(0, 10);

  const resp = await fetch(
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ startDate: fmt(start), endDate: fmt(end), dimensions, rowLimit: 20 }),
    }
  );
  const data = await resp.json();
  return data.rows ?? [];
}

const key = JSON.parse(process.env.GSC_SERVICE_ACCOUNT_KEY);
const accessToken = await getAccessToken(key);
const [top_queries, top_pages] = await Promise.all([
  querySearchAnalytics(accessToken, ['query']),
  querySearchAnalytics(accessToken, ['page']),
]);

console.log(JSON.stringify({ top_queries, top_pages }));
