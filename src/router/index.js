import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/data',
    name: 'Data',
    component: () => import('../views/Data.vue')
  },
  {
    path: '/prediction',
    name: 'Prediction',
    component: () => import('../views/Prediction.vue')
  },
  {
    path: '/strategy',
    name: 'Strategy',
    component: () => import('../views/Strategy.vue')
  },
  {
    path: '/strategies',
    name: 'Strategies',
    component: () => import('../views/Strategies.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
