<script setup>
import { RouterLink } from 'vue-router'

const links = [
  { name: 'TextImage', label: 'Text Image Components', path: '/TextImage' },
  { name: 'CTA', label: 'CTA Components', path: '/CTA' },
  { name: 'FAQ', label: 'FAQ Components', path: '/FAQ' },
]
</script>

<template>
  <main class="home">
    <div class="home__container">
      <header class="home__header">
        <p class="eyebrow">COMPONENT MANAGER</p>
        <h1 class="home__title">Component Library</h1>
        <p class="home__subtitle">
          Browse and edit components by category. Select a section below to get started.
        </p>
      </header>

      <nav class="home__nav" aria-label="Component sections">
        <RouterLink
          v-for="link in links"
          :key="link.path"
          :to="link.path"
          class="home__card"
          active-class="home__card--active"
        >
          <span class="home__card-name">{{ link.label }}</span>
          <span class="home__card-arrow">→</span>
        </RouterLink>
      </nav>
    </div>
  </main>
</template>

<style scoped>
.home {
  min-height: 100vh;
  padding: 48px clamp(20px, 6vw, 80px);
  background: #f5f7fa;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.home__container {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
}

.home__header {
  text-align: center;
  margin-bottom: 40px;
}

.eyebrow {
  margin: 0 0 8px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #64748b;
}

.home__title {
  margin: 0 0 12px;
  font-size: clamp(26px, 4vw, 40px);
  line-height: 1.1;
  color: #111827;
}

.home__subtitle {
  margin: 0;
  color: #64748b;
  font-size: 15px;
  line-height: 1.6;
}

.home__nav {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.home__card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 20px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  background: #ffffff;
  color: #1e293b;
  text-decoration: none;
  font-size: 15px;
  font-weight: 600;
  transition: all 0.18s ease;
}

.home__card:hover {
  border-color: #cbd5e2;
  box-shadow: 0 4px 18px rgba(15, 23, 42, 0.08);
  transform: translateY(-1px);
}

.home__card--active {
  border-color: #635bff;
  background: #eff1ff;
  color: #433bce;
}

.home__card-name {
  flex: 1;
}

.home__card-arrow {
  font-size: 18px;
  opacity: 0.45;
}
</style>
