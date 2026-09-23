<template>
  <section id="pricing" ref="sectionRef" class="pricing-section">
    <div class="pricing-container">
      <!-- Header -->
      <div class="section-header scroll-reveal">
        <span class="section-tag">Pricing</span>
        <h2 class="section-title">Our LLC <span class="highlight">Formation </span> package includes</h2>
        <p class="section-desc">
          No hidden fees. No surprises. USPTO filing fees included.
        </p>
      </div>

      <!-- Card -->
      <div class="pricing-card scroll-reveal">
        <div class="card-accent-line"></div>

        <!-- Top -->
        <div class="card-top">
          <div class="badge-row">
            <span class="badge">BEST VALUE</span>
          </div>
          <div class="price-block">
            <span class="amount">LLC Formation
</span>
          </div>
         
        </div>

        <!-- Divider -->
        <div class="divider"></div>

        <!-- Features -->
        <ul class="feature-list">
          <li
            v-for="(f, fi) in tiers[0].features"
            :key="fi"
            class="feature-item"
            :style="{ '--i': fi }"
          >
            <div class="feature-row">
              <span class="check-icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8.5L6.5 12L13 4.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
              <span class="feature-title">{{ f.text }}</span>
            </div>
            <p class="feature-desc">{{ f.para }}</p>
          </li>
        </ul>

        <!-- CTA -->
        <button class="cta-button">
          Get Started
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 3L11 8L6 13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <!-- Bottom note -->
      <p class="fee-note scroll-reveal">
        USPTO filing fees are $250–$350 per class depending on the filing basis.
        <a href="#">Learn more about USPTO fees</a>
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

const sectionRef = ref(null)
useScrollReveal(sectionRef)

const tiers = [
  {
    features: [
      { text: 'Professional preparation', included: true, para: 'Search of more than 20 million Secretary of State filings for identical or similar names' },
      { text: 'Federal E-Filing with USPTO', included: true, para: 'Search of state registered trademarks using statistical analysis.' },
      { text: 'Certificate of Registration', included: true, para: 'Search of common law trademarks being used online and on social media networks' },
      { text: 'Cease & Desist Letter', included: true, para: 'Search of identical and very similar internet domain name registrations' },
      { text: 'Transfer/Assignment', included: true, para: 'Search of identical and very similar internet domain name registrations' },
    ],
  },
]
</script>

<style scoped>

.pricing-section {
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

.pricing-section {
  padding: 96px 24px;
  background: #ffffff;
}

@media (min-width: 768px) {
  .pricing-section {
    padding: 128px 24px;
  }
}

.pricing-container {
  max-width: 720px;
  margin: 0 auto;
}

/* Header */
.section-header {
  text-align: center;
  margin-bottom: 56px;
}

.section-tag {
  display: inline-block;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #FB8E37;
  margin-bottom: 18px;
}

.section-title {
  font-size: clamp(1.875rem, 4vw, 2.75rem);
  font-weight: 400;
  line-height: 1.15;
  letter-spacing: -0.025em;
  color: #141D30;
  margin: 0 0 14px;
}

.section-title .highlight {
  color: #FB8E37;
  -webkit-text-fill-color: #FB8E37;
}

.section-desc {
  font-size: 1rem;
  line-height: 1.7;
  color: #78716c;
  margin: 0;
}

/* Card */
.pricing-card {
  position: relative;
  background: #141D30;
  border-radius: 20px;
  padding: 40px 36px 36px;
  overflow: hidden;
}

@media (min-width: 768px) {
  .pricing-card {
    padding: 48px 44px 44px;
  }
}

.card-accent-line {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #FB8E37, #e67a22);
}

/* Top */
.card-top {
  text-align: center;
  margin-bottom: 0;
}

.badge-row {
  margin-bottom: 24px;
}

.badge {
  display: inline-block;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #FB8E37;
  border: 1px solid rgba(251, 142, 55, 0.25);
  padding: 5px 16px;
  border-radius: 100px;
  background: rgba(251, 142, 55, 0.08);
}

.price-block {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 2px;
  margin-bottom: 12px;
}

.amount {
  font-size: 4rem;
  font-weight: 400;
  letter-spacing: -0.04em;
  color: #ffffff;
  line-height: 1;
}

@media (min-width: 768px) {
  .amount {
    font-size: 4.5rem;
  }
}

/* Divider */
.divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
  margin: 32px 0;
}

/* Features */
.feature-list {
  list-style: none;
  padding: 0;
  margin: 0 0 36px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.feature-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.feature-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.check-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: rgba(251, 142, 55, 0.12);
  color: #FB8E37;
  flex-shrink: 0;
}

.feature-title {
  font-size: 0.9375rem;
  font-weight: 500;
  color: #ffffff;
}

.feature-desc {
  font-size: 0.8125rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.35);
  margin: 0;
  padding-left: 38px;
}

/* CTA Button */
.cta-button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px 24px;
  background: #FB8E37;
  color: #141D30;
  border: none;
  border-radius: 12px;
  font-size: 0.9375rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  cursor: pointer;
  transition: background 0.25s ease, gap 0.3s ease, box-shadow 0.25s ease;
}

.cta-button:hover {
  background: #e67a22;
  gap: 12px;
  box-shadow: 0 8px 28px -6px rgba(251, 142, 55, 0.45);
}

.cta-button svg {
  transition: transform 0.3s ease;
}

.cta-button:hover svg {
  transform: translateX(2px);
}

/* Fee note */
.fee-note {
  text-align: center;
  font-size: 0.8125rem;
  color: #a8a29e;
  margin: 32px 0 0;
  line-height: 1.6;
}

.fee-note a {
  color: #FB8E37;
  text-decoration: none;
  transition: color 0.2s ease;
}

.fee-note a:hover {
  color: #e67a22;
  text-decoration: underline;
}
</style>