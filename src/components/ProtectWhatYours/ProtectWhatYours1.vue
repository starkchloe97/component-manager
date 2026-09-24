<template>
  <div class="tm-guides v-six" :class="{ 'is-visible': visible }">
    <div class="bg-blobs">
      <div class="blob blob--main"></div>
      <div class="blob blob--light"></div>
      <div class="blob blob--deep"></div>
    </div>

    <div class="container">
      <header class="header">
        <span class="header__badge">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
          Registration Guides
        </span>
        <h1 class="header__title">
          Protect what's <span class="grad-main">yours</span>
        </h1>
        <p class="header__subtitle">
          Step-by-step guides to securing trademark protection for your most
          valuable intellectual property — from names and logos to original
          phrases.
        </p>
      </header>

      <div class="cards">
        <div
          v-for="(card, i) in cards"
          :key="card.keyword"
          class="card"
          :style="{ ...card.vars, transitionDelay: (i + 1) * 100 + 'ms' }"
          @mousemove="onGlow($event, $el)"
          @mouseleave="offGlow($el)"
        >
          <div class="card__top">
            <span class="card__tag">{{ card.tag }}</span>
            <span class="card__num">0{{ i + 1 }}</span>
          </div>

          <div class="card__icon" :style="{ background: card.iconBg }">
            <div class="card__pulse" :style="{ '--pulse': card.pulseColor }"></div>
            <div v-html="card.iconSvg" :style="{ color: card.iconColor }"></div>
          </div>

          <h3 class="card__title">
            How to trademark a <span :class="card.gradClass">{{ card.keyword }}</span>
          </h3>

          <p class="card__desc">{{ card.description }}</p>

          <ul class="card__steps">
            <li v-for="(step, si) in card.steps" :key="si" class="card__step">
              <span class="card__step-track">
                <span class="card__step-dot"></span>
                <span v-if="si < card.steps.length - 1" class="card__step-line"></span>
              </span>
              <span class="card__step-text">{{ step }}</span>
            </li>
          </ul>

          <div class="card__cta">
            <span>Learn the process</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="card__arrow"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </div>
        </div>
      </div>

      <footer class="footer">
        <div class="footer__item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          Average filing: 8–12 months
        </div>
        <span class="footer__dot"></span>
        <div class="footer__item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m14 12-8.5 8.5a2.12 2.12 0 1 1-3-3L11 9"/><path d="M15 13 9 7l4-4 6 6h4a2 2 0 0 1 0 4h-2v2a2 2 0 0 1-4 0v-2h-2z"/></svg>
          Federal protection nationwide
        </div>
        <span class="footer__dot"></span>
        <div class="footer__item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/></svg>
          Renewable every 10 years
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
    iconBg: "rgba(11,85,182,0.07)",
    iconColor: "#1E78D2",
    pulseColor: "rgba(11,85,182,0.2)",
    description:
      "Secure exclusive rights to your business name, product name, or personal brand. Prevent others from using confusingly similar identifiers in your market.",
    steps: [
      "Conduct a comprehensive name search",
      "Classify your goods & services",
      "File your application with the USPTO",
    ],
    iconSvg: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>',
    vars: {
      "--glow": "rgba(11,85,182,0.06)",
      "--border-h": "rgba(11,85,182,0.25)",
      "--ring": "rgba(11,85,182,0.3)",
      "--ring-g": "rgba(11,85,182,0.1)",
      "--dot": "#1E78D2",
      "--line": "rgba(11,85,182,0.18)",
      "--btn-a": "#1E78D2",
      "--btn-b": "#1E78D2",
      "--tag-b": "rgba(11,85,182,0.25)",
      "--tag-bg": "rgba(11,85,182,0.06)",
      "--tag-c": "#1E78D2",
    },
  },
  {
    tag: "Visual Mark",
    keyword: "logo",
    gradClass: "grad-mid",
    iconBg: "rgba(30,120,210,0.07)",
    iconColor: "#1E78D2",
    pulseColor: "rgba(30,120,210,0.2)",
    description:
      "Protect the visual symbol that represents your brand. A trademarked logo gives you legal recourse against knock-offs and unauthorized use across all channels.",
    steps: [
      "Prepare a clear, high-res image file",
      "Search existing visual trademark databases",
      "Submit as a standard character or design mark",
    ],
    iconSvg: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l9 4.5v9L12 21l-9-4.5v-9L12 3z"/><path d="M12 12l9-4.5"/><path d="M12 12v9"/><path d="M12 12L3 7.5"/></svg>',
    vars: {
      "--glow": "rgba(30,120,210,0.05)",
      "--border-h": "rgba(30,120,210,0.22)",
      "--ring": "rgba(30,120,210,0.28)",
      "--ring-g": "rgba(30,120,210,0.09)",
      "--dot": "#1E78D2",
      "--line": "rgba(30,120,210,0.16)",
      "--btn-a": "#1E78D2",
      "--btn-b": "#1E78D2",
      "--tag-b": "rgba(30,120,210,0.22)",
      "--tag-bg": "rgba(30,120,210,0.05)",
      "--tag-c": "#1E78D2",
    },
  },
  {
    tag: "Slogan / Tagline",
    keyword: "phrase",
    gradClass: "grad-deep",
    iconBg: "rgba(8,63,138,0.07)",
    iconColor: "#1E78D2",
    pulseColor: "rgba(8,63,138,0.2)",
    description:
      "Lock down your tagline, slogan, or catchphrase. Keep competitors from co-opting the words that make your brand instantly recognizable.",
    steps: [
      "Verify the phrase is distinctive, not generic",
      "Check for existing phrase registrations",
      "File as a standard character mark",
    ],
    iconSvg: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3z"/></svg>',
    vars: {
      "--glow": "rgba(8,63,138,0.05)",
      "--border-h": "rgba(8,63,138,0.22)",
      "--ring": "rgba(8,63,138,0.28)",
      "--ring-g": "rgba(8,63,138,0.09)",
      "--dot": "#1E78D2",
      "--line": "rgba(8,63,138,0.16)",
      "--btn-a": "#1E78D2",
      "--btn-b": "#1E78D2",
      "--tag-b": "rgba(8,63,138,0.22)",
      "--tag-bg": "rgba(8,63,138,0.05)",
      "--tag-c": "#1E78D2",
    },
  },
];

function onGlow(e, el) {
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", ((e.clientX - r.left) / r.width) * 100 + "%");
  el.style.setProperty("--my", ((e.clientY - r.top) / r.height) * 100 + "%");
}

function offGlow(el) {
  el.style.setProperty("--mx", "50%");
  el.style.setProperty("--my", "50%");
}

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

.tm-guides {
}

/* ── Base ── */

.tm-guides.v-six {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  background-color: #fafafa;
  color: #171717;
  min-height: 100vh;
  position: relative;
  background-size: 40px 40px;
  background-image:
    linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px);
}

.tm-guides.v-six::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0.02;
  background: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* ── Blobs ── */
.v-six .bg-blobs {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}
.v-six .blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
}
.v-six .blob--main {
  top: 25%;
  left: 25%;
  width: 500px;
  height: 500px;
  background: rgba(11,85,182,0.07);
}
.v-six .blob--light {
  bottom: 25%;
  right: 25%;
  width: 400px;
  height: 400px;
  background: rgba(30,120,210,0.06);
}
.v-six .blob--deep {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 600px;
  background: rgba(8,63,138,0.04);
}

/* ── Container ── */
.v-six .container {
  position: relative;
  z-index: 1;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
}

/* ── Visibility ── */
.v-six .header,
.v-six .card,
.v-six .footer {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s cubic-bezier(0.5, 0, 0, 1),
              transform 0.8s cubic-bezier(0.5, 0, 0, 1);
}
.tm-guides.v-six.is-visible .header { opacity: 1; transform: translateY(0); }
.tm-guides.v-six.is-visible .card  { opacity: 1; transform: translateY(0); }
.tm-guides.v-six.is-visible .footer { opacity: 1; transform: translateY(0); }

/* ── Header ── */
.v-six .header {
  text-align: center;
  padding-top: 128px;
  padding-bottom: 32px;
}

.v-six .header__badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 4px 12px;
  border-radius: 9999px;
  border: 1px solid rgba(11,85,182,0.18);
  background: rgba(11,85,182,0.06);
  color: #1E78D2;
  margin-bottom: 24px;
}
.v-six .header__badge svg { flex-shrink: 0; }

.v-six .header__title {
  font-size: clamp(2.25rem, 5vw, 3.75rem);
  font-weight: 600;
  letter-spacing: -0.04em;
  line-height: 1.05;
  margin: 0 0 24px;
  color: #171717;
  transition-delay: 100ms;
}

.v-six .header__subtitle {
  font-size: clamp(0.875rem, 1.2vw, 1rem);
  font-weight: 300;
  line-height: 1.625;
  color: #737373;
  max-width: 672px;
  margin: 0 auto;
  transition-delay: 200ms;
}

/* ── Gradient Texts ── */
.v-six .grad-main {
  background: linear-gradient(135deg, #1E78D2, #1E78D2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.v-six .grad-mid {
  background: linear-gradient(135deg, #1E78D2, #1E78D2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.v-six .grad-deep {
  background: linear-gradient(135deg, #1E78D2, #1E78D2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ── Cards Grid ── */
.v-six .cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  padding: 48px 0;
}
@media (min-width: 768px) {
 .v-six .cards { grid-template-columns: repeat(3, 1fr); }
}

/* ── Card ── */
.v-six .card {
  position: relative;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 16px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.03);
  transition:
    opacity 0.8s cubic-bezier(0.5, 0, 0, 1),
    transform 0.8s cubic-bezier(0.5, 0, 0, 1),
    border-color 0.5s cubic-bezier(0.2, 0.8, 0.2, 1),
    box-shadow 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.v-six .card::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle at var(--mx, 50%) var(--my, 50%),
    var(--glow, rgba(11,85,182,0.06)) 0%,
    transparent 50%
  );
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
  z-index: 0;
}
.v-six .card:hover::before { opacity: 1; }

.v-six .tm-guides.is-visible .card:hover {
  transform: translateY(-4px);
  border-color: var(--border-h, rgba(11,85,182,0.25));
  box-shadow: 0 4px 12px rgba(0,0,0,0.06), 0 20px 48px rgba(0,0,0,0.06);
}

.v-six .card > * { position: relative; z-index: 1; }

/* ── Card Top ── */
.v-six .card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
}

.v-six .card__tag {
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 9999px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  background: rgba(0, 0, 0, 0.02);
  color: #a3a3a3;
  transition: all 0.3s ease;
}
.v-six .card:hover .card__tag {
  border-color: var(--tag-b, rgba(11,85,182,0.25));
  background: var(--tag-bg, rgba(11,85,182,0.06));
  color: var(--tag-c, #1E78D2);
}

.v-six .card__num {
  font-family: "SF Mono", "Fira Code", monospace;
  font-size: 12px;
  color: #d4d4d4;
  letter-spacing: 0.15em;
}

/* ── Icon ── */
.v-six .card__icon {
  position: relative;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.v-six .card:hover .card__icon { transform: scale(1.08); }

.v-six .card__icon::after {
  content: "";
  position: absolute;
  inset: -3px;
  border-radius: 50%;
  border: 1px solid transparent;
  transition: border-color 0.5s ease, box-shadow 0.5s ease;
}
.v-six .card:hover .card__icon::after {
  border-color: var(--ring, rgba(11,85,182,0.3));
  box-shadow: 0 0 24px var(--ring-g, rgba(11,85,182,0.1));
}

@keyframes pulse-ring {
  0%   { transform: scale(1);   opacity: 0.4; }
  100% { transform: scale(1.6); opacity: 0; }
}
.v-six .card__pulse {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1px solid var(--pulse, rgba(11,85,182,0.2));
  animation: pulse-ring 2.5s ease-out infinite;
}

/* ── Card Title ── */
.v-six .card__title {
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  margin: 0 0 12px;
  color: #171717;
}

/* ── Card Description ── */
.v-six .card__desc {
  font-size: 0.875rem;
  font-weight: 300;
  line-height: 1.625;
  color: #737373;
  margin: 0 0 32px;
  flex-grow: 1;
}

/* ── Steps ── */
.v-six .card__steps {
  list-style: none;
  margin: 0 0 32px;
  padding: 0;
}
.v-six .card__step {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}
.v-six .card__step-track {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 6px;
  flex-shrink: 0;
}
.v-six .card__step-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.1);
  transition: background 0.3s ease;
  flex-shrink: 0;
}
.v-six .card:hover .card__step-dot {
  background: var(--dot, #1E78D2);
}
.v-six .card__step-line {
  width: 1px;
  height: 20px;
  background: rgba(0, 0, 0, 0.06);
  transition: background 0.3s ease;
}
.v-six .card:hover .card__step-line {
  background: var(--line, rgba(11,85,182,0.18));
}
.v-six .card__step-text {
  font-size: 12px;
  font-weight: 300;
  color: #a3a3a3;
  line-height: 1.5;
  padding-top: 2px;
}

/* ── CTA ── */
.v-six .card__cta {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #525252;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  background: rgba(0, 0, 0, 0.03);
  cursor: pointer;
  transition: transform 0.3s ease, border-color 0.3s ease;
}
.v-six .card__cta::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--btn-a, #1E78D2), var(--btn-b, #1E78D2));
  opacity: 0;
  transition: opacity 0.3s ease;
}
.v-six .card:hover .card__cta {
  transform: translateX(4px);
  border-color: transparent;
}
.v-six .card:hover .card__cta::before { opacity: 1; }
.v-six .card__cta span,
.v-six .card__cta svg {
  position: relative;
  z-index: 1;
  transition: color 0.3s ease, transform 0.3s ease;
}
.v-six .card:hover .card__cta span,
.v-six .card:hover .card__cta svg { color: #fff; }
.v-six .card:hover .card__cta svg { transform: translateX(3px); }

/* ── Footer ── */
.v-six .footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding-bottom: 96px;
  font-size: 12px;
  font-weight: 300;
  color: #a3a3a3;
  transition-delay: 400ms;
}
@media (min-width: 640px) {
  .v-six .footer { flex-direction: row; gap: 24px; }
}
.v-six .footer__item {
  display: flex;
  align-items: center;
  gap: 8px;
}
.v-six .footer__item svg { flex-shrink: 0; color: #a3a3a3; }
.v-six .footer__dot {
  display: none;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #d4d4d4;
}
@media (min-width: 640px) {
  .v-six .footer__dot { display: block; }
}

/* ── Scrollbar ── */
.v-six ::-webkit-scrollbar { width: 6px; }
.v-six ::-webkit-scrollbar-track { background: #fafafa; }
.v-six ::-webkit-scrollbar-thumb { background: rgba(0, 0, 0, 0.12); border-radius: 3px; }
</style>