export default defineEventHandler((event) => {
  setHeader(event, 'content-type', 'text/plain; charset=utf-8');

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
LLMs-Txt: /llms.txt
LLMs-Full-Txt: /llms-full.txt

# Sitemap
Sitemap: https://cascadecraft.dev/sitemap.xml
`;
});
