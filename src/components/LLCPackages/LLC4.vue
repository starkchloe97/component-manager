<template>
  <section id="pricing" ref="sectionRef" class="pricing">
    <div class="container">
      <div class="header scroll-reveal">
        <span class="section-label">Pricing</span>
        <h2 class="section-title">Our LLC Formation package.</h2>
        <p class="section-desc">
          No hidden fees. No surprises. USPTO filing fees included in all
          packages.
        </p>
      </div>
      <div class="tiers">
        <div
          v-for="(tier, i) in tiers"
          :key="i"
          class="scroll-reveal card-hover tier"
          :class="{ featured: tier.featured }"
          :style="{ transitionDelay: `${i * 0.1}s` }"
        >
          <div v-if="tier.featured" class="popular-badge">Recommended</div>
          <div class="tier-name" :class="{ light: tier.featured }">
            {{ tier.name }}
          </div>
          <p class="tier-subtitle" :class="{ light: tier.featured }">
            {{ tier.subtitle }}
          </p>
          <ul class="tier-features">
            <li
              v-for="(f, fi) in tier.features"
              :key="fi"
              :class="{
                muted: !f.included,
                light: tier.featured && f.included,
                'light-muted': tier.featured && !f.included,
              }"
            >
              <div>
                <span
                  class="iconify"
                  :data-icon="f.included ? 'lucide:check' : 'lucide:x'"
                  data-width="16"
                ></span>
                {{ f.text }}
              </div>
              <p>{{ f.para }}</p>
            </li>
          </ul>
        </div>
      </div>
      <!-- <div class="scroll-reveal fee-note">
        <p>
          USPTO filing fees are $250–$350 per class depending on the filing
          basis. <a href="#">Learn more about USPTO fees</a>
        </p>
      </div> -->
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useScrollReveal } from "@/composables/useScrollReveal";
const sectionRef = ref(null);
useScrollReveal(sectionRef);

const tiers = [
  {
    name: "LLC Formation",
    price: "499",
    subtitle: "Get your LLC formation essentials and more.",
    featured: true,
    features: [
      { 
        text: "Articles of Organization", 
        included: true, 
        para: "Preparing & Filing the Articles of Organization." 
      },
      { 
        text: "Statement of Organizer", 
        included: true, 
        para: "A document that passes ownership of the LLC to the owners of the company." 
      },
      { 
        text: "Operating Agreement", 
        included: true, 
        para: "This outlines the internal operations of the business how finances and decisions are made." 
      },
      { 
        text: "Employer Identification Number (EIN)", 
        included: true, 
        para: "Your EIN, allocated by the IRS, is needed to file LLC taxes and open business bank accounts, even if you don't have employees." 
      },
      { 
        text: "Lifetime Phone & Email Support", 
        included: true, 
        para: "We're here for you for the life of your business. Your success is our goal." 
      },
    ],
  },
];
</script>

<style scoped>

.pricing{
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


.pricing {
  padding: 96px 0;
  background: var(--surface);
}
@media (min-width: 768px) {
  .pricing {
    padding: 128px 0;
  }
}
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
}
.header {
  text-align: center;
  margin-bottom: 64px;
}
.section-label {
  display: block;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--brand);
  margin-bottom: 16px;
}
.section-title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 30px;
  line-height: 0.95;
  letter-spacing: -0.04em;
}
@media (min-width: 768px) {
  .section-title {
    font-size: 48px;
  }
}
@media (max-width: 768px) {
  .section-title {
    font-size: 26px;
  }
  .container{
    padding: 0 20px;
  }
}
@media (min-width: 1024px) {
  .section-title {
    font-size: 48px;
  }
}
.section-desc {
  font-size: 18px;
  font-weight: 300;
  color: var(--muted);
  margin-top: 16px;
  /* max-width: 576px; */
  margin-left: auto;
  margin-right: auto;
}
.tiers {
  /* display: grid; */
  gap: 24px;
  max-width: 750px;
  margin: 0 auto;
}
/* @media (min-width: 768px) {
  .tiers {
    grid-template-columns: repeat(3, 1fr);
  }
} */
.tier {
  position: relative;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 32px;
}
@media (min-width: 768px) {
  .tier {
    padding: 40px;
  }
}
.tier.featured {
  background: linear-gradient(to bottom, var(--brand), var(--brand-dark));
  border-color: rgba(11, 85, 182, 0.5);
}
.popular-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  color: var(--brand);
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  padding: 6px 16px;
  border-radius: 9999px;
}
.tier-name {
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--muted);
  margin-bottom: 16px;
}
.tier-name.light {
  color: #fff;
}
.tier-price {
  display: flex;
  align-items: baseline;
  gap: 4px;
  margin-bottom: 4px;
}
.price {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 48px;
  letter-spacing: -0.04em;
  color: var(--ink);
}
.price.light {
  color: #fff;
}
.price-note {
  font-size: 14px;
  color: var(--muted);
}
.price-note.light {
  color: rgba(255, 255, 255, 0.5);
}
.tier-subtitle {
  font-size: 14px;
  color: var(--muted);
  margin-bottom: 32px;
}
.tier-subtitle.light {
  color: #fff;
}
.tier-features {
  list-style: none;
  margin-bottom: 40px;
  padding-left: 0px;
}
.tier-features li {
  display: flex;
  /* align-items: center; */
  flex-direction: column;
  gap: 12px;
  font-size: 14px;
  margin-bottom: 12px;
}
.tier-features li .iconify {
  flex-shrink: 0;
}
.tier-features li:not(.muted) {
  color: rgba(15, 29, 51, 0.8);
}
.tier-features li:not(.muted) .iconify {
  color: var(--brand);
}
.tier-features li.muted {
  color: rgba(15, 29, 51, 0.4);
}
.tier-features li.muted .iconify {
  color: rgba(15, 29, 51, 0.2);
}
.tier-features li.light {
  color: rgba(255, 255, 255, 0.9);
}
.tier-features li.light .iconify {
  color: #fff;
}
.tier-features li.light-muted {
  color: rgba(255, 255, 255, 0.5);
}
.tier-features li.light-muted .iconify {
  color: rgba(255, 255, 255, 0.3);
}
.tier-btn {
  width: 100%;
  text-align: center;
  text-align: center;
  margin: 0px auto;
  align-items: center;
  align-content: center;
  letter-spacing: 0.1em;
  padding-top: 1.2rem;
  padding-bottom: 1.2rem;
  display: flex;
  flex-direction: column;
}

button.tier-btn.btn-primary {
  box-shadow: 0 12px 32px -8px rgba(255, 255, 255, 0.3);
  background: #fff;
  color: #0b55b6;
}
button.tier-btn.btn-primary:hover {
  box-shadow: 0 12px 32px -8px rgba(255, 255, 255, 0.3);
  background: #fff;
  color: #0b55b6;
}
.tier.featured .btn-primary:hover {
  box-shadow: 0 12px 32px -8px rgba(255, 255, 255, 0.3);
}
.fee-note {
  margin-top: 32px;
  text-align: center;
}
.fee-note p {
  font-size: 12px;
  color: var(--muted);
}
.fee-note a {
  color: var(--brand);
  text-decoration: none;
}
.fee-note a:hover {
  text-decoration: underline;
}
</style>
