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
    {
      path: '/mon-compte',
      name: 'mon-compte',
      component: () => import('../views/MonCompte.vue')
    },
    {
      path: '/administration',
      name: 'administration',
      component: () => import('../views/admin/Administration.vue'),
      children: [
        {
          path: 'usersmanagement',  // ceci est relatif à '/administration'
          name: 'usersmanagement',
          component: () => import('../views/admin/UsersManagement.vue')
        },
      ]
    },

  ]
})

export default router
