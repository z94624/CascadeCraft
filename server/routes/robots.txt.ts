export default defineEventHandler((event) => {
  setHeader(event, 'content-type', 'text/plain; charset=utf-8');

  const domain = (process.env.NUXT_PUBLIC_SITE_URL || 'https://z94624.github.io/CascadeCraft').replace(/\/$/, '');

  return `User-agent: *
Allow: /

# AI & LLM Search Engine Crawlers Optimization (GEO)
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

# LLM Direct Index
LLMs-Txt: ${domain}/llms.txt
LLMs-Full-Txt: ${domain}/llms-full.txt

# Sitemap
Sitemap: ${domain}/sitemap.xml
`;
});
