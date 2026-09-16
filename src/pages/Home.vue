<script setup>
import { SITE_NAME, SITE_EMAIL, SITE_PHONE_RAW, SITE_DOMAIN } from '@/config/siteInfo'
import { componentRegistry } from '@/config/componentRegistry'

const sections = [
  { name: 'TextImage', label: 'Text Image Components', path: '/TextImage', count: Object.keys(componentRegistry).length },
  { name: 'CTA', label: 'CTA Components', path: '/CTA', count: 8 },
  { name: 'FAQ', label: 'FAQ Components', path: '/FAQ', count: 5 },
]

const totalComponents = sections.reduce((sum, s) => sum + s.count, 0)
</script>

<template>
  <main class="home">
    <div class="home__container">
      <section class="home__hero">
        <p class="eyebrow">COMPONENT MANAGER</p>
        <h1 class="home__title">Welcome to the Component Library</h1>
        <p class="home__subtitle">
          Browse, preview, and edit reusable UI components organized by category.
          Use the navigation in the header to switch between sections.
        </p>
      </section>

      <section class="home__summary" aria-label="System overview">
        <div class="summary__total">
          <span class="summary__number">{{ totalComponents }}</span>
          <span class="summary__label">Reusable components</span>
        </div>
        <div class="summary__row">
          <div class="summary__item">
            <span class="summary__number">{{ sections.length }}</span>
            <span class="summary__label">Categories</span>
          </div>
          <div class="summary__item">
            <span class="summary__number">{{ sections.length + 1 }}</span>
            <span class="summary__label">Navigation routes</span>
          </div>
        </div>
      </section>

      <section class="home__catalogue" aria-label="Component sections">
        <header class="catalogue__header">
          <h2 class="catalogue__title">Available sections</h2>
          <span class="catalogue__count">{{ sections.length }} sections</span>
        </header>

        <div class="catalogue__grid">
          <article
            v-for="section in sections"
            :key="section.path"
            class="catalogue__card"
          >
            <div class="catalogue__card-body">
              <h3 class="catalogue__card-title">{{ section.label }}</h3>
              <p class="catalogue__card-count">{{ section.count }} components</p>
            </div>
            <span class="catalogue__route">{{ section.path }}</span>
          </article>
        </div>
      </section>

      <section class="home__site" aria-label="Site information">
        <h2 class="site__title">Site information</h2>
        <dl class="site__grid">
          <div class="site__row">
            <dt class="site__label">Site name</dt>
            <dd class="site__value">{{ SITE_NAME }}</dd>
          </div>
          <div class="site__row">
            <dt class="site__label">Email</dt>
            <dd class="site__value">{{ SITE_EMAIL }}</dd>
          </div>
          <div class="site__row">
            <dt class="site__label">Phone</dt>
            <dd class="site__value">{{ SITE_PHONE_RAW }}</dd>
          </div>
          <div class="site__row">
            <dt class="site__label">Domain</dt>
            <dd class="site__value">{{ SITE_DOMAIN }}</dd>
          </div>
        </dl>
      </section>
    </div>
  </main>
</template>

<style scoped>
.home {
  min-height: calc(100vh - 56px);
  padding: 40px clamp(20px, 6vw, 64px);
  background: #f5f7fa;
}

.home__container {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.home__hero {
  text-align: center;
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
  font-size: clamp(26px, 4vw, 38px);
  line-height: 1.1;
  color: #111827;
}

.home__subtitle {
  margin: 0;
  color: #64748b;
  font-size: 15px;
  line-height: 1.7;
}

.home__summary {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.summary__total {
  flex: 1 1 200px;
  padding: 22px 24px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  background: #ffffff;
  text-align: center;
}

.summary__row {
  display: flex;
  gap: 24px;
  flex: 1 1 280px;
  flex-wrap: wrap;
}

.summary__item {
  flex: 1 1 140px;
  padding: 22px 24px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  background: #ffffff;
  text-align: center;
}

.summary__number {
  display: block;
  font-size: 32px;
  font-weight: 700;
  color: #111827;
}

.summary__label {
  display: block;
  margin-top: 4px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #64748b;
}

.catalogue__header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
}

.catalogue__title {
  margin: 0;
  font-size: 18px;
  color: #111827;
}

.catalogue__count {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #94a3b8;
}

.catalogue__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
}

.catalogue__card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 18px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  background: #ffffff;
  transition: all 0.16s ease;
}

.catalogue__card:hover {
  border-color: #cbd5e2;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.08);
}

.catalogue__card-body {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.catalogue__card-title {
  margin: 0;
  font-size: 14px;
  color: #1e293b;
}

.catalogue__card-count {
  margin: 0;
  font-size: 12px;
  color: #94a3b8;
}

.catalogue__route {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #635bff;
}

.home__site {
  padding-top: 8px;
}

.site__title {
  margin: 0 0 16px;
  font-size: 18px;
  color: #111827;
}

.site__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

.site__row {
  display: contents;
}

.site__row dt {
  padding: 12px 14px;
  border: 1px solid #e2e8f0;
  border-radius: 8px 0 0 8px;
  background: #f8fafc;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #64748b;
}

.site__row dd {
  margin: 0;
  padding: 12px 14px;
  border: 1px solid #e2e8f0;
  border-left: none;
  border-radius: 0 8px 8px 0;
  font-size: 13px;
  color: #1e293b;
  word-break: break-word;
}
</style>
