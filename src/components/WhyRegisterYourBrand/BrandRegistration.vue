<template>
  <section id="why-us" class="why-register-section">
    <div class="container">
      <div class="section-header">
        <span class="eyebrow">The Benefits</span>
        <h2 class="section-title">Why register your brand?</h2>
      </div>

      <div class="benefits-grid">
        <div
          v-for="(benefit, index) in benefits"
          :key="index"
          class="benefit-item"
        >
          <div class="medallion-wrapper">
            <div class="medallion-bg" :class="benefit.color"></div>
            <div class="medallion-icon">
              <i :class="benefit.icon" aria-hidden="true"></i>
            </div>
          </div>
          <h3 class="benefit-title">{{ benefit.title }}</h3>
          <p class="benefit-text">{{ benefit.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const benefits = ref([
  {
    icon: 'fa-solid fa-shield-halved',
    title: "Build trust",
    text: "People feel good when they see well-known trademarks because trademarks add value by creating consumer trust and goodwill.",
    color: "brand"
  },
  {
    icon: 'fa-solid fa-certificate',
    title: "Use ® symbol",
    text: "Use the ® symbol following your trademark to let others know that your mark is federally registered adding prestige to your brand.",
    color: "accent"
  },
  {
    icon: 'fa-solid fa-lock',
    title: "Exclusive rights",
    text: "Enjoy the sole ownership of your trademark and stop others from unauthorized use of your trademark across the United States.",
    color: "brand"
  },
  {
    icon: 'fa-solid fa-arrow-trend-up',
    title: "Brand recognition",
    text: "A trademark differentiates your products and services from existing and foreseen competitors and acts as efficient commercial tool.",
    color: "accent"
  },
  {
    icon: 'fa-solid fa-gem',
    title: "Intangible asset",
    text: "A registered trademark creates an intangible asset which can be sold, assigned, franchised, or commercially contracted.",
    color: "brand"
  },
  {
    icon: 'fa-solid fa-store',
    title: "Amazon Brand Registry",
    text: "Take advantage of your trademark filing with the USPTO by enrolling your brand on the Amazon Brand Registry to enjoy exclusive benefits.",
    color: "accent"
  }
]);
</script>

<style scoped>

.why-register-section {
  --bg-card: #ffffff;
  --border-light: #eef0f8;
  --radius-lg: 20px;
}

.why-register-section {
  padding-top: 65px;
  padding-bottom: 96px;
  background-color: #F8F9FB;
}

.container {
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 24px;
}

.section-header {
  text-align: center;
  margin-bottom: 56px;
}

.eyebrow {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #ff6d00;
  display: block;
}

.section-title {
  font-family: 'Inter Tight', sans-serif;
  font-weight: 600;
  font-size: 28px;
  line-height: 1.1;
  letter-spacing: -0.03em;
  color: #0F2B46;
  margin: 16px 0 0 0;
}

/* Grid — centered, no scroll/carousel */
.benefits-grid {
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  gap: 40px;
  max-width: 420px;
  margin: 0 auto;
}

.benefit-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
    background: var(--bg-card);
    border: 1px solid var(--border-light);
    border-radius: var(--radius-lg);
    padding: 35px 29px;
    text-align: center;
    transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
    cursor: default;
    position: relative;
}

.medallion-wrapper {
  position: relative;
  width: 62px;
  height: 62px;
  margin-bottom: 20px;
}

.medallion-bg {
  position: absolute;
  inset: 0;
  transform: rotate(45deg);
}

.medallion-icon {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFFFFF;
  font-size: 22px;
  background-color: #ff6f0024;
  border-radius: 15px;
}
.medallion-icon i {
  color: #ff6d00;
  font-size: 20px;
}

.benefit-title {
  font-family: 'Inter Tight', sans-serif;
  font-weight: 600;
  font-size: 17px;
  color: #0F2B46;
  margin: 0 0 8px 0;
}

.benefit-text {
  font-size: 14px;
  color: #4B5563;
  line-height: 1.6;
  margin: 0;
  max-width: 300px;
}

@media (min-width: 768px) {
  .why-register-section {
    padding-bottom: 128px;
  }

  .section-title {
    font-size: 48px;
  }

  .section-header {
    margin-bottom: 80px;
  }

  .benefits-grid {
    grid-template-columns: repeat(3, 1fr);
    max-width: 1200px;
    gap: 48px 40px;
  }

  .medallion-wrapper {
    width: 62px;
    height: 62px;
  }

  .medallion-icon {
    font-size: 24px;
  }
}

@media (min-width: 1024px) {
  .container {
    padding: 0 40px;
  }
}
</style>