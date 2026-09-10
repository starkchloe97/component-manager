import { createRouter, createWebHistory } from 'vue-router'
import TextImagesSectionView from '@/pages/TextImage.vue'
import Home from '@/pages/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/text-image',
      name: 'TextImage',
      component: TextImagesSectionView,
    },
  ],
})

export default router