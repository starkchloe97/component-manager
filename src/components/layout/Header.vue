<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const openMenu = ref(null)
const headerRef = ref(null)

const groups = [
  {
    name: 'Showcase',
    links: [
      { name: 'Hero', label: 'Hero', path: '/HEROView' },
      { name: 'TextImage', label: 'Text Image', path: '/TextImage' },
      { name: 'CTA', label: 'CTA', path: '/CTA' },
      { name: 'Testimonial', label: 'Testimonial', path: '/Testimonial' },
      { name: 'FAQ', label: 'FAQ', path: '/FAQ' },
    ],
  },
  {
    name: 'Business',
    links: [
      { name: 'Pricing', label: 'Pricing', path: '/Pricing' },
      { name: 'Packages', label: 'LLC Packages', path: '/Packges' },
      { name: 'BrandRegistration', label: 'Brand Registration', path: '/BrandRegistration' },
      { name: 'WhyFile', label: 'Why File With Us', path: '/whyFile' },
      { name: 'Process', label: 'Process', path: '/ProcessSection' },
      { name: 'Protect', label: 'Protect What Yours', path: '/ProtectWhatYours' },
      { name: 'WhyWorkWithUs', label: 'Why Work With Us', path: '/WhyWorkWithUs' },
      { name: 'WhyRegisterCopyRight', label: 'Why Register Copyright', path: '/WhyRegisterCopyRight' },
    ],
  },
  {
    name: 'Layouts',
    links: [
      { name: 'Boxes', label: 'Boxes', path: '/Boxes' },
      { name: 'Features', label: 'Features', path: '/FeatureSection' },
      { name: 'Content', label: 'Content', path: '/ContentSection' },
      { name: 'Marquee', label: 'Marquee', path: '/Marquee' },
      { name: 'Tabs', label: 'Tabs', path: '/TabSection' },
      { name: 'DoAndDont', label: "Do & Don't", path: '/DoAndDontView' },
    ],
  },
]

const isGroupActive = (group) => group.links.some((link) => route.path === link.path)

function toggleMenu(name) {
  openMenu.value = openMenu.value === name ? null : name
}

function closeMenus() {
  openMenu.value = null
}

function handleDocumentClick(event) {
  if (!headerRef.value?.contains(event.target)) closeMenus()
}

function handleEscape(event) {
  if (event.key === 'Escape') closeMenus()
}

onMounted(() => {
  document.addEventListener('click', handleDocumentClick)
  document.addEventListener('keydown', handleEscape)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick)
  document.removeEventListener('keydown', handleEscape)
})
</script>

<template>
  <header ref="headerRef" class="header">
    <div class="header__inner">
      <RouterLink to="/" class="header__logo" aria-label="Component Manager home" @click="closeMenus">
        <span>Component</span>
        <span>Manager</span>
      </RouterLink>

      <nav class="header__nav" aria-label="Main navigation">
        <RouterLink
          to="/"
          class="header__link header__home"
          :class="{ 'header__link--active': route.path === '/' }"
          @click="closeMenus"
        >
          Home
        </RouterLink>

        <div
          v-for="group in groups"
          :key="group.name"
          class="nav-group"
          :class="{ 'nav-group--open': openMenu === group.name }"
        >
          <button
            type="button"
            class="header__link nav-group__trigger"
            :class="{ 'header__link--active': isGroupActive(group) }"
            :aria-expanded="openMenu === group.name"
            :aria-controls="`nav-menu-${group.name}`"
            @click.stop="toggleMenu(group.name)"
          >
            {{ group.name }}
            <span class="nav-group__chevron" aria-hidden="true">⌄</span>
          </button>

          <div
            :id="`nav-menu-${group.name}`"
            class="nav-group__menu"
            :class="{ 'nav-group__menu--visible': openMenu === group.name }"
          >
            <RouterLink
              v-for="link in group.links"
              :key="link.path"
              :to="link.path"
              class="nav-group__item"
              :class="{ 'nav-group__item--active': route.path === link.path }"
              @click="closeMenus"
            >
              {{ link.label }}
            </RouterLink>
          </div>
        </div>
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
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.04);
  backdrop-filter: blur(10px);
}

.header__inner {
  width: min(1400px, calc(100% - 40px));
  min-height: 56px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 28px;
}

.header__logo {
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  line-height: 1.05;
  font-size: 15px;
  font-weight: 750;
  letter-spacing: 0.01em;
  color: #111827;
  text-decoration: none;
}

.header__nav {
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 4px;
}

.header__link {
  border: 0;
  padding: 8px 11px;
  border-radius: 7px;
  background: transparent;
  color: #475569;
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  line-height: 20px;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  transition: color 0.15s ease, background-color 0.15s ease;
}

.header__link:hover,
.nav-group--open > .header__link {
  color: #1e293b;
  background: #f1f5f9;
}

.header__link--active {
  color: #433bce !important;
  background: #f0eeff !important;
}

.nav-group {
  position: relative;
}

.nav-group__trigger {
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.nav-group__chevron {
  display: inline-block;
  margin-top: -2px;
  font-size: 13px;
  line-height: 1;
  transition: transform 0.18s ease;
}

.nav-group--open .nav-group__chevron {
  transform: rotate(180deg);
}

.nav-group__menu {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  z-index: 100;
  min-width: 205px;
  padding: 6px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.1);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-4px);
  pointer-events: none;
  transition: opacity 0.15s ease, transform 0.15s ease, visibility 0.15s ease;
}

.nav-group__menu--visible {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
  pointer-events: auto;
}

.nav-group__item {
  display: block;
  padding: 9px 10px;
  border-radius: 7px;
  color: #475569;
  font-size: 12px;
  font-weight: 600;
  line-height: 18px;
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.15s ease, background-color 0.15s ease;
}

.nav-group__item:hover {
  color: #1e293b;
  background: #f8fafc;
}

.nav-group__item--active {
  color: #433bce;
  background: #f0eeff;
}

@media (max-width: 900px) {
  .header__inner {
    width: min(100% - 24px, 1400px);
    gap: 16px;
  }

  .header__logo {
    font-size: 14px;
  }

  .header__nav {
    overflow-x: auto;
    scrollbar-width: none;
  }

  .header__nav::-webkit-scrollbar {
    display: none;
  }
}

@media (max-width: 640px) {
  .header__inner {
    min-height: 52px;
    gap: 10px;
  }

  .header__logo {
    display: none;
  }

  .header__nav {
    width: 100%;
  }

  .header__link {
    padding: 8px 9px;
  }

  .nav-group__menu {
    position: fixed;
    top: 52px;
    left: 12px;
    right: 12px;
    width: auto;
  }
}
</style>
