<template>
  <div class="tm-guides v-three">
    <!-- Geometric background decorations -->
    <div class="bg-decor">
      <div class="bg-decor__ring bg-decor__ring--lg"></div>
      <div class="bg-decor__ring bg-decor__ring--sm"></div>
      <div class="bg-decor__dot bg-decor__dot--a"></div>
      <div class="bg-decor__dot bg-decor__dot--b"></div>
    </div>

    <div class="container">

      
      <!-- Left-aligned editorial header -->
      <header class="header">
        <div class="header__grid">
          <div class="header__main">
            <span class="header__badge">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
              Registration Guides
            </span>
            <h1 class="header__title">
              Protect what's <span class="grad-main">yours</span>
            </h1>
          </div>
          <p class="header__subtitle">
            Step-by-step guides to securing trademark protection for your most
            valuable intellectual property — from names and logos to original
            phrases.
          </p>
        </div>
        <div class="header__rule"></div>
      </header>

      <!-- Bento grid layout -->
      <div class="bento">
        <div
          v-for="(card, i) in cards"
          :key="card.keyword"
          class="bento__card"
          :class="{ 'bento__card--feat': i === 0 }"
          :style="{
            '--ch': card.hoverBorder,
            '--cs': card.hoverShadow,
            transitionDelay: (i + 1) * 120 + 'ms',
          }"
        >
          <!-- Top accent bar -->
          <div class="bento__accent" :style="{ background: card.barColor }"></div>

          <!-- Watermark number -->
          <span class="bento__watermark">0{{ i + 1 }}</span>

          <div class="bento__header">
            <span class="bento__tag">{{ card.tag }}</span>
          </div>

          <div class="bento__icon" :style="{ background: card.iconBg }">
            <div v-html="card.iconSvg" :style="{ color: card.iconColor }"></div>
          </div>

          <h3 class="bento__title">
            How to trademark a
            <span :class="card.gradClass">{{ card.keyword }}</span>
          </h3>

          <p class="bento__desc">{{ card.description }}</p>

          <!-- Steps: vertical by default, 3-col grid on featured+desktop -->
          <div class="bento__steps">
            <div
              v-for="(step, si) in card.steps"
              :key="si"
              class="bento__step"
            >
              <span
                class="bento__step-num"
                :style="{ color: card.iconColor }"
              >
                {{ String(si + 1).padStart(2, "0") }}
              </span>
              <span class="bento__step-text">{{ step }}</span>
            </div>
          </div>

          <div class="bento__spacer"></div>

          <!-- Text-link CTA with underline animation -->
          <a
            class="bento__cta"
            href="#"
            :style="{ color: card.iconColor }"
            @click.prevent
          >
            <span>Learn the process</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>

      <!-- Contained footer bar -->
      <footer class="footer">
        <div class="footer__bar">
          <div class="footer__item">
            <span class="footer__icon">
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </span>
            <div class="footer__text">
              <span class="footer__label">Average filing</span>
              <span class="footer__value">8–12 months</span>
            </div>
          </div>

          <span class="footer__divider"></span>

          <div class="footer__item">
            <span class="footer__icon">
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m14 12-8.5 8.5a2.12 2.12 0 1 1-3-3L11 9" />
                <path
                  d="M15 13 9 7l4-4 6 6h4a2 2 0 0 1 0 4h-2v2a2 2 0 0 1-4 0v-2h-2z"
                />
              </svg>
            </span>
            <div class="footer__text">
              <span class="footer__label">Coverage</span>
              <span class="footer__value">Federal, nationwide</span>
            </div>
          </div>

          <span class="footer__divider"></span>

          <div class="footer__item">
            <span class="footer__icon">
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"
                />
                <line x1="4" x2="4" y1="22" y2="15" />
              </svg>
            </span>
            <div class="footer__text">
              <span class="footer__label">Renewal</span>
              <span class="footer__value">Every 10 years</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const visible = ref(false);
let observer = null;

const cards = [
  {
    tag: "Brand Name",
    keyword: "name",
    gradClass: "grad-main",
    barColor: "#019e8e",
    iconBg: "rgba(1,158,142,0.05)",
    iconColor: "#019e8e",
    hoverBorder: "rgba(1,158,142,0.22)",
    hoverShadow: "rgba(1,158,142,0.07)",
    description:
      "Secure exclusive rights to your business name, product name, or personal brand. Prevent others from using confusingly similar identifiers in your market.",
    steps: [
      "Conduct a comprehensive name search",
      "Classify your goods & services",
      "File your application with the USPTO",
    ],
    iconSvg:
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>',
  },
  {
    tag: "Visual Mark",
    keyword: "logo",
    gradClass: "grad-alt",
    barColor: "#067e73",
    iconBg: "rgba(6,126,115,0.05)",
    iconColor: "#067e73",
    hoverBorder: "rgba(6,126,115,0.22)",
    hoverShadow: "rgba(6,126,115,0.07)",
    description:
      "Protect the visual symbol that represents your brand. A trademarked logo gives you legal recourse against knock-offs and unauthorized use.",
    steps: [
      "Prepare a clear, high-res image file",
      "Search existing visual trademark databases",
      "Submit as a standard character or design mark",
    ],
    iconSvg:
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l9 4.5v9L12 21l-9-4.5v-9L12 3z"/><path d="M12 12l9-4.5"/><path d="M12 12v9"/><path d="M12 12L3 7.5"/></svg>',
  },
  {
    tag: "Slogan / Tagline",
    keyword: "phrase",
    gradClass: "grad-main",
    barColor: "#019e8e",
    iconBg: "rgba(1,158,142,0.05)",
    iconColor: "#019e8e",
    hoverBorder: "rgba(1,158,142,0.22)",
    hoverShadow: "rgba(1,158,142,0.07)",
    description:
      "Lock down your tagline, slogan, or catchphrase. Keep competitors from co-opting the words that make your brand instantly recognizable.",
    steps: [
      "Verify the phrase is distinctive, not generic",
      "Check for existing phrase registrations",
      "File as a standard character mark",
    ],
    iconSvg:
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3z"/></svg>',
  },
];

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) visible.value = true;
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );
  const root = document.querySelector(".tm-guides");
  if (root) observer.observe(root);
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});
</script>

<style scoped>

.tm-guides{
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

/* ═══════════════════════════════════════════
   Base
   ═══════════════════════════════════════════ */
.tm-guides {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  background: #ffffff;
  color: #171717;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

/* ═══════════════════════════════════════════
   Background – geometric rings & dots
   ═══════════════════════════════════════════ */
.bg-decor {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}
.bg-decor__ring {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(1, 158, 142, 0.06);
}
.v-three .bg-decor__ring--lg {
  top: -200px;
  right: -200px;
  width: 580px;
  height: 580px;
}
.v-three .bg-decor__ring--sm {
  top: -100px;
  right: -100px;
  width: 380px;
  height: 380px;
  border-color: rgba(1, 158, 142, 0.04);
}
.v-three .bg-decor__dot {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(1, 158, 142, 0.08);
}
.v-three .bg-decor__dot--a {
  bottom: 20%;
  left: 8%;
}
.v-three .bg-decor__dot--b {
  top: 35%;
  right: 12%;
  width: 4px;
  height: 4px;
  background: rgba(1, 158, 142, 0.06);
}

/* ═══════════════════════════════════════════
   Container
   ═══════════════════════════════════════════ */
.v-three .container {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* ═══════════════════════════════════════════
   Header – editorial, left-aligned split
   ═══════════════════════════════════════════ */
   
.v-three .header {
  padding-top: 120px;
}

.v-three .header__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  align-items: center;
}
@media (min-width: 768px) {
  .v-three .header__grid {
    grid-template-columns: 1.3fr 1fr;
    gap: 56px;
  }
}

.v-three .header__badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 5px 12px;
  border-radius: 6px;
  border: 1px solid rgba(1, 158, 142, 0.15);
  background: rgba(1, 158, 142, 0.04);
  color: #019e8e;
  margin-bottom: 20px;
}
.v-three .header__badge svg {
  flex-shrink: 0;
}

.v-three .header__title {
  font-size: clamp(2rem, 4.5vw, 3.25rem);
  font-weight: 600;
  letter-spacing: -0.035em;
  line-height: 1.1;
  margin: 0;
  color: #0f0f0f;
}

.v-three .header__subtitle {
  font-size: 0.9rem;
  font-weight: 300;
  line-height: 1.75;
  color: #737373;
  margin: 0;
}

.v-three .header__rule {
  height: 1px;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.1) 0%,
    rgba(0, 0, 0, 0.04) 50%,
    transparent 100%
  );
  margin-top: 40px;
}

/* ═══════════════════════════════════════════
   Gradient text
   ═══════════════════════════════════════════ */
.v-three .grad-main {
  background: linear-gradient(135deg, #019e8e 0%, #067e73 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.v-three .grad-alt {
  background: linear-gradient(135deg, #067e73 0%, #019e8e 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ═══════════════════════════════════════════
   Bento grid – 3 equal columns
   ═══════════════════════════════════════════ */
.v-three .bento {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  margin-top: 40px;
}
@media (min-width: 768px) {
  .v-three .bento {
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
}

/* ═══════════════════════════════════════════
   Card
   ═══════════════════════════════════════════ */
.v-three .bento__card {
  position: relative;
  overflow: hidden;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.07);
  border-radius: 16px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: opacity 0.85s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.85s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.4s ease,
    box-shadow 0.4s ease;
}

.v-three .tm-guides.is-visible .bento__card:hover {
  transform: translateY(-4px);
  border-color: var(--ch, rgba(1, 158, 142, 0.22));
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04),
    0 16px 48px var(--cs, rgba(1, 158, 142, 0.07));
}

/* ═══════════════════════════════════════════
   Accent bar – top of each card
   ═══════════════════════════════════════════ */
.v-three .bento__accent {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  opacity: 0.7;
  transition: opacity 0.4s ease, height 0.4s ease;
}
.v-three .bento__card:hover .bento__accent {
  opacity: 1;
  height: 4px;
}

/* ═══════════════════════════════════════════
   Watermark number
   ═══════════════════════════════════════════ */
.v-three .bento__watermark {
  position: absolute;
  bottom: 12px;
  right: 16px;
  font-family: "Inter", sans-serif;
  font-size: 72px;
  font-weight: 800;
  line-height: 1;
  color: rgba(0, 0, 0, 0.018);
  pointer-events: none;
  user-select: none;
  transition: color 0.5s ease;
}
.v-three .bento__card:hover .bento__watermark {
  color: rgba(0, 0, 0, 0.03);
}
@media (min-width: 768px) {
  .v-three .bento__watermark {
    font-size: 100px;
    bottom: 16px;
    right: 20px;
  }
}

/* ═══════════════════════════════════════════
   Card header / tag
   ═══════════════════════════════════════════ */
.v-three .bento__header {
  margin-bottom: 24px;
}

.v-three .bento__tag {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #a3a3a3;
  transition: color 0.3s ease;
}
.v-three .bento__card:hover .bento__tag {
  color: #737373;
}

/* ═══════════════════════════════════════════
   Icon – rounded square
   ═══════════════════════════════════════════ */
.v-three .bento__icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.v-three .bento__card:hover .bento__icon {
  transform: scale(1.06);
}

/* ═══════════════════════════════════════════
   Title
   ═══════════════════════════════════════════ */
.v-three .bento__title {
  font-size: 1.125rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  margin: 0 0 10px;
  color: #0f0f0f;
  line-height: 1.35;
}

/* ═══════════════════════════════════════════
   Description
   ═══════════════════════════════════════════ */
.v-three .bento__desc {
  font-size: 0.8rem;
  font-weight: 300;
  line-height: 1.65;
  color: #737373;
  margin: 0 0 24px;
}

/* ═══════════════════════════════════════════
   Steps – numbered, vertical
   ═══════════════════════════════════════════ */
.v-three .bento__steps {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.v-three .bento__step {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.v-three .bento__step-num {
  font-family: "SF Mono", "Fira Code", "Courier New", monospace;
  font-size: 11px;
  font-weight: 500;
  opacity: 0.4;
  flex-shrink: 0;
  padding-top: 2px;
  transition: opacity 0.3s ease;
}
.v-three .bento__card:hover .bento__step-num {
  opacity: 0.85;
}

.v-three .bento__step-text {
  font-size: 0.78rem;
  font-weight: 300;
  color: #a3a3a3;
  line-height: 1.5;
  transition: color 0.3s ease;
}
.v-three .bento__card:hover .bento__step-text {
  color: #737373;
}

/* ═══════════════════════════════════════════
   Spacer – pushes CTA to bottom
   ═══════════════════════════════════════════ */
.v-three .bento__spacer {
  flex: 1;
  min-height: 16px;
}

/* ═══════════════════════════════════════════
   CTA – text link with underline reveal
   ═══════════════════════════════════════════ */
.v-three .bento__cta {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
  font-weight: 500;
  text-decoration: none;
  position: relative;
  padding-bottom: 2px;
  transition: gap 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
.v-three .bento__cta::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}
.v-three .bento__card:hover .bento__cta {
  gap: 10px;
}
.v-three .bento__card:hover .bento__cta::after {
  transform: scaleX(1);
}
.v-three .bento__cta svg {
  flex-shrink: 0;
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
.v-three .bento__card:hover .bento__cta svg {
  transform: translateX(3px);
}

/* ═══════════════════════════════════════════
   Footer – contained info bar
   ═══════════════════════════════════════════ */
.v-three .footer {
  margin-top: 48px;
  padding-bottom: 88px;
}

.v-three .footer__bar {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 20px 24px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 14px;
  background: rgba(0, 0, 0, 0.012);
}
@media (min-width: 640px) {
  .v-three .footer__bar {
    flex-direction: row;
    justify-content: center;
    padding: 16px 32px;
    gap: 0;
  }
}

.v-three .footer__item {
  display: flex;
  align-items: center;
  gap: 10px;
  transition: opacity 0.3s ease;
  cursor: default;
}
.v-three .footer__item:hover {
  opacity: 0.75;
}

.v-three .footer__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(1, 158, 142, 0.04);
  border: 1px solid rgba(1, 158, 142, 0.08);
  color: #019e8e;
  flex-shrink: 0;
}

.v-three .footer__text {
  display: flex;
  flex-direction: column;
}
.v-three .footer__label {
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #d4d4d4;
  line-height: 1;
  margin-bottom: 3px;
}
.v-three .footer__value {
  font-size: 13px;
  font-weight: 400;
  color: #525252;
  line-height: 1;
}

.v-three .footer__divider {
  display: none;
  width: 1px;
  height: 28px;
  background: rgba(0, 0, 0, 0.06);
  margin: 0 28px;
  flex-shrink: 0;
}
@media (min-width: 640px) {
  .v-three .footer__divider {
    display: block;
  }
}

/* ═══════════════════════════════════════════
   Scrollbar
   ═══════════════════════════════════════════ */
.v-three ::-webkit-scrollbar {
  width: 5px;
}
.v-three ::-webkit-scrollbar-track {
  background: #fff;
}
.v-three ::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 3px;
}
.v-three ::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.16);
}
</style>