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
import BoxesView from '@/pages/BoxesView.vue'
import DoAndDontView from '@/pages/DoAndDontView.vue'
import FeatureSection from '@/pages/FeatureSection.vue'
import ProtectWhatYoursView from '@/pages/ProtectWhatYoursView.vue'
import MarqueeView from '@/pages/MarqueeView.vue'
import ContentSectionView from '@/pages/ContentSectionView.vue'
import BrandRegistrationView from '@/pages/BrandRegistrationView.vue'
import whyFile from '@/pages/whyFile.vue'
import ProcessSectionView from '@/pages/ProcessSectionView.vue'
import TabSectionView from '@/pages/TabSectionView.vue'
import WhyWorkWithUsView from '@/pages/WhyWorkWithUsView.vue'

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
    },
    {
      path: '/Boxes',
      name: 'BoxesView',
      component:BoxesView
    },
    {
      path: '/DoAndDontView',
      name: 'DoAndDontView',
      component:DoAndDontView
    },
    {
      path: '/FeatureSection',
      name: 'FeatureSection',
      component:FeatureSection
    },
    {
      path: '/ProtectWhatYours',
      name: 'ProtectWhatYoursView',
      component:ProtectWhatYoursView
    },
    {
      path: '/Marquee',
      name: 'MarqueeView',
      component:MarqueeView   
    },
    {
      path: '/ContentSection',
      name: 'ContentSectionViewContentSectionView',
      component:ContentSectionView   
    },
    {
      path: '/BrandRegistration',
      name: 'BrandRegistrationView',
      component:BrandRegistrationView 
    },
    {
      path: '/whyFile',
      name: 'whyFile',
      component:whyFile 
    },
    {
      path: '/ProcessSection',
      name: 'ProcessSectionView',
      component:ProcessSectionView 
    },
    {
      path: '/TabSection',
      name: 'TabSectionView',
      component:TabSectionView 
    },
    {
      path: '/WhyWorkWithUs',
      name: 'WhyWorkWithUsView',
      component: WhyWorkWithUsView,
    }




  ],
})

export default router