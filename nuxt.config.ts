// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: false },

  modules: [
    '@nuxtjs/tailwindcss'
  ],

  tailwindcss: {
    cssPath: '~/assets/scss/main.scss',
    configPath: 'tailwind.config.ts',
    exposeConfig: false,
    viewer: false
  },

  css: [
    '~/assets/scss/main.scss'
  ],

  app: {
    head: {
      htmlAttrs: {
        lang: 'zh-TW',
        class: 'dark'
      },
      title: 'CascadeCraft · 現代高美感互動式 CSS 樣式操作與匯出平台',
      titleTemplate: '%s · CascadeCraft',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'CascadeCraft 是專為現代前端工程師與設計師打造的高美感互動式 CSS 樣式操作平台。支援 Box Shadow、Cubic Bezier 曲線、Flexbox、Grid、Glassmorphism 等即時可視化生成，零學習成本，一鍵匯出 CSS / SCSS / Tailwind 程式碼。'
        },
        { name: 'theme-color', content: '#090a0f' },
        { name: 'color-scheme', content: 'dark' },
        // Open Graph
        { property: 'og:site_name', content: 'CascadeCraft' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'CascadeCraft · 現代高美感互動式 CSS 樣式操作與匯出平台' },
        {
          property: 'og:description',
          content: '零學習成本的現代 CSS 視覺化操作平台。微型直覺控制器、即時大畫布預覽、支援 CSS / SCSS / Tailwind 一鍵匯出。'
        },
        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'CascadeCraft · 現代互動式 CSS 視覺生成器' },
        {
          name: 'twitter:description',
          content: '極簡、高雅、即時反饋的 CSS 知識庫與視覺化操作平台。'
        },
        // GEO & AI Search Optimization
        { name: 'ai-optimized', content: 'true' },
        { name: 'generator', content: 'CascadeCraft Nuxt 4 Engine' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'alternate', type: 'text/plain', href: '/llms.txt', title: 'LLM Summary' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap'
        }
      ]
    }
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/sitemap.xml', '/robots.txt', '/llms.txt', '/llms-full.txt']
    }
  }
});
