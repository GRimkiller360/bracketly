# Bracketly

A growing collection of free, privacy-first developer tools — from staples like a JSON formatter, Base64 encoder/decoder, and JWT decoder to newer AI/LLM tooling like a token counter, MCP tool-schema validator, and AI SDK stream protocol debugger. Everything runs client-side in the browser; nothing typed into a tool is ever sent to a server. See `src/data/tools.ts` for the full, current list.

Live at [bracketly.pages.dev](https://bracketly.pages.dev).

## Stack

- [Astro](https://astro.build) — static site, zero client JS framework overhead
- [@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/) — auto-generated sitemap for SEO
- Deployed to Cloudflare Pages via GitHub Actions on every push to `main`

## Adding a new tool

1. Add an entry to `src/data/tools.ts`
2. Create `src/pages/tools/<slug>.astro` using `ToolLayout`
3. Homepage, sitemap, and nav all derive from the registry automatically

## Commands

| Command             | Action                                      |
| :------------------ | :------------------------------------------- |
| `npm install`        | Install dependencies                        |
| `npm run dev`         | Start local dev server at `localhost:4321`   |
| `npm run build`       | Build production site to `./dist/`           |
| `npm run preview`      | Preview the production build locally         |

## Monetization

- **Google AdSense** — wire-up notes in `src/layouts/BaseLayout.astro` and `src/components/AdUnit.astro`
- **PayPal / GitHub Sponsors** — `src/pages/donate.astro`, linked from `.github/FUNDING.yml`

## License

MIT — see [LICENSE](./LICENSE).
