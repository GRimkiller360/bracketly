# Gemini 3's Function Calling Has a Signature Rule That Only Bites You Once You Add a Second Tool Call

Gemini 3 introduced `thoughtSignature` — an encrypted blob attached to a `functionCall` part that preserves the model's reasoning state across a multi-turn tool-use conversation. Drop it when replaying history back to the API and you get a 400. Simple enough, until you actually build something that calls more than one tool, so I added a [Gemini Thought Signature Validator](https://bracketly.pages.dev/tools/gemini-signature-validator/) to Bracketly, my free client-side dev tools site.

## The rule that's easy to get backwards

There are two distinct cases, and they require opposite handling:

- **Parallel function calls** (one response, several tool calls at once — "check the weather in Tokyo, Mumbai, and São Paulo"): only the *first* `functionCall` part in that response carries a `thoughtSignature`. The rest legitimately have none.
- **Sequential function calls** (separate turns, one call each, across multiple steps of a longer task): *every* turn's `functionCall` needs its own signature.

Write code that handles one case correctly and you'll ship something that works fine in testing — most people's first tool-calling demo is a single function — and then breaks the moment a prompt fans out into multiple calls, or the model chains several tool steps together. Worse, if you're serializing conversation history yourself (a custom agent loop, a stored session you replay later) it's easy to accidentally treat "no signature on this part" as a bug and strip or regenerate something that was never supposed to have one, which breaks the *correctly* signed request instead.

## What the tool actually checks

Paste a request body, a bare `contents` array, or a raw `generateContent` response, and it walks every turn checking exactly the things that cause real failures: whether the first `functionCall` in each model turn has a signature, whether the following turn's `functionResponse` parts exist, match in count, and are in the same order as their calls, and whether Gemini 3's per-call `id` field gets echoed back correctly. It can't decode what's inside a signature — nobody outside Gemini can — but it doesn't need to; the failures that actually happen are structural, not cryptographic.

Built and verified against the documented request/response shapes with hand-written test vectors before touching a line of UI code — parallel-call signing, sequential-call signing, missing-response detection, id mismatches, malformed input, all covered. 100% client-side, nothing you paste leaves your browser: [bracketly.pages.dev/tools/gemini-signature-validator](https://bracketly.pages.dev/tools/gemini-signature-validator/).
