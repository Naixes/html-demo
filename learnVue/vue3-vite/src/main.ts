import { createApp } from 'vue'
import App from './App.vue'

import VueHighCharts from "./directive/hightCharts"
import router from './router'

const app = createApp(App)

app.use(VueHighCharts)

app.use(router).mount('#app')
