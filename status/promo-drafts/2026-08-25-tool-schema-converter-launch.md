# Your OpenAI tool schema won't work on the Responses API. Here's why.

If you're migrating off the Assistants API before it shuts down (August 26 — that's basically today), you've probably hit this: you copy your `tools` array from your old Chat Completions code, drop it into a `responses.create()` call, and get a confusing error about a missing `tools[0].name`.

Here's the thing nobody tells you clearly enough: **the Responses API tool shape isn't the same as Chat Completions.** Chat Completions nests everything:

```json
{ "type": "function", "function": { "name": "get_weather", "parameters": {...} } }
```

The Responses API flattens it — `name` and `parameters` sit directly on the object, no nested `"function"` key:

```json
{ "type": "function", "name": "get_weather", "parameters": {...} }
```

Same information, genuinely different shape. If you're maintaining tools across multiple providers, it gets worse — Anthropic's Messages API drops `type` entirely and calls the schema field `input_schema` instead of `parameters`. Gemini wraps everything in a `function_declarations` array.

I built a small free tool to stop hand-editing these by hand: **[Tool-Calling Schema Converter](https://bracketly.pages.dev/tools/tool-schema-converter/)**. Paste a tool definition in any of the four shapes — it auto-detects which one — and get all four back, ready to paste into each SDK's `tools` parameter.

It also handles a specific pain point if you're using OpenAI's strict mode: strict mode requires `additionalProperties: false` and *every* property listed in `required`, recursively, at every nesting level. Since that leaves no way to express "this field is optional," the workaround is to make the field nullable instead (`"type": ["string", "null"]`) rather than omitting it from `required`. The converter's strict-mode toggle does this rewrite for you — only on the OpenAI outputs, since Anthropic and Gemini don't share that requirement.

Everything runs client-side — nothing you paste is sent anywhere, which matters if your tool schemas describe internal APIs.

It's part of [Bracketly](https://bracketly.pages.dev), a small collection of free, no-signup developer tools I keep adding to one at a time.
