<template>
  <section id="types" ref="sectionRef" class="types v-one">
    <div class="container">
      <div class="header scroll-reveal">
        <span class="section-label">Eligibility</span>
        <h2 class="section-title">What can you trademark?</h2>
        <p class="section-desc">
          A wide range of identifiers can be registered as trademarks, as long
          as they distinguish your brand from others.
        </p>
      </div>
      <div class="grid">
        <div
          v-for="(t, i) in types"
          :key="i"
          class="scroll-reveal type-card"
          :style="{ transitionDelay: `${i * 0.05}s` }"
        >
          <div class="type-icon">
            <span class="iconify" :data-icon="t.icon" data-width="22"></span>
          </div>
          <h3>{{ t.title }}</h3>
          <p>{{ t.desc }}</p>
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
const types = [
  {
    icon: "lucide:type",
    title: "Brand Names",
    desc: 'Words, phrases, and business names like "Nike" or "Just Do It"',
  },
  {
    icon: "lucide:hexagon",
    title: "Logos & Symbols",
    desc: "Visual designs, icons, and stylized symbols that represent your brand",
  },
  {
    icon: "lucide:music",
    title: "Sounds",
    desc: "Audio signatures like the NBC chimes or MGM lion roar",
  },
  {
    icon: "lucide:palette",
    title: "Colors",
    desc: "Specific colors associated with your brand, like Tiffany blue",
  },
  {
    icon: "lucide:package",
    title: "Product Packaging",
    desc: "Distinctive packaging design and trade dress like Coca-Cola's bottle",
  },
  {
    icon: "lucide:quote",
    title: "Slogans & Taglines",
    desc: "Marketing phrases that identify the source of goods or services",
  },
  {
    icon: "lucide:smartphone",
    title: "App Icons & UI",
    desc: "Distinctive app icons and user interface elements that identify your product",
  },
  {
    icon: "lucide:file-pen",
    title: "Scents & Tastes",
    desc: "Unique scents or flavors associated with your products (rare but possible)",
  },
];
</script>

<style scoped>

.types {
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
.types {
  padding: 96px 0;
  background: var(--surface);
}
@media (min-width: 768px) {
  .v-one .types {
    padding: 128px 0;
  }
}
.container {
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
  gap: 16px;
}
@media (min-width: 640px) {
  .v-one .grid {
    grid-template-columns: 1fr 1fr;
  }
}
@media (min-width: 1024px) {
  .v-one .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
.v-one .type-card {
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 24px;
  cursor: default;
  transition: all 400ms cubic-bezier(0.16, 1, 0.3, 1);
}
.v-one .type-card:hover {
  border-color: var(--brand);
  background: var(--brand-light);
}
.v-one .type-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: var(--brand-light);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  transition: all 400ms ease;
}
.v-one .type-icon .iconify {
  color: var(--brand);
}
.v-one .type-card:hover .type-icon {
  background: var(--brand);
}
.v-one .type-card:hover .type-icon .iconify {
  color: #fff;
}
.v-one .type-card h3 {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 8px;
}
.v-one .type-card p {
  font-size: 14px;
  font-weight: 300;
  color: var(--muted);
  line-height: 1.5;
}
.v-one .warning {
  margin-top: 48px;
}
.v-one .warning-box {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  background: #fef2f2;
  border: 1px solid #fee2e2;
  border-radius: 16px;
  padding: 32px;
  max-width: 768px;
  margin: 0 auto;
}
@media (min-width: 768px) {
  .v-one .warning-box {
    padding: 40px;
  }
}
.v-one .warning-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #fee2e2;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;
}
.v-one .warning-icon .iconify {
  color: #ef4444;
}
.v-one .warning-box h3 {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 16px;
  color: #7f1d1d;
  margin-bottom: 8px;
}
.v-one .warning-box p {
  font-size: 14px;
  font-weight: 300;
  color: rgba(127, 29, 29, 0.7);
  line-height: 1.6;
}
</style>
