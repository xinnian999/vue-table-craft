import './assets/main.css'

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import IconRender from '@/components/IconRender.vue'

const app = createApp(App)

app.use(router)
app.use(ElementPlus)
app.component('IconRender', IconRender)

app.mount('#app')
