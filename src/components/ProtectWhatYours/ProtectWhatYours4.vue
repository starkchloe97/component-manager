<template>
  <section class="pw-section v-two">
    <div class="pw-container">
      <div class="pw-header">
        <span class="pw-eyebrow">Protect Your IP</span>
        <h2 class="pw-title">Protect what's yours</h2>
        <p class="pw-subtitle">Your name, logo, and phrase are more than assets — they're your identity. Here's how to secure each one through trademark registration.</p>
      </div>

      <div class="pw-grid">
        <!-- Card: Name -->
        <div class="pw-card" v-for="(card, idx) in cards" :key="idx" :class="'pw-card--' + card.type">
          <div class="pw-card__icon-area">
            <div class="pw-card__icon-circle" v-html="card.icon"></div>
            <div>
              <div class="pw-card__badge">{{ card.badge }}</div>
              <h3 class="pw-card__heading">{{ card.heading }}</h3>
            </div>
          </div>
          <p class="pw-card__text">{{ card.text }}</p>
          <div class="pw-card__steps">
            <div class="pw-step" v-for="(step, si) in card.steps" :key="si">
              <span class="pw-step__num">{{ String(si + 1).padStart(2, '0') }}</span>
              <div class="pw-step__content">
                <span class="pw-step__label">{{ step.label }}</span>
                <span class="pw-step__detail">{{ step.detail }}</span>
              </div>
            </div>
          </div>
          <div class="pw-card__border-glow"></div>
        </div>
      </div>

      <!-- Bottom info bar -->
      <div class="pw-info-bar">
        <div class="pw-info-item">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="currentColor" stroke-width="1.5"/><path d="M10 6V10L13 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
          <span>Average filing: <strong>8 – 12 months</strong></span>
        </div>
        <div class="pw-info-item">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2L12.5 7.5L18 8.5L14 12.5L15 18L10 15.5L5 18L6 12.5L2 8.5L7.5 7.5L10 2Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
          <span>Federal protection <strong>nationwide</strong></span>
        </div>
        <div class="pw-info-item">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="7" width="14" height="10" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M7 7V5C7 3.89543 7.89543 3 9 3H11C12.1046 3 13 3.89543 13 5V7" stroke="currentColor" stroke-width="1.5"/></svg>
          <span>Protects against <strong>infringement</strong></span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

.pw-section{
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

.pw-section {
  position: relative;
  background: #F6F4EF;
  padding: 100px 24px;
  font-family: 'Space Grotesk', sans-serif !important;
  overflow: hidden;
}

.v-two .pw-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
}

.v-two .pw-container {
  max-width: 1120px;
  margin: 0 auto;
}

.v-two .pw-header {
  text-align: center;
  max-width: 580px;
  margin: 0 auto 56px;
}

.v-two .pw-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 5px 14px;
  background: rgba(26, 35, 126, 0.06);
  border: 1px solid rgba(26, 35, 126, 0.1);
  border-radius: 100px;
  font-size: 12px;
  font-weight: 700;
  color: var(--primary);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 16px;
}

.v-two .pw-title {
  font-family: 'Space Grotesk', sans-serif !important;
  font-size: clamp(28px, 3.5vw, 40px) !important;
  font-weight: 800;
  color: var(--text);
  letter-spacing: -1.5px;
  line-height: 1.15;
  margin-bottom: 16px;
}

.v-two .pw-subtitle {
  font-size: 16px;
  color: var(--text-secondary);
  max-width: 600px;
  line-height: 1.7;
  margin: 0 auto;
}

/* Grid */
.v-two .pw-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 48px;
}

@media (max-width: 900px) {
  .v-two .pw-grid { grid-template-columns: 1fr; max-width: 480px; margin-left: auto; margin-right: auto; }
}

/* Card */
.v-two .pw-card {
  position: relative;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 36px 32px 40px;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1), border-color 0.4s ease, box-shadow 0.4s ease;
}

.v-two .pw-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: rgba(26, 35, 126, 0.15);
}

.v-two .pw-card__badge {
  display: inline-block;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  /* padding: 4px 12px; */
  border-radius: 100px;
  margin-bottom: 2px;
}

.v-two .pw-card--name .pw-card__badge {
  color: var(--accent);
  /* background: var(--accent-glow); */
}

.v-two .pw-card--logo .pw-card__badge {
  color: var(--teal);
  background: rgba(0, 137, 123, 0.1);
}

.v-two .pw-card--phrase .pw-card__badge {
  color: var(--primary-light);
  background: rgba(57, 73, 171, 0.08);
}

/* Icon */
.v-two .pw-card__icon-area {
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.v-two .pw-card__icon-circle {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.v-two .pw-card--name .pw-card__icon-circle { background: var(--accent-glow); color: var(--accent); }
.v-two .pw-card--logo .pw-card__icon-circle { background: rgba(0, 137, 123, 0.1); color: var(--teal); }
.v-two .pw-card--phrase .pw-card__icon-circle { background: rgba(57, 73, 171, 0.08); color: var(--primary-light); }

.v-two .pw-card__heading {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 17px;
  font-weight: 600;
  color: var(--text);
  margin: 0;
  line-height: 1.3;
}

.v-two .pw-card__text {
  font-size: 14px;
  line-height: 1.7;
  color: var(--text-secondary);
  margin: 0 0 28px;
}

/* Steps */
.v-two .pw-card__steps {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.v-two .pw-step {
  display: flex;
  gap: 14px;
  align-items: flex-start;
}

.v-two .pw-step__num {
  font-size: 12px;
  font-weight: 700;
  color: var(--text-muted);
  min-width: 22px;
  padding-top: 2px;
}

.v-two .pw-step__content {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.v-two .pw-step__label {
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
}

.v-two .pw-step__detail {
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.5;
}

/* Border glow on hover */
.v-two .pw-card__border-glow {
  position: absolute;
  inset: 0;
  border-radius: var(--radius-lg);
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.v-two .pw-card:hover .pw-card__border-glow {
  opacity: 1;
}

.v-two .pw-card--name .pw-card__border-glow {
  box-shadow: inset 0 0 30px var(--accent-glow);
}

.v-two .pw-card--logo .pw-card__border-glow {
  box-shadow: inset 0 0 30px rgba(0, 137, 123, 0.06);
}

.v-two .pw-card--phrase .pw-card__border-glow {
  box-shadow: inset 0 0 30px rgba(57, 73, 171, 0.06);
}

/* Info bar */
.v-two .pw-info-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: 14px;
  padding: 20px 36px;
  max-width: 720px;
  margin: 0 auto;
  box-shadow: var(--shadow-sm);
}

@media (max-width: 700px) {
  .v-two .pw-info-bar { flex-direction: column; gap: 16px; }
  .v-two .pw-info-divider { display: none; }
}

.v-two .pw-info-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: var(--text-secondary);
}

.v-two .pw-info-item strong {
  color: var(--text);
  font-weight: 600;
}

.v-two .pw-info-item svg {
  color: var(--accent);
  flex-shrink: 0;
}

.v-two .pw-info-divider {
  width: 1px;
  height: 20px;
  background: var(--border);
}

</style>

<script setup>
const cards = [
  {
    type: 'name',
    badge: 'Name',
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 7C4 5.89543 4.89543 5 6 5H18C19.1046 5 20 5.89543 20 7V17C20 18.1046 19.1046 19 18 19H6C4.89543 19 4 18.1046 4 17V7Z" stroke="currentColor" stroke-width="1.5"/><path d="M8 10H16M8 14H12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
    heading: 'How to trademark a name',
    text: 'A business name is your first impression. Trademarking it prevents others from operating under a confusingly similar identity.',
    steps: [
      { label: 'Conduct a name search', detail: 'Check USPTO database for existing marks' },
      { label: 'Determine your filing basis', detail: 'Use in commerce or intent-to-use' },
      { label: 'File the application', detail: 'Submit via TEAS with class & goods' },
      { label: 'Monitor & maintain', detail: 'Respond to office actions promptly' }
    ]
  },
  {
    type: 'name',
    badge: 'Logo',
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" stroke-width="1.5"/><circle cx="9.5" cy="9.5" r="2" stroke="currentColor" stroke-width="1.5"/><path d="M4 16L8.5 12L12 15L15.5 10L20 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    heading: 'How to trademark a logo',
    text: 'Your logo is the visual anchor of your brand. A registered trademark gives you exclusive rights to that visual identity.',
    steps: [
      { label: 'Ensure originality', detail: 'Your logo must be distinctive & unique' },
      { label: 'Choose the right class', detail: 'File under the correct goods/services' },
      { label: 'Submit a clear image', detail: 'High-resolution JPG per USPTO specs' },
      { label: 'Defend your mark', detail: 'Monitor for similar logo filings' }
    ]
  },
  {
    type: 'name',
    badge: 'Phrase',
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 6H20M4 10H16M4 14H18M4 18H12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
    heading: 'How to trademark a phrase',
    text: 'Taglines and catchphrases can become iconic. Trademarking protects the expressions that define your brand voice.',
    steps: [
      { label: 'Verify distinctiveness', detail: 'Generic phrases cannot be trademarked' },
      { label: 'Search existing phrases', detail: 'Check TESS for similar registrations' },
      { label: 'File a standard character mark', detail: 'Protects the phrase in any font/style' },
      { label: 'Use it commercially', detail: 'Active use maintains your rights' }
    ]
  }
]
</script>