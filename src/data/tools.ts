export interface Tool {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  keywords: string[];
  icon: string;
  category: string;
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
    slug: "color-converter",
    title: "Color Converter — HEX, RGB, HSL",
    shortTitle: "Color Converter",
    description:
      "Convert colors between HEX, RGB, and HSL formats live, with an instant preview swatch.",
    keywords: ["color converter", "hex to rgb", "rgb to hsl", "color picker online"],
    icon: "◍",
    category: "Design",
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
};

export function getCategoryColor(category: string): { light: string; dark: string } {
  return categoryColors[category] ?? { light: "#3457d5", dark: "#6d8bff" };
}
