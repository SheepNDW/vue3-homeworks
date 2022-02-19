import { createRouter, createWebHashHistory } from 'vue-router'
const Home = () => import('@/views/index.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
