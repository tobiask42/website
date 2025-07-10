// src/app/robots.txt/route.ts

export function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com';

  const body = `
User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`.trim();

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
