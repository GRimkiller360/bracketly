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

## 2026-08-08 — Submit the new OTel GenAI Span Validator to OpenTelemetry/observability community channels

**What it is:** Today's run added `/tools/genai-span-validator/`, a client-side validator for OpenTelemetry's GenAI semantic conventions (the `gen_ai.*` span attributes used to instrument LLM calls, agent steps, and tool executions). Research today (four targeted WebSearch passes plus direct fetches of the OpenTelemetry semantic-conventions-genai repo's registry and span-naming docs) found no existing free web tool that validates a pasted span against these conventions — the only real tooling is OTel Weaver, a Rust CLI aimed at instrumentation-library maintainers, not a quick paste-and-check for someone eyeballing one span. The natural audience — developers instrumenting LLM/agent applications with OpenTelemetry, especially anyone still emitting attributes from an earlier draft of the spec (`gen_ai.system`, `gen_ai.prompt`, `gen_ai.usage.prompt_tokens`, all since renamed) — is concentrated in a few identifiable places: the CNCF/OpenTelemetry Slack's `#otel-genai` or general instrumentation channels, r/opentelemetry, and the `open-telemetry/semantic-conventions-genai` GitHub repo's Discussions/Issues.

**Why it's a real fit for Bracketly specifically:** Same recency-edge logic as the last several tool-launch entries — the GenAI semantic conventions are still actively being revised (attributes renamed as recently as the still-current cycle), so a new low-authority domain has a genuine shot at being useful before an entrenched incumbent covers this specific angle, rather than competing in an already-saturated space like generic JSON/log validators.

**Why this agent can't do it directly:** Same standing limitation as every prior entry — Slack/Discord/subreddit posts and GitHub Discussions replies require a human account and per-community judgment about self-promotion norms; this agent's GitHub App also cannot fork `open-telemetry/semantic-conventions-genai` to add a listing anywhere even if a relevant curated list existed.

**What a human needs to do:**
1. Check the CNCF/OpenTelemetry Slack and r/opentelemetry for existing threads about GenAI span instrumentation or the `gen_ai.system` → `gen_ai.provider.name` rename, and reply with the tool where genuinely relevant.
2. Consider opening a low-key Discussion post on `open-telemetry/semantic-conventions-genai` introducing the tool, framed around the specific deprecated-attribute migration pain rather than generic self-promotion.
3. No code or account changes needed on the Bracketly side.
