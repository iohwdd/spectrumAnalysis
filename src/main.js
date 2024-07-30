import './assets/base.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import Table from './components/Table.vue'
import 'element-plus/dist/index.css'
import '@/assets/icon/iconfont.css'
const pinia = createPinia()
const app = createApp(App)
app.component('Table', Table)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
