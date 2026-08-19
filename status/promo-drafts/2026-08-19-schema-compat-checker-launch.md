# Your JSON Schema Isn't Actually Portable Across OpenAI, Claude, and Gemini

Here's an assumption I had to unlearn: "structured outputs" doesn't mean the same JSON Schema behaves the same way everywhere. All three major providers now enforce a schema at the sampling level instead of just hoping the model follows it — but each one enforces a different, non-standard *subset* of JSON Schema, and the gaps between them are not obvious from the outside. Send a schema with a keyword one provider doesn't support, and you usually don't get an error. You get a response that quietly doesn't honor the constraint you thought you'd locked in.

A few concrete ones I ran into pulling this together:

**Claude** flat-out won't do numeric or string length constraints — no `minimum`, `maximum`, `minLength`, `maxLength` — and array bounds are limited to `minItems` of exactly 0 or 1, nothing else. This is straight from Anthropic's own docs, not a guess. It also can't do recursive schemas or an `enum` with an object/array inside it.

**Gemini** goes the other direction — its `responseSchema` isn't JSON Schema at all, it's a deliberately narrow, Gemini-specific type that's a subset of OpenAPI 3.0. I pulled the actual `Schema` interface straight from Google's SDK source to check this properly: there's no `$ref`, no `$defs`, no `oneOf`, no `allOf` field on it, period. If your schema uses any of those — common if you generated it from a Pydantic model or a TypeScript type — it needs to be flattened before Gemini will accept it. It *does* support `pattern` and length/item bounds, which is exactly what Claude refuses.

**OpenAI's** strict mode has its own well-known shape: every property has to be listed in `required` (no true optionality — express it with a nullable type instead), every object needs `additionalProperties: false`, and the numeric/string/array constraint keywords are accepted as valid JSON but not actually enforced by the constrained decoder.

None of this is documented in one place, and I didn't want to build a checker on vibes, so every rule here traces to something verifiable — Anthropic's own docs quoted directly, and Gemini's actual SDK type definition rather than a blog post's summary of it. Paste a schema, see exactly which keywords each of the three will drop, ignore, or reject, with the file path pointing at where in your schema the problem is.

Free, runs entirely in your browser, nothing you paste leaves your machine: [bracketly.pages.dev/tools/schema-compat-checker](https://bracketly.pages.dev/tools/schema-compat-checker/)
