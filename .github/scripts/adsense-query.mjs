// Queries Google AdSense revenue via a long-lived OAuth refresh token and
// prints {account_state, sites, earnings} as JSON. Requires ADSENSE_CLIENT_ID,
// ADSENSE_CLIENT_SECRET, ADSENSE_REFRESH_TOKEN in the environment.
// Before approval, the account exists but reports have no rows — that's
// expected, not an error.
//
// account_state (from accounts.get) is coarse — READY there just means the
// AdSense *account* itself is approved, not that any individual site is
// cleared to serve ads. The per-site review status (what the dashboard's
// "Sites" tab shows — GETTING_READY / NEEDS_ATTENTION / READY) is a
// separate resource (accounts.sites.list) and is the one that actually
// explains whether ads will render on this specific domain.

async function getAccessToken() {
  const resp = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.ADSENSE_CLIENT_ID,
      client_secret: process.env.ADSENSE_CLIENT_SECRET,
      refresh_token: process.env.ADSENSE_REFRESH_TOKEN,
      grant_type: 'refresh_token',
    }),
  });
  const data = await resp.json();
  if (!data.access_token) throw new Error('No access token: ' + JSON.stringify(data));
  return data.access_token;
}

const accessToken = await getAccessToken();
const authHeader = { Authorization: `Bearer ${accessToken}` };

const accountsResp = await fetch('https://adsense.googleapis.com/v2/accounts', { headers: authHeader });
const accountsData = await accountsResp.json();
const account = accountsData.accounts?.[0];

if (!account) {
  console.log(JSON.stringify({ account_state: 'NOT_FOUND', sites: [], earnings: null }));
  process.exit(0);
}

const sitesResp = await fetch(`https://adsense.googleapis.com/v2/${account.name}/sites`, {
  headers: authHeader,
});
const sitesData = await sitesResp.json();
const sites = (sitesData.sites ?? []).map((s) => ({
  domain: s.domain,
  state: s.state,
  autoAdsEnabled: s.autoAdsEnabled ?? null,
}));

const qs = 'dateRange=LAST_7_DAYS&metrics=ESTIMATED_EARNINGS&metrics=IMPRESSIONS&metrics=PAGE_VIEWS&metrics=CLICKS';
const reportResp = await fetch(`https://adsense.googleapis.com/v2/${account.name}/reports:generate?${qs}`, {
  headers: authHeader,
});
const reportData = await reportResp.json();

const row = reportData.rows?.[0]?.cells;
const earnings = row
  ? {
      estimated_earnings: row[0]?.value,
      currency: reportData.headers?.[0]?.currencyCode,
      impressions: row[1]?.value,
      page_views: row[2]?.value,
      clicks: row[3]?.value,
    }
  : null;

console.log(JSON.stringify({ account_state: account.state, sites, earnings }));
