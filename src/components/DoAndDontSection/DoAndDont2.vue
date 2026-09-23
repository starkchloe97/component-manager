<template>
  <section class="verdict-section">
    <div class="container">
      <div class="section-header">
        <span class="badge">
          <span class="iconify" data-icon="lucide:scale"></span>
          Know before you file
        </span>
        <h2 class="section-title">
          Trademark examples: <span class="text-gradient">dos and don'ts</span>
        </h2>
        <p class="section-subtitle">
          A quick gut-check before you submit — see what typically clears
          examination and what gets flagged.
        </p>
      </div>

      <div class="verdict-panel card-hover">
        <div class="verdict-col verdict-yes">
          <div class="col-head">
            <span class="col-icon">
              <span class="iconify" data-icon="lucide:check"></span>
            </span>
            <h3>What you can trademark</h3>
          </div>
          <ul class="col-list">
            <li v-for="(item, index) in dos" :key="'do-' + index">
              <span class="marker"></span>
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>

        <div class="verdict-col verdict-no">
          <div class="col-head">
            <span class="col-icon">
              <span class="iconify" data-icon="lucide:x"></span>
            </span>
            <h3>What you can't trademark</h3>
          </div>
          <ul class="col-list">
            <li v-for="(item, index) in donts" :key="'dont-' + index">
              <span class="marker"></span>
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "DosAndDontsSection",
  data() {
    return {
      dos: [
        'A distinctive brand name, such as "Airtree Digital"',
        "A logo that is unique and not merely decorative",
        'A slogan used to sell a product or service, like "Just Do It"'
      ],
      donts: [
        "A long, generic phrase already covered by copyright",
        "A mark that is merely descriptive of the goods it identifies",
        "A mark confusingly similar to an existing one in your industry"
      ]
    };
  }
};
</script>

<style scoped>

.verdict-section {
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

.verdict-section {
  padding: 96px 0;
  position: relative;
}

.container {
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 24px;
}

.section-header {
  margin: 0 auto 56px auto;
  text-align: center;
}

.section-title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 36px;
  line-height: 1;
  letter-spacing: -0.04em;
  color: var(--ink);
  margin: 20px 0 16px 0;
}

.section-subtitle {
  font-size: 15px;
  font-weight: 300;
  line-height: 1.6;
  color: var(--muted);
}

.verdict-panel {
  display: grid;
  grid-template-columns: 1fr;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  overflow: hidden;
}

.verdict-col {
  padding: 40px 32px;
}

.verdict-yes {
  background: var(--brand-light);
}

.verdict-no {
  background: var(--surface);
}

.col-head {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

.col-icon {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  flex-shrink: 0;
}

.verdict-yes .col-icon {
  color: var(--brand);
  border: 1px solid var(--brand)
}

.verdict-no .col-icon {
  background: var(--border);
  color: var(--ink);
}

.col-head h3 {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 17px;
  color: var(--ink);
  margin: 0;
}

.col-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.col-list li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 14px;
  line-height: 1.6;
  color: var(--ink);
}

.marker {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  margin-top: 8px;
  flex-shrink: 0;
}

.verdict-yes .marker {
  background: var(--brand);
}

.verdict-no .marker {
  background: var(--muted);
}

.verdict-divider {
  display: none;
}

.iconify {
  display: inline-block;
  width: 1em;
  height: 1em;
  vertical-align: middle;
}

@media (min-width: 768px) {
  .section-title {
    font-size: 48px;
  }

  .verdict-panel {
    grid-template-columns: 1fr 1fr;
    align-items: stretch;
  }

  .verdict-col {
    padding: 56px 48px;
  }

  .verdict-divider {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    background: var(--surface);
  }

  .divider-line {
    flex: 1;
    width: 1px;
    background: var(--border);
  }

  .divider-node {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: var(--muted);
    border: 1px solid var(--border);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--surface);
    margin: 12px 0;
    flex-shrink: 0;
  }
}

@media (min-width: 1024px) {
  .container {
    padding: 0 40px;
  }
}
@media (max-width: 768px) {
  .section-title {
    font-size: 28px;
    max-width: 77%;
    margin: 0 auto;
    line-height: 32px;
    padding-bottom: 10px;

  }
  .verdict-section{
    padding-top: 10px;
  }
    .container{
    padding: 0 20px;
  }
  }
</style>