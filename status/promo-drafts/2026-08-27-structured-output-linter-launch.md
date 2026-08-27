# A free linter for the JSON Schema rules OpenAI, Claude, and Gemini don't agree on

If you've built against more than one LLM provider's "structured output" feature, you've probably hit this: a JSON Schema that works perfectly against one provider gets rejected outright by another, even though nothing about the schema itself is invalid JSON Schema. That's because none of the big three implement the full spec — each accepts its own narrower subset, and the three subsets don't match.

OpenAI's strict Structured Outputs mode is the strictest of the three: every object needs `"additionalProperties": false` set explicitly, and *every* property has to be listed in `required` — there's no such thing as an optional field, only a nullable one (`["string", "null"]` instead of leaving it out). It also enforces hard numeric limits that never show up until you hit them: 100 total object properties, 5 levels of nesting, 500 enum values, a 15,000-character cap across all property names and enum/const values combined.

Claude's structured outputs support a similar `additionalProperties: false` requirement, but the failure mode is quieter — the official SDKs will silently strip unsupported keywords like `minLength` or `minimum` and re-validate your original schema locally, so you may never notice the wire schema doesn't say what you think it says unless you're calling the API directly. It also only accepts a specific list of string `format` values (things like `date-time`, `email`, `uuid` — no `url` or `regex`), which is an easy one to miss.

Gemini's `responseSchema` is different again: it's built on a constrained OpenAPI 3.0 subset that doesn't support `$ref` at all, so a schema built around reusable `$defs` has to be manually inlined first — the single most common reason a schema that works against OpenAI or Claude fails against Gemini specifically.

None of this shows up as a JSON syntax error. The schema parses fine; it just doesn't mean what you think it means to the specific provider you're sending it to, and the failure often only appears once real traffic hits it.

The new **Structured Output Schema Linter** on Bracketly checks a pasted schema against whichever of the three you pick, flags exactly which rule it breaks and why, and auto-detects common request/tool wrappers so you can paste the whole `response_format` block or tool definition instead of digging out the inner schema by hand. Every rule it checks traces back to a provider's own published documentation — where something wasn't clearly confirmed, it's left unchecked rather than guessed at.

Like every tool on Bracketly, it runs entirely in your browser — nothing you paste is sent anywhere.

Try it: https://bracketly.pages.dev/tools/structured-output-linter/
