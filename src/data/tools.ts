export interface Tool {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  /** Shorter variant for <meta name="description">/OG/Twitter tags when
   *  `description` runs past the ~160-char length search engines display
   *  before truncating. Falls back to `description` when omitted. */
  metaDescription?: string;
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
    metaDescription:
      "Format, validate, and beautify JSON instantly with error line numbers. 100% client-side — nothing you paste is ever sent anywhere.",
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
        a: "Technically possible but astronomically unlikely: a v4 UUID has 122 random bits, so even generating a billion of them per second, it would take roughly 86 years before you'd have a 50% chance of one collision.",
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
    metaDescription:
      "Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from text instantly using the Web Crypto API. 100% client-side — nothing is ever sent anywhere.",
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
    metaDescription:
      "Paste a cron expression for a plain-English explanation and the next 5 run times. Supports ranges, steps, lists, and @daily/@hourly shortcuts. 100% client-side.",
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
    metaDescription:
      "Count tokens for GPT-5, GPT-4o, and older OpenAI models as you type, using the exact tokenizer OpenAI's API uses. 100% client-side.",
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
    metaDescription:
      "Paste a Claude Citations API response to see the answer with each cited passage highlighted and matched to its source and quoted text. 100% client-side.",
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
    title: "Gemini 3 Function-Calling 400 Error Checker",
    shortTitle: "Signature Validator",
    description:
      "Getting a 400 error or silently broken multi-turn tool use from the Gemini 3 API? Paste your request or response to check function-calling turns for missing thoughtSignature fields, functionResponse ordering mistakes, and missing id echoes. 100% client-side.",
    metaDescription:
      "Fix Gemini 3 400 errors from function calling: check for missing thoughtSignature fields, bad functionResponse ordering, and other causes. 100% client-side.",
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
    metaDescription:
      "Paste an MCP tool definition — object, array, or tools/list response — to check it against the spec: missing fields, bad names, bad schemas. 100% client-side.",
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
  {
    slug: "embedding-truncator",
    title: "Embedding Vector Truncator & Renormalizer",
    shortTitle: "Embedding Truncator",
    description:
      "Truncate a Matryoshka-style embedding vector to fewer dimensions and correctly L2-renormalize it — the step most people skip when truncating OpenAI, Gemini, Cohere, or Nomic embeddings by hand. Optionally compare cosine similarity before and after. 100% client-side.",
    metaDescription:
      "Truncate a Matryoshka-style embedding vector to fewer dimensions and correctly L2-renormalize it — the step most people skip by hand. 100% client-side.",
    keywords: [
      "matryoshka embedding truncation",
      "embedding dimension reducer",
      "l2 renormalize embedding vector",
      "truncate embedding vector online",
      "embedding cosine similarity calculator",
    ],
    icon: "MRL",
    category: "AI",
    content: [
      {
        heading: "When you need to truncate an embedding vector",
        body: "Matryoshka Representation Learning (MRL) is now supported by most major embedding APIs — OpenAI's text-embedding-3 family, Gemini's gemini-embedding models, Cohere embed-v4, and Nomic Embed v1.5 among them — meaning a single embedding can be safely shortened after the fact to cut vector-database storage and search cost, with only a small, predictable accuracy loss. That's useful when you're storing embeddings you already generated at full size and want to shrink them for a cheaper index, or when a provider's own truncation option isn't available to you (a stored vector, an older SDK, a self-hosted Matryoshka-trained model where you slice the array yourself).",
      },
      {
        heading: "The renormalization step people skip",
        body: "Embedding vectors from these APIs are L2-normalized to unit length (magnitude 1) by default — that's what makes cosine similarity and dot-product search interchangeable and numerically stable. Slicing off the last N dimensions of a unit vector changes its magnitude, so the truncated vector is no longer unit length; skip renormalizing it and every downstream cosine-similarity or dot-product comparison against other vectors is subtly wrong. Providers that offer a native truncation parameter (like OpenAI's dimensions option) renormalize for you automatically — this tool does the same math by hand for the common case where you're truncating a vector yourself: compute the L2 norm of the truncated slice (the square root of the sum of its squared values) and divide every value by that norm.",
      },
    ],
    faq: [
      {
        q: "Why do I need to renormalize after truncating an embedding?",
        a: "Embeddings from Matryoshka-trained models are L2-normalized to unit length by default. Cutting off the last N dimensions changes the vector's magnitude, so the truncated vector is no longer unit length — comparing it to other vectors with cosine similarity or dot product without renormalizing first gives subtly wrong results. Renormalizing (dividing every value by the truncated vector's own L2 norm) restores unit length.",
      },
      {
        q: "Does this work for any embedding model?",
        a: "The math (truncate, then L2-renormalize) is universal linear algebra and works on any vector. It only meaningfully preserves the embedding's semantic properties if the model was actually trained with Matryoshka Representation Learning (OpenAI text-embedding-3 family, Gemini's gemini-embedding models, Cohere embed-v4, Nomic Embed v1.5, and others). Truncating a non-Matryoshka embedding this way will still run, but the result won't reliably preserve similarity rankings the way a Matryoshka-trained model's does.",
      },
      {
        q: "Why does the cosine similarity change after truncation?",
        a: "Some information is genuinely discarded when you drop dimensions, so a small, expected shift in cosine similarity between two truncated-and-renormalized vectors compared to their original full-length similarity is normal — that's the accuracy/size tradeoff Matryoshka truncation is designed around. This tool shows both the full-length and truncated similarity side by side so you can see exactly how much it shifted for your specific vectors.",
      },
      {
        q: "Is it safe to paste real embedding vectors here?",
        a: "Yes — parsing, truncation, renormalization, and similarity math all happen locally in your browser using plain JavaScript arithmetic. Nothing you paste is sent to a server or stored anywhere.",
      },
    ],
  },
  {
    slug: "ai-sdk-stream-debugger",
    title: "AI SDK Stream Protocol Validator & Debugger",
    shortTitle: "AI SDK Stream Debugger",
    description:
      "Paste a raw SSE response from a custom Vercel AI SDK backend and validate it against the UI Message Stream Protocol — catches malformed JSON, missing required fields, orphaned deltas, and unrecognized part types that silently break useChat. 100% client-side.",
    metaDescription:
      "Paste a raw SSE response from a custom Vercel AI SDK backend and validate it against the UI Message Stream Protocol used by useChat. 100% client-side.",
    keywords: [
      "vercel ai sdk stream protocol validator",
      "ai sdk data stream debugger",
      "usechat custom backend debugging",
      "ai sdk ui message stream format",
      "sse json stream validator llm",
    ],
    icon: "SSE",
    category: "AI",
    content: [
      {
        heading: "Why a custom AI SDK backend fails silently",
        body: "useChat, useCompletion, and the rest of AI SDK UI expect the response body from your API route to be an exact sequence of Server-Sent Events, each a single-line data: {...} JSON payload naming a specific part type — text-delta, tool-input-available, finish, and so on. When you're proxying through your own backend instead of AI SDK's built-in streamText/toUIMessageStreamResponse helpers — a different language, a hand-rolled proxy, a queue that re-serializes the stream — it's easy to drop a required field, emit an id out of order, or forget the closing data: [DONE] event. None of that throws an error: the client just renders nothing, drops a message, or stalls mid-response, and the only way to find out why is to capture the raw response body and read it by hand.",
      },
      {
        heading: "What this checks",
        body: "This tool parses each data: line as its own SSE event, matches its \"type\" field against the documented UI Message Stream Protocol part types (start, text-start/delta/end, reasoning-start/delta/end, reasoning-file, tool-input-start/delta/available, tool-output-available/denied, tool-approval-request/response, file, source-url, source-document, custom, data-*, error, start-step/finish-step/finish, abort), and checks that required fields are present with the right JSON type. It also tracks state across the whole stream — flagging a text-delta or reasoning-delta that references an id with no matching *-start, a *-start that's never closed, and a tool-output event referencing a toolCallId that was never introduced — then reconstructs the assembled message text a real client would have rendered, so you can see the end result of the stream at a glance.",
      },
    ],
    faq: [
      {
        q: "What exactly should I paste in?",
        a: "The raw response body from your streaming endpoint — the same bytes a browser's fetch() would receive. The easiest way to capture it is curl -N against your endpoint, or your browser's Network tab in raw/EventStream view; copy everything, including the data: prefixes and the blank lines between events.",
      },
      {
        q: "Does this tool actually run my stream through AI SDK's client code?",
        a: "No — it only re-implements structural validation against the publicly documented protocol shape, entirely in this page's own JavaScript. It can't tell you whether useChat will render the result exactly right, only whether the stream itself is well-formed.",
      },
      {
        q: "Why is a part type I'm using flagged as \"unrecognized\"?",
        a: "This checks against the currently documented set of part types. A very recently added type from a newer AI SDK release could be flagged even though it's valid — treat \"unrecognized type\" as a prompt to double-check against the current AI SDK docs, not a definitive error. Any type prefixed data- (used for custom application data) is always accepted.",
      },
      {
        q: "Is my stream data sent anywhere?",
        a: "No. Parsing, validation, and the reconstructed message preview all run locally in your browser with plain JavaScript — nothing you paste is transmitted or stored.",
      },
    ],
  },
  {
    slug: "mcp-migration-checker",
    title: "MCP Server Broken After Update? Migration Checker",
    shortTitle: "MCP Migration Checker",
    description:
      "MCP server or client stopped working after updating to the 2026-07-28 spec's stateless rewrite? Paste a request or response to check for the removed initialize handshake, missing _meta protocol fields, and malformed Multi Round-Trip Request results. 100% client-side.",
    metaDescription:
      "MCP server broke after an update? Check requests/responses against the 2026-07-28 stateless spec: removed handshake, missing _meta, more. 100% client-side.",
    keywords: [
      "mcp 2026-07-28 migration",
      "model context protocol stateless spec checker",
      "mcp _meta protocolversion validator",
      "mcp multi round-trip request validator",
      "mcp session id deprecated checker",
    ],
    icon: "M28",
    category: "AI",
    content: [
      {
        heading: "What changed in MCP's 2026-07-28 spec",
        body: "The Model Context Protocol's 2026-07-28 revision replaces the old stateful model — a one-time initialize/initialized handshake followed by an Mcp-Session-Id header on every later request — with a stateless design where each request carries its own protocol version and capabilities in a params._meta object. It also adds header-based routing (Mcp-Method / Mcp-Name / MCP-Protocol-Version) so gateways can route without parsing JSON bodies, a mandatory resultType field on every successful result, a Multi Round-Trip Requests (MRTR) mechanism for mid-call user input that replaces server-initiated streams, and optional ttlMs/cacheScope caching hints on list responses. All four Tier 1 SDKs (TypeScript, Python, Go, C#) already speak it, which means anything still shaped like the old handshake will start failing against updated servers or clients.",
      },
      {
        heading: "What this checks",
        body: "Paste either a bare JSON-RPC message or a raw HTTP block (request line + headers, a blank line, then the JSON body — e.g. copied from curl -i output or a browser's network inspector). For requests, it flags the deprecated initialize/initialized handshake, a missing or incomplete params._meta (checking for the required io.modelcontextprotocol/protocolVersion and io.modelcontextprotocol/clientCapabilities keys, and the optional clientInfo/logLevel keys), and — when headers are included — a lingering Mcp-Session-Id header or a missing/mismatched Mcp-Method, Mcp-Name, or MCP-Protocol-Version. For responses, it checks that result.resultType is present, validates input_required results carry inputRequests and requestState, and notes when a list-shaped result (tools/prompts/resources) is missing the new optional ttlMs/cacheScope caching hints.",
      },
    ],
    faq: [
      {
        q: "What exactly should I paste in?",
        a: "Either just the JSON-RPC message body on its own, or a full raw HTTP block — request line and headers, then a blank line, then the JSON body — if you want the header-level checks (Mcp-Method, Mcp-Name, MCP-Protocol-Version, and the deprecated Mcp-Session-Id) included too.",
      },
      {
        q: "How confident are these checks?",
        a: "Checks marked as spec violations (high severity) are verified directly against the published 2026-07-28 TypeScript schema and worked examples. Lower-severity notes — like the ttlMs/cacheScope caching hints, or the exact shape of individual Multi Round-Trip Request entries — are flagged more conservatively since those corners of the spec are less exhaustively documented; treat those as prompts to double-check, not definitive failures.",
      },
      {
        q: "Does this replace an actual MCP SDK's validation?",
        a: "No — it's a structural sanity check for spotting the specific things that break when migrating from the pre-2026-07-28 stateful model, not a substitute for testing against a real client or server SDK.",
      },
      {
        q: "Is my pasted request/response data sent anywhere?",
        a: "No. Everything is parsed and checked locally in your browser with plain JavaScript — nothing you paste is transmitted or stored.",
      },
    ],
  },
  {
    slug: "agent-plugin-validator",
    title: "Agent Plugins Manifest Validator",
    shortTitle: "Agent Plugin Validator",
    description:
      "Paste a plugin.json and optional mcp.json to check them against the Agent Plugins 1.0.0 specification (OpenAI, AWS, Cursor, Microsoft, and Vercel's Aug 2026 standard for portable agent extensions) — catches an invalid $schema, a malformed plugin name, disallowed fields, and broken MCP server configs. 100% client-side.",
    metaDescription:
      "Paste a plugin.json and optional mcp.json to check them against the Agent Plugins 1.0.0 spec for AI agent extensions. 100% client-side.",
    keywords: [
      "agent plugins validator",
      "plugin.json schema checker",
      "agent plugins 1.0.0 spec",
      "mcp.json validator",
      "openai agent plugins manifest",
    ],
    icon: "APM",
    category: "AI",
    content: [
      {
        heading: "What Agent Plugins is, and why plugin.json is easy to get wrong",
        body: "Agent Plugins 1.0.0, published August 6, 2026 by a working group spanning OpenAI, AWS, Cursor, Microsoft, and Vercel, is the new packaging layer that bundles Agent Skills (SKILL.md files) and MCP server configs into one portable folder that installs the same way across ChatGPT, Codex, GitHub Copilot, VS Code, Cursor, and Kiro. The manifest format is deliberately narrow — plugin.json permits exactly ten top-level fields, the name field has strict pattern rules, and nested objects like author use a closed schema — which makes it easy to accidentally add a field that gets silently ignored by every client, or write a name that fails validation outright, especially since the spec is only days old and most people are hand-writing their first manifest against blog posts and examples rather than the schema itself.",
      },
      {
        heading: "What this tool checks — and what it can't",
        body: "This validates plugin.json against the published 1.0.0 JSON Schema: the exact required $schema URL, the name field's pattern (lowercase alphanumeric, hyphens, and periods only; no consecutive hyphens or periods; must start and end alphanumeric; 1-64 characters), correct types for every optional field, and the closed author object. Per spec, an unrecognized top-level field or a non-object extensions value is non-fatal — clients report and ignore it rather than rejecting the whole plugin — so this tool flags those as warnings, not errors, matching real client behavior. The optional second field validates mcp.json the same way: the required $schema and mcpServers fields, and per-server rules for the three transport types (stdio, streamable-http, sse) — including the rule that a stdio command must be a single executable token, not a full command line, and that streamable-http/sse URLs must be absolute HTTPS (or HTTP only for loopback addresses) with no embedded credentials or fragment. What it can't do: check the actual skills/ directory structure, SKILL.md contents, or filesystem path containment — those require a real plugin package on disk, not just the two manifest files a browser tool can accept as pasted text.",
      },
    ],
    faq: [
      {
        q: "What is the Agent Plugins specification?",
        a: "A vendor-neutral packaging standard published August 6, 2026 by a working group including OpenAI, AWS, Cursor, Microsoft, and Vercel. A plugin is a directory with a plugin.json manifest, an optional skills/ folder of Agent Skills, and an optional mcp.json configuring MCP servers — the same plugin folder installs into ChatGPT, Codex, GitHub Copilot, VS Code, Cursor, and AWS's Kiro without per-client rewrites.",
      },
      {
        q: "Why is my plugin.json field being flagged as unknown even though it seems reasonable?",
        a: "The manifest schema is closed to exactly ten top-level fields: $schema, name, version, description, author, homepage, repository, license, keywords, and extensions. Anything else — a custom hooks or commands field, for instance — isn't part of the spec. Per the spec this is non-fatal (clients report and ignore it, then continue loading the plugin), so this tool flags it as a warning rather than an error, but it's worth moving genuinely client-specific data into the extensions field under your own namespace instead.",
      },
      {
        q: "Why did my plugin name get rejected?",
        a: "The name field has a strict pattern: 1-64 characters, lowercase alphanumeric characters, hyphens, and periods only, must start and end with an alphanumeric character, and can never contain consecutive hyphens (--) or consecutive periods (..). Valid examples from the spec include my-plugin, acme.tools, and even a single character like a. Uppercase letters, underscores, and spaces are all invalid.",
      },
      {
        q: "Does this tool check my actual skills/ folder or SKILL.md files?",
        a: "No — it only validates the two manifest files you paste in, plugin.json and mcp.json, against their published JSON Schemas and the spec's semantic rules. Checking a real skills/ directory structure or SKILL.md frontmatter requires access to an actual plugin package on disk, which a browser-based paste tool can't do.",
      },
      {
        q: "Is my manifest data sent anywhere?",
        a: "No. Parsing and validation both run locally in your browser using plain JavaScript — nothing you paste is transmitted or stored.",
      },
    ],
  },
  {
    slug: "mcp-apps-validator",
    title: "MCP Apps UI Resource Validator",
    shortTitle: "MCP Apps Validator",
    description:
      "Paste a tool's _meta.ui block, a UI resource from resources/read, or a ui/* postMessage envelope to check it against the MCP Apps 1.0 specification — catches a wrong resourceUri scheme, an incorrect mimeType, malformed CSP domain lists, and invalid ui/* message shapes. 100% client-side.",
    metaDescription:
      "Paste MCP Apps _meta.ui, a UI resource, or a ui/* postMessage envelope to validate it against the MCP Apps spec. 100% client-side.",
    keywords: [
      "mcp apps validator",
      "mcp ui resource checker",
      "model context protocol apps spec",
      "ui:// resource validator",
      "mcp postmessage protocol checker",
    ],
    icon: "APP",
    category: "AI",
    content: [
      {
        heading: "When you need an MCP Apps UI Resource validator",
        body: "MCP Apps is the first official extension folded directly into the Model Context Protocol's stable 2026-07-28 core spec — it lets a tool declare an interactive HTML UI (a ui:// resource) that renders inside the host application instead of just returning text, and defines a JSON-RPC postMessage protocol so that embedded UI can talk back to the host. Because it's genuinely new, the handful of places it's easy to get wrong aren't obvious from the HTML/JS you'd naturally write: the resource's mimeType needs an exact, easy-to-typo profile parameter; the sandboxed iframe's network access is opt-in per domain through a CSP metadata block that silently blocks everything if you forget it; and the postMessage handshake between host and view is a hand-rolled JSON-RPC exchange with no SDK yet doing the validation for you. Pasting any of the three pieces here — the tool's _meta.ui block, the resource itself, or a single postMessage envelope — checks it against the published spec before you spend time debugging a blank iframe or a mysteriously blocked fetch.",
      },
      {
        heading: "What this tool checks",
        body: "It auto-detects which of three shapes you pasted. A tool definition's _meta.ui: resourceUri must use the ui:// scheme, and visibility (if present) must be an array containing only \"model\" and/or \"app\" — omitted, it defaults to both. A resource declaration or resources/read content item (a single object, or a full { contents: [...] } response): uri must start with ui://, mimeType must be the exact string \"text/html;profile=mcp-app\" (not just \"text/html\"), and — when present — every _meta.ui.csp domain list (connectDomains, resourceDomains, frameDomains, baseUriDomains) must be an array of strings, since anything omitted defaults to fully blocked, not fully allowed. A ui/* JSON-RPC request or notification sent over postMessage: this validates the required params for ui/initialize (protocolVersion, capabilities, clientInfo, and appCapabilities.availableDisplayModes), ui/message, ui/open-link, ui/resource-teardown, ui/update-model-context, ui/request-display-mode, and the two host-to-view notifications (ui/notifications/tool-input, ui/notifications/tool-result) — an unrecognized ui/* method name is flagged as a note rather than a hard error, since the spec allows implementations to add their own. It can't validate a bare JSON-RPC response ({ result: {...} } with no method field), since responses don't name which message they're answering — paste the originating request or notification instead.",
      },
    ],
    faq: [
      {
        q: "What is the MCP Apps extension?",
        a: "MCP Apps (io.modelcontextprotocol/ui) is an official extension to the Model Context Protocol, folded into the stable 2026-07-28 core spec, that lets a server-defined tool declare an interactive HTML UI — a ui:// resource — which a host application renders in a sandboxed iframe instead of (or alongside) plain text output. A JSON-RPC protocol carried over postMessage lets that embedded UI exchange messages with the host: receiving tool inputs/results, requesting a display mode, or sending user actions back.",
      },
      {
        q: "Why is my resourceUri or resource uri being rejected?",
        a: "Every MCP Apps UI resource must use the ui:// URI scheme (e.g. ui://weather-server/dashboard-template), never http(s):// or a bare path. This is how a host recognizes a resource as an interactive app rather than a regular document.",
      },
      {
        q: "Why does it flag my mimeType even though it says text/html?",
        a: "The spec requires the exact string \"text/html;profile=mcp-app\", not just \"text/html\" — the ;profile=mcp-app parameter is what tells a host this HTML is meant to be rendered as an interactive MCP App (with the accompanying postMessage protocol available) rather than displayed as a plain document.",
      },
      {
        q: "Can this validate a ui/* response message?",
        a: "No — a JSON-RPC response ({ id, result }) doesn't carry a method name, so there's no way to know which message shape to check it against without the original request. Paste the request or notification (which does carry method) instead; this tool validates those directly.",
      },
      {
        q: "Is my pasted data sent anywhere?",
        a: "No. Detection and validation both run locally in your browser using plain JavaScript — nothing you paste is transmitted or stored.",
      },
    ],
  },
  {
    slug: "acp-message-validator",
    title: "Agent Client Protocol (ACP) Message Validator",
    shortTitle: "ACP Validator",
    description:
      "Paste a JSON-RPC message and check it against the Agent Client Protocol (ACP) — the Zed-originated, now multi-vendor standard for editor-to-coding-agent communication. Validates the initialize handshake and the session/new, session/prompt, session/cancel, and session/update baseline methods every agent must support. 100% client-side.",
    metaDescription:
      "Paste a JSON-RPC message to validate it against the Agent Client Protocol (ACP) — initialize, session/new, session/prompt, and more. 100% client-side.",
    keywords: [
      "agent client protocol validator",
      "acp json-rpc checker",
      "acp session/prompt validator",
      "acp initialize handshake",
      "coding agent editor protocol",
    ],
    icon: "ACP",
    category: "AI",
    content: [
      {
        heading: "What the Agent Client Protocol is",
        body: "ACP standardizes how a code editor talks to a coding agent over JSON-RPC 2.0, the same role LSP plays for language servers — instead of every editor writing a bespoke integration for every agent, both sides speak one protocol. Originated by Zed and now at a stable v1.0 with adopters including JetBrains, Gemini CLI, GitHub, and 25+ other agents, it defines a one-time initialize handshake to negotiate protocol version and capabilities, then a session-based loop (session/new to start, session/prompt to send a turn, session/update notifications streaming the agent's response back, session/cancel to interrupt) plus client-side callbacks an agent can invoke — reading/writing files, running a terminal, asking the user for permission before a risky action.",
      },
      {
        heading: "What this tool checks — and where the depth stops",
        body: "This validates the JSON-RPC envelope (jsonrpc: \"2.0\", correct request/notification/response shape) against the published, stable ACP v1 schema, and does deep field-level validation for the handshake and the four methods every agent MUST support per spec (session/new, session/prompt, session/cancel, session/update), plus the common client-capability methods (authenticate, session/request_permission, fs/read_text_file, fs/write_text_file). A frequent real mistake it catches: protocolVersion is an integer (currently 1), not a date-like string the way some other AI protocols format their version field. Every other recognized ACP method (session/load, session/fork, provider management, terminal control, the newer nes/* and document/* extensions) is checked against the full method table so a typo is still caught, just without field-level depth. It can't validate a bare JSON-RPC response ({ id, result }) against its method-specific shape, since a response alone doesn't name which request it's answering — paste the request instead to check what shape the response should have.",
      },
    ],
    faq: [
      {
        q: "What is the Agent Client Protocol (ACP)?",
        a: "A JSON-RPC 2.0 protocol, originated by Zed and now at a stable v1.0, that standardizes communication between code editors and AI coding agents — the same role the Language Server Protocol (LSP) plays for language servers. It defines an initialize handshake, a session-based prompt loop (session/new, session/prompt, session/update, session/cancel), and client-side capabilities an agent can invoke like file access, terminal execution, and permission requests.",
      },
      {
        q: "Why is my protocolVersion being rejected?",
        a: "ACP's protocolVersion is an unsigned 16-bit integer (currently 1 for the stable spec), not a string. A common mistake when coming from other AI protocols that use a date-like version string is sending \"1\" as text or a date such as \"2026-06-24\" — both fail validation, since the field must be a genuine JSON number.",
      },
      {
        q: "Which methods does this check in full field-level detail?",
        a: "The initialize handshake, and the four baseline methods every ACP agent must implement per spec: session/new, session/prompt, session/cancel, and session/update — plus authenticate, session/request_permission, fs/read_text_file, and fs/write_text_file. Other recognized ACP methods (session management extras, provider/terminal/document handling, the newer nes/* edit-suggestion methods) are checked against the full method table so a typo or wrong-direction method is still caught, just without validating their specific parameter shapes.",
      },
      {
        q: "Can this validate a response message?",
        a: "Only its JSON-RPC envelope — that it has exactly one of result or error, and that an error object carries a numeric code and string message. It can't check a response's result against its method-specific shape (e.g. that a session/new response actually has a sessionId), because a bare response has no method field to identify which request it's answering. Paste the originating request instead to see what shape its response needs.",
      },
      {
        q: "Is my pasted message sent anywhere?",
        a: "No. Parsing and validation both run locally in your browser using plain JavaScript, checked against the published stable ACP v1 JSON schema — nothing you paste is transmitted or stored.",
      },
    ],
  },
  {
    slug: "skill-md-validator",
    title: "Agent Skills (SKILL.md) Validator",
    shortTitle: "SKILL.md Validator",
    description:
      "Validate a SKILL.md file's YAML frontmatter against the open Agent Skills standard. Catches the field-name typos and length violations that cause a hard failure when packaging or uploading a skill. Runs entirely in your browser.",
    metaDescription:
      "Validate SKILL.md frontmatter against the Agent Skills spec — catches invalid field names, bad name/description formats, and portability errors. 100% client-side.",
    keywords: ["skill.md validator", "agent skills spec", "claude skills", "skill frontmatter", "agent skills format"],
    icon: "SKL",
    category: "AI",
    content: [
      {
        heading: "What the Agent Skills standard requires",
        body: "Agent Skills is an open, vendor-neutral standard for packaging reusable agent instructions as a SKILL.md file with YAML frontmatter. The portable spec recognizes exactly six frontmatter fields — name, description, license, compatibility, metadata, and allowed-tools — and nothing else. name must be required, lowercase, 1–64 characters, using only letters, digits, and hyphens, with no leading/trailing or doubled hyphen. description is required and capped at 1,024 characters, and should say both what the skill does and when to use it. compatibility is a free-text string capped at 500 characters. metadata must be a YAML mapping of your own key/value data, not a plain string or list. Tools like Claude Code accept extra fields beyond these six — argument-hint, when_to_use, disallowed-tools, and others — but those are host-specific extensions: packaging a skill for claude.ai or the Skills API with any field outside the six-field allowlist fails with a hard 'unexpected key' error rather than a warning.",
      },
      {
        heading: "How this tool checks a SKILL.md file",
        body: "Paste the full file, frontmatter included. This parses the YAML block between the opening and closing --- markers with a small hand-written parser built for the flat, mostly-scalar shape SKILL.md frontmatter actually uses (strings, comma/space-separated or block lists for allowed-tools, and a nested map for metadata) — it isn't a general YAML implementation, so a deeply nested or multi-document file may not parse correctly. Every recognized field is checked against the length and character rules above; every field name that isn't one of the six portable keys is flagged as a host extension rather than a spec violation, since those are valid in Claude Code but will break portability elsewhere. Everything runs locally — nothing you paste is sent anywhere.",
      },
    ],
    faq: [
      {
        q: "What are the six portable SKILL.md frontmatter fields?",
        a: "name, description, license, compatibility, metadata, and allowed-tools. These are the only fields the open Agent Skills spec defines, and the only ones accepted by claude.ai skill uploads, the Skills API, and the official packaging script — any other key causes those paths to reject the file outright.",
      },
      {
        q: "Why did my SKILL.md fail with 'unexpected key'?",
        a: "Claude Code supports several extra frontmatter fields as its own extensions — argument-hint, when_to_use, disallowed-tools, effort, context, disable-model-invocation, and more. They work fine inside Claude Code, but the portable Agent Skills spec doesn't recognize them, so packaging or uploading the same file through a spec-only path (claude.ai, the Skills API) fails with a hard error. This tool flags every non-portable field it finds so you know which ones to strip before packaging elsewhere.",
      },
      {
        q: "What are the exact rules for the name field?",
        a: "Required, 1–64 characters, lowercase letters/digits/hyphens only, and it can't start or end with a hyphen or contain two hyphens in a row. Most tooling also expects it to match the skill's own directory name, though that's a convention this tool can't check since it only sees the pasted file, not its folder.",
      },
      {
        q: "Does this validate the markdown body or just the frontmatter?",
        a: "Just the YAML frontmatter between the --- markers. The spec places no format requirements on the markdown body beyond it being valid Markdown, so there's nothing meaningful to lint there — this focuses on the structured metadata that tooling actually parses and can silently reject.",
      },
      {
        q: "Is my SKILL.md content sent anywhere?",
        a: "No. Parsing happens entirely in your browser with plain JavaScript — nothing you paste is transmitted or stored, which matters since skill files often contain internal tool names or workflow details.",
      },
    ],
  },
  {
    slug: "mcp-tasks-validator",
    title: "MCP Tasks Extension Validator",
    shortTitle: "MCP Tasks Validator",
    description:
      "Validate a Model Context Protocol Task/status object, a tasks/get, tasks/cancel, or tasks/list message, a task-creation request, or a tasks capability negotiation object against the official Tasks extension shape. Runs entirely in your browser.",
    metaDescription:
      "Validate MCP Tasks extension objects — Task/status shape, tasks/get|cancel|list messages, and capability negotiation. 100% client-side.",
    keywords: ["mcp tasks extension", "model context protocol tasks", "mcp async tool call", "tasks/get validator", "mcp long-running tools"],
    icon: "TSK",
    category: "AI",
    content: [
      {
        heading: "What the Tasks extension is for",
        body: "MCP's Tasks extension lets a server hand back a durable task handle instead of blocking the connection on a slow operation — a CI run, a batch job, or a step waiting on human approval. The caller polls tasks/get (or waits for a notifications/tasks/status push) until the task reaches a terminal status, then fetches the actual output with a separate tasks/result request. It's shipped in the official TypeScript SDK's experimental tasks module, marked explicitly as experimental and subject to change — the shape checked here reflects the current SDK, not a settled, unchangeable spec.",
      },
      {
        heading: "What this tool checks",
        body: "Paste a bare Task/status object (taskId, status, ttl, createdAt, lastUpdatedAt, plus optional pollInterval/statusMessage) and it checks every field's type and the five valid status values (working, input_required, completed, failed, cancelled) — including that ttl is present and either a number or null, since treating it as optional and omitting it is a common but invalid shortcut. It also catches a natural misunderstanding: putting the actual result or error directly on the task object, when the schema requires fetching a completed task's payload separately via tasks/result. It recognizes and validates the full family of related shapes too — a wrapped CreateTaskResult ({ task: {...} }), a ListTasksResult ({ tasks: [...] }), tasks/get / tasks/result / tasks/cancel / tasks/list requests, a notifications/tasks/status notification, a request that asks for task-backed execution via params.task, the io.modelcontextprotocol/related-task _meta key, and a capabilities.tasks negotiation object (flagging the common mistake of passing true instead of an empty object {} for a support flag, following MCP's own capability-presence convention).",
      },
    ],
    faq: [
      {
        q: "What is the MCP Tasks extension?",
        a: "A mechanism that lets an MCP server represent a slow operation as a pollable task instead of blocking the request — the server returns a task handle immediately, the client polls its status (or receives push notifications), and fetches the final result separately once the task reaches a terminal state (completed, failed, or cancelled).",
      },
      {
        q: "Why does my parser reject ttl: null?",
        a: "It shouldn't — ttl on a Task/status object is required to be present but is allowed to be null (meaning no fixed expiry). The common bug this catches is the opposite: omitting the ttl key entirely because it looks optional, which is invalid — the key must be present even when its value is null.",
      },
      {
        q: "Why is there no \"result\" field directly on my task object?",
        a: "That's intentional, not a bug in your data — the Task/status object only ever carries status metadata (taskId, status, timestamps). The actual output of a completed task is fetched with a separate tasks/result request. If your server puts the result directly on the task object, a strict client following the schema won't know where to find it.",
      },
      {
        q: "Is the Tasks extension a finished, stable spec?",
        a: "No — it ships in the official SDK's experimental namespace and its own source carries an explicit warning that the shape may change without notice. This tool validates against the extension as currently implemented; treat a flagged field as a signal to double-check the latest SDK, not an unappealable verdict.",
      },
      {
        q: "Is my pasted data sent anywhere?",
        a: "No. Parsing and validation both run locally in your browser with plain JavaScript — nothing you paste is transmitted or stored.",
      },
    ],
  },
  {
    slug: "mcp-server-json-validator",
    title: "MCP Registry server.json Validator",
    shortTitle: "server.json Validator",
    description:
      "Validate a server.json manifest against the official Model Context Protocol Registry schema before publishing — required fields, name format, package/remote transports, icons, and repository metadata. Runs entirely in your browser.",
    metaDescription:
      "Validate an MCP Registry server.json manifest — name format, packages, remotes, transports, and icons. 100% client-side.",
    keywords: ["mcp registry", "server.json validator", "model context protocol registry", "mcp-publisher", "mcp server manifest"],
    icon: "SRV",
    category: "AI",
    content: [
      {
        heading: "What server.json is for",
        body: "The MCP Registry is a central directory MCP clients use to discover and install servers. To list a server there, its author writes a server.json manifest describing the server's name, version, and how to run it — either as an installable package (npm, PyPI, an OCI image, a NuGet package, or an MCPB bundle) or as a hosted remote endpoint reachable over HTTP. The official publishing tool, mcp-publisher, reads this file directly; getting its shape wrong is the most common reason a publish attempt fails or a listed server can't actually be launched by a client.",
      },
      {
        heading: "What this tool checks",
        body: "Paste a server.json document and it checks the top-level required fields (name in reverse-DNS namespace form like io.github.user/weather, a 1-100 character description, and a version that isn't a range or the literal \"latest\"), then walks every packages[] entry (registryType, identifier, and a transport — stdio, streamable-http, or sse — plus a rejected-if-\"latest\" version and a 64-character hex fileSha256 when present, flagged as required for MCPB packages specifically), every remotes[] entry (must use streamable-http or sse, never stdio, since a remote is by definition reachable over the network), any repository metadata (url and source), and any icons (HTTPS-only src, a closed set of MIME types, and WxH-or-\"any\" size strings). It also flags the case where neither packages nor remotes is present — a listing a client has no actual way to run or connect to.",
      },
    ],
    faq: [
      {
        q: "What's the difference between packages and remotes?",
        a: "packages[] describes something a client downloads and runs locally — an npm/PyPI/OCI/NuGet package or an MCPB bundle, launched over stdio or a local HTTP transport. remotes[] describes a server that's already running somewhere and reachable directly over the network via streamable-http or sse — there's nothing to install. A stdio transport is only valid inside packages[]; it's rejected under remotes[].",
      },
      {
        q: "Why is my version rejected even though it looks like a normal version?",
        a: "The registry requires a single, specific version — version ranges like ^1.2.3, ~1.2.3, >=1.2.3, or 1.x are rejected, and packages[].version additionally rejects the literal string \"latest\" outright (the schema explicitly forbids it). This tool flags range-like patterns as a warning at the top level and as a hard error inside packages[].",
      },
      {
        q: "When is fileSha256 actually required?",
        a: "The official schema marks it required for MCPB packages specifically, and optional for every other registry type — though when it is present for any package type, clients are expected to verify the downloaded file's hash against it before running the package.",
      },
      {
        q: "Is this the same as running mcp-publisher --dry-run?",
        a: "No — this checks your manifest's shape against the same published JSON Schema mcp-publisher validates against, entirely in your browser, before you run the official CLI. It's a quick first pass, not a replacement for actually publishing.",
      },
      {
        q: "Is my pasted data sent anywhere?",
        a: "No. Parsing and validation both run locally in your browser with plain JavaScript — nothing you paste is transmitted or stored.",
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
