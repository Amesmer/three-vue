import * as Vue from 'vue'
import App from './App.vue'
import router from './router'
// createApp(App).mount('#app')

// 5. 创建并挂载根实例
const app = Vue.createApp(App)
//确保 _use_ 路由实例使
//整个应用支持路由。
app.use(router)

app.mount('#app')