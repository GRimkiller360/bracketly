export interface Tool {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  keywords: string[];
  icon: string;
  category: string;
  content: { heading: string; body: string }[];
  faq: { q: string; a: string }[];
}

// Registry of every tool on the site. Adding an entry here + a page in
// src/pages/tools/<slug>.astro is the entire process for shipping a new tool —
// the homepage, sitemap, and nav all derive from this list automatically.
export const tools: Tool[] = [
  {
    slug: "json-formatter",
    title: "JSON Formatter & Validator",
    shortTitle: "JSON Formatter",
    description:
      "Format, validate, and beautify JSON instantly. Catches syntax errors with line numbers. Runs entirely in your browser — nothing you paste is ever sent anywhere.",
    keywords: ["json formatter", "json validator", "json beautifier", "json pretty print"],
    icon: "{ }",
    category: "Data",
    content: [
      {
        heading: "When you need a JSON formatter",
        body: "API responses, application logs, and config files are often returned or stored as a single unbroken line of JSON — technically valid, but nearly unreadable by eye. Pasting that into a formatter re-indents it into a nested, human-readable structure so you can actually see where one object ends and the next begins, spot a missing field, or compare two payloads side by side. It's also the fastest way to check whether a JSON blob is valid at all before feeding it into code — a parser fails loudly and precisely rather than your application failing somewhere downstream with a less helpful error.",
      },
      {
        heading: "How this tool validates and formats JSON",
        body: "Under the hood this uses JavaScript's built-in JSON.parse, the same parser every browser and Node.js runtime uses, so a syntax error caught here is a syntax error anywhere. If parsing fails, the browser's own error message — including the character position of the failure — is shown directly, which almost always points at a missing comma, an unquoted object key, or a trailing comma before a closing brace (all invalid in strict JSON, unlike JavaScript object literals). Once parsed successfully, JSON.stringify re-serializes the data with two-space indentation for the formatted view, or with no whitespace at all for the compact view — both are lossless round-trips of the exact same data, just formatted differently.",
      },
    ],
    faq: [
      {
        q: "Is it safe to paste sensitive JSON data here?",
        a: "Yes. This tool runs entirely in your browser using JavaScript's built-in JSON.parse — your data is never sent to a server or stored anywhere, even temporarily.",
      },
      {
        q: "What's the difference between formatting and validating JSON?",
        a: "Validating just checks whether the JSON is syntactically correct. Formatting (also called 'pretty printing') additionally re-indents it with consistent spacing so it's easier to read. This tool does both at once — if it formats successfully, the JSON is valid.",
      },
      {
        q: "Why does it show an error with a specific position?",
        a: "JSON parse errors report the character position where parsing failed, which usually points to a missing comma, an unquoted key, or a trailing comma right before that position.",
      },
    ],
  },
  {
    slug: "base64",
    title: "Base64 Encoder & Decoder",
    shortTitle: "Base64 Encode/Decode",
    description:
      "Encode text to Base64 or decode Base64 back to plain text, live as you type. Supports UTF-8. 100% client-side.",
    keywords: ["base64 encode", "base64 decode", "base64 converter online"],
    icon: "B64",
    category: "Encoding",
    content: [
      {
        heading: "When you need Base64 encoding",
        body: "Base64 shows up anywhere binary or arbitrary data has to travel through a system that only safely handles plain ASCII text — embedding a small image directly inside a CSS file or HTML page as a data: URI, reading the username:password pair inside an HTTP Basic Authorization header, decoding an email's MIME attachment, or inspecting the header and payload segments of a JWT (which use Base64URL, a close variant). If you've ever seen a long string of letters, numbers, and a few '+', '/', or '=' characters where you expected readable text, it's almost certainly Base64.",
      },
      {
        heading: "How encoding and decoding actually work",
        body: "Base64 takes data 3 bytes (24 bits) at a time and re-slices those bits into four 6-bit groups, each mapped to one of 64 printable characters (A–Z, a–z, 0–9, '+', '/') — hence the name. That's why encoded output is always roughly 4/3 the length of the input, and why it's padded with '=' characters when the input length isn't a multiple of 3. This tool encodes your text as UTF-8 bytes first, so accented letters, symbols, and emoji round-trip correctly rather than being mangled — a common bug in older tools that assumed plain ASCII input.",
      },
    ],
    faq: [
      {
        q: "What is Base64 encoding actually used for?",
        a: "Base64 converts binary or text data into a safe set of ASCII characters, commonly used for embedding images in CSS/HTML, encoding data in URLs, email attachments (MIME), and JWT tokens.",
      },
      {
        q: "Is Base64 the same as encryption?",
        a: "No — Base64 is encoding, not encryption. It provides zero security or confidentiality; anyone can decode it instantly. Never use Base64 alone to protect sensitive data.",
      },
      {
        q: "Does this tool support non-English characters?",
        a: "Yes. Text is encoded as UTF-8 bytes before Base64 conversion, so accented characters, emoji, and non-Latin scripts round-trip correctly.",
      },
    ],
  },
  {
    slug: "jwt-decoder",
    title: "JWT Decoder",
    shortTitle: "JWT Decoder",
    description:
      "Decode a JSON Web Token's header and payload instantly and inspect expiry. Your token is decoded locally in the browser and never leaves your machine.",
    keywords: ["jwt decoder", "decode jwt online", "jwt parser"],
    icon: "JWT",
    category: "Security",
    content: [
      {
        heading: "When you need a JWT decoder",
        body: "JWTs are the backbone of most modern session and API authentication, and when something goes wrong — a user gets logged out unexpectedly, an API call is rejected as unauthorized, an SSO integration returns claims that don't match what you expected — the fastest diagnostic step is almost always to look inside the token itself. Pasting it here shows exactly what claims the issuer put in, whether the token has already expired, and whether the payload matches what your backend or identity provider's documentation says it should contain, without writing a single line of debugging code.",
      },
      {
        heading: "What decoding a JWT actually shows you — and what it doesn't",
        body: "A JWT is three Base64URL-encoded segments joined by dots: a header (describing the signing algorithm), a payload (the actual claims — things like sub, exp, iat, and any custom fields the issuer added), and a signature. Because the header and payload are just encoded JSON, not encrypted, anyone holding the token can read them — which is exactly what this tool does, entirely in your browser. What it deliberately does not do is verify the signature, since that requires the issuer's secret or public key, something this tool never asks for. A JWT that decodes cleanly here could still be a forged or expired token from a security standpoint — decoding tells you what the token claims, not whether a server should trust it.",
      },
    ],
    faq: [
      {
        q: "Is it safe to paste a real JWT into this tool?",
        a: "Decoding happens entirely client-side — the token never touches a server. That said, JWTs often contain sensitive claims, so treat any tool (including this one) with the same care you'd use for other credential data.",
      },
      {
        q: "Does this verify the token's signature?",
        a: "No — this tool only decodes the header and payload, which are just Base64-encoded JSON and readable by anyone without a key. Verifying the signature requires the issuer's secret or public key, which this tool never asks for or has access to.",
      },
      {
        q: "Why does it say my token is expired?",
        a: "The payload's 'exp' claim is a Unix timestamp for when the token expires. This tool compares it against your current system clock — if your device's clock is wrong, expiry status may be misleading.",
      },
    ],
  },
  {
    slug: "uuid-generator",
    title: "UUID / ULID Generator",
    shortTitle: "UUID Generator",
    description:
      "Generate v4 UUIDs or ULIDs in bulk, one click to copy. Uses your browser's cryptographically secure random number generator.",
    keywords: ["uuid generator", "ulid generator", "generate uuid online"],
    icon: "#ID",
    category: "Data",
    content: [
      {
        heading: "When you need a UUID or ULID",
        body: "Any time you need a unique identifier that doesn't depend on a central database counter — a primary key for a new database row, an idempotency key for a payment API call, a request ID to trace through distributed logs, or just realistic-looking mock data for a test fixture — a UUID or ULID does the job without any coordination between services. ULIDs specifically are a good fit wherever you also want IDs to sort in the order they were created, something a random UUID can't give you.",
      },
      {
        heading: "v4 UUID vs ULID — and how the randomness is generated",
        body: "A v4 UUID is 128 bits, of which 122 are genuinely random (the remaining 6 are fixed to mark the version and variant per the UUID spec) — with no relationship to when it was created. A ULID instead spends its first 48 bits on a millisecond timestamp and the remaining 80 on randomness, so ULIDs generated later always sort lexicographically after earlier ones, which is genuinely useful for a database index. Both are generated here using crypto.getRandomValues(), the browser's cryptographically secure random number source — not Math.random(), which isn't designed to be unpredictable and shouldn't be used anywhere uniqueness or security matters.",
      },
    ],
    faq: [
      {
        q: "What's the difference between a UUID and a ULID?",
        a: "A v4 UUID is 128 bits of random data with no inherent ordering. A ULID encodes a timestamp in its first 48 bits, so ULIDs generated later always sort after earlier ones — useful for database primary keys where you want both uniqueness and chronological order.",
      },
      {
        q: "Are the generated UUIDs cryptographically random?",
        a: "Yes — this tool uses the browser's crypto.getRandomValues() API, a cryptographically secure random number generator, not Math.random().",
      },
      {
        q: "Can two generated UUIDs ever collide?",
        a: "Technically possible but astronomically unlikely: a v4 UUID has 122 random bits, so you'd need to generate roughly a trillion per second for a billion years before a 50% chance of one collision.",
      },
    ],
  },
  {
    slug: "regex-tester",
    title: "Regex Tester",
    shortTitle: "Regex Tester",
    description:
      "Test regular expressions against sample text with live match highlighting and capture group breakdown.",
    keywords: ["regex tester", "regex101 alternative", "test regular expression online"],
    icon: ".*",
    category: "Text",
    content: [
      {
        heading: "When you need to test a regular expression",
        body: "Regex is powerful and famously easy to get subtly wrong — a pattern that correctly matches your first three test cases can silently fail on the fourth. Testing against real sample text before dropping a pattern into a validation function, a log-parsing script, or a find-and-replace across a codebase catches those edge cases immediately, with the specific matches and capture groups highlighted rather than a pass/fail guess. It's also just a faster way to build a pattern incrementally — write a small piece, see what it actually matches, extend it — instead of writing the whole thing blind.",
      },
      {
        heading: "Why a pattern might not match what you expect",
        body: "This tool uses JavaScript's native regex engine, the same one every browser and Node.js run, so behavior matches exactly what your actual code will do (with minor flavor differences from PCRE, Python, or .NET regex in edge cases like lookbehind support). The most common reasons a pattern silently doesn't match: forgetting the 'g' flag when you expect more than one match per string, an unescaped special character like '.', '(', or '$' that needs a backslash to be treated literally, or case sensitivity, fixed by adding the 'i' flag. Capture groups — the parenthesized parts of a pattern — are broken out individually per match here, so you don't have to manually count parentheses to figure out which group captured what.",
      },
    ],
    faq: [
      {
        q: "What regex flavor does this tool use?",
        a: "JavaScript's native regex engine (ECMAScript), the same one used by Node.js and every browser. Syntax and behavior may differ slightly from PCRE, Python, or .NET regex in edge cases like lookbehind support and Unicode property escapes.",
      },
      {
        q: "Why isn't my pattern matching anything?",
        a: "Common culprits: forgetting the 'g' flag when you expect multiple matches, unescaped special characters like '.' or '(' that need a backslash, or case sensitivity — add the 'i' flag for case-insensitive matching.",
      },
      {
        q: "How do I see capture groups?",
        a: "Capture groups — the parts of your pattern wrapped in parentheses — are broken out separately for each match, so you can see exactly what each group captured without manually counting parentheses.",
      },
    ],
  },
  {
    slug: "timestamp-converter",
    title: "Unix Timestamp Converter",
    shortTitle: "Timestamp Converter",
    description:
      "Convert Unix timestamps to human-readable dates and back, in any timezone, instantly.",
    keywords: ["unix timestamp converter", "epoch converter", "timestamp to date"],
    icon: "T:00",
    category: "Data",
    content: [
      {
        heading: "When you need a Unix timestamp converter",
        body: "Databases, server logs, and most APIs store and transmit time as a Unix timestamp rather than a readable date, precisely because it's compact and doesn't depend on timezone or locale. That's efficient for machines and unreadable for humans debugging an issue — converting a raw number like 1732300800 into an actual calendar date and time (and back) is a routine step when you're reading through logs, comparing an API's returned created_at field against 'now', or double-checking a JWT's exp claim without doing the math in your head.",
      },
      {
        heading: "Seconds vs milliseconds, and timezones",
        body: "This tool auto-detects the two common representations by digit count: a 10-digit number is treated as seconds since the Unix epoch (00:00:00 UTC, January 1, 1970), a 13-digit number as milliseconds — matching how most languages and databases actually represent Unix time (JavaScript's own Date.now() returns milliseconds, for example, while most Unix system calls return seconds). The converted result is shown in both your browser's local timezone and UTC side by side, which is usually the fastest way to sanity-check a timestamp when you're comparing something that happened on a server in one timezone against your own clock.",
      },
    ],
    faq: [
      {
        q: "What is a Unix timestamp?",
        a: "A Unix timestamp (or 'epoch time') is the number of seconds that have elapsed since January 1, 1970 UTC. It's a compact, timezone-independent way to represent a point in time, widely used in databases, logs, and APIs.",
      },
      {
        q: "Does this tool handle milliseconds or just seconds?",
        a: "It auto-detects both — a 10-digit number is treated as seconds, a 13-digit number as milliseconds, matching how most languages and databases represent Unix time.",
      },
      {
        q: "How do I convert to a specific timezone?",
        a: "The converted date is shown in your browser's local timezone by default, plus UTC for reference — useful for comparing a timestamp across regions without doing manual offset math.",
      },
    ],
  },
  {
    slug: "url-encoder",
    title: "URL Encoder & Decoder",
    shortTitle: "URL Encode/Decode",
    description:
      "Encode text or full URLs into percent-encoded form, or decode them back to readable text, instantly. 100% client-side.",
    keywords: ["url encoder", "url decoder", "percent encoding", "urlencode online"],
    icon: "%20",
    category: "Encoding",
    content: [
      {
        heading: "When you need to encode or decode a URL",
        body: "Any value placed inside a URL — a search query, a path segment, a value in a form submission — needs encoding whenever it might contain a character with special meaning to the URL format itself: a space, '&', '?', '#', or a non-ASCII character. Skip that step and the URL either breaks outright or silently gets parsed wrong (a '&' inside a value getting read as a new parameter, for instance). This tool is also useful in reverse — decoding a percent-encoded string from a webhook payload, a browser address bar, or a log file back into something readable.",
      },
      {
        heading: "encodeURIComponent vs encodeURI, and non-ASCII characters",
        body: "This tool uses JavaScript's encodeURIComponent, which aggressively escapes almost everything except unreserved characters (letters, digits, '-', '_', '.', '~') — correct for encoding one query parameter or path segment, since it also escapes characters like '&', '=', and '/' that would otherwise be misread as URL structure. Its cousin encodeURI (not used here) is meant for encoding a whole URL rather than one piece of it, so it deliberately leaves those structural characters alone. Non-ASCII characters — accented letters, emoji, non-Latin scripts — are first converted to their UTF-8 byte sequence and each byte percent-encoded separately, exactly matching how a real browser encodes a URL, so an emoji becomes several %XX groups rather than one.",
      },
    ],
    faq: [
      {
        q: "When do I need to URL-encode a string?",
        a: "Whenever a value is placed inside a URL — a query parameter, path segment, or form submission — and might contain reserved characters like spaces, '&', '?', or '#' that would otherwise be misinterpreted as part of the URL's structure.",
      },
      {
        q: "What's the difference between encodeURIComponent and encodeURI?",
        a: "This tool uses encodeURIComponent, which escapes nearly everything except unreserved characters — correct for encoding a single query parameter or path segment. encodeURI (not used here) preserves characters like '/', ':', and '?' since it's meant for encoding a whole URL, not a component of one.",
      },
      {
        q: "Does it handle emoji and non-ASCII characters?",
        a: "Yes — non-ASCII characters are encoded as their UTF-8 byte sequence in percent-encoded form (e.g. an emoji becomes multiple %XX groups), matching how browsers actually encode URLs.",
      },
    ],
  },
  {
    slug: "hash-generator",
    title: "Hash Generator — MD5, SHA-1, SHA-256, SHA-512",
    shortTitle: "Hash Generator",
    description:
      "Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from text instantly. Runs entirely in your browser using the Web Crypto API — nothing you type is ever sent anywhere.",
    keywords: ["hash generator", "md5 hash online", "sha256 online", "sha1 generator"],
    icon: "#H",
    category: "Security",
    content: [
      {
        heading: "When you need to generate a hash",
        body: "A cryptographic hash gives you a short, fixed-length fingerprint of arbitrary data — useful whenever you need to verify two things are identical without comparing them byte-for-byte, or without transferring the whole thing at all. Checking a downloaded file's SHA-256 against the one published by its source confirms it wasn't corrupted or tampered with in transit; hashing a string is also a common way to generate a stable cache-busting key or a deduplication fingerprint for otherwise-large content.",
      },
      {
        heading: "MD5, SHA-1, SHA-256, SHA-512 — which one to use",
        body: "All four are generated here using the browser's native Web Crypto API (crypto.subtle.digest), entirely client-side. MD5 and SHA-1 are both cryptographically broken for security purposes — collisions (two different inputs producing the same hash) can be deliberately engineered — but they're still common for non-security uses like file-integrity checksums, which is why they're included. SHA-256 is the current practical standard wherever security actually matters; SHA-512 offers a larger security margin at a small performance cost. Hashing is a one-way function by design: there's no way to reverse a hash back into the original input, which is also why hashing alone (without salting) is insufficient for storing passwords — an attacker can still guess common passwords and check whether their hash matches yours.",
      },
    ],
    faq: [
      {
        q: "Is MD5 still safe to use?",
        a: "Not for security purposes — MD5 is cryptographically broken and collisions can be deliberately engineered. It's still commonly used for non-security purposes like file integrity checksums, which is why it's included here. For anything security-sensitive (password hashing, digital signatures), use SHA-256 or stronger.",
      },
      {
        q: "What's the difference between SHA-1, SHA-256, and SHA-512?",
        a: "They're different algorithm variants producing different output lengths (160, 256, and 512 bits respectively) and security margins. SHA-1 is deprecated for security use like MD5; SHA-256 is the current practical standard; SHA-512 offers a larger security margin at a small performance cost.",
      },
      {
        q: "Can a hash be reversed back to the original text?",
        a: "No — hashing is a one-way function by design. What you can do is compare a hash against known values (e.g. rainbow tables for common passwords), which is why hashing alone isn't sufficient for password storage without techniques like salting.",
      },
    ],
  },
  {
    slug: "cron-parser",
    title: "Cron Expression Parser & Explainer",
    shortTitle: "Cron Parser",
    description:
      "Paste a cron expression to get a plain-English explanation and the next 5 scheduled run times. Supports ranges, steps, lists, and @daily/@hourly shortcuts. 100% client-side.",
    keywords: ["cron parser", "crontab explainer", "cron expression generator", "what does this cron mean"],
    icon: "⏱",
    category: "Data",
    content: [
      {
        heading: "When you need a cron expression parser",
        body: "Cron syntax is compact by design and correspondingly easy to misread — is */15 every 15 minutes or something else, does 0 9 * * 1-5 actually mean weekday mornings? Before shipping a scheduled job (a deploy pipeline, a backup script, a cron-triggered cloud function), pasting the expression here confirms in plain English exactly when it will run and shows the next five real run times, which catches a mistake — like accidentally scheduling for every hour instead of every day — before it causes a problem in production rather than after.",
      },
      {
        heading: "The day-of-month / day-of-week 'OR' rule most people get wrong",
        body: "The single most common cron misunderstanding: when both the day-of-month and day-of-week fields are restricted (not *), a real cron scheduler treats a date as a match if it satisfies either field, not both — an AND would be the intuitive reading, but standard cron uses OR in that specific case. This tool implements that exact behavior rather than the more intuitive-but-wrong AND logic. It supports the standard 5-field format plus ranges (1-5), steps (*/15), comma-separated lists (1,15), and the @yearly/@monthly/@weekly/@daily/@hourly/@midnight shortcuts; named months or weekdays like 'MON' or 'JAN' aren't supported, so use numbers instead. Next-run times are computed by simulating forward minute-by-minute from right now, entirely in your browser.",
      },
    ],
    faq: [
      {
        q: "What cron syntax does this support?",
        a: "The standard 5-field format (minute, hour, day-of-month, month, day-of-week), including *, ranges like 1-5, steps like */15, comma-separated lists like 1,15, and the common @yearly/@monthly/@weekly/@daily/@hourly/@midnight shortcuts. Named months or weekdays (e.g. 'MON' or 'JAN') aren't supported — use numbers.",
      },
      {
        q: "Why does 'day-of-month' say 'or' with 'day-of-week' instead of 'and'?",
        a: "This matches real cron behavior: when both the day-of-month and day-of-week fields are restricted (not *), a date matches if it satisfies either one, not both. If only one of the two is restricted, only that one is used.",
      },
      {
        q: "How are the next run times calculated?",
        a: "This tool simulates forward minute-by-minute from the current time on your device, checking each candidate against the parsed schedule, until it finds 5 matches (capped at 2 years out). Everything happens locally in your browser — your cron expression is never sent anywhere.",
      },
    ],
  },
  {
    slug: "color-converter",
    title: "Color Converter — HEX, RGB, HSL",
    shortTitle: "Color Converter",
    description:
      "Convert colors between HEX, RGB, and HSL formats live, with an instant preview swatch.",
    keywords: ["color converter", "hex to rgb", "rgb to hsl", "color picker online"],
    icon: "◍",
    category: "Design",
    content: [
      {
        heading: "When you need to convert between color formats",
        body: "Designers and CSS often speak in different color formats for the same underlying color — a design handoff might specify a hex swatch, while you want HSL specifically because it's far easier to reason about lightening, darkening, or desaturating a color by adjusting one number instead of recalculating three interdependent RGB channels. This tool converts live between all three formats with an instant preview, so you can paste in whatever format you were handed and get back whichever format your codebase actually uses.",
      },
      {
        heading: "RGB vs HSL — and why HSL is easier to tweak",
        body: "RGB defines a color by the intensity of red, green, and blue light needed to produce it — precise, but not intuitive to a human trying to make a color 'a bit lighter.' HSL (hue, saturation, lightness) describes the same color space in terms people actually think in: hue is the base color itself on a 360° wheel, saturation is how vivid or muted it is, and lightness is how close to black or white it sits. Nudging just the lightness value up or down gives a predictable lighter or darker shade of the exact same hue — something that requires recalculating all three RGB channels together to do correctly. All three output formats here (hex, rgb(), hsl()) are valid CSS values that can be pasted directly into a stylesheet.",
      },
    ],
    faq: [
      {
        q: "What's the difference between RGB and HSL?",
        a: "RGB defines a color by its red, green, and blue light intensities. HSL (hue, saturation, lightness) describes the same color space more intuitively for humans — hue is the color itself on a wheel, saturation is intensity, and lightness is how close to black or white it is. HSL is often easier for tweaking a shade lighter/darker or more/less saturated.",
      },
      {
        q: "Can I paste any of these formats directly into CSS?",
        a: "Yes — all three output formats (hex like #3457d5, rgb(), and hsl()) are valid CSS color values and can be pasted directly into a stylesheet.",
      },
      {
        q: "Does this tool support alpha/transparency?",
        a: "Not currently — it converts fully opaque colors between HEX, RGB, and HSL. For transparency you'd add an alpha channel manually (e.g. rgba() or an 8-digit hex).",
      },
    ],
  },
  {
    slug: "token-counter",
    title: "GPT Token Counter",
    shortTitle: "Token Counter",
    description:
      "Count tokens for GPT-5, GPT-4o, and older OpenAI models as you type, using the exact same tokenizer OpenAI's API uses. 100% client-side — your text is never sent anywhere.",
    keywords: ["gpt token counter", "openai token counter", "tiktoken online", "count tokens gpt-4o", "llm token counter"],
    icon: "GPT",
    category: "AI",
    content: [
      {
        heading: "When you need a GPT token counter",
        body: "OpenAI's API bills by token, not by character or word, and most models also enforce a hard context-window limit measured in tokens — so before sending a long prompt (a big document for summarization, a lengthy system prompt, a large few-shot example set) it's worth knowing exactly how many tokens it costs and whether it fits, rather than finding out from a truncated response or a failed request. This tool counts as you type, live, which also makes it easy to compare the token cost of two different phrasings of the same prompt.",
      },
      {
        heading: "Why the same text costs different tokens on different models",
        body: "This uses js-tiktoken, the same byte-pair-encoding tokenizer library OpenAI's own API uses internally, with the identical vocabulary files — so for a plain text prompt, the count here matches exactly what you'd be billed. It automatically picks the right tokenizer for the model you select: o200k_base for the GPT-5 and GPT-4o families plus the o-series reasoning models, or cl100k_base for GPT-4, GPT-4 Turbo, GPT-3.5 Turbo, and the text-embedding-3 models. o200k_base's larger 200k-entry vocabulary packs non-English scripts and common multi-word phrases more efficiently than cl100k_base's 100k, so identical text can tokenize to noticeably fewer tokens depending which family you're targeting — which is exactly why token count isn't simply proportional to character or word count.",
      },
    ],
    faq: [
      {
        q: "Which models does this cover?",
        a: "Two tokenizers, chosen automatically from the model you pick: o200k_base for the GPT-5 and GPT-4o families plus the o-series reasoning models, and cl100k_base for GPT-4, GPT-4 Turbo, GPT-3.5 Turbo, and the text-embedding-3 models. It does not cover Claude, Gemini, or other non-OpenAI models — their tokenizers aren't compatible with tiktoken.",
      },
      {
        q: "Is this the exact same count the OpenAI API would bill me for?",
        a: "For a plain text prompt, yes — this uses js-tiktoken, the same byte-pair-encoding tokenizer OpenAI's own tiktoken library uses, with the identical vocabulary files. Chat-format requests add a small fixed per-message overhead on top of the raw text tokens (for role/name formatting), which this tool doesn't add since it only tokenizes the raw text you paste.",
      },
      {
        q: "Why do the same words cost different token counts in different models?",
        a: "o200k_base (GPT-5/GPT-4o) uses a larger 200k-word vocabulary than cl100k_base's 100k, which packs non-English scripts and common multi-word phrases more efficiently — the same sentence can tokenize to noticeably fewer tokens under o200k_base, especially for non-Latin scripts.",
      },
      {
        q: "Why did the page pause briefly when I opened it?",
        a: "The tokenizer's vocabulary file (roughly 1–2 MB depending on the model) loads on demand the first time you use this tool or switch model families, so it's cached in your browser tab from then on rather than bundled into every page on the site.",
      },
    ],
  },
  {
    slug: "citations-viewer",
    title: "Citations API Response Viewer",
    shortTitle: "Citations Viewer",
    description:
      "Paste a Claude Citations API response to see the answer text with each cited passage highlighted and matched to its source document, location, and quoted text. Optionally paste the source document to verify the citation's character indices actually match. 100% client-side.",
    keywords: [
      "claude citations api",
      "anthropic citations viewer",
      "citations api debugger",
      "llm citation checker",
      "claude api citations validator",
    ],
    icon: "[1]",
    category: "AI",
    content: [
      {
        heading: "When you need a Citations API response viewer",
        body: "Anthropic's Citations API feature lets Claude back its answer with specific passages from a source document, but the response comes back as a content array split across multiple blocks, each carrying its own citations with character or page indices into the source — genuinely useful data, but not something you can eyeball in raw JSON. This tool is for exactly the moment you're integrating that feature and need to see, at a glance, whether the highlighted answer text actually lines up with the source passage it claims to cite, before shipping it in front of real users.",
      },
      {
        heading: "What this tool checks, and how to read a mismatch",
        body: "Paste the full Messages API response, just its content array, or a single content block — this tool detects which shape you gave it. Each citation's location is one of three types depending on the source document format: char_location (plain text, using start/end character indices), page_location (PDFs, using page numbers), or content_block_location (custom content blocks, using block indices). When you also paste the original source document, the viewer slices it at the citation's exact indices and compares that slice to the cited_text Claude returned — a mismatch here almost always means you're comparing against a different version of the document than the one actually sent in the original request (different whitespace, a re-exported copy, an edited draft), not a bug in the Citations API itself.",
      },
    ],
    faq: [
      {
        q: "What is the Claude Citations API?",
        a: "It's a Messages API feature where you mark a document content block with citations: { enabled: true }. Instead of one plain text response, Claude splits its answer into multiple text blocks, and any block backed by a source document carries a citations array — each entry has the cited_text, which document it came from (document_index / document_title), and a location: a char_location (start_char_index/end_char_index) for plain text, a page_location (start_page_number/end_page_number) for PDFs, or a content_block_location (start_block_index/end_block_index) for custom content blocks.",
      },
      {
        q: "What exactly do I paste into this tool?",
        a: "The full Messages API response JSON, just its content array, or a single content block — this tool detects which one you gave it. The easiest way to get one is to log response.content (or the whole response) from a request where at least one document block had citations enabled, then paste that straight in.",
      },
      {
        q: "Why does it say a citation's indices don't match my source text?",
        a: "The verifier slices your pasted document at the citation's start_char_index and end_char_index and compares that exact slice to cited_text. A mismatch almost always means you pasted a different version of the document than the one actually sent in the request — different whitespace, a re-exported copy, or an edited draft — not a bug in the Citations API itself. It's meant as a debugging aid for your own integration.",
      },
    ],
  },
  {
    slug: "gemini-signature-validator",
    title: "Gemini Thought Signature Validator",
    shortTitle: "Signature Validator",
    description:
      "Paste a Gemini 3 request or response to check its function-calling turns for missing thoughtSignature fields, functionResponse ordering mistakes, and missing id echoes — the exact structural issues that cause a 400 error or silently broken multi-turn tool use. 100% client-side.",
    keywords: [
      "gemini thought signature",
      "gemini 3 function calling 400 error",
      "gemini functionCall validator",
      "thoughtSignature missing",
      "gemini multi-turn tool use debugger",
    ],
    icon: "TS",
    category: "AI",
    content: [
      {
        heading: "When you need a Gemini thought signature validator",
        body: "Gemini 3's function-calling flow attaches an opaque thoughtSignature to each functionCall part, and it has to be replayed back to the API unmodified on the next turn — strip it, reorder it, or serialize your conversation history in a way that drops it, and the next request comes back with a 400 error that doesn't obviously point at the signature as the cause. If you're mid-integration and hitting a mysterious 400 on the second or third turn of a tool-use loop, pasting the request or response here checks the exact structural rules Gemini enforces, rather than guessing which of several possible causes it is.",
      },
      {
        heading: "What this tool checks: signatures, ordering, and id echoes",
        body: "There are two distinct signature rules depending on the shape of the tool call: for several function calls made in parallel within one response, only the first functionCall part is required to carry a signature; for function calls made sequentially across separate turns, each turn's functionCall needs its own. This tool checks both cases specifically and reports exactly which turn is missing one, along with whether functionResponse parts match their corresponding functionCall in order and count, and whether the functionCall id is echoed back correctly. It accepts a full request body, a bare contents array, a raw API response, or a single content object, and detects which one you gave it — though response-only input skips the ordering checks, since there's no conversation history to check against. It can't verify what's inside a signature, only whether one is present where the API requires it — the contents are encrypted by Google and not decodable by anyone but Gemini itself.",
      },
    ],
    faq: [
      {
        q: "What is a Gemini thought signature?",
        a: "It's an encrypted, opaque string the Gemini 3 API attaches to a functionCall part to preserve the model's internal reasoning state across a multi-turn tool-use conversation. When you replay conversation history back to the API — including that functionCall and its result — you must include the thoughtSignature exactly as it was returned, unmodified. Leaving it out (or stripping it during your own serialization) makes the next request invalid.",
      },
      {
        q: "Why does my request fail with a 400 error?",
        a: "The most common cause is a missing thoughtSignature on a functionCall part being replayed into history. There are two signature rules: for parallel function calls in one response, only the first functionCall part carries a signature; for sequential function calls across separate turns, each turn's functionCall needs its own. This tool checks both cases and tells you exactly which turn is missing one.",
      },
      {
        q: "Can this tool decode or verify what's inside a thoughtSignature?",
        a: "No — thought signatures are encrypted by Google and not decodable client-side (or server-side, by anyone but Gemini itself). This tool only checks structure: whether a signature is present where the API requires one, whether functionResponse parts match their functionCall in order and count, and whether the Gemini 3 functionCall id is echoed back correctly. It can't tell you if a signature's contents are valid, only whether one is missing where it shouldn't be.",
      },
      {
        q: "What can I paste in?",
        a: "A full request body ({ contents: [...] }), a bare contents array, a raw generateContent/streamGenerateContent response ({ candidates: [...] }), or a single content object ({ role, parts }). This tool detects which shape you gave it. Response-only shapes are checked for a missing signature but skip the ordering checks, since there's no conversation history to check against.",
      },
    ],
  },
  {
    slug: "mcp-tool-validator",
    title: "MCP Tool Schema Validator",
    shortTitle: "MCP Validator",
    description:
      "Paste a Model Context Protocol tool definition — a single tool object, an array, or a full tools/list response — to check it against the spec: missing name or inputSchema, a name most clients will reject, a required property that doesn't exist, malformed annotations, and more. 100% client-side.",
    keywords: [
      "mcp tool validator",
      "model context protocol schema",
      "mcp inputSchema validator",
      "mcp server tool definition checker",
      "tools/list validator",
      "mcp tool annotations",
    ],
    icon: "MCP",
    category: "AI",
    content: [
      {
        heading: "When you need an MCP tool schema validator",
        body: "Building a Model Context Protocol server means hand-writing a JSON Schema for every tool's inputSchema, and it's easy to get something subtly wrong that a JSON.parse won't catch: a required parameter that's misspelled and doesn't actually exist in properties, an inputSchema missing its top-level \"type\": \"object\", a tool name with a space or slash in it that half your clients silently reject. None of these throw a parse error — the JSON is perfectly valid, just structurally wrong in a way that only shows up later as a tool that won't load, won't get called correctly, or gets called with arguments that don't match what your handler expects. Pasting your tool definition (or your whole tools/list response) here checks the same structural rules a client or a careful code reviewer would, before you find out the hard way.",
      },
      {
        heading: "What this tool checks — and what's spec vs. client convention",
        body: "The MCP spec itself only requires two fields on a Tool object: \"name\" and \"inputSchema\". Everything else — description, title, outputSchema, annotations — is optional, though a tool with no description gives the model nothing to go on when deciding whether to call it. This validator flags the hard spec violations (missing name/inputSchema, an inputSchema without \"type\": \"object\", a required entry that isn't defined in properties) as errors, and flags practical client conventions the spec doesn't technically mandate — like names containing spaces or punctuation, or names over 64 characters — as warnings, since most real MCP clients and OpenAI-compatible bridges treat tool names as function identifiers and reject or truncate ones that don't fit. It also checks annotations (readOnlyHint, destructiveHint, idempotentHint, openWorldHint) are booleans where present, though it's worth remembering these are hints only — the spec is explicit that clients must treat annotations as untrusted unless they come from a server they already trust, so annotations are a UX signal, not an enforced contract.",
      },
    ],
    faq: [
      {
        q: "What is a Model Context Protocol (MCP) tool definition?",
        a: "It's the JSON object an MCP server advertises for each tool it exposes, returned in a tools/list response. Per spec it needs a \"name\" and an \"inputSchema\" (a JSON Schema describing the tool's parameters); \"description\", \"title\", \"outputSchema\", and \"annotations\" are all optional but strongly recommended so a client — and the model calling the tool — knows what it does and what it expects.",
      },
      {
        q: "Does the spec really require inputSchema.type to be \"object\"?",
        a: "The MCP schema itself just types inputSchema as a generic JSON Schema object, but since tool arguments are always passed as a single JSON object of named parameters, every real client and SDK expects the root of inputSchema to be \"type\": \"object\" — this tool flags it as an error because in practice a schema without that will cause argument validation to fail or be skipped entirely, not because the raw spec text spells out that exact rule.",
      },
      {
        q: "Why does it warn about my tool name even though nothing looks structurally wrong?",
        a: "The MCP spec doesn't itself restrict which characters a tool name can contain. In practice, though, tool names are used as function identifiers by the model and by any OpenAI-compatible bridge sitting in front of your server — both commonly reject spaces, slashes, or other punctuation, and many cap length at 64 characters. This tool flags those as warnings (not spec errors) since they're the single most common reason a technically-valid tool definition fails to work in a real client.",
      },
      {
        q: "Can this tool verify my server actually implements the tool correctly?",
        a: "No — it only validates the shape of the tool definition JSON you paste in: required fields, inputSchema/outputSchema structure, name conventions, and annotation types. It can't call your server, so it has no way to check that your handler's actual behavior matches what the schema promises (e.g. that a required parameter is genuinely required by your code, or that responses match outputSchema at runtime).",
      },
    ],
  },
];

export function getTool(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}

// One accent color per category, used for tool card icons, hover glow, and
// the category pill on tool pages. Keeps the site colorful without every
// page needing its own palette decision. Each category has a light- and
// dark-mode variant so accent text stays at/above WCAG AA (4.5:1) against
// both the light and dark theme backgrounds — a single shared hex can't
// satisfy both since dark mode needs a lighter shade of the same hue.
export const categoryColors: Record<string, { light: string; dark: string }> = {
  Data: { light: "#4f46e5", dark: "#8b85ee" },
  Encoding: { light: "#066f89", dark: "#089bbf" },
  Security: { light: "#c71a40", dark: "#ea5d7c" },
  Text: { light: "#7c3aed", dark: "#a477f3" },
  Design: { light: "#c02067", dark: "#e5619c" },
  AI: { light: "#915300", dark: "#f59e0b" },
};

export function getCategoryColor(category: string): { light: string; dark: string } {
  return categoryColors[category] ?? { light: "#3457d5", dark: "#6d8bff" };
}
