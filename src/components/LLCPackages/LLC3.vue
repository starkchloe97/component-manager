<script setup>
import { CheckCircle } from '@lucide/vue'

const packageFeatures = [
  {
    title: 'Articles of Organization',
    desc: 'Preparing & Filing the Articles of Organization.'
  },
  {
    title: 'Statement of Organizer',
    desc: 'A document that passes ownership of the LLC to the owners of the company.'
  },
  {
    title: 'Operating Agreement',
    desc: 'This outlines the internal operations of the business how finances and decisions are made.'
  },
  {
    title: 'Employer Identification Number (EIN)',
    desc: 'Your EIN, allocated by the IRS, is needed to file LLC taxes and open business bank accounts, even if you don\'t have employees.'
  },
  {
    title: 'Lifetime Phone & Email Support',
    desc: "We're here for you for the life of your business. Your success is our goal."
  }
]
</script>

<template>
  <section class="section-dark pricing-section">
    <div class="pricing-radial"></div>
    <div class="container">
      <div class="pricing-header">
        <h2 class="display-lg text-white">Our LLC Formation package includes:</h2>
        <p class="pricing-sub">Get your LLC formation essentials and more.</p>
      </div>
      <div class="pricing-grid">
        <!-- Single Package -->
        <div class="pricing-card pricing-featured">
          <div class="plan-badge">Recommended</div>
          <div class="plan-top">
            <h3 class="plan-name plan-name-lg">LLC Formation</h3>
            <p class="plan-sub text-muted">Complete LLC formation package to get your business started.</p>
          </div>
          <!-- <PopUp
            buttonClass="btn-primary btn-full"
            trigger-text="Get Started Now"
          /> -->
          <div class="plan-features-section">
            <div class="features-label">Package Includes</div>
            <ul class="plan-features">
              <li v-for="feature in packageFeatures" :key="feature.title" class="feature-item">
                <CheckCircle :size="15" class="text-secondary" style="flex-shrink:0" />
                <div>
                  <strong>{{ feature.title }}</strong>
                  <span class="feature-desc">{{ feature.desc }}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

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

.display-lg {
  font-size: clamp(1.6rem, 3.2vw, 2.6rem);
  font-weight: 500;
  letter-spacing: -0.03em;
  line-height: 1.12;
}
.eyebrow {
  display: block;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.4em;
  color: var(--primary);
  margin-bottom: 14px;
}

a {
  color: var(--primary);
}
.text-secondary {
    color: var(--secondary);
}
.section-dark {
  background: var(--on-surface);
}

.pricing-section {
  padding: 96px 0;
  position: relative;
  overflow: hidden;
  border-radius: 30px;
  font-family: "Instrument Sans", sans-serif !important;
}

.pricing-radial {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top right, rgba(0,62,199,0.1) 0%, transparent 60%);
  pointer-events: none;
}

.pricing-header {
  text-align: center;
  margin-bottom: 52px;
  
}

.pricing-header .display-lg {
  color: #fff;
  margin-bottom: 12px;
}

.pricing-sub {
  color: rgba(255,255,255,0.6);
  max-width: 560px;
  margin: 0 auto;
  font-size: 0.95rem;
  font-weight: 300;
}

.pricing-grid {
  display: grid;
  grid-template-columns: minmax(300px, 700px);
  justify-content: center;
  gap: 20px;
}

.pricing-card {
  padding: 28px;
  border-radius: var(--radius-card);
  display: flex;
  flex-direction: column;
}

.pricing-featured {
  background: #fff;
  box-shadow: 0 28px 56px -12px rgba(0,62,199,0.2);
  position: relative;
  overflow: hidden;
}

.plan-badge {
  position: absolute;
  top: 0;
  right: 0;
  padding: 14px 18px;
  font-size: 9px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #fff;
  background: var(--primary);
  border-radius: 0 var(--radius-card) 0 10px;
}

.plan-top {
  margin-bottom: 30px;
}

.plan-name {
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 3px;
}

.plan-name-lg {
  font-size: 1.5rem;
  font-weight: 900;
  color: var(--on-surface);
  font-family: "Instrument Sans", sans-serif !important;
}

.plan-sub {
  font-size: 0.78rem;
  color: rgba(0,0,0,0.6);
}

.plan-features {
  display: flex;
  flex-direction: column;
  padding-left: 5px;
  gap: 20px;
  flex: 1;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 0.8rem;
}

.feature-item strong {
  display: block;
  color: var(--on-surface);
  font-weight: 700;
  margin-bottom: 2px;
}

.feature-desc {
  color: rgba(0,0,0,0.6);
  font-weight: 400;
}

.plan-features-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.features-label {
  font-size: 9px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: rgba(0,62,199,0.6);
  border-bottom: 1px solid rgba(0,62,199,0.05);
  padding-bottom: 5px;
}

.pricing-card .btn-primary {
  margin-bottom: 28px;
}

@media (max-width: 1024px) {
  .pricing-section {
    padding: 64px 0;
  }
  .pricing-grid {
    grid-template-columns: 1fr;
  }
}
</style>