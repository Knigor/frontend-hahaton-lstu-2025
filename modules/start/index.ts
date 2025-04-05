import { defineNuxtModule } from '@nuxt/kit'
import path from 'path'

export default defineNuxtModule({
  meta: {
    name: 'start',
    configKey: 'start'
  },
  setup(_, nuxt) {
    // Pages
    nuxt.hook('pages:extend', (pages) => {
      pages.push({
        name: 'start',
        path: '/start',
        file: path.resolve(__dirname, 'pages/StartPage.vue')

        // children: [
        //     {
        //         name: 'create-default-chat',
        //         path: 'create-default',
        //         file: path.resolve(
        //             './modules/default-chat/pages/default-create.vue'
        //         )
        //     }
        // ]
      }),
        pages.push({
          name: 'start-second',
          path: '/start-second',
          file: path.resolve(__dirname, 'pages/SecondStartPage.vue')

          // children: [
          //     {
          //         name: 'create-default-chat',
          //         path: 'create-default',
          //         file: path.resolve(
          //             './modules/default-chat/pages/default-create.vue'
          //         )
          //     }
          // ]
        })
      pages.push({
        name: 'wait',
        path: '/wait',
        file: path.resolve(__dirname, 'pages/WaitPage.vue')

        // children: [
        //     {
        //         name: 'create-default-chat',
        //         path: 'create-default',
        //         file: path.resolve(
        //             './modules/default-chat/pages/default-create.vue'
        //         )
        //     }
        // ]
      })
    })
  }
})
