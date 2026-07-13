const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://www.numberlab.vip/sitemap.xml
`;

export function GET() {
  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain"
    }
  });
}
