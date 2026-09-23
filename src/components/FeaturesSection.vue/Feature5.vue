<template>
  <section id="benefits" ref="sectionRef" class="benefits v-one">
    <div class="container">
      <div class="header scroll-reveal">
        <span class="section-label">Why Register</span>
        <h2 class="section-title">The advantages of federal registration</h2>
        <p class="section-desc">
          Registration transforms your common law rights into powerful federal
          protections that can make or break your business.
        </p>
      </div>
      <div class="grid">
        <div
          v-for="(b, i) in benefits"
          :key="i"
          class="scroll-reveal card-hover card"
          :style="{ transitionDelay: `${i * 0.08}s` }"
        >
          <div class="card-glow"></div>
          <div class="card-inner">
            <div class="icon-box">
              <span class="iconify" :data-icon="b.icon" data-width="22"></span>
            </div>
            <h3>{{ b.title }}</h3>
            <p>{{ b.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useScrollReveal } from "../../composables/useScrollReveal";
const sectionRef = ref(null);
useScrollReveal(sectionRef);
const benefits = [
  {
    icon: "lucide:globe",
    title: "Nationwide Exclusive Rights",
    desc: "Common law rights are limited to where you do business. Federal registration gives you exclusive rights in all 50 states, even in markets you haven't entered yet.",
  },
  {
    icon: "lucide:scale",
    title: "Presumption of Validity",
    desc: "In any legal dispute, your registered trademark is presumed valid. The burden of proof shifts to the infringer, making it far easier and cheaper to defend your brand.",
  },
  {
    icon: "lucide:dollar-sign",
    title: "Recover Damages & Attorney Fees",
    desc: "Registered trademark owners can recover statutory damages up to $2 million per counterfeit mark and reasonable attorney fees—unavailable with unregistered marks.",
  },
  {
    icon: "lucide:ban",
    title: "Block Infringing Imports",
    desc: "Record your trademark with U.S. Customs and Border Protection to stop counterfeit goods from entering the country—a powerful tool unregistered mark owners don't have.",
  },
  {
    icon: "lucide:trending-up",
    title: "Increased Business Value",
    desc: "A registered trademark is an intangible asset that increases your company's valuation. It's essential for licensing, franchising, and attracting investors or buyers.",
  },
  {
    icon: "lucide:search",
    title: "Public Notice & Deterrence",
    desc: "Your registration appears in the USPTO's public database, putting others on constructive notice of your rights and deterring potential infringers before they even start.",
  },
];
</script>

<style scoped>

.benefits {
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

.benefits {
  padding: 96px 0;
  background: var(--surface);
}
@media (min-width: 768px) {
  .v-one .benefits {
    padding: 128px 0;
  }
}
.v-one .container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
}
.v-one .header {
  text-align: center;
  margin-bottom: 64px;
}
.v-one .section-label {
  display: block;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--brand);
  margin-bottom: 16px;
}
.v-one .section-title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 30px;
  line-height: 0.95;
  letter-spacing: -0.04em;
}
@media (min-width: 768px) {
  .v-one .section-title {
    font-size: 48px;
  }
}
@media (min-width: 1024px) {
  .v-one .section-title {
    font-size: 60px;
  }
}
.v-one .section-desc {
  font-size: 18px;
  font-weight: 300;
  color: var(--muted);
  margin-top: 16px;
  max-width: 672px;
  margin-left: auto;
  margin-right: auto;
}
.v-one .grid {
  display: grid;
  gap: 24px;
}
@media (min-width: 768px) {
  .v-one .grid {
    grid-template-columns: 1fr 1fr;
  }
}
@media (min-width: 1024px) {
  .v-one .grid {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
.v-one .card {
  position: relative;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 32px;
  overflow: hidden;
}
.v-one .card-glow {
  position: absolute;
  top: 0;
  right: 0;
  width: 112px;
  height: 112px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(11, 85, 182, 0.08) 0%,
    transparent 70%
  );
  transform: translate(30%, -30%);
  opacity: 0;
  transition: opacity 0.5s;
}
.v-one .card:hover .card-glow {
  opacity: 1;
}
.v-one .card-inner {
  position: relative;
}
.v-one .icon-box {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: var(--brand-light);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}
.v-one .icon-box .iconify {
  color: var(--brand);
}
.v-one .card h3 {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 18px;
  letter-spacing: -0.02em;
  margin-bottom: 12px;
}
.v-one .card p {
  font-size: 14px;
  font-weight: 300;
  color: var(--muted);
  line-height: 1.6;
}
</style>
