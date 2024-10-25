// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@unocss/nuxt', '@nuxt/eslint'],

  $production: {
    routeRules: {
      '/api/**': { isr: 60 * 60, swr: 60 * 60 },
    },
  },

  devtools: { enabled: true },

  runtimeConfig: {
    githubToken: '',
  },

  future: { compatibilityVersion: 4 },

  compatibilityDate: '2024-10-25',

  nitro: {
    prerender: {
      routes: ['/api/repos'],
    },
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },
})
