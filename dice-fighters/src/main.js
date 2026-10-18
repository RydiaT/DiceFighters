import { createApp } from 'vue'
import Main from './Main.vue'
import {createPinia} from "pinia";
import { aliases, fa } from 'vuetify/iconsets/fa'
import { mdi } from 'vuetify/iconsets/mdi'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const app = createApp(Main)
const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'dark', // 'system' | 'light' | 'dark'
    },
    icons: {
        defaultSet: 'fa',
        aliases,
        sets: {
            fa,
            mdi
        },
    },
})

app.use(vuetify)
app.use(createPinia())

app.mount('#app')
