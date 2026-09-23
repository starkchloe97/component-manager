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
  --primary: #003dc7bd;
  --secondary: #081fecc1;
  --accent: #ff6d00;

  --font-size: 16px;
  --font-weight: 400;
  --line-height: 1.5;

  --brand-50: #fff7ed;
  --brand-100: #ffedd5;
  --brand-200: #fed7aa;
  --brand-300: #fdba74;
  --brand-400: #fb923c;
  --brand-500: #f97316;
  --brand-600: #ea580c;
  --brand-700: #c2410c;

  --navy-800: #1e293b;
  --navy-900: #0f172a;
  --navy-950: #020617;

  --neutral-50: #fafafa;
  --neutral-100: #f5f5f5;
  --neutral-200: #e5e5e5;
  --neutral-300: #d4d4d4;
  --neutral-400: #a3a3a3;
  --neutral-500: #737373;
  --neutral-600: #525252;
  --neutral-700: #404040;
  --neutral-800: #262626;
  --neutral-900: #171717;
  --neutral-950: #0a0a0a;

  --green-400: #4ade80;
  --green-500: #22c55e;
  --green-600: #16a34a;

  --blue-400: #60a5fa;
  --blue-500: #3b82f6;

  --emerald-400: #34d399;
  --emerald-500: #10b981;

  --violet-400: #a78bfa;
  --violet-500: #8b5cf6;

  --amber-400: #fbbf24;
  --rose-400: #fb7185;

  --brand: #0b55b6;
  --brand-light: #e8f0fb;
  --brand-dark: #083d82;
  --brand-mid: #1a6fd4;

  --surface: #ffffff;
  --ink: #0f1d33;
  --muted: #5a6d85;
  --border: #d4e0f0;

  --font-display: "Inter Tight", sans-serif;
  --font-body: "Inter", sans-serif;

  --primary-light: #3949ab;
  --primary-lighter: #7986cb;

  --accent-light: #ff9e40;
  --accent-glow: rgba(255, 109, 0, 0.15);

  --teal: #00897b;
  --teal-light: #4db6ac;

  --bg: #fafbff;
  --bg-card: #ffffff;
  --bg-alt: #f0f2ff;

  --bg-gradient: linear-gradient(
    135deg,
    #fafbff 0%,
    #f0f2ff 50%,
    #fff8f0 100%
  );

  --text: #1a1a2e;
  --text-secondary: #5c6283;
  --text-muted: #8b90a8;

  --border-light: #eef0f8;

  --shadow-sm: 0 1px 3px rgba(26, 35, 126, 0.06);
  --shadow-md: 0 4px 16px rgba(26, 35, 126, 0.08);
  --shadow-lg: 0 8px 40px rgba(26, 35, 126, 0.1);
  --shadow-xl: 0 16px 60px rgba(26, 35, 126, 0.12);

  --radius: 12px;
  --radius-lg: 20px;
  --radius-xl: 28px;

  --on-surface: #131b2e;
  --on-surface-variant: #44474f;
  --background: #faf8ff;

  --surface-container-high: #e2e7ff;
  --surface-container-low: #f2f3ff;
  --outline-variant: #c3c5d9;
  --white: #ffffff;

  --radius-2xl: 1rem;
  --radius-3xl: 1.5rem;
  --radius-4xl: 2rem;
  --radius-pill: 9999px;
  --radius-card: 2rem;
  
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