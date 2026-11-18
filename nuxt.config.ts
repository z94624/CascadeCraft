// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: false },

  experimental: {
    payloadExtraction: false
  },

  modules: [
    '@nuxt/ui',
    '@nuxtjs/i18n'
  ],

  // ─── Nuxt UI ─────────────────────────────────────────────────────────────
  ui: {
    colorMode: false
  },

  // ─── i18n ────────────────────────────────────────────────────────────────
  i18n: {
    strategy: 'no_prefix',
    defaultLocale: 'en',
    langDir: 'locales/',
    locales: [
      { code: 'en', file: 'en.json', name: 'English', dir: 'ltr' },
      { code: 'zh-TW', file: 'zh-TW.json', name: '繁體中文', dir: 'ltr' }
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    },
    vueI18n: './i18n.config.ts'
  },

  // ─── CSS ─────────────────────────────────────────────────────────────────
  css: [
    '~/assets/scss/main.scss'
  ],

  // ─── Vite / SCSS ────────────────────────────────────────────────────────
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "~/assets/scss/_variables" as *; @use "~/assets/scss/_mixins" as *;`
        }
      }
    }
  },

  // ─── App Head ────────────────────────────────────────────────────────────
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || (process.env.NODE_ENV === 'production' ? '/CascadeCraft/' : '/'),
    head: {
      htmlAttrs: {
        class: 'dark'
      },
      titleTemplate: '%s · CascadeCraft',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#090a0f' },
        { name: 'color-scheme', content: 'dark' },
        { property: 'og:site_name', content: 'CascadeCraft' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'ai-optimized', content: 'true' },
        { name: 'generator', content: 'CascadeCraft Nuxt 4 + Nuxt UI Engine' },
        ...(process.env.GOOGLE_SITE_VERIFICATION || 'XRzYLv0hOfBb6AQwbHQ8a-VeICyJfoi2QljNvyDYZNE'
          ? [{ name: 'google-site-verification', content: process.env.GOOGLE_SITE_VERIFICATION || 'XRzYLv0hOfBb6AQwbHQ8a-VeICyJfoi2QljNvyDYZNE' }]
          : [])
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

  // ─── Nitro ───────────────────────────────────────────────────────────────
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/sitemap.xml', '/robots.txt', '/llms.txt', '/llms-full.txt']
    }
  }
});
