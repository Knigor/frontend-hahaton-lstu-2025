// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'
import AuthModule from './modules/auth/index'
import MainModule from './modules/main/index'
import SharedModule from './modules/shared/index'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  alias: {
    '@shared': './modules/shared',
    '@auth': './modules/auth'
  },
  dir:{
    layouts: "./modules/shared/layouts"
  },
  modules: [
    '@pinia/nuxt',
    'nuxt-svgo',
    'nuxt-lucide-icons',
    '@nuxt/eslint',
    '@vueuse/nuxt',
    AuthModule,
    MainModule,
    SharedModule
  ],
  css: ['~/modules/shared/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()]
  },
  ssr: false,
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_URL || 'http://localhost:3000'
    }
  },
  svgo: {
    autoImportPath: false
  }
})
