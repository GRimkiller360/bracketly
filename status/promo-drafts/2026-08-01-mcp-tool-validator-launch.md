# Your MCP Tool Definition Can Be 100% Spec-Compliant and Still Not Work

I've been building a few free browser-based tools for people working with LLM APIs — a GPT token counter, a Citations API debugger, a Gemini thought-signature checker. This week I added one for the Model Context Protocol: a schema validator for MCP tool definitions.

What sent me down this path was how small the actual MCP spec is. A `Tool` object only has two required fields: `name` and `inputSchema`. That's it. No character restrictions on the name, no length cap, nothing that says `inputSchema` has to describe an object at its root rather than, say, a string or an array. Read the raw JSON Schema for `Tool` and you'd reasonably conclude almost anything goes.

Then you actually wire a server up to a real client and watch tools silently fail to load, or get called with arguments that don't match what you expected, and none of it was a JSON syntax error — the JSON was fine the whole time.

The gap is between what the spec *requires* and what every real client *assumes*. Tool names get used as function identifiers, so a name with a space or a slash in it works fine against the raw protocol and then gets rejected the moment it passes through an OpenAI-compatible bridge, because OpenAI's function-calling format does constrain names and the bridge inherits that constraint whether or not MCP itself does. `inputSchema` without `"type": "object"` at the root parses as valid JSON Schema and then breaks argument validation, because every SDK assumes tool arguments arrive as a JSON object of named parameters, spec text or not. A `required` array listing a property that doesn't exist in `properties` is a typo the spec has no opinion on, but it'll confuse the client's own JSON Schema validator in a way that's hard to trace back to that one line.

None of these are things a JSON validator catches, and none of them are exactly the MCP spec's problem either — they're the difference between "technically valid" and "what actually works," which is exactly the gap a linter is for.

So the tool checks both: the hard spec requirements (missing `name`, missing `inputSchema`, a `required` entry that doesn't exist) as errors, and the practical client conventions (name character set, 64-character length caps, `$ref` support varying by client) as warnings, labeled clearly as which is which. Paste a single tool, an array, or a full `tools/list` response — it detects the shape and validates every tool in it. Free, runs entirely client-side, no server ever sees your tool definitions.

[Try it here](https://bracketly.pages.dev/tools/mcp-tool-validator/) — feedback and edge cases welcome.
