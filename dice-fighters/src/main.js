import { createApp } from 'vue'
import Main from './Main.vue'
import {createPinia} from "pinia";
import { aliases, fa } from 'vuetify/iconsets/fa'
import { mdi } from 'vuetify/iconsets/mdi'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'

import './styles/main.scss'
import {useGame} from "@/stores/game.js";
import {SAVE_KEY} from "@/data/constants.js";

const app = createApp(Main)
const vuetify = createVuetify({
    theme: {
        defaultTheme: 'dark', // 'system' | 'light' | 'dark'
    },
    icons: {
        defaultSet: 'mdi',
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
    let data = {};

    if (raw) data = JSON.parse(raw)

    if(data.saveVersion === game.saveVersion) {
        game.$patch(JSON.parse(raw))
    }
} catch (e) {
    console.warn("Couldn't load save", e)
}


let lastSave = 0;
game.$subscribe((mutation, state) => {
    let now = Date.now()

    if(now - lastSave < 3000) return
    lastSave = now;

    game.doSave();
})

window.addEventListener('beforeunload', game.doSave)

app.mount('#app')
