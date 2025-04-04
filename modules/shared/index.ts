import { defineNuxtModule } from '@nuxt/kit'
import path from 'path'

export default defineNuxtModule({
  meta: {
    name: 'shared',
    configKey: 'shared'
  },

  setup(_, nuxt) {
    // Pages
    // nuxt.hook('pages:extend', (pages) => {
    //   pages.push({
    //     name: 'error',
    //     path: '/error',
    //     file: path.resolve(__dirname, 'pages/error.vue')
    //   })
    // })

    // Components
    // nuxt.hook('components:dirs', (dirs) => {
    //   dirs.push({
    //     path: path.resolve(__dirname, 'components')
    //   })
    // })

    // Composables
    // nuxt.hook('imports:dirs', (dirs) => {
    //   dirs.push(path.resolve(__dirname, 'composables'))
    // })
  }
})
