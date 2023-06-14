// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@unocss/nuxt'],
  runtimeConfig: {
    githubToken: '',
  },
  routeRules: {
    '/api/**': { isr: 60 * 5, swr: 60 * 5 },
  }
})
