import * as VueRouter from 'vue-router'

import app01 from '../components/app01.vue'
import app02 from '../components/app02.vue'
import app03 from '../components/app03.vue'
import app04 from '../components/app04.vue'
import app05 from '../components/app05.vue'




const routes = [
  { path: '/', component: app01 },
  { path: '/app02', component: app02 },
  { path: '/app03', component: app03 },
  { path: '/app04', component: app04 },
  { path: '/app05', component: app05 },


//   { path: '/about', component: About },
]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const createRouter=()=> VueRouter.createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: VueRouter.createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})
const router=createRouter()
export default router