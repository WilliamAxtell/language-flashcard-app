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
      path: '/word-form',
      name: 'word-form',
      component: () => import('../views/WordForm.vue')
    },
    {
      path: '/flashcards',
      name: 'flashcards',
      props: true,
      component: () => import('../views/Flashcards.vue')
    }
  ]
})

export default router
