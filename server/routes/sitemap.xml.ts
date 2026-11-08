export default defineEventHandler((event) => {
  setHeader(event, 'content-type', 'application/xml; charset=utf-8');

  const domain = 'https://cascadecraft.dev';
  const lastmod = new Date().toISOString().split('T')[0];

  const routes = [
    { loc: '/', changefreq: 'daily', priority: '1.0' },
    { loc: '/box-shadow', changefreq: 'weekly', priority: '0.9' },
    { loc: '/cubic-bezier', changefreq: 'weekly', priority: '0.9' },
    { loc: '/flexbox', changefreq: 'weekly', priority: '0.9' },
    { loc: '/grid', changefreq: 'weekly', priority: '0.9' },
    { loc: '/glassmorphism', changefreq: 'weekly', priority: '0.8' },
    { loc: '/gradient', changefreq: 'weekly', priority: '0.8' },
    { loc: '/border-radius', changefreq: 'weekly', priority: '0.8' },
    { loc: '/reference', changefreq: 'daily', priority: '0.9' }
  ];

  const xmlEntries = routes
    .map(
      (r) => `  <url>
    <loc>${domain}${r.loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlEntries}
</urlset>`;
});
