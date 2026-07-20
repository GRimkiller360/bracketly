// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  // Update this to your custom domain once you connect one in the
  // Cloudflare Pages dashboard. Cloudflare Pages serves from root,
  // no base path needed unless you set a custom path in the dashboard.
  site: 'https://bracketly.pages.dev',

  integrations: [sitemap()],
  adapter: cloudflare()
});