import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/main.css'
// import PopUp from "@/components/Step0Popup.vue";


import App from './App.vue'
import router from './router'

const app = createApp(App)
// app.component('PopUp', PopUp)
app.use(createPinia())
app.use(router)

app.mount('#app')
