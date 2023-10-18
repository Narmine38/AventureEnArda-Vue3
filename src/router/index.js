import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/inscription',
      name: 'inscription',
      component: () => import('../views/Register.vue')
    },
    {
      path: '/connexion',
      name: 'connexion',
      component: () => import('../views/Login.vue')
    },

  ]
})

export default router
