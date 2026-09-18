<script setup>
import { CheckCircle, BadgeCheck, Sparkles } from '@lucide/vue'

const basicFeatures = [
  'Preliminary search',
  'Paralegal class selection',
  'Filing with USPTO',
  'Serial number: 10 days',
]

const deluxeFeatures = [
  'Federal & Common Law Search',
  'Attorney Class Selection',
  'Cease-and-Desist Support',
  '30-Min Attorney Consult',
  'Serial number: 5 days',
]

const premiumFeatures = [
  'Attorney rejection-minimization',
  '1-Year monitoring alerts',
  'Lifetime post-filing alerts',
  '24-hr expedited processing',
]
</script>

<template>
  <section class="section-dark pricing-section scroll-reveal v-four">
    <div class="pricing-radial"></div>

    <div class="container">
      <div class="pricing-header">
        <h2 class="display-lg text-white">Premium Protection Plans</h2>
        <p class="pricing-sub">
          Sophisticated legal support tailored to your stage of growth.
        </p>
      </div>

      <div class="pricing-grid">
        <!-- Basic -->
        <div class="pricing-card pricing-dim">
          <div class="plan-top">
            <h3 class="plan-name text-white">Basic</h3>
            <p class="plan-sub text-white-40">
              For early-stage visionaries
            </p>
          </div>

          <div class="plan-price">
            <span class="price-amount text-white">$35</span>
            <span class="price-note text-white-40">
              + USPTO fees ($450/class)
            </span>
          </div>

          <button class="btn-outline-white">Select Plan</button>

          <ul class="plan-features">
            <li
              v-for="f in basicFeatures"
              :key="f"
              class="feature-item text-white-60"
            >
              <CheckCircle
                :size="15"
                class="text-secondary"
                style="flex-shrink: 0"
              />
              {{ f }}
            </li>
          </ul>
        </div>

        <!-- Deluxe -->
        <div class="pricing-card pricing-featured">
          <div class="plan-badge">Preferred</div>

          <div class="plan-top">
            <h3 class="plan-name plan-name-lg">Deluxe</h3>
            <p class="plan-sub text-muted">
              Attorney-led comprehensive care
            </p>
          </div>

          <div class="plan-price">
            <span class="price-amount price-primary">$199</span>
            <span class="price-note text-muted">
              + USPTO fees ($450/class)
            </span>
          </div>

          <button class="btn-primary btn-full">Get Started Now</button>

          <div class="plan-features-section">
            <div class="features-label">Enhanced Features</div>

            <ul class="plan-features">
              <li
                v-for="f in deluxeFeatures"
                :key="f"
                class="feature-item"
              >
                <BadgeCheck
                  :size="15"
                  class="text-secondary"
                  style="flex-shrink: 0"
                />
                {{ f }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Premium -->
        <div class="pricing-card pricing-dim">
          <div class="plan-top">
            <h3 class="plan-name text-white">Premium</h3>
            <p class="plan-sub text-white-40">
              Enterprise-grade protection
            </p>
          </div>

          <div class="plan-price">
            <span class="price-amount text-white">$299</span>
            <span class="price-note text-white-40">
              + USPTO fees ($450/class)
            </span>
          </div>

          <button class="btn-outline-white">Select Plan</button>

          <ul class="plan-features">
            <li
              v-for="f in premiumFeatures"
              :key="f"
              class="feature-item text-white-60"
            >
              <Sparkles
                :size="15"
                class="text-secondary"
                style="flex-shrink: 0"
              />
              {{ f }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.v-four {
  --primary: #003dc7bd;
  --secondary: #081fecc1;
  --on-surface: #131b2e;
  --on-surface-variant: #44474f;
  --background: #faf8ff;
  --radius-card: 2rem;

  font-family: "Instrument Sans", sans-serif !important;
  font-size: 15px;
  line-height: 1.6;
  color: var(--on-surface);
  overflow-x: hidden;
}

.v-four *,
.v-four *::before,
.v-four *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: "Instrument Sans", sans-serif !important;
}

.section-dark {
  background: var(--on-surface);
  font-family: "Instrument Sans", sans-serif !important;

}

.pricing-section {
  padding: 96px 0;
  position: relative;
  overflow: hidden;
  font-family: "Instrument Sans", sans-serif !important;

}

.v-four .pricing-radial {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at top right,
    rgba(0, 62, 199, 0.1) 0%,
    transparent 60%
  );
  pointer-events: none;
}

.v-four .container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  font-family: "Instrument Sans", sans-serif !important;

}

.v-four .pricing-header {
  text-align: center;
  margin-bottom: 52px;
}

.v-four .pricing-header .display-lg {
  color: #fff;
  margin-bottom: 12px;
}

.v-four .display-lg {
  font-size: clamp(1.6rem, 3.2vw, 2.6rem);
  font-weight: 500;
  letter-spacing: -0.03em;
  line-height: 1.12;
}

.v-four .pricing-sub {
  color: rgba(255, 255, 255, 0.6);
  max-width: 560px;
  margin: 0 auto;
  font-size: 0.95rem;
  font-weight: 300;
}

.v-four .pricing-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  align-items: end;
}

.v-four .pricing-card {
  padding: 28px;
  border-radius: var(--radius-card);
  display: flex;
  flex-direction: column;
}

.v-four .pricing-dim {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: background 0.3s;
}

.v-four .pricing-dim:hover {
  background: rgba(255, 255, 255, 0.09);
}

.v-four .pricing-featured {
  background: #fff;
  transform: translateY(-16px);
  box-shadow: 0 28px 56px -12px rgba(0, 62, 199, 0.2);
  position: relative;
  overflow: hidden;
}

.v-four .plan-badge {
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

.v-four .plan-top {
  margin-bottom: 30px;
}

.v-four .plan-name {
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 3px;
}

.v-four .plan-name-lg {
  font-size: 1.5rem;
  font-weight: 900;
  color: var(--on-surface);
}

.v-four .plan-sub {
  font-size: 0.78rem;
}

.v-four .plan-price {
  margin-bottom: 20px;
}

.v-four .price-amount {
  font-size: 2rem;
  font-weight: 900;
  letter-spacing: -0.05em;
  display: block;
}

.v-four .price-primary {
  color: var(--primary);
  font-size: 2.5rem;
}

.v-four .price-note {
  font-size: 10px;
  font-weight: 700;
  display: block;
  margin-top: 3px;
}

.v-four .plan-features {
  display: flex;
  flex-direction: column;
  padding-left: 2rem;
  gap: 15px;
  flex: 1;
  list-style: none;
}

.v-four .feature-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 0.8rem;
}

.v-four .plan-features-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.v-four .features-label {
  font-size: 9px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: rgba(0, 62, 199, 0.6);
  border-bottom: 1px solid rgba(0, 62, 199, 0.05);
  padding-bottom: 5px;
}

.v-four .pricing-card .btn-primary,
.v-four .pricing-card .btn-outline-white {
  margin-bottom: 28px;
}

.v-four .btn-primary {
  background: var(--primary);
  color: #fff;
  font-weight: 500;
  border-radius: 7px;
  padding: 12px 26px;
  font-size: 0.875rem;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 6px 20px rgba(0, 62, 199, 0.2);
  display: inline-block;
}

.v-four .btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(0, 62, 199, 0.3);
}

.v-four .btn-primary:active {
  transform: scale(0.97);
}

.v-four .btn-full {
  width: 100%;
  padding: 14px;
  border-radius: 7px;
  text-align: center;
}

.v-four .btn-outline-white {
  width: 100%;
  padding: 12px;
  border-radius: 7px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  font-weight: 500;
  font-size: 0.875rem;
  transition: background 0.2s, color 0.2s;
}

.v-four .btn-outline-white:hover {
  background: #fff;
  color: var(--on-surface);
}

.v-four .scroll-reveal {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.v-four .scroll-reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}

.v-four .text-white {
  color: #fff;
}

.v-four .text-white-40 {
  color: rgba(255, 255, 255, 0.4);
}

.v-four .text-white-60 {
  color: rgba(255, 255, 255, 0.6);
}

.v-four .text-muted {
  color: var(--on-surface-variant);
}

.v-four .text-secondary {
  color: var(--secondary);
}

.v-four ul {
  list-style: none;
}

.v-four button {
  cursor: pointer;
  border: none;
  background: none;
  font-family: inherit;
}

@media (max-width: 1024px) {
  .v-four .pricing-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .v-four .pricing-featured {
    transform: none;
  }

  .v-four .container {
    padding: 0 20px;
  }
}

@media (max-width: 640px) {
  .v-four .container {
    padding: 0 16px;
  }
}
</style>