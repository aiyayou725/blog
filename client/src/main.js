import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import native from 'naive-ui'
import { createDiscreteApi } from 'naive-ui'
import { createPinia } from "pinia"
import { router } from "./common/router"
import axios from 'axios'
import { AdminStore } from './store/AdminStore.js'

axios.defaults.baseURL = "http://localhost:8080"

const { message, dialog, notification } = createDiscreteApi(['message', 'dialog', 'notification'])

const app = createApp(App)

app.provide('axios', axios)
app.provide('message', message)
app.provide('dialog', dialog)
app.provide('notification', notification)
app.provide('server_url', axios.defaults.baseURL)

app.use(native)
app.use(createPinia())
app.use(router)
app.mount("#app")

// 请求拦截器，拦截每个请求添加 headers
const adminStore = AdminStore()
axios.interceptors.request.use(config => {
    config.headers.token = adminStore.token
    return config
})
