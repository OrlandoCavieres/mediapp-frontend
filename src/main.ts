import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'

import { OhVueIcon, addIcons } from "oh-vue-icons"
import { MdModeeditoutlineRound, MdDelete } from "oh-vue-icons/icons"

addIcons(MdModeeditoutlineRound, MdDelete)

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedState)

app.component("v-icon", OhVueIcon)
app.use(pinia)
app.use(router)

app.mount('#app')
