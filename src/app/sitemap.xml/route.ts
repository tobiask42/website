// src/app/sitemap.xml/route.ts

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com';
  const locales = ['de', 'en'];

  const staticPaths = [
    '', // Startseite
    '/contact',
    '/contact/thanks',
    '/impressum',
    '/datenschutz'
  ];

  const urls = locales.flatMap((locale) =>
    staticPaths.map((path) => {
      const loc = `${siteUrl}/${locale}${path}`;
      return `
  <url>
    <loc>${loc}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
    })
  );

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`.trim();

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}