<template>
  <section id="process" ref="sectionRef" class="process v-one">
    <div class="dots"></div>
    <div class="glow"></div>
    <div class="container">
      <div class="header scroll-reveal">
        <span class="section-label">How It Works</span>
        <h2 class="section-title">Four steps to protection</h2>
        <p class="section-desc">
          Our streamlined process makes trademark registration fast, easy, and
          stress-free.
        </p>
      </div>
      <div class="steps">
        <div
          v-for="(step, i) in steps"
          :key="i"
          class="scroll-reveal step-wrap"
        >
          <div v-if="i < 3" class="connector"></div>
          <div class="step">
            <div class="step-num">{{ i + 1 }}</div>
            <h3>{{ step.title }}</h3>
            <p>{{ step.desc }}</p>
            <div class="step-time">{{ step.time }}</div>
          </div>
        </div>
      </div>
      <div class="scroll-reveal timeline-note">
        <div class="note-box">
          <span class="iconify" data-icon="lucide:info" data-width="16"></span>
          <span
            >Total USPTO timeline is typically <strong>6–12 months</strong>. You
            can use ™ immediately after filing.</span
          >
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
const steps = [
  {
    title: "Trademark Search",
    desc: "We conduct a comprehensive federal, state, and common law search to ensure your mark is available and reduce the risk of conflicts.",
    time: "~24 hours",
  },
  {
    title: "Application Preparation",
    desc: "Our attorneys prepare your USPTO application, carefully classifying your goods/services and drafting precise descriptions.",
    time: "~2–3 days",
  },
  {
    title: "USPTO Filing",
    desc: "We file your application directly with the USPTO and you receive an official filing receipt with your serial number.",
    time: "Same day",
  },
  {
    title: "Monitoring & Approval",
    desc: "We monitor your application, respond to any USPTO office actions, and guide you through to final registration.",
    time: "~6–12 months",
  },
];
</script>

<style scoped>

.process{
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

.process {
  position: relative;
  padding: 96px 0;
  background: var(--ink);
  overflow: hidden;
}
@media (min-width: 768px) {
  .v-one .process {
    padding: 128px 0;
  }
}
.v-one .dots {
  position: absolute;
  inset: 0;
  opacity: 0.04;
  background-image: radial-gradient(
    circle at 1px 1px,
    white 1px,
    transparent 0
  );
  background-size: 32px 32px;
}
.v-one .glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, #0b55b6 0%, transparent 60%);
  filter: blur(80px);
  opacity: 0.1;
}
.v-one .container {
  position: relative;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
}
.v-one .header {
  text-align: center;
  margin-bottom: 80px;
}
.v-one .section-label {
  display: block;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--brand-mid);
  margin-bottom: 16px;
}
.v-one .section-title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 30px;
  line-height: 0.95;
  letter-spacing: -0.04em;
  color: #fff;
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
  color: rgba(255, 255, 255, 0.5);
  margin-top: 16px;
  max-width: 576px;
  margin-left: auto;
  margin-right: auto;
}
.v-one .steps {
  display: grid;
  gap: 32px;
}
@media (min-width: 768px) {
  .v-one .steps {
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
  }
}
.v-one .step-wrap {
  position: relative;
}
.v-one .connector {
  display: none;
  position: absolute;
  top: 32px;
  left: 100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(to right, var(--brand-mid), transparent);
  z-index: 0;
}
@media (min-width: 768px) {
  .v-one .connector {
    display: block;
  }
}
.v-one .step {
  position: relative;
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 32px;
  height: 100%;
}
.v-one .step-num {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--brand);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 14px;
  margin-bottom: 24px;
}
.v-one .step h3 {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 18px;
  color: #fff;
  margin-bottom: 12px;
}
.v-one .step p {
  font-size: 14px;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.6;
}
.v-one .step-time {
  margin-top: 24px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--brand-mid);
}
.v-one .timeline-note {
  margin-top: 48px;
  text-align: center;
}
.v-one .note-box {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 9999px;
  padding: 12px 24px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
}
.v-one .note-box .iconify {
  color: var(--brand-mid);
  flex-shrink: 0;
}
.v-one .note-box strong {
  color: rgba(255, 255, 255, 0.8);
}
</style>
