<template>
  <section class="pw-section">
    <div class="pw-container">
      <div class="pw-header">
        <!-- <span class="pw-eyebrow">Protect Your IP</span> -->
        <h2 class="pw-title">Protect what's yours</h2>
        <p class="pw-subtitle">Your name, logo, and phrase are more than assets — they're your identity. Here's how to secure each one through trademark registration.</p>
      </div>

      <div class="pw-grid">
        <!-- Card: Name -->
        <div class="pw-card" v-for="(card, idx) in cards" :key="idx" :class="'pw-card--' + card.type">
          <div class="pw-card__icon-area">
            <div class="pw-card__icon-circle">
              <i :class="card.icon" aria-hidden="true"></i>
            </div>
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
          <i class="fa-regular fa-clock"></i>
          <span>Average filing: <strong>8 – 12 months</strong></span>
        </div>
        <div class="pw-info-item">
          <i class="fa-solid fa-star"></i>
          <span>Federal protection <strong>nationwide</strong></span>
        </div>
        <div class="pw-info-item">
          <i class="fa-solid fa-shield-halved"></i>
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
  font-family: 'Space Grotesk', sans-serif;
  overflow: hidden;
}

.pw-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
}

.pw-container {
  max-width: 1230px;
  margin: 0 auto;
}

.pw-header {
  text-align: center;
  max-width: 580px;
  margin: 0 auto 56px;
}

.pw-eyebrow {
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

.pw-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(28px, 3.5vw, 40px);
  font-weight: 800;
  color: var(--text);
  letter-spacing: -1.5px;
  line-height: 1.15;
  margin-bottom: 16px;
}

.pw-subtitle {
  font-size: 16px;
  color: var(--text-secondary);
  max-width: 600px;
  line-height: 1.7;
  margin: 0 auto;
}

/* Grid */
.pw-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 48px;
}

@media (max-width: 900px) {
  .pw-grid { grid-template-columns: 1fr; max-width: 480px; margin-left: auto; margin-right: auto; }
}

/* Card */
.pw-card {
  position: relative;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 36px 32px 40px;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1), border-color 0.4s ease, box-shadow 0.4s ease;
}

.pw-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: rgba(26, 35, 126, 0.15);
}

.pw-card__badge {
  display: inline-block;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  /* padding: 4px 12px; */
  border-radius: 100px;
  margin-bottom: 2px;
}

.pw-card--name .pw-card__badge {
  color: var(--accent);
  /* background: var(--accent-glow); */
}

.pw-card--logo .pw-card__badge {
  color: var(--teal);
  background: rgba(0, 137, 123, 0.1);
}

.pw-card--phrase .pw-card__badge {
  color: var(--primary-light);
  background: rgba(57, 73, 171, 0.08);
}

/* Icon */
.pw-card__icon-area {
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.pw-card__icon-circle {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.pw-card--name .pw-card__icon-circle { background: var(--accent-glow); color: var(--accent); }
.pw-card--logo .pw-card__icon-circle { background: rgba(0, 137, 123, 0.1); color: var(--teal); }
.pw-card--phrase .pw-card__icon-circle { background: rgba(57, 73, 171, 0.08); color: var(--primary-light); }

.pw-card__heading {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 17px;
  font-weight: 600;
  color: var(--text);
  margin: 0;
  line-height: 1.3;
}

.pw-card__text {
  font-size: 14px;
  line-height: 1.7;
  color: var(--text-secondary);
  margin: 0 0 28px;
}

/* Steps */
.pw-card__steps {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.pw-step {
  display: flex;
  gap: 14px;
  align-items: flex-start;
}

.pw-step__num {
  font-size: 12px;
  font-weight: 700;
  color: var(--text-muted);
  min-width: 22px;
  padding-top: 2px;
}

.pw-step__content {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.pw-step__label {
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
}

.pw-step__detail {
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.5;
}

/* Border glow on hover */
.pw-card__border-glow {
  position: absolute;
  inset: 0;
  border-radius: var(--radius-lg);
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.pw-card:hover .pw-card__border-glow {
  opacity: 1;
}

.pw-card--name .pw-card__border-glow {
  box-shadow: inset 0 0 30px var(--accent-glow);
}

.pw-card--logo .pw-card__border-glow {
  box-shadow: inset 0 0 30px rgba(0, 137, 123, 0.06);
}

.pw-card--phrase .pw-card__border-glow {
  box-shadow: inset 0 0 30px rgba(57, 73, 171, 0.06);
}

/* Info bar */
.pw-info-bar {
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
  .pw-info-bar { flex-direction: column; gap: 16px; }
  .pw-info-divider { display: none; }
}

.pw-info-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: var(--text-secondary);
}

.pw-info-item strong {
  color: var(--text);
  font-weight: 600;
}

.pw-info-item i {
  color: var(--accent);
  flex-shrink: 0;
  font-size: 16px;
}

.pw-info-divider {
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
    icon: 'fa-solid fa-signature',
    heading: 'How to trademark a name',
    text: 'Your application must be filed with the USPTO, and it must include:',
    steps: [
      {
        label: "Owner's contact information",
        detail: 'The legal owner of the trademark.'
      },
      {
        label: 'Trademark name or mark',
        detail: 'The name or mark you want to protect.'
      },
      {
        label: 'Goods or services',
        detail: 'The products or services the trademark will cover.'
      },
      {
        label: 'Filing basis',
        detail: 'Whether the mark is already in use in commerce or will be filed as intent to use.'
      },
      {
        label: 'Specimen (if in use)',
        detail: 'A label, packaging, or website URL showing the mark in use. If filing under intent to use, the specimen is submitted later and additional federal fees apply.'
      }
    ]
  },
  {
    type: 'name',
    badge: 'Logo',
    icon: 'fa-regular fa-image',
    heading: 'How to trademark a logo',
    text: 'You can trademark a logo that includes your business name, but if you want to protect both the logo and the name itself, you\u2019ll need to file two separate trademark applications.',
    steps: [
      {
        label: 'Separate applications required',
        detail: 'Protecting both your business name and logo requires two individual trademark applications.'
      },
      {
        label: 'Stronger legal protection',
        detail: 'Using a logo provides limited common-law rights, but a federal trademark registration offers stronger nationwide legal protection. Because the process can be detailed and nuanced, guidance from a trademark attorney can help ensure everything is done correctly.'
      }
    ]
  },
  {
    type: 'name',
    badge: 'Phrase',
    icon: 'fa-solid fa-quote-right',
    heading: 'How to trademark a phrase',
    text: 'A distinctive phrase—such as a slogan, motto, or tagline—can play a key role in building brand recognition. To prevent others from using it, start with a comprehensive trademark search and then register the phrase with the USPTO.',
    steps: [
      {
        label: 'Eligibility matters',
        detail: 'Not every phrase qualifies for trademark protection, and registration does not always guarantee exclusive rights.'
      },
      {
        label: 'Professional guidance',
        detail: 'Working with a trademark attorney can help you evaluate eligibility, navigate the filing process, and choose the best strategy to protect your phrase.'
      }
    ]
  }
]
</script>