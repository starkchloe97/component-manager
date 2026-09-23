<script setup>
import { Building2, Layers, Package, MessageCircle } from '@lucide/vue'
</script>

<template>
  <section class="section-bg universal-brands">
    <div class="container">
      <h2 class="display-lg text-center ub-heading">What you can register as a trademark</h2>
      <div class="ub-grid">
        <div class="ub-card ub-large bg-white">
          <div class="ub-card-content">
            <Building2 :size="40" class="ub-icon text-primary" />
            <h3 class="ub-title">Business &amp; Entity Names</h3>
            <p class="ub-desc">Your primary identity. We ensure your corporate title is bulletproof across all federal jurisdictions.</p>
          </div>
          <div class="ub-deco"></div>
        </div>
        <div class="ub-card ub-dark">
          <div class="ub-card-content">
            <Layers :size="40" class="ub-icon text-secondary" />
            <h3 class="ub-title">Logos &amp; Visuals</h3>
            <p class="ub-desc">From iconography to specific color palettes. Secure your visual intellectual property.</p>
          </div>
          <div class="ub-deco-glow"></div>
        </div>
        <div class="ub-card ub-small">
          <Package :size="40" class="ub-icon text-primary" />
          <h4 class="ub-small-title">Product Names</h4>
          <p class="ub-small-desc">Naming for specific SKUs and product lines.</p>
        </div>
        <div class="ub-card ub-wide bg-white">
          <div class="ub-wide-content">
            <MessageCircle :size="40" class="ub-icon text-primary" />
            <h4 class="ub-wide-title">Slogans &amp; Taglines</h4>
            <p class="ub-wide-desc">Protect the phrases that define your brand's voice.</p>
          </div>
          <div class="ub-quote-card">"I'm Lovin' It"</div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

.section-bg{
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

.section-bg {
  background: var(--background);
}

.container{
  max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;

}
.text-secondary{
    color: #003dc7bd;
}

.display-lg {
    font-size: clamp(1.6rem, 3.2vw, 2.6rem);
    font-weight: 500;
    letter-spacing: -0.03em;
    line-height: 1.12;
    text-align: center;
}

.universal-brands {
  padding: 40px 0;
  overflow: hidden;
}

.ub-heading {
  margin-bottom: 44px;
}
.text-primary {
    color: var(--primary);
}
.ub-grid {
  display: grid;
  grid-template-columns: 7fr 5fr;
  grid-template-rows: auto auto;
  gap: 18px;
}

.ub-card {
  padding: 32px;
  border-radius: var(--radius-card);
  position: relative;
  overflow: hidden;
  transition: box-shadow 0.3s;
}

.bg-white {
    background: #fff;
}

.ub-large {
  grid-column: 1;
  grid-row: 1;
}

.ub-dark {
  grid-column: 2;
  grid-row: 1;
  box-shadow: 0 20px 48px -10px rgba(0,0,0,0.25);
}

.ub-small {
  grid-column: 1;
  grid-row: 2;
  box-shadow: 0 20px 48px -10px rgba(0,0,0,0.25);
  background: #fff;
}

.ub-wide {
  grid-column: 2;
  grid-row: 2;
  display: flex;
  align-items: center;
  gap: 20px;
}

.ub-card:hover {
  box-shadow: 0 14px 36px rgba(0,0,0,0.1);
}

.ub-card-content {
  position: relative;
  z-index: 1;
}

.ub-icon {
  display: block;
  margin-bottom: 18px;
  transition: transform 0.3s;
}

.ub-card:hover .ub-icon {
  transform: scale(1.08);
}

.ub-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 8px;
  color: var(--on-surface);
}

.ub-title.text-white {
  color: #fff;
}

.ub-desc {
  color: var(--on-surface-variant);
  max-width: 340px;
  font-size: 0.85rem;
}

.ub-desc.text-white-60 {
  color: rgba(255,255,255,0.6);
}

.ub-deco {
  position: absolute;
  right: -60px;
  bottom: -60px;
  width: 180px;
  height: 180px;
  background: rgba(0,62,199,0.05);
  border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  transition: transform 0.3s;
}

.ub-card:hover .ub-deco {
  transform: scale(1.1);
}

.ub-deco-glow {
  position: absolute;
  right: 0;
  top: 0;
  width: 90px;
  height: 90px;
  background: rgba(255,255,255,0.05);
  filter: blur(24px);
  pointer-events: none;
}

.ub-small-title {
  font-size: 1.05rem;
  font-weight: 700;
  margin-bottom: 5px;
  color: var(--on-surface);
}

.ub-small-desc {
  font-size: 0.82rem;
  color: var(--on-surface-variant);
}

.ub-wide-content {
  flex: 1;
}

.ub-wide-title {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 5px;
  color: var(--on-surface);
}

.ub-wide-desc {
  color: var(--on-surface-variant);
  font-size: 0.85rem;
}

.ub-quote-card {
  background: rgba(255,255,255,0.5);
  border: 1px solid #fff;
  padding: 16px 18px;
  border-radius: 12px;
  font-style: italic;
  color: var(--on-surface-variant);
  text-align: center;
  white-space: nowrap;
  flex-shrink: 0;
  font-size: 0.85rem;
}

@media (max-width: 1024px) {
  .universal-brands {
    padding: 64px 0;
  }
  .ub-grid {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
  .ub-large,
  .ub-dark,
  .ub-small,
  .ub-wide {
    grid-column: 1;
    grid-row: auto;
  }
  .ub-wide {
    flex-direction: column;
  }
}
</style>
