import type { APIRoute } from 'astro';
import { tools } from '../data/tools';

const SITE = 'https://bracketly.pages.dev';

export const GET: APIRoute = () => {
  const staticPaths = ['/', '/donate/', '/privacy/'];
  const toolPaths = tools.map((t) => `/tools/${t.slug}/`);
  const urls = [...staticPaths, ...toolPaths];

  const body =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<?xml-stylesheet type="text/xsl" href="' + SITE + '/sitemap.xsl"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls.map((path) => `  <url><loc>${SITE}${path}</loc></url>`).join('\n') +
    '\n</urlset>\n';

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml' },
  });
};
