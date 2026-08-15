# MCP Just Got a Native App Platform — Its Default CSP Blocks Everything

MCP Apps is the first official extension folded directly into the Model Context Protocol's stable core spec: a tool can now declare an interactive HTML UI — a `ui://` resource — that a host renders in a sandboxed iframe instead of just dumping text back to the model. Think a dashboard, a form, a live chart, embedded right in the conversation. It's a genuinely useful capability, and it's also brand new enough that almost nobody building against it right now has an SDK doing the validation for them.

I hit three things worth knowing about before you wire this up.

**The mimeType isn't `text/html`.** It's the exact string `text/html;profile=mcp-app`. Miss the `;profile=mcp-app` suffix and your resource just looks like a regular document to the host — no interactive rendering, no postMessage bridge, and no error telling you why.

**CSP is an allow-list, and the default is nothing.** The `_meta.ui.csp` block has four domain-list fields — `connectDomains`, `resourceDomains`, `frameDomains`, `baseUriDomains` — and every single one defaults to fully blocked when omitted, not fully allowed. That's the right security default for a sandboxed iframe a third party's tool controls, but it means the very first time your UI tries to `fetch()` a weather API or load a CDN script, it silently fails unless you explicitly listed that domain. No console warning tells you it's the CSP; it just looks like your JavaScript is broken.

**The host↔iframe handshake is hand-rolled JSON-RPC over `postMessage`.** There's no client library abstracting this away yet — you're constructing `ui/initialize`, `ui/message`, `ui/request-display-mode` and friends by hand, and a malformed `params` object on any of them just means the message gets silently dropped rather than an error you can debug.

None of these are exotic bugs. They're exactly the kind of thing that costs an afternoon the first time and is obvious in hindsight the second — which is the whole reason a validator is worth having before the second time.

So I built one: paste a tool's `_meta.ui` block, a `resources/read` response, or a single `ui/*` postMessage envelope, and it checks each against the published spec — wrong URI scheme, the mimeType typo, malformed CSP domain lists, missing required params per message type. Every check is traced back to the actual spec source, not a guess at what "should" be required. It's free, runs entirely in your browser, and nothing you paste is ever sent anywhere: [bracketly.pages.dev/tools/mcp-apps-validator](https://bracketly.pages.dev/tools/mcp-apps-validator/)
