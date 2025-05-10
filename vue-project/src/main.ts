import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './styles/reset.less'
import './styles/theme.css'
import { globalRegister } from "./global";


// import App from './App.vue'
import App1 from './App1.vue'
const app = createApp(App1)
const pinia = createPinia()
app.use(pinia)
app.use(globalRegister)
app.mount('#app')