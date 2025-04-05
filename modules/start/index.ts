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
                file: path.resolve(__dirname, 'pages/StartPage.vue'),

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
