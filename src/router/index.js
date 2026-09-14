import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import TextImagesSectionView from '@/pages/TextImage.vue'
import CTA from '@/pages/CTA.vue'
import FAQ from '@/pages/FAQ.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    
    {
      path: '/TextImage',
      name: 'TextImage',
      component: TextImagesSectionView,
    },
    {
      path: '/CTA',
      name: 'CTA',
      component: CTA,
    },
    {
      path: '/FAQ',
      name: 'FAQ',
      component:FAQ
    }
  ],
})

export default router