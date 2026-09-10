import { createRouter, createWebHistory } from 'vue-router'
import TextImagesSectionView from '@/pages/TextImage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: 'TextImagesSectionView' },
    },
    {
      path: '/TextImage',
      name: 'TextImagesSectionView',
      component: TextImagesSectionView,
    },
  ],
})

export default router
