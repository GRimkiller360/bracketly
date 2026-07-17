export interface Tool {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  keywords: string[];
  icon: string;
  category: string;
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
  },
];

export function getTool(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}
