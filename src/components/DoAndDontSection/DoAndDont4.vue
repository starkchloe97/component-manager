<script setup>
const dos = [
  {
    title: 'Brand or Business Name',
    desc: "Protect the name that identifies your business or products, such as McDonald's."
  },
  {
    title: 'Logo or Brand Symbol',
    desc: 'Register unique logos, icons, or symbols that distinguish your brand, like the Golden Arches.'
  },
  {
    title: 'Slogan or Tagline',
    desc: `Trademark distinctive marketing phrases that help customers identify your brand, such as "I'm Lovin' It".`
  },
]

const donts = [
  {
    title: 'Original Creative Works',
    desc: 'Books, songs, films, artwork, and other creative content are protected by copyright, not trademarks.'
  },
  {
    title: 'Inventions or Technical Innovations',
    desc: 'Machines, technical processes, chemical formulas, and other inventions are protected by patents.'
  },
  {
    title: 'Generic or Descriptive Terms',
    desc: 'Common product names or purely descriptive words generally cannot be trademarked unless they become distinctive through use.'
  },
]
</script>

<template>
  <section class="tc-section scroll-reveal">
    <!-- Decorative background orbs -->
    <div class="tc-orb tc-orb--teal" aria-hidden="true"></div>
    <div class="tc-orb tc-orb--orange" aria-hidden="true"></div>
    <div class="tc-orb tc-orb--indigo" aria-hidden="true"></div>

    <div class="container">
      <!-- Section Header -->
      <div class="tc-header">
        <span class="tc-badge">Know the Difference</span>
        <h2 class="tc-title">Trademark Clarity</h2>
        <p class="tc-subtitle">
          What qualifies for trademark protection — and what falls under other IP categories.
        </p>
      </div>

      <!-- Two-Column Grid -->
      <div class="tc-grid">
        <!-- Dos Column -->
        <div class="tc-col">
          <div class="tc-col-label tc-col-label--do">
            <svg class="tc-col-icon" width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            The "Dos"
          </div>
          <div class="tc-cards">
            <div
              class="tc-card tc-card--do"
              v-for="(item, i) in dos"
              :key="item.title"
            >
              <span class="tc-card-num">0{{ i + 1 }}</span>
              <div class="tc-card-body">
                <h4 class="tc-card-title">{{ item.title }}</h4>
                <p class="tc-card-desc">{{ item.desc }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Center Divider -->
        <div class="tc-divider" aria-hidden="true">
          <div class="tc-divider-line"></div>
          <span class="tc-vs-pill">vs</span>
        </div>

        <!-- Don'ts Column -->
        <div class="tc-col">
          <div class="tc-col-label tc-col-label--dont">
            <svg class="tc-col-icon" width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
            </svg>
            The "Don'ts"
          </div>
          <div class="tc-cards">
            <div
              class="tc-card tc-card--dont"
              v-for="(item, i) in donts"
              :key="item.title"
            >
              <span class="tc-card-num">{{ i + 1 }}</span>
              <div class="tc-card-body">
                <h4 class="tc-card-title">{{ item.title }}</h4>
                <p class="tc-card-desc">{{ item.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

.tc-section{
  
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
/* ── Section ───────────────────────────────────── */
.tc-section {
  position: relative;
  padding: 100px 0 110px;
  background: var(--bg-gradient);
  overflow: hidden;
}
.container {
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
}
/* ── Background Orbs ───────────────────────────── */
.tc-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  pointer-events: none;
}

.tc-orb--teal {
  width: 320px;
  height: 320px;
  background: rgba(0, 137, 123, 0.08);
  top: -100px;
  left: 4%;
}

.tc-orb--orange {
  width: 380px;
  height: 380px;
  background: rgba(255, 109, 0, 0.07);
  bottom: -120px;
  right: 2%;
}

.tc-orb--indigo {
  width: 220px;
  height: 220px;
  background: rgba(121, 134, 203, 0.06);
  top: 45%;
  left: 48%;
  transform: translate(-50%, -50%);
}

/* ── Header ────────────────────────────────────── */
.tc-header {
  text-align: center;
  margin-bottom: 60px;
  position: relative;
  z-index: 1;
}

.tc-badge {
  display: inline-block;
  padding: 6px 18px;
  border-radius: 100px;
  background: rgba(255, 109, 0, 0.07);
  color: var(--accent);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 20px;
  border: 1px solid rgba(255, 109, 0, 0.14);
}

.tc-title {
  font-size: clamp(2rem, 4.5vw, 3.25rem);
  font-weight: 800;
  color: var(--text);
  letter-spacing: -0.035em;
  line-height: 1.08;
  margin-bottom: 16px;
}

.tc-subtitle {
  font-size: 1.05rem;
  color: var(--text-muted);
  max-width: 540px;
  margin: 0 auto;
  line-height: 1.65;
}

/* ── Grid ──────────────────────────────────────── */
.tc-grid {
  display: grid;
  grid-template-columns: 1fr 52px 1fr;
  align-items: start;
  position: relative;
  z-index: 1;
}

.tc-col {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

/* ── Column Labels ─────────────────────────────── */
.tc-col-label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 18px;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 700;
  width: fit-content;
  letter-spacing: -0.01em;
  margin: 0 auto;
}

.tc-col-icon {
  flex-shrink: 0;
}

.tc-col-label--do {
  background: #222c9b0e;
  color: #1a237e;
  border: 1px solid rgba(0, 137, 123, 0.14);
}

.tc-col-label--dont {
  background: rgba(255, 109, 0, 0.07);
  color: var(--accent);
  border: 1px solid rgba(255, 109, 0, 0.14);
}

/* ── Cards ─────────────────────────────────────── */
.tc-cards {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.tc-card {
  position: relative;
  padding: 26px 50px 26px 26px;
  background: var(--bg-card);
  border-radius: 14px;
  border: 1px solid var(--border-light);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.035);
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
              box-shadow 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  overflow: hidden;
  cursor: default;
}

/* .tc-card--do {
  border-left: 4px solid #1a237e;
}

.tc-card--dont {
  border-left: 4px solid var(--accent);
} */

.tc-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.07);
}

.tc-card-num {
  position: absolute;
  top: 8px;
  right: 14px;
  font-size: 3rem;
  font-weight: 900;
  line-height: 1;
  opacity: 0.05;
  transition: opacity 0.35s ease;
  pointer-events: none;
  user-select: none;
}

.tc-card--do .tc-card-num {
  color: #1a237e;
}

.tc-card--dont .tc-card-num {
  color: var(--accent);
}

.tc-card:hover .tc-card-num {
  opacity: 0.14;
}

.tc-card-body {
  position: relative;
  z-index: 1;
}

.tc-card-title {
  font-size: 1.02rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 6px;
  letter-spacing: -0.015em;
}

.tc-card-desc {
  font-size: 0.875rem;
  color: var(--text-muted);
  line-height: 1.6;
  margin: 0;
}

/* ── Divider ───────────────────────────────────── */

.tc-divider {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 60px 0;
  position: relative;
  top: 35%
}

.tc-divider-line {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 1px;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(121, 134, 203, 0.18) 15%,
    rgba(121, 134, 203, 0.18) 85%,
    transparent 100%
  );
}

.tc-vs-pill {
  position: relative;
  z-index: 1;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent), var(--accent-light));
  color: #fff;
  font-size: 0.68rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(255, 109, 0, 0.28),
              0 0 0 4px rgba(255, 109, 0, 0.06);
}

/* ── Responsive ────────────────────────────────── */
@media (max-width: 1024px) {
  .tc-section {
    padding: 72px 0 84px;
  }

  .tc-header {
    margin-bottom: 44px;
  }

  .tc-grid {
    grid-template-columns: 1fr;
    gap: 0;
    margin: 10px;
  }

  .tc-divider {
    flex-direction: row;
    padding: 0;
    margin: 36px 0;
    width: 100%;
    height: 1px;
  }

  .tc-divider-line {
    top: 50%;
    bottom: auto;
    left: 0;
    right: 0;
    width: auto;
    height: 1px;
    background: linear-gradient(
      to right,
      transparent 0%,
      rgba(121, 134, 203, 0.18) 15%,
      rgba(121, 134, 203, 0.18) 85%,
      transparent 100%
    );
  }

  .tc-vs-pill {
    width: 34px;
    height: 34px;
    font-size: 0.62rem;
  }
}

@media (max-width: 640px) {
  .tc-section {
    padding: 56px 0 64px;
  }

  .tc-header {
    margin-bottom: 36px;
  }

  .tc-subtitle {
    font-size: 0.95rem;
    margin: 10px;
  }

  .tc-card {
    padding: 22px 44px 22px 20px;
  }

  .tc-card-num {
    font-size: 2.4rem;
    right: 10px;
    top: 6px;
  }

  .tc-card-title {
    font-size: 0.95rem;
  }

  .tc-card-desc {
    font-size: 0.84rem;
  }

  .tc-orb--teal {
    width: 200px;
    height: 200px;
  }

  .tc-orb--orange {
    width: 240px;
    height: 240px;
  }

  .tc-orb--indigo {
    display: none;
  }
  .tc-col-label--dont{
    margin-top: 20px;
  }
}
</style>