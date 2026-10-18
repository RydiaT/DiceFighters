import { createApp } from 'vue'
import Main from './Main.vue'
import {createPinia} from "pinia";
import { aliases, fa } from 'vuetify/iconsets/fa'
import { mdi } from 'vuetify/iconsets/mdi'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import './styles/main.scss'
import {useGame} from "@/stores/game.js";
import {SAVE_KEY} from "@/data/constants.js";

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

let game = useGame()

try {
    let raw = localStorage.getItem(SAVE_KEY)
    if(raw) game.$patch(JSON.parse(raw))
} catch (e) {
    console.warn("Couldn't load save", e)
}


let lastSave = 0;
game.$subscribe((mutation, state) => {
    let now = Date.now()

    if(now - lastSave < 3000) return
    lastSave = now;

    let { level, exp, hp, gold, kills, zone, inventory, equipped, itemUid, logId } = state;
    localStorage.setItem(SAVE_KEY, JSON.stringify({ level, exp, gold, kills, zone, inventory, equipped, itemUid, logId}))
    console.log("Saved!")
})

app.mount('#app')
