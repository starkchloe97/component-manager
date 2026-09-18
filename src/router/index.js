import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import TextImagesSectionView from '@/pages/TextImage.vue'
import CTA from '@/pages/CTA.vue'
import FAQ from '@/pages/FAQ.vue'
import Testimonial from '@/pages/TestimonialView.vue'
// import Home from '@/pages/Home.vue'
import HEROView from '@/pages/HEROView.vue'
import PricingView from '@/pages/PricingView.vue'
import PackgesView from '@/pages/PackgesView.vue'

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
    },
    {
      path: '/Testimonial',
      name: 'Testimonial',
      component:Testimonial
    },
    {
      path: '/HEROView',
      name: 'HEROView',
      component:HEROView
    },
    {
      path: '/Pricing',
      name: 'PricingView',
      component:PricingView
    },
    {
      path: '/Packges',
      name: 'PackgesView',
      component:PackgesView
    }

  ],
})

export default router