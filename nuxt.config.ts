process.env.PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD = '1'
process.env.PLAYWRIGHT_BROWSERS_PATH = '0'

export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxtjs/color-mode',
    '@nuxtjs/tailwindcss',
    'nuxt-og-image',
    '@nuxtjs/sitemap',
  ],
  site: {
    url: 'https://nigeria-constitution.vercel.app',
    name: 'Nigeria Constitution',
    description: 'The 1999 Constitution of the Federal Republic of Nigeria, beautifully rendered. Free and open source.',
    defaultLocale: 'en',
  },
  components: {
    dirs: [
      {
        path: '~/components',
        extensions: ['vue'],
      },
    ],
  },
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.js',
  },
  content: {
    highlight: {
      theme: {
        dark: 'github-dark',
        default: 'github-light',
      },
    },
    markdown: {
      toc: {
        depth: 3,
        searchDepth: 3,
      },
    },
  },
  colorMode: {
    classSuffix: '',
    preference: 'dark',
    fallback: 'dark',
  },
  ogImage: {
    runtimeCacheStorage: false,
    runtimeBrowser: false,
    defaults: {
      width: 1200,
      height: 630,
    },
    compatibility: {
      prerender: {
        chromium: false,
      },
    },
  },
  sitemap: {
    strictNuxtContentPaths: false,
    urls: [
      '/',
      '/chapter/chapter-i',
      '/chapter/chapter-ii',
      '/chapter/chapter-iii',
      '/chapter/chapter-iv',
      '/chapter/chapter-v',
      '/chapter/chapter-vi',
      '/chapter/chapter-vii',
      '/chapter/chapter-viii',
      '/schedules',
    ],
  },
  app: {
    head: {
      title: 'Nigeria Constitution',
      htmlAttrs: { lang: 'en' },
      meta: [
        { name: 'description', content: 'The 1999 Constitution of the Federal Republic of Nigeria, beautifully rendered. Free and open source.' },
        { property: 'og:title', content: 'Nigeria Constitution' },
        { property: 'og:description', content: 'The 1999 Constitution of the Federal Republic of Nigeria, beautifully rendered. Free and open source.' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'theme-color', content: '#0a0a09' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=IBM+Plex+Mono:ital,wght@0,400;0,500;1,400&family=Lora:ital,wght@0,400;0,500;1,400&display=swap' },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  nitro: {
    preset: 'vercel-static',
    prerender: {
      crawlLinks: true,
      routes: [
        '/',
        '/chapter/chapter-i',
        '/chapter/chapter-ii',
        '/chapter/chapter-iii',
        '/chapter/chapter-iv',
        '/chapter/chapter-v',
        '/chapter/chapter-vi',
        '/chapter/chapter-vii',
        '/chapter/chapter-viii',
        '/schedules',
      ],
    },
  },
  routeRules: {
    '/chapter/**': { prerender: true },
    '/schedules': { prerender: true },
  },
  compatibilityDate: '2024-11-01',
})
