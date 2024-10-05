import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Vue2TouchEvents from 'vue2-touch-events';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Vue2TouchEvents);

app.mount('#app')
