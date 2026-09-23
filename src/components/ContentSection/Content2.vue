<template>
  <section class="tk-section">
    <div class="container">
      <div class="tk-header">
        <span class="tk-label">Knowledge Base</span>
        <h2 class="tk-title">What you need to know<br/>about trademarks</h2>
        <p class="tk-subtitle">Understanding the fundamentals of trademark law is the first step to protecting your brand identity and intellectual property.</p>
      </div>

      <div class="tk-cards">
        <!-- Card 1: What is a Trademark -->
        <div class="tk-card tk-card--primary" ref="card1">
  <div class="tk-card__icon-wrap">
    <svg class="tk-card__icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="12" fill="currentColor" fill-opacity="0.12"/>
      <path d="M16 18.5C16 17.1193 17.1193 16 18.5 16H29.5C30.8807 16 32 17.1193 32 18.5V29.5C32 30.8807 30.8807 32 29.5 32H18.5C17.1193 32 16 30.8807 16 29.5V18.5Z" stroke="currentColor" stroke-width="1.5"/>
      <path d="M21 22V26M27 22V26M21 24H27" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  </div>

  <h3 class="tk-card__title">What is a trademark?</h3>

  <p class="tk-card__desc">
    A trademark helps define your brand by clearly identifying your products or
    services as your own and distinguishing you from competitors. When you
    register a trademark, you gain stronger legal rights that help protect your
    brand identity in the marketplace.
  </p>

  <ul class="tk-card__list">
    <li class="tk-card__item" v-for="item in trademarkItems" :key="item">
      <span class="tk-card__check">
        <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
          <path d="M2.5 7.5L5.5 10.5L11.5 3.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
      <span>{{ item }}</span>
    </li>
  </ul>

  <div class="tk-card__glow"></div>
</div>

        <!-- Card 2: What Trademark Registration Means -->
        <div class="tk-card tk-card--secondary" ref="card2">
  <div class="tk-card__icon-wrap tk-card__icon-wrap--alt">
    <svg class="tk-card__icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="12" fill="currentColor" fill-opacity="0.12"/>
      <path d="M24 16V32M16 24H32" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      <circle cx="24" cy="24" r="10" stroke="currentColor" stroke-width="1.5"/>
      <path d="M20 28L28 20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  </div>

  <h3 class="tk-card__title tk-card__title--light">
    What does a trademark mean?
  </h3>

  <p class="tk-card__desc tk-card__desc--light">
    A trademark indicates that a business name, brand name, slogan, logo,
    symbol, or design has been officially registered with the USPTO, giving
    the owner exclusive rights and restricting unauthorized use by others.
  </p>

  <ul class="tk-card__list tk-card__list--light">
    <li
      class="tk-card__item tk-card__item--light"
      v-for="item in registrationItems"
      :key="item"
    >
      <span class="tk-card__check tk-card__check--light">
        <svg viewBox="0 0 14 14" fill="none">
          <path
            d="M2.5 7.5L5.5 10.5L11.5 3.5"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
      <span>{{ item }}</span>
    </li>
  </ul>

  <div class="tk-card__glow tk-card__glow--alt"></div>
</div>
      </div>
    </div>

    <!-- Decorative elements -->
    <div class="tk-deco tk-deco--1"></div>
    <div class="tk-deco tk-deco--2"></div>
  </section>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=Playfair+Display:wght@500;600;700&display=swap');


.tc-section {
  
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

.tk-section {
  position: relative;
  background: #F6F4EF;
  padding: 100px 24px;
  overflow: hidden;
  font-family: 'Space Grotesk', sans-serif;
}

.container {
    max-width: 1200px;
    margin: 0 auto !important;
    padding: 0 24px !important;
}


.tk-header {
  text-align: center;
  max-width: 640px;
  margin: 0 auto 64px;
}

.tk-label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 5px 14px;
  background: rgba(26, 35, 126, 0.05);
  border: 1px solid rgba(26, 35, 126, 0.08);
  border-radius: 100px;
  font-size: 12px;
  font-weight: 700;
  color: var(--primary);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 16px;
}

.tk-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(32px, 5vw, 48px);
  font-weight: 600;
  color: #0F1F3B;
  line-height: 1.15;
  margin: 0 0 20px;
}

.tk-subtitle {
  font-size: 17px;
  line-height: 1.7;
  color: #5E6A7A;
  margin: 0;
}

.tk-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
}

@media (max-width: 768px) {
  .tk-cards { grid-template-columns: 1fr; }
  .tk-section { padding: 64px 20px; }
  .tk-header { margin-bottom: 40px; }
}

/* Card base */
.tk-card {
  position: relative;
  border-radius: 20px;
  padding: 44px 40px 48px;
  overflow: hidden;
  transition: transform 0.45s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.45s ease;
}

.tk-card:hover {
  transform: translateY(-6px);
}

.tk-card--primary {
  background: #FFFFFF;
  border: 1px solid rgba(15, 31, 59, 0.06);
  box-shadow: 0 4px 24px rgba(15, 31, 59, 0.06);
}

.tk-card--primary:hover {
  box-shadow: 0 16px 48px rgba(15, 31, 59, 0.1);
}

.tk-card--secondary {
  background: linear-gradient(135deg, var(--accent-light) 0%,#ff6d00 50%, var(--accent-light) 100%);
  /* border: 1px solid rgba(255, 255, 255, 0.06); */
  box-shadow: 0 4px 32px rgba(15, 31, 59, 0.2);
}

.tk-card--secondary:hover {
  box-shadow: 0 16px 56px rgba(15, 31, 59, 0.3);
}

/* Icon */
.tk-card__icon-wrap {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  /* background: rgba(184, 148, 62, 0.1); */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 28px;
  color: var(--accent-light);
}

.tk-card__icon-wrap--alt {
  /* background: rgba(255, 255, 255, 0.08); */
  color: #fff;
}

.tk-card__icon {
  width: 48px;
  height: 48px;
}

/* Title */
.tk-card__title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 26px;
  font-weight: 600;
  color: #0F1F3B;
  margin: 0 0 16px;
  line-height: 1.3;
}

.tk-card__title--light {
  color: #FFFFFF;
}

/* Desc */
.tk-card__desc {
  font-size: 15px;
  line-height: 1.75;
  color: #5E6A7A;
  margin: 0 0 28px;
}

.tk-card__desc--light {
  color: rgba(255, 255, 255, 1);
}

/* List */
.tk-card__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.tk-card__item {
  /* display: flex;
  align-items:normal;
  margin: 5px;
  gap: 12px;
  font-size: 14.5px;
  font-weight: 500;
  color: #0F1F3B; */
  display: flex;
    align-items: normal;
    margin: 5px;
    gap: 10px;
    font-size: 14.5px;
    font-weight: 500;
    color: #0F1F3B;
}

.tk-card__item--light {
  color: rgba(255, 255, 255, 0.88);
}

.tk-card__check {
  /* width: 22px;
  height: 22px;
  border-radius: 50%;
  /* background: linear-gradient(135deg, var(--accent-light) 0%,#ff6d00 50%, var(--accent-light) 100%); 
  border: 3px solid var(--accent-light);
  color: var(--accent-light);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0; */
  /* margin:6px; */
  width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 3px solid var(--accent-light);
    /* background: #fff; */
    color: #FF6F03;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-top: 4px;
    font-size: 12px;
    font-weight: 700;
}

.tk-card__check--light {
  background: rgba(212, 168, 83, 0.15);
  border: 1px solid #fff;
  color: #fff;
}

/* Glow */
.tk-card__glow {
  position: absolute;
  bottom: -60px;
  right: -60px;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(184, 148, 62, 0.08) 0%, transparent 70%);
  pointer-events: none;
}

.tk-card__glow--alt {
  background: radial-gradient(circle, rgba(212, 168, 83, 0.12) 0%, transparent 70%);
}

/* Decorative */
.tk-deco {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}

.tk-deco--1 {
  top: -80px;
  left: -120px;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(184, 148, 62, 0.06) 0%, transparent 70%);
}

.tk-deco--2 {
  bottom: -100px;
  right: -100px;
  width: 350px;
  height: 350px;
  background: radial-gradient(circle, rgba(15, 31, 59, 0.04) 0%, transparent 70%);
}
</style>

<script setup>
import { ref } from 'vue'

const card1 = ref(null)
const card2 = ref(null)

const trademarkItems = [
  'Register your company name, product name, slogan, logo, symbol, or design.',
  'A registered trademark provides stronger legal protection for your brand.',
  'The trademark must be actively used in commerce to maintain legal protection.',
  'Registration helps prevent others from copying or misusing your brand identity.',
  'An experienced trademark attorney can guide you through the filing process and submit your application correctly.'
];

const registrationItems = [
  'A registered trademark can protect your business name, brand name, slogan, logo, symbol, or design.',
  'Registration with the USPTO grants the owner exclusive legal rights to the trademark.',
  'It restricts unauthorized use of your trademark by competitors or third parties.',
  'Trademark registration is a formal legal process that establishes ownership.',
  'It helps protect your brand by preventing others from copying or misusing your branding.'
];
</script>