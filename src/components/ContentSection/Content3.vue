<script setup>
import { Building2, ShieldCheck, Quote, Search } from '@lucide/vue'

const nameSteps = [
  { text: "Owner's contact information" },
  { text: 'The name or mark you want to protect' },
  { text: 'Goods or services the mark will cover' },
  { text: 'Current use in commerce vs. intent to use' },
  { text: 'A specimen showing the mark in use', note: 'Intent-to-use filers submit this later — additional fees apply.' },
]
</script>

<template>
  <section class="tg-section">
    <div class="container">
      <div class="tg-grid">
        <!-- LEFT -->
        <div class="tg-left">
          <div class="tg-deco tg-deco-1"></div>
          <div class="tg-deco tg-deco-2"></div>
          <div class="tg-left-inner">
            <span class="tg-eyebrow">USPTO Required</span>
            <h2 class="tg-left-title">How to trademark<br>a name</h2>
            <p class="tg-left-sub">Your application must be filed with the USPTO and include all of the following:</p>
            <div class="tg-steps">
              <div class="tg-step tg-step-shaded" v-for="(step, i) in nameSteps" :key="i">
                <span class="tg-step-num">0{{ i + 1 }}</span>
                <div>
                  <span class="tg-step-text">{{ step.text }}</span>
                  <span v-if="step.note" class="tg-step-note">{{ step.note }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT -->
        <div class="tg-right">
          <div class="tg-card tg-card-logo">
            <div class="tg-card-deco tg-card-deco-logo"></div>
            <div class="tg-card-inner">
              <div class="tg-card-header">
                <Building2 :size="20" class="tg-icon-success" />
                <h3 class="tg-card-title">How to trademark a logo</h3>
              </div>
              <p class="tg-card-body">You can trademark a logo that includes your business name — but protecting both the logo and name requires two separate filings.</p>
              <p class="tg-card-body">Filing provides stronger, nationwide legal protection than common-law rights alone.</p>
              <div class="tg-pill tg-pill-success">
                <ShieldCheck :size="13" />
                <span>Attorney review recommended</span>
              </div>
            </div>
          </div>

          <div class="tg-card tg-card-phrase">
            <div class="tg-card-deco tg-card-deco-phrase"></div>
            <div class="tg-card-inner">
              <div class="tg-card-header">
                <Quote :size="20" class="tg-icon-primary" />
                <h3 class="tg-card-title">How to trademark a phrase</h3>
              </div>
              <p class="tg-card-body">Slogans, mottos, and taglines can be trademarked. Start with a comprehensive search, then register with the USPTO.</p>
              <p class="tg-card-body">Not every phrase qualifies — and registration doesn't always guarantee exclusivity.</p>
              <div class="tg-pill tg-pill-primary">
                <Search :size="13" />
                <span>Search before you file</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

.tg-section {
  
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

.tg-section {
  padding: 80px 0;
  background: var(--background);
}

.tg-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(195, 197, 217, 0.3);
}

/* LEFT */
.tg-left {
  background: var(--on-surface);
  padding: 48px;
  position: relative;
  overflow: hidden;
}

.tg-deco {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}

.tg-deco-1 {
  top: -40px;
  right: -40px;
  width: 160px;
  height: 160px;
  background: rgba(255,255,255,0.06);
}

.tg-deco-2 {
  bottom: -20px;
  left: -20px;
  width: 100px;
  height: 100px;
  background: rgba(255,255,255,0.04);
}

.tg-left-inner {
  position: relative;
  z-index: 1;
}

.tg-eyebrow {
  display: block;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: rgba(255,255,255,0.5);
  margin-bottom: 10px;
}

.tg-left-title {
  font-size: 1.75rem;
  font-weight: 500;
  color: #fff;
  letter-spacing: -0.02em;
  line-height: 1.15;
  margin: 0 0 12px;
}

.tg-left-sub {
  font-size: 0.875rem;
  color: rgba(255,255,255,0.6);
  line-height: 1.6;
  margin: 0 0 28px;
}

.tg-steps {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.tg-step {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  padding: 12px;
  border-radius: 10px;
}

.tg-step-shaded:nth-child(odd) {
  background: rgba(255,255,255,0.08);
}

.tg-step-num {
  font-size: 11px;
  font-weight: 600;
  color: rgba(255,255,255,0.35);
  min-width: 20px;
  padding-top: 2px;
  flex-shrink: 0;
}

.tg-step-text {
  font-size: 0.875rem;
  color: #fff;
  line-height: 1.55;
  display: block;
}

.tg-step-note {
  display: block;
  font-size: 11px;
  color: rgba(255,255,255,0.45);
  line-height: 1.5;
  margin-top: 5px;
}

/* RIGHT */
.tg-right {
  display: flex;
  flex-direction: column;
}

.tg-card {
  flex: 1;
  padding: 36px 40px;
  position: relative;
  overflow: hidden;
}

.tg-card-logo {
  background: #fff; 
  border-bottom: 1px solid rgba(195, 197, 217, 0.3);
}

.tg-card-phrase {
  background: var(--surface-container-low);
}

.container {
    max-width: 1200px !important;
    margin: 0 auto !important;
    padding: 0 24px !important;
}

.tg-card-deco {
  position: absolute;
  width: 90px;
  height: 90px;
  pointer-events: none;
  opacity: 0.45;
}

.tg-card-deco-logo {
  top: 0;
  right: 0;
  background: rgba(0,110,42,0.12);
  border-radius: 0 0 0 90px;
}

.tg-card-deco-phrase {
  bottom: 0;
  right: 0;
  background: rgba(0,62,199,0.08);
  border-radius: 90px 0 0 0;
}

.tg-card-inner {
  position: relative;
  z-index: 1;
}

.tg-card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
}

.tg-card-title {
  font-size: 1rem;
  font-weight: 500;
  color: var(--on-surface);
  margin: 0;
  letter-spacing: -0.01em;
}

.tg-card-body {
  font-size: 0.875rem;
  color: var(--on-surface-variant);
  line-height: 1.7;
  margin: 0 0 10px;
}

.tg-card-body:last-of-type {
  margin-bottom: 16px;
}

.tg-icon-success {
  color: var(--secondary);
}

.tg-icon-primary {
  color: var(--primary);
}

.tg-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
}

.tg-pill-success {
  background: rgba(0,110,42,0.08);
  border: 1px solid rgba(0,110,42,0.2);
  color: var(--secondary);
}

.tg-pill-primary {
  background: rgba(0,62,199,0.06);
  border: 1px solid rgba(0,62,199,0.15);
  color: var(--primary);
}

@media (max-width: 1024px) {
  .tg-section {
    padding: 80px 0;
  }
  .tg-left {
    padding: 36px;
  }
  .tg-card {
    padding: 28px 32px;
  }
}

@media (max-width: 768px) {
  .tg-grid {
    grid-template-columns: 1fr;
  }
  .tg-card-deco {
    display: none;
  }
}

@media (max-width: 640px) {
  .tg-section {
    padding: 60px 0 0 0;
  }
  .tg-left {
    padding: 28px 24px;
  }
  .tg-card {
    padding: 24px;
  }
  .tg-left-title {
    font-size: 1.5rem;
  }
}
</style>
