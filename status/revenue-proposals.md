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
