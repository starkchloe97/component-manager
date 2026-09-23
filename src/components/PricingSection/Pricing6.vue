<template>
  <section class="pricing-section v-six">
    <div class="container">
      <!-- Badge -->
      <div class="pricing-badge">Pricing</div>

      <!-- Heading -->
      <h2 class="pricing-title">Plans for your need</h2>
      <p class="pricing-subtitle">
        We have actually analyse the business need, and created a pricing that
        suits you.
      </p>


      <!-- Pricing Cards -->
      <div class="pricing-grid">
        <!-- Starter -->
        <div class="pricing-card">
          <div class="logo-icon">
            <span></span>
            <span></span>
          </div>

          <h3>Basic</h3>
          <p class="card-desc">
            For Starter most advance reliability.
          </p>

          <div class="price">
            <span class="amount">$0</span>
            <span class="period">/month</span>
          </div>

          <button class="plan-btn">
            Started Now
          </button>

          <div class="divider"></div>

          <h4>Features</h4>

          <ul>
            <li>Unlimited updates and products</li>
            <li>Custom permission</li>
            <li>Custom infrastructure</li>
          </ul>
        </div>

        <!-- Pro -->
        <div class="pricing-card featured">
          <div class="popular-badge">Popular</div>

          <div class="logo-icon">
            <span></span>
            <span></span>
          </div>

          <h3 class="white-plan">Delux</h3>
          <p class="card-desc">
            For Pro most advance reliability.
          </p>

          <div class="price">
            <span class="amount">$24</span>
            <span class="period">/month</span>
          </div>

          <button class="plan-btn white-btn">
            Subscribe Now
          </button>

          <div class="divider"></div>

          <h4 class="white-h4">Features</h4>

          <ul>
            <li>Unlimited updates and products</li>
            <li>Custom permission</li>
            <li>Custom infrastructure</li>
            <li>Custom updates</li>
          </ul>
        </div>

        <!-- Enterprise -->
        <div class="pricing-card">
          <div class="logo-icon">
            <span></span>
            <span></span>
          </div>

          <h3>Premium</h3>
          <p class="card-desc">
            For Enterprise most advance reliability.
          </p>

          <div class="price">
            <span class="amount">$49</span>
            <span class="period">/month</span>
          </div>

          <button class="plan-btn">
            Subscribe Now
          </button>

          <div class="divider"></div>

          <h4>Features</h4>

          <ul>
            <li>Unlimited updates and products</li>
            <li>Custom permission</li>
            <li>Custom infrastructure</li>
            <li>Custom update</li>
            <li>Custom Animations</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

const billingCycle = ref("monthly");
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
  padding: 100px 20px;
  background: #E7E7E7;
}

.white-plan {
  color: white;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.v-six .pricing-badge {
  width: fit-content;
  margin: 0 auto 20px;
  padding: 8px 18px;
  background: #fff;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.v-six .pricing-title {
  text-align: center;
  font-size: 56px;
  font-weight: 700;
  margin: 0;
  color: #000;
}

.v-six .pricing-subtitle {
  text-align: center;
  max-width: 650px;
  margin: 20px auto 65px;
  color: #666;
  line-height: 1.6;
}


.v-six .pricing-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  align-items: center;
}

.v-six .pricing-card {
  background: #F0F1F3;
  border-radius: 32px;
  padding: 30px;
  min-height: 580px;
  position: relative;
  box-shadow: 1px -3px 1px 0px rgb(255 255 255 / 76%), 3px 9px 20px 0px rgb(0 0 0 / 6%);
}

.v-six .featured {
  background: linear-gradient(
    180deg,
    #000 0%,
    #111 60%,
    #1e1e1e 100%
  );
  color: white;
  transform: translateY(-18px);
}

.v-six .logo-icon {
  display: flex;
  gap: 4px;
  margin-bottom: 24px;
}

.v-six .logo-icon span {
  width: 14px;
  height: 24px;
  background: currentColor;
  border-radius: 20px;
}

.v-six .logo-icon span:first-child {
  transform: rotate(35deg);
}

.v-six .logo-icon span:last-child {
  transform: rotate(-35deg);
}

.v-six .pricing-card h3 {
  font-size: 34px;
  margin: 0 0 8px;
}

.v-six .card-desc {
  color: #666;
  margin-bottom: 35px;
}

.v-six .featured .card-desc {
  color: rgba(255, 255, 255, 0.7);
}

.v-six .price {
  display: flex;
  align-items: flex-end;
  margin-bottom: 30px;
}

.v-six .amount {
  font-size: 64px;
  font-weight: 700;
  line-height: 1;
}

.v-six .period {
  margin-left: 6px;
  margin-bottom: 10px;
  color: #666;
}

.v-six .featured .period {
  color: rgba(255, 255, 255, 0.7);
}

.v-six .plan-btn {
  width: 100%;
  border: none;
  background: #f3f3f3;
  padding: 16px;
  border-radius: 999px;
  font-weight: 700;
  cursor: pointer;
      box-shadow: 0px -3px 1px 0px rgb(255 255 255 / 76%), 0px 2px 13px -3px rgb(0 0 0 / 8%);
}

.v-six .white-btn {
  background: white;
  color: black;
  box-shadow: none;
}
.v-six .white-h4{
    color: white;
}

.v-six .divider {
  height: 1px;
  background: rgba(0, 0, 0, 0.1);
  margin: 30px 0;
}

.v-six .featured .divider {
  background: rgba(255, 255, 255, 0.15);
}

.v-six h4 {
  margin-bottom: 20px;
}

.v-six ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.v-six li {
  position: relative;
  padding-left: 28px;
  margin-bottom: 14px;
}

.v-six li::before {
  content: "✓";
  position: absolute;
  left: 0;
  top: 0;
  font-weight: 700;
}

.v-six .popular-badge {
  position: absolute;
  top: 26px;
  right: 26px;
  background: rgba(255, 255, 255, 0.12);
  color: white;
  padding: 8px 16px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
}

/* Responsive */

@media (max-width: 992px) {
  .v-six .pricing-grid {
    grid-template-columns: 1fr;
  }

  .v-six .featured {
    transform: none;
  }

  .v-six .pricing-title {
    font-size: 42px;
  }
}

@media (max-width: 576px) {
  .v-six .pricing-title {
    font-size: 32px;
  }

  .v-six .amount {
    font-size: 48px;
  }
}
</style>