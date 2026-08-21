# Your SKILL.md Works Fine Locally and Fails the Instant You Try to Share It

Agent Skills — the SKILL.md pattern for packaging reusable instructions for an AI coding agent — has quietly become the thing everyone's writing right now. Claude Code uses it, and it's built on an open, vendor-neutral standard so the same file format works across tools. Write a skill, drop it in a folder, and your agent picks it up. Simple.

Except the format has two faces, and most people writing skills only ever see one of them.

Claude Code accepts a generous set of frontmatter fields beyond the open standard — `argument-hint`, `when_to_use`, `disallowed-tools`, `effort`, and a handful more, all genuinely useful extensions for that one tool. Write a skill with any of those fields, test it locally, and it works perfectly. Then you try to upload it to claude.ai, publish it through the Skills API, or package it for distribution outside Claude Code, and it fails outright: `Unexpected key(s) in SKILL.md frontmatter`. The portable spec recognizes exactly six fields — `name`, `description`, `license`, `compatibility`, `metadata`, `allowed-tools` — and nothing else. Anything outside that list isn't a warning, it's a hard rejection.

There's a real, filed bug about this exact confusion: a validator flagging Claude Code's own documented extension fields as errors, because it was checking against the narrow six-field spec instead of the wider set Claude Code itself accepts. Two valid frontmatters, two different rulebooks, and no obvious signal for which one you're being held to until the upload fails.

The other trap is more mundane but just as common: `name` has to be lowercase, hyphens only, capped at 64 characters, no leading or trailing hyphen — easy to violate by accident with an underscore or a capital letter copied from a project name, and `description` has its own 1,024-character ceiling that a genuinely thorough one quietly sails past.

I built a validator that checks a pasted SKILL.md against both layers at once: real spec violations (bad name format, missing required fields, oversized description) flagged as errors, and every field outside the six-field portable set flagged separately as a host extension — fine in Claude Code, but exactly what will break portability elsewhere. It parses the actual frontmatter, not just eyeballs it.

Free, runs entirely in your browser, nothing you paste leaves your machine: [bracketly.pages.dev/tools/skill-md-validator](https://bracketly.pages.dev/tools/skill-md-validator/)
