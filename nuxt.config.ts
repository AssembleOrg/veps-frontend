// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  // Deshabilitar devtools en producción para builds más rápidos
  devtools: { enabled: process.env.NODE_ENV === 'development' },

  css: [
    '~/assets/css/main.css'
  ],

  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL,
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
      qrSecret: process.env.QR_SECRET || '1234',
      baseURL: process.env.API_BASE_URL,
    },
  },

  modules: [
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/ui'
  ],

  // Optimizaciones de build
  nitro: {
    compressPublicAssets: true,
    minify: true,
  },

  // Optimizaciones de compilación
  vite: {
    build: {
      cssMinify: true,
    },
  },
})