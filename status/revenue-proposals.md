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

## 2026-08-04 — Enable AdSense "Auto ads" instead of manually adding more placements

**What it is:** Google AdSense's Auto ads feature lets Google's own placement algorithm decide where and how many ad units to insert on a page, in addition to (or instead of) the existing manually-placed unit. It's a toggle in the AdSense dashboard ("Ads" → "By site" → enable Auto ads for the site/domain) — no code change to enable, though once on it typically requires trimming/removing the existing manual `<ins class="adsbygoogle">` unit if it starts double-serving, or leaving both if Google's guidance for the account says they compose safely.

**Why it's a real fit for Bracketly specifically:** I looked today at whether Bracketly should get a second manual ad placement per page (e.g. below the FAQ section) to increase impressions. I'm rejecting that specific idea for now: `earnings_last_7_days` has been `null` for the full multi-week period the account has shown `account_state: READY` (per `status/latest.json` and every `status/history.jsonl` entry since 2026-07-19) — so there's no revenue signal yet to justify guessing at a second placement's value, and Bracketly's tool pages are short enough that a second manual unit risks tripping AdSense's own "ad density vs. content" policy on the sparser pages (e.g. `uuid-generator`, `hash-generator`). Auto ads sidesteps both problems: Google's placement model is explicitly tuned to their own density/policy limits (it won't over-place on a short page), and it needs zero manual judgment calls about "does this look natural" from this agent — which is exactly the kind of subjective placement risk the standing rules ask this agent to be conservative about.

**Why this agent can't do it directly:** It's a dashboard toggle inside the AdSense account itself, not a repo change — this agent has no access to the AdSense dashboard/account settings, only the publisher ID and slot ID already wired into the code.

**What a human needs to do:**
1. In the AdSense dashboard, go to Ads → By site → Bracketly → toggle Auto ads on.
2. Optionally review Auto ads' ad-format settings there (in-page, anchor, vignette) — anchor/vignette ads on a dev-tool site could feel intrusive on top of the existing manual unit, so it's worth checking that first before leaving all formats on.
3. No code change needed from this agent unless Auto ads' own guidance says the existing manual unit should be removed to avoid duplication — if so, a future run can remove the `<AdUnit />` component usage once told that's the case.

## 2026-08-03 — Submit the new Embedding Vector Truncator to RAG/vector-DB communities

**What it is:** Today's run added `/tools/embedding-truncator/`, a client-side tool for correctly truncating and L2-renormalizing Matryoshka-style embedding vectors (OpenAI, Gemini, Cohere, Nomic) — a real, commonly-hit gotcha for anyone doing manual dimension reduction for vector-DB storage/cost savings. This tool's natural audience (RAG engineers, vector-search/vector-DB users) overlaps heavily with active communities: r/vectordatabase, r/LocalLLaMA, Weaviate/Qdrant/Pinecone/Milvus community Discords and forums, and "awesome-embeddings"/"awesome-vector-search" style curated GitHub lists.

**Why it's a real fit for Bracketly specifically:** Same reasoning as the MCP validator submission below — this is a narrow, technically-specific tool, not a generic dev-tool submission, so it's targeting a small but highly relevant audience where a new low-authority domain has a real shot at visibility rather than competing in a saturated space. The research behind this tool (2026-08-03) also surfaced no existing free tool doing this specific truncate-then-renormalize-then-compare workflow, which strengthens the case that this fills a genuine, current gap worth mentioning by name in any submission.

**Why this agent can't do it directly:** Same permanent limitation as always — most curated lists require a fork + PR from a personal GitHub account (this agent's GitHub App cannot fork third-party repos), and community forum/Discord posts require a human account and human judgment about each community's self-promotion norms.

**What a human needs to do:**
1. Search GitHub for "awesome-embeddings" / "awesome-vector-search" / "awesome-rag" style lists and open a PR (from a personal account) adding a one-line entry.
2. Consider a short, non-spammy post in r/vectordatabase or a vector-DB vendor's community forum, framed around the specific renormalization gotcha (a genuinely useful technical point, not just "check out my tool").
3. No code or account changes needed on the Bracketly side.

## 2026-08-06 — Submit the new AI SDK Stream Protocol Debugger to Vercel AI SDK community channels

**What it is:** Today's run added `/tools/ai-sdk-stream-debugger/`, a client-side validator for the Vercel AI SDK's UI Message Stream Protocol (the SSE format `useChat`/`useCompletion` expect from a backend). Research today (WebSearch + a direct fetch of the AI SDK docs) found no existing dedicated online validator/debugger for this specific protocol, despite it being the exact point where hand-rolled or non-JS backends silently break AI SDK's React hooks. The natural audience — developers building a custom backend for AI SDK UI, often in a language other than JS/TS where they can't just call the official `streamText`/`toUIMessageStreamResponse` helpers — is active in a few identifiable places: the Vercel/AI SDK GitHub Discussions, the `vercel/ai` repo's issues (frequently linked from Stack Overflow questions about "AI SDK custom backend" failures), and general Next.js/AI SDK Discord communities.

**Why it's a real fit for Bracketly specifically:** Same reasoning as the two prior tool-launch entries above — this is a narrow, currently-underserved niche tied to a fast-moving, recently-changed protocol (AI SDK 5's stream part types), not a generic dev-tool submission competing against entrenched incumbents. A new low-authority domain has a realistic shot at visibility here specifically because the format is new enough that no one has built the definitive free tool for it yet.

**Why this agent can't do it directly:** Same permanent limitation as always — GitHub Discussions posts and Discord messages require a human account and human judgment about each community's self-promotion norms; this agent's GitHub App also cannot fork `vercel/ai` to open a PR against any "awesome" list even if one existed.

**What a human needs to do:**
1. Search GitHub Discussions on `vercel/ai` and Stack Overflow's `vercel-ai-sdk` tag for existing threads about custom-backend stream-format debugging, and consider replying with a link where genuinely relevant (not a cold post).
2. Consider a short post in a Next.js/AI SDK Discord's help channel introducing the tool, framed around the specific pain point (silent failures with no server-side error) rather than as generic self-promotion.
3. No code or account changes needed on the Bracketly side.

## 2026-08-07 — Submit the new MCP 2026-07-28 Migration Checker to MCP release-discussion channels

**What it is:** Today's run added `/tools/mcp-migration-checker/`, a client-side checker for the Model Context Protocol's 2026-07-28 specification — a genuinely breaking rewrite (finalized 10 days before this run, already implemented in all four Tier 1 SDKs) that eliminates the old stateful initialize handshake in favor of per-request `_meta` fields, adds required header-based routing, and introduces Multi Round-Trip Requests. Because the spec is this fresh, developers actively migrating existing MCP servers/clients are the exact audience hitting silent breakage right now, and they're concentrated in a few identifiable, currently-active places: the `modelcontextprotocol/modelcontextprotocol` GitHub repo's Discussions/Issues (where migration questions are already appearing per the spec's own blog announcement), and any MCP-focused Discord/subreddit threads specifically about the 2026-07-28 release.

**Why it's a real fit for Bracketly specifically:** This is a sharper version of the same recency-edge logic behind the 2026-08-01 MCP Tool Schema Validator submission proposal, but distinct in angle and timing — that tool validates a *tool definition's* JSON Schema shape (a stable, long-standing concern), while this one validates the *wire protocol envelope* against a specific spec revision that's essentially brand new. The narrower, dated framing ("does your request/response match 2026-07-28") gives it a natural, non-spammy reason to exist in discussion threads about that exact release, rather than reading as generic tool promotion.

**Why this agent can't do it directly:** Same standing limitation — GitHub Discussions/Issues replies and Discord/subreddit posts require a human account and per-community judgment about self-promotion norms; this agent's GitHub App also cannot fork `modelcontextprotocol/modelcontextprotocol` to add a listing anywhere even if a relevant curated list existed.

**What a human needs to do:**
1. Check `github.com/modelcontextprotocol/modelcontextprotocol` Discussions/Issues for existing migration-pain threads about the 2026-07-28 release and reply with the tool where genuinely relevant, not as a cold link-drop.
2. Consider a short post in an MCP-focused Discord/subreddit's release-discussion channel, framed around the specific breaking changes (removed handshake, required `_meta` fields) rather than generic self-promotion.
3. No code or account changes needed on the Bracketly side.

## 2026-08-09 — Submit the new Agent Plugins Manifest Validator to the spec's own community channels

**What it is:** Today's run added `/tools/agent-plugin-validator/`, a client-side validator for the Agent Plugins 1.0.0 specification — a vendor-neutral packaging standard for AI agent extensions published August 6, 2026 (3 days before this run) by a working group spanning OpenAI, AWS, Cursor, Microsoft, and Vercel. Because the spec is this new, there is essentially zero chance any existing free validator covers it yet, and the natural audience — developers hand-writing their first `plugin.json` against blog posts rather than the schema — is concentrated in a few very specific, very active places right now: the `agentplugins/agent-plugins-spec` and `agentplugins/agent-plugins-example` GitHub repos' Issues/Discussions, and any of the five backing companies' own developer-relations channels (Vercel's blog/Discord in particular, since Vercel authored the initial draft).

**Why it's a real fit for Bracketly specifically:** This is the strongest version yet of the recency-edge logic behind every prior AI-tooling submission proposal here — not just a narrow niche within an established protocol (like the two MCP-specific tools), but a brand-new, multi-vendor standard that's days old. A new, low-authority domain has essentially its best possible shot at visibility in the handful of days before larger sites publish their own coverage and validators.

**Why this agent can't do it directly:** Same standing limitation as every prior entry — this agent's GitHub App cannot fork `agentplugins/agent-plugins-spec` to open a PR against any example/resources list, and posting to GitHub Discussions, a company Discord, or a devrel forum requires a human account and per-community judgment about self-promotion norms.

**What a human needs to do:**
1. Check `github.com/agentplugins/agent-plugins-spec` and `agent-plugins-example` for open Discussions/Issues about manifest validation or tooling gaps, and reply with the tool where genuinely relevant.
2. Consider a short, non-spammy post in a Vercel, Cursor, or AWS developer community/Discord that discusses Agent Plugins, framed around the specific problem (hand-writing a manifest against a schema this fresh, with no existing validator) rather than generic self-promotion.
3. No code or account changes needed on the Bracketly side — this is purely outbound promotion of an already-shipped tool.

## 2026-08-12 — Post a "Show HN" launch on Hacker News now that the site has 18 tools and traffic has plateaued

**What it is:** A single, personally-written "Show HN: Bracketly – free, client-side developer tools (JSON, JWT, MCP, AI SDK...)" submission to Hacker News (news.ycombinator.com), following HN's own Show HN norms (no hype/marketing language in the title, a first comment from the actual builder explaining what it is and why it was built, genuine two-way engagement with commenters afterward).

**Why it's a real fit for Bracketly specifically, not generic advice:** `status/history.jsonl` shows `total_pageloads_7d` was in the ~100-190/week range through most of late July, then dropped and has been flat at ~22-25/week for the last 6 consecutive daily snapshots (2026-08-07 through 2026-08-11) — a real, sustained plateau, not a single-day blip (already noted as an observation-only finding on 2026-08-11, since no code/tracking bug was found to explain it). At this traffic level `earnings_last_7_days` has stayed `null` for the entire multi-week period the AdSense account has shown `READY`, so the honest read is that the site currently has essentially no organic distribution channel — every visit is presumably direct/incidental, not search (Search Console `top_queries` shows real impressions for base64-related terms but 0 clicks across the board, consistent with a domain too new/low-authority to rank yet, matching the exact reasoning already used to pick low-competition AI-tooling niches). HN's Show HN audience is specifically developers evaluating dev tools by trying them, which is Bracketly's exact product shape (no signup, try instantly, judge for yourself) — and unlike the individual-tool community-submission proposals already logged above (MCP, Agent Plugins, AI SDK, embeddings), this is the one distribution channel that's about the site as a whole now that it has a real, varied 18-tool catalog rather than a single new launch to point at.

**Why this agent can't do it directly:** Same standing limitation as every community-submission proposal above — HN explicitly requires the submitter to be the actual builder posting from a real personal account with genuine first-person engagement in the comments; an automated/bot-flavored submission or one-and-done post with no follow-up engagement is against HN's own norms and would likely get flagged or buried rather than help.

**What a human needs to do:**
1. Create or use an existing personal Hacker News account (accounts need some prior karma/age to avoid being flagged as new-account spam — worth checking the account is established enough first).
2. Post a plain, non-hype title (e.g. "Show HN: Bracketly – free, browser-only dev tools including a few for MCP/AI SDK debugging") linking to `https://bracketly.pages.dev/`.
3. Add a first comment explaining what it is, why it was built, and what's genuinely different (privacy-first, no accounts, no backend) — and be available to reply to comments for the next few hours, since HN ranking rewards early engagement.
4. No code or account changes needed on the Bracketly side.

## 2026-08-15 — Finish applying to GitHub Sponsors, then let a future run re-add the donate-page button

**What it is:** `donate.astro` has had a "❤️ Sponsor on GitHub" button and panel live since 2026-07-28 (18 days), pointing at `github.com/sponsors/GRimkiller360`. Today's factual-accuracy audit fetched that URL directly and found it redirects to the plain GitHub profile page, not a working Sponsors page — the account was never actually enrolled in GitHub Sponsors, so every real visitor who clicked "Sponsor on GitHub" over the past 18 days landed on a dead end instead of a way to actually give money. The code's own comment ("it 404s until your application is approved") shows this was a known, deliberately-deferred pending state when it was added, not a bug introduced today — but 18 days is long enough that it reads as forgotten rather than pending, and presenting a non-functional donation button to real visitors isn't acceptable to leave live indefinitely.

**Action taken today:** Removed the "GitHub Sponsors" panel and button from `donate.astro` (kept the working PayPal panel and the free "other ways to help" list) so the page no longer offers a dead-end donation method. This is a content-accuracy fix, not a rejection of the idea — GitHub Sponsors is still a good fit for Bracketly (zero-fee monthly recurring support, and "GitHub Sponsors" specifically appeals to the same developer audience already using the site, more so than PayPal for a dev-tools product).

**Why this agent can't finish it directly:** Enrolling in GitHub Sponsors requires the actual GitHub account holder to apply (identity/bank/tax verification through GitHub's own flow) — this agent cannot create or approve third-party financial accounts on the user's behalf.

**What a human needs to do:**
1. Apply at [github.com/sponsors](https://github.com/sponsors) for the `GRimkiller360` account (free, typically approved within a few days).
2. Once `github.com/sponsors/GRimkiller360` actually resolves to a live Sponsors page (not a profile-page redirect), a future daily run can re-add the panel to `donate.astro` with the same copy/styling removed today — no other code changes needed.

## 2026-08-17 — Submit the new ACP Message Validator to Agent Client Protocol community channels

**What it is:** Today's run added `/tools/acp-message-validator/`, a client-side validator for the Agent Client Protocol (ACP) — a JSON-RPC standard, originated by Zed and now at a stable v1.0, that lets a code editor talk to any AI coding agent without a bespoke integration. It's adopted by 25+ agents including JetBrains and Gemini CLI. Developers hand-implementing an ACP agent or editor integration right now are the natural audience, and they're concentrated in a few identifiable, active places: the `zed-industries/agent-client-protocol` and `agentclientprotocol/typescript-sdk` GitHub repos' Issues/Discussions, and the Zed community Discord/forum where ACP originated and is actively discussed.

**Why it's a real fit for Bracketly specifically:** Same recency-and-narrowness logic behind every prior AI-tooling submission proposal here — this is a real, currently-underserved niche (no dedicated free validator exists yet) rather than a saturated space. It's also a stronger case than several prior entries: ACP is old enough to have a genuinely stable v1.0 spec (not a days-old draft), meaning the validator built today is checked against durable, unlikely-to-shift schema rather than a fast-moving target — worth mentioning explicitly in any submission since it addresses the natural "will this still be accurate next month" skepticism a brand-new spec's tooling invites.

**Why this agent can't do it directly:** Same standing limitation as every prior entry — this agent's GitHub App cannot fork `zed-industries/agent-client-protocol` or `agentclientprotocol/typescript-sdk` to open a PR against any docs/resources list, and posting to a Discord/forum requires a human account and per-community judgment about self-promotion norms.

**What a human needs to do:**
1. Check `github.com/zed-industries/agent-client-protocol` and `github.com/agentclientprotocol/typescript-sdk` Issues/Discussions for existing questions about validating hand-rolled ACP messages, and reply with the tool where genuinely relevant.
2. Consider a short, non-spammy post in Zed's community Discord/forum introducing the tool, framed around a specific real gotcha (e.g. protocolVersion being an integer, not a string) rather than generic self-promotion.
3. No code or account changes needed on the Bracketly side — this is purely outbound promotion of an already-shipped tool.

## 2026-08-21 — Submit the new SKILL.md Validator to Agent Skills / Claude Code community channels

**What it is:** Today's run added `/tools/skill-md-validator/`, a client-side validator for SKILL.md frontmatter — the packaging format for Agent Skills, the open standard Claude Code and other tools use for reusable agent instructions. It checks both the portable six-field spec (name/description/license/compatibility/metadata/allowed-tools, with real format and length rules) and flags Claude Code's own documented extension fields (`argument-hint`, `when_to_use`, etc.) as host-specific, since those pass locally but hard-fail an upload to claude.ai or the Skills API. Research while building it turned up a live, filed confusion about exactly this gap — a validator rejecting Claude Code's own documented extended frontmatter because it checked against the narrower spec instead. Natural places to surface the tool: the `agentskills/agentskills` GitHub repo's Issues/Discussions (the spec's own home), and any Claude Code or Agent Skills community channel where people are actively writing skills right now.

**Why it's a real fit for Bracketly specifically:** Same recency-and-narrowness logic behind every prior AI-tooling submission proposal here, but with an unusually concrete hook — this isn't just "new spec, no validator yet," it's "the exact confusion between two rulebooks (Claude Code's accepted fields vs. the portable spec's six) already has people filing bugs about it." A validator that explains the split, rather than just checking one side of it, solves a problem people are visibly already hitting.

**Why this agent can't do it directly:** Same standing limitation as every prior entry — this agent's GitHub App cannot fork `agentskills/agentskills` to open a PR against any resources/tooling list, and posting to a Discord/forum or replying in someone else's GitHub Discussion requires a human account and per-community judgment about self-promotion norms.

**What a human needs to do:**
1. Check `github.com/agentskills/agentskills` Issues/Discussions for existing questions about frontmatter validation or the Claude-Code-extensions-vs-portable-spec confusion, and reply with the tool where genuinely relevant.
2. Consider a short, non-spammy post in a Claude Code or Agent Skills community channel, framed around the specific "works locally, fails on upload" gotcha rather than generic self-promotion.
3. No code or account changes needed on the Bracketly side — this is purely outbound promotion of an already-shipped tool.


## 2026-08-22 — Submit the new MCP Tasks Extension Validator to the MCP TypeScript SDK's own community channels

**What it is:** Today's run added `/tools/mcp-tasks-validator/`, a client-side validator for MCP's Tasks extension — the mechanism that lets a server hand back a pollable task handle for a slow tool call instead of blocking the connection. Unlike several prior AI-tooling launches here, this feature isn't days old: it's shipped in `@modelcontextprotocol/sdk`'s experimental namespace since at least version 1.28.0 (published 2026-03-25, verified by downloading and diffing the actual package). What is genuinely recent is that its shape is still moving — a real diff between SDK 1.28.0 and the current 1.30.0 (published 2026-07-27, verified via `npm view ... time`) shows the request-side task-creation `ttl` field's accepted type and semantics changed, and a new `extensions` field was added elsewhere in the same schema family. Because it's explicitly marked experimental and still shifting, no general-purpose MCP validator (including this site's own existing `mcp-tool-validator`, which checks tool input schemas, not task lifecycle objects) currently covers it.

**Why it's a real fit for Bracketly specifically:** This is a narrower, more honestly-scoped case than most prior "brand new spec" launches — I deliberately avoided repeating an unverified claim from initial research (a specific spec-finalization date and error code that I could not confirm against the actual SDK source, and which I'm not including in the tool's own copy or this proposal). What I did verify directly — the schema shape, its recent evolution, and the "experimental, no other validator" gap — still holds up as a legitimate, currently-thin niche, just framed more conservatively than earlier entries.

**Why this agent can't do it directly:** Same standing limitation as every prior entry — this agent's GitHub App cannot fork `modelcontextprotocol/typescript-sdk` to open a PR against any examples/docs list, and posting to a Discord/forum or replying in someone else's GitHub Discussion requires a human account and per-community judgment about self-promotion norms.

**What a human needs to do:**
1. Check `github.com/modelcontextprotocol/typescript-sdk` Issues/Discussions for existing questions about the experimental Tasks extension (its own docs flag it as unstable, which tends to generate exactly this kind of question), and reply with the tool where genuinely relevant.
2. Consider a short, non-spammy post in an MCP-focused Discord/subreddit, framed around a concrete gotcha (e.g. that a Task's `ttl` field is required-but-nullable, not optional) rather than generic self-promotion.
3. No code or account changes needed on the Bracketly side — this is purely outbound promotion of an already-shipped tool.

## 2026-08-23 — List Bracketly on AlternativeTo.net

**What it is:** [AlternativeTo.net](https://alternativeto.net/) is a free, community-curated software directory built around "X alternative" comparison pages (e.g. its pages for jwt.io, Postman, DevUtils, CyberChef) that rank well in Google for searches like "jwt.io alternative" or "postman alternative lightweight." Listing is a one-time free submission via "Suggest new application" after creating an account.

**Why it's a real fit for Bracketly specifically:** The 2026-08-12 entry already diagnosed Bracketly's core distribution problem with real data: Search Console shows impressions for base64-related terms but essentially zero clicks, consistent with a domain too new/low-authority to rank on its own yet. Every remedy logged so far is either a one-time launch-day traffic spike (Show HN) or a niche community post tied to a single tool. AlternativeTo addresses a different gap: a single, durable, high-authority (DR ~85+) backlink and directory presence that doesn't decay after a day. Because Bracketly bundles ~22 tools spanning encoding/JSON/JWT/hashing/timestamps/regex, one listing can be tagged as an alternative to several established tools at once (jwt.io, DevUtils, Postman's format helpers, CyberChef, generic epoch converters, regex101), giving compounding long-tail SEO surface across multiple "alternative to" queries rather than one launch spike. It requires no contract, no billing, and no per-community etiquette judgment call — just a signup and a form.

**What a human needs to do:**
1. Create a free account at alternativeto.net.
2. Use the profile menu's "Suggest new application," enter `bracketly.pages.dev`, and fill in the description, platform (Web), license (Free), and tags — specifically naming the well-known tools it's a lightweight/privacy-first alternative to (JWT.io, Postman, DevUtils, CyberChef, epoch/timestamp converters) so it surfaces on those comparison pages.
3. Wait for moderator approval — no code or account changes needed on the Bracketly repo side.

## 2026-08-24 — Submit Bracketly to Console.dev's weekly devtools newsletter

**What it is:** [Console.dev](https://console.dev/) is a free weekly newsletter (published Thursdays, 30,000+ subscribers per multiple independent search results) that reviews 2-3 developer tools per issue, run by the team behind the Console DevTools podcast. Submission is a free email to `hello@console.dev`; editorial reviews are selected against [published criteria](https://console.dev/selection-criteria), not pay-to-play (they separately sell clearly-marked sponsored text ads, distinct from editorial picks).

**Why it's a real fit for Bracketly specifically:** Console's own published selection criteria read like a checklist Bracketly already passes without changing anything: "Is the primary user a developer, built specifically with developers in mind?" — yes, all 22 tools are pure developer utilities. "Is there a self-service signup, so a developer can try it without talking to anyone?" — Bracketly exceeds this bar, since there's no signup at all and every tool works instantly client-side. "Would this form part of a regular-use set of developer tools?" — several tools here (base64, JWT decoder, JSON formatter, hash generator, timestamp/cron converters) are exactly the bookmarkable, repeat-use category Console reviews, which is a different pitch angle than every prior proposal logged above (those are all either one-time niche AI-tooling community posts or one-shot launch/directory listings). Console is a recurring editorial channel with a large existing developer subscriber base — a featured review could plausibly drive a traffic spike comparable to or larger than the already-logged Show HN idea, and unlike the AI-tooling niche submissions, the natural pitch here is the site's everyday-utility tools as a set.

**What a human needs to do:**
1. Email `hello@console.dev` pitching 2-3 of the most broadly useful "regular-use" tools (not the whole 22-tool catalog, since Console reviews specific tools) — e.g. the JSON formatter, JWT decoder, and hash generator.
2. Verify current submission details directly on console.dev first, since this agent's network access blocked a direct fetch of that domain and the details above come from WebSearch summaries, not a first-hand page read.
3. No code or account changes needed on the Bracketly repo side — this is purely an outbound pitch email.

## 2026-08-30 — List Bracketly on DevHunt.org

**What it is:** [DevHunt.org](https://devhunt.org) is a discovery/launch platform built specifically for developer tools — founded in 2023 explicitly because Product Hunt underrepresents dev tools. It runs a daily/weekly "Best Dev Tools" upvoting format, is free to use, and is itself open-source (`github.com/MarsX-dev/devhunt`), using GitHub-based auth for both submissions and voting to keep listings tied to real makers and reduce vote manipulation.

**Why it's a real fit for Bracketly specifically, and distinct from the 18 prior entries:** Show HN (already logged) is a one-shot post to a general tech-news audience; AlternativeTo.net (already logged) is a comparison-page directory; Console.dev (already logged) is an editorial newsletter requiring a pitch and selection against published criteria. DevHunt is a different mechanic entirely — a self-serve, upvote-driven launch platform whose entire audience is developers specifically browsing for developer tools, not a broader tech audience. Bracketly (free, no signup, instantly usable, 24 client-side utilities) is exactly the product shape this platform exists for. It targets the same distribution gap already diagnosed from real Search Console data (2026-08-12, 2026-08-23 entries: real impressions on base64-related terms, near-zero clicks, consistent with a domain too new/low-authority to rank yet) with a small but 100%-relevant audience, complementing rather than duplicating Show HN.

**Evidence:** DevHunt's own GitHub repo description ("A launching platform for dev tools, built by developers... we use GitHub pull requests for listings and user logins for genuine voting") — `github.com/MarsX-dev/devhunt`; its own Product Hunt listing "DevHunt: Best Dev Tools of the Week" — `producthunt.com/products/devhunt-2`; third-party coverage corroborating the free, GitHub-authenticated, dev-tool-specific positioning and 2023 origin.

**Caveat:** devhunt.org itself was blocked by this session's network egress proxy, so the exact current submission flow (a literal GitHub PR to the repo vs. a GitHub-OAuth web form on the live site, and whether there's a paid "featured" upsell tier alongside free listing) could not be verified first-hand — a human should confirm the live flow before submitting.

**Other ad-network alternatives checked and rejected today:** Carbon Ads and NitroPay both require far more traffic than Bracketly currently has (Carbon Ads: ~50,000 monthly pageviews per their published FAQ; NitroPay: 100,000 monthly visitors or 300,000 monthly pageviews) — Bracketly is well under 100 pageloads/day, so neither clears the bar yet. JetBrains and Clerk affiliate/creator programs were also considered and rejected as too generic a fit for a static tool-widget site to be worth logging as a concrete proposal.

**What a human needs to do:**
1. Visit devhunt.org and sign in with GitHub.
2. Submit Bracketly following whatever the live submission flow currently is (verify this in person, since this agent couldn't load the site).
3. No code or account changes needed on the Bracketly repo side.
