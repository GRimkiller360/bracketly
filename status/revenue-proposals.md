# Revenue Proposals

Ideas logged here are research only — none of them are implemented. Each needs a human to sign up for a third-party account/program before any code change would make sense.

## 2026-07-20 — Apply to EthicalAds as a second ad network alongside AdSense

**What it is:** [EthicalAds](https://www.ethicalads.io/publishers/) is an ad network built specifically for developer-facing sites (docs, blogs, open-source tools). It serves purely contextual ads — no cookies, no user tracking, no personal-data-based targeting — and is explicitly GDPR/CCPA compliant by design rather than via a consent banner.

**Why it's a real fit for Bracketly specifically:** Bracketly's whole positioning is "free, privacy-first developer tools" — the homepage and every tool page say so, and the new `/privacy` page now spells out exactly what AdSense's cookie-based ads mean for that claim. EthicalAds is one of the few ad networks whose actual behavior (no cookies, no cross-site tracking) matches that positioning rather than being in tension with it. It's also literally built for the exact audience Bracketly has (developers reading docs/tool pages), unlike AdSense which is generic.

**Realistic expectations:** Public EthicalAds guidance cites roughly $2.25–$2.75 CPM for a typical publisher — this would be a small supplement to, not a replacement for, AdSense at Bracketly's current traffic (well under 100 pageloads/day per the latest snapshot). It's worth applying now mainly because approval and ramp-up take time regardless of current traffic level, and the placement (a single small text-based unit, typically sidebar/inline near content) fits Bracketly's minimal layout without adding visual clutter.

**What a human needs to do:**
1. Apply as a publisher at [ethicalads.io/publishers](https://www.ethicalads.io/publishers/) with the Bracketly URL.
2. Once approved, get the placement snippet/ad unit ID from their dashboard.
3. Hand the snippet or ID back so a future run can wire it into `AdUnit.astro` (or a new sibling component, since it would run alongside, not replace, the existing AdSense unit) without guessing at credentials.

No code change was made for this — only this write-up, per the rule against creating third-party accounts or guessing at integration details myself.

## 2026-08-01 — Submit the new MCP Tool Schema Validator to community MCP directories

**What it is:** Today's run added `/tools/mcp-tool-validator/`, a client-side validator for Model Context Protocol tool definitions. The MCP ecosystem has several actively-maintained, high-traffic community directories and lists (e.g. GitHub "awesome-mcp-servers"-style curated lists, MCP-focused subreddits/Discords, and directory sites that index MCP tooling) where a genuinely useful free utility like this can pick up both a backlink and direct, highly-relevant traffic — developers actively building MCP servers are close to the exact audience this tool serves.

**Why it's a real fit for Bracketly specifically:** This isn't a generic "submit your site everywhere" suggestion — it's specific to the tool shipped today. A JSON/Base64/regex tool submission would compete in an oversaturated space; an MCP-specific tool submitted to MCP-specific communities is targeting a narrow, currently-underserved niche (per the AI-tooling research direction this project has been following since the token counter and Gemini signature validator launches), where a new low-authority domain has a real shot at visibility.

**Why this agent can't do it directly:** Most of these directories are third-party GitHub repos requiring a fork + PR, which this agent's GitHub App cannot do (documented, permanent limitation — see the standing "backlink PRs disabled" note). Others (Discord/Reddit posts, directory submission forms) require a human account and human judgment about tone/self-promotion norms in each community.

**What a human needs to do:**
1. Search GitHub for current "awesome-mcp-servers" / "awesome-mcp" style lists and open a PR (from a personal GitHub account, not this repo's bot) adding a one-line entry for the validator.
2. Consider a short, non-spammy post in an MCP-focused subreddit or Discord introducing the tool, if such communities have server-building channels where sharing tools is welcomed by their rules.
3. No code or account changes needed on the Bracketly side — this is purely outbound promotion of an already-shipped tool.
