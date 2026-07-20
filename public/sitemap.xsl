<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes" />
  <xsl:template match="/">
    <html>
      <head>
        <title>Bracketly Sitemap</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; max-width: 720px; margin: 3rem auto; padding: 0 1.5rem; color: #17181c; }
          h1 { font-size: 1.4rem; }
          p { color: #5b5f6b; font-size: 0.9rem; }
          table { width: 100%; border-collapse: collapse; margin-top: 1.5rem; }
          th, td { text-align: left; padding: 0.6rem 0.5rem; border-bottom: 1px solid #e2e4e9; font-size: 0.9rem; }
          a { color: #3457d5; text-decoration: none; }
          a:hover { text-decoration: underline; }
        </style>
      </head>
      <body>
        <h1>Bracketly Sitemap</h1>
        <p>This file lists every page on the site for search engines. You're seeing this readable view because a browser opened it directly — search engines parse the underlying XML, not this page.</p>
        <table>
          <tr><th>URL</th></tr>
          <xsl:for-each select="sitemap:urlset/sitemap:url">
            <tr>
              <td><a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc" /></a></td>
            </tr>
          </xsl:for-each>
          <xsl:for-each select="sitemap:sitemapindex/sitemap:sitemap">
            <tr>
              <td><a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc" /></a></td>
            </tr>
          </xsl:for-each>
        </table>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
