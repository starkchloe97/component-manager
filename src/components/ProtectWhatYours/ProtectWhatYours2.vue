<template>
  <section ref="sectionRef" class="protect-section v-five">
    <div class="orb"></div>

    <div class="protect-inner">
      <!-- Header -->
      <div class="section-header">
        <div class="reveal">
          <span class="badge-pill">
            <span v-html="getIcon('lock')"></span>
            What Can You Protect?
          </span>
        </div>

        <h2 class="section-title reveal reveal-delay-1">
          Protect What's Yours
        </h2>

        <p class="section-subtitle reveal reveal-delay-2">
          Whether it's your brand name, logo, or tagline — federal
          registration gives you nationwide exclusive rights.
        </p>
      </div>

      <!-- Cards -->
      <div class="cards-grid">
        <div v-for="(card, index) in cards" :key="index" class="protect-card reveal"
          :class="`reveal-delay-${index + 1}`">
          <div class="icon-wrap" v-html="getIcon(card.icon)"></div>

          <h3 class="card-title">
            {{ card.title }}
          </h3>

          <p class="card-desc">
            {{ card.description }}
          </p>

          <ul class="checklist">
            <li v-for="(item, i) in card.items" :key="i" class="checklist-item">
              <span class="checklist-icon" v-html="getIcon('check')"></span>

              {{ item }}
            </li>
          </ul>

          <span class="arrow-link" @click="handleLinkClick(card.title)">
            Learn the process
            <span v-html="getIcon('arrow')"></span>
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const sectionRef = ref(null);
let observer = null;

const cards = [
  {
    icon: "type",
    title: "How to Trademark a Name",
    description:
      "Protect your brand or product name from unauthorized use. A registered trademark prevents competitors from using confusingly similar names.",
    items: [
      "Comprehensive name availability search",
      "Class identification & specification",
      "Full USPTO application filing",
    ],
  },
  {
    icon: "image",
    title: "How to Trademark a Logo",
    description:
      "Secure your visual identity with a design mark registration. Prevent others from using logos that could confuse your customers.",
    items: [
      "Visual design search & clearance",
      "Accurate drawing & description",
      "Stylized or standard character filing",
    ],
  },
  {
    icon: "quote",
    title: "How to Trademark a Phrase",
    description:
      "Lock down your slogan, tagline, or catchphrase. Federal registration ensures your words remain exclusively yours.",
    items: [
      "Phrase distinctiveness evaluation",
      "Proper specimen preparation",
      "Strategic class selection",
    ],
  },
];

const icons = {
  type: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>`,

  image: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`,

  quote: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>`,

  lock: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,

  check: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,

  arrow: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
};

const getIcon = (name) => icons[name] || "";

const handleLinkClick = (title) => {
  console.log(`Navigate to: ${title}`);
};

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  sectionRef.value
    ?.querySelectorAll(".reveal")
    .forEach((el) => observer.observe(el));
});

onBeforeUnmount(() => {
  observer?.disconnect();
});
</script>


<style scoped>

.protect-section {
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

@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap");

.protect-section {
  scroll-behavior: smooth;
}

.protect-section {
  font-family: "Inter", sans-serif;
  background-color: #ffffff;
  color: var(--neutral-900);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
}

/* main file css end */

/* ── Section ── */

.protect-section {
  background-color: #020617;
  position: relative;
  padding: 96px 24px;
  overflow: hidden;
}

@media (min-width: 768px) {
.protect-section {
    padding: 128px 24px;
  }
}

/* ── Dot grid background ── */
.protect-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(249, 115, 22, 0.07) 1px, transparent 1px);
  background-size: 32px 32px;
  pointer-events: none;
}

/* ── Glow orb ── */
.v-five .orb {
  position: absolute;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(249, 115, 22, 0.12) 0%, transparent 70%);
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
  top: -240px;
  left: -240px;
  opacity: 0.5;
}

/* ── Inner container ── */
.v-five .protect-inner {
  position: relative;
  z-index: 10;
  max-width: 1280px;
  margin: 0 auto;
}

/* ── Section header ── */
.v-five .section-header {
  text-align: center;
  margin-bottom: 64px;
}

@media (min-width: 768px) {
  .v-five .section-header {
    margin-bottom: 80px;
  }
}

/* ── Badge pill ── */
.v-five .badge-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(249, 115, 22, 0.1);
  border: 1px solid rgba(249, 115, 22, 0.2);
  color: #f97316;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 6px 16px;
  border-radius: 9999px;
  margin-bottom: 16px;
}

.v-five .badge-pill svg {
  width: 14px;
  height: 14px;
}

/* ── Heading ── */
.v-five .section-title {
  font-size: 30px;
  font-weight: 500;
  letter-spacing: -0.025em;
  line-height: 1.15;
  margin-top: 16px;
  margin-bottom: 16px;
  color: #ffffff;
}

@media (min-width: 768px) {
  .v-five .section-title {
    font-size: 48px;
  }
}

.v-five .gradient-text {
  background: linear-gradient(135deg, #ffffff 0%, #f97316 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ── Subtitle ── */
.v-five .section-subtitle {
  color: #94a3b8;
  font-weight: 300;
  font-size: 18px;
  line-height: 1.625;
  max-width: 576px;
  margin: 0 auto;
}

/* ── Cards grid ── */
.v-five .cards-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

@media (min-width: 768px) {
  .v-five .cards-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
  }
}

@media (min-width: 1024px) {
  .v-five .cards-grid {
    gap: 40px;
  }
}

/* ── Individual card ── */
.v-five .protect-card {
  background: linear-gradient(180deg, rgba(249, 115, 22, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  padding: 32px;
  position: relative;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: default;
}

.v-five .protect-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #f97316, transparent);
  opacity: 0;
  transition: opacity 0.5s;
}

.v-five .protect-card:hover {
  border-color: rgba(249, 115, 22, 0.25);
  transform: translateY(-6px);
  /* box-shadow: 0 25px 60px -20px rgba(249, 115, 22, 0.2); */
}

.v-five .protect-card:hover::before {
  opacity: 1;
}

/* ── Icon wrapper ── */
.v-five .icon-wrap {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  transition: all 0.5s;
}

.v-five .icon-wrap svg {
  width: 18px;
  height: 18px;
  color: #f97316;
}

.v-five .icon-wrap :deep(svg) {
  width: 25px;
  height: 25px;
}

.v-five .protect-card:hover .icon-wrap {
  background: rgba(249, 115, 22, 0.15);
  border-color: rgba(249, 115, 22, 0.4);
}

/* ── Card title ── */
.v-five .card-title {
  font-size: 20px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 12px;
}

/* ── Card description ── */
.v-five .card-desc {
  color: #94a3b8;
  font-size: 14px;
  line-height: 1.625;
  margin-bottom: 24px;
}

/* ── Checklist ── */
.v-five .checklist {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 32px;
}

.v-five .checklist-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 14px;
  color: #94a3b8;
  line-height: 1.5;
}

.v-five .checklist-icon {
  width: 16px;
  height: 16px;
  color: #f97316;
  flex-shrink: 0;
  margin-top: 2px;
}

/* ── Arrow link ── */
.v-five .arrow-link{
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #f97316;
    font-weight: 500;
    font-size: 14px;
    cursor: pointer;
    transition: gap 0.3s;
    text-decoration: none;
    user-select: none;
    background: #f9731630;
    padding: 7px 20px;
    border-radius: 30px;
    font-size: 12px;
    border: 1px solid #f9731630;
}

.v-five .arrow-link:hover {
  gap: 14px;
}

.v-five .arrow-link svg {
  width: 16px;
  height: 16px;
}

/* ── Scroll reveal ── */
.v-five .reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.v-five .reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

.v-five .reveal-delay-1 {
  transition-delay: 0.1s;
}

.v-five .reveal-delay-2 {
  transition-delay: 0.2s;
}

.v-five .reveal-delay-3 {
  transition-delay: 0.3s;
}

.v-five .protect-card:hover,
.v-five .protect-card.reveal-delay-2 {
  border-color: rgba(249, 115, 22, 0.25);
  transform: translateY(-6px);
  /* box-shadow: 0 25px 60px -20px rgba(249, 115, 22, 0.2); */
}

.v-five .protect-card:hover::before,
.v-five .protect-card.reveal-delay-2::before {
  opacity: 1;
}

.v-five .protect-card:hover .icon-wrap,
.v-five .protect-card.reveal-delay-2 .icon-wrap {
  background: rgba(249, 115, 22, 0.15);
  border-color: rgba(249, 115, 22, 0.4);
}
</style>
