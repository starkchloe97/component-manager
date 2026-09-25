<script setup>
import { RouterLink } from 'vue-router'

const links = [
  { name: 'Home', label: 'Home', path: '/' },
  { name: 'TextImage', label: 'Text Image', path: '/TextImage' },
  { name: 'CTA', label: 'CTA', path: '/CTA' },
  { name: 'Testimonial', label: 'Testimonial', path: '/Testimonial' },
  { name: 'Hero', label: 'Hero', path: '/HEROView' },
  { name: 'FAQ', label: 'FAQ', path: '/FAQ' },
  { name: 'Pricing', label: 'Pricing', path: '/Pricing' },
  { name: 'Packages', label: 'LLC Packages', path: '/Packges' },
  { name: 'Boxes', label: 'Boxes', path: '/Boxes' },
  { name: 'DoAndDont', label: "Do & Don't", path: '/DoAndDontView' },
  { name: 'Features', label: 'Features', path: '/FeatureSection' },
  { name: 'Marquee', label: 'Marquee', path: '/Marquee' },
  { name: 'Content', label: 'Content', path: '/ContentSection' },
  { name: 'BrandRegistration', label: 'Brand Registration', path: '/BrandRegistration' },
  { name: 'WhyFile', label: 'Why File With Us', path: '/whyFile' },
  { name: 'Process', label: 'Process', path: '/ProcessSection' },
  { name: 'Tabs', label: 'Tabs', path: '/TabSection' },
  { name: 'Protect', label: 'Protect What Yours', path: '/ProtectWhatYours' },
  { name: 'WhyWorkWithUs', label: 'Why Work With Us', path: '/WhyWorkWithUs' },
  { name: 'WhyRegisterCopyRight', label: 'Why Register Copyright', path: '/WhyRegisterCopyRight' },
]
</script>

<template>
  <header class="header">
    <div class="header__inner">
      <RouterLink to="/" class="header__logo" aria-label="Component Manager home">
        Component Manager
      </RouterLink>
      <nav class="header__nav" aria-label="Main navigation">
        <RouterLink
          v-for="link in links"
          :key="link.path"
          :to="link.path"
          class="header__link"
          active-class="header__link--active"
        >
          {{ link.label }}
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  border-bottom: 1px solid #e2e8f0;
  background: #ffffff;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.04);
}

.header__inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 clamp(20px, 4vw, 40px);
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.header__logo {
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: #111827;
  text-decoration: none;
}

.header__nav {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;
}

.header__link {
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  color: #475569;
  text-decoration: none;
  transition: all 0.16s ease;
}

.header__link:hover {
  color: #1e293b;
  background: #f1f5f9;
}

.header__link--active {
  color: #433bce;
  background: #f0eeff;
}
</style>
