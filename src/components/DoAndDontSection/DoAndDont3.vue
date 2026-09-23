<template>
  <section class="dos-section">
    <div class="container">
      <div class="section-header">
        <div class="red-bar"></div>
        <span class="eyebrow">Know Before You File</span>
        <h2 class="section-title">Trademark examples: dos and don'ts.</h2>
      </div>
      <div class="grid-layout">
        <div class="card">
          <div class="card-header header-do">
            <span class="iconify" data-icon="lucide:check-circle-2"></span>
            <h3 class="card-title">What you can trademark</h3>
          </div>
          <div class="card-body">
            <div v-for="(item, index) in dos" :key="index" class="list-row do-row">
              <span class="iconify" data-icon="lucide:check"></span>
              <p class="list-text">{{ item }}</p>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header header-dont">
            <span class="iconify" data-icon="lucide:x-circle"></span>
            <h3 class="card-title">What you can't trademark</h3>
          </div>
          <div class="card-body">
            <div v-for="(item, index) in donts" :key="index" class="list-row dont-row">
              <span class="iconify" data-icon="lucide:x"></span>
              <p class="list-text">{{ item }}</p>
            </div>
          </div>
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
        "A brand or business name, such as McDonald's",
        "A logo, like the golden arches",
        'A slogan or tagline, such as “I’m Lovin’ It”'
      ],
      donts: [
        "A song, book, film, or other original creative work — these are protected by copyright instead.",
        "An invention, such as a technical process, machine, manufactured product, or chemical formula — these are protected through patents.",
      ]
    };
  }
};
</script>

<style scoped>

.dos-section{
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

.dos-section {
  padding-top: 96px;
  padding-bottom: 96px;
}

.container {
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 24px;
}

.section-header {
  text-align: center;
  margin-bottom: 64px;
}

.red-bar {
  height: 3px;
  width: 48px;
  background-color: #F97316;
  margin: 0 auto 16px auto;
}

.eyebrow {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #F97316;
  display: block;
}

.section-title {
  font-family: 'Inter Tight', sans-serif;
  font-weight: 600;
  font-size: 36px;
  line-height: 0.95;
  letter-spacing: -0.04em;
  color: #0F2B46;
  margin: 16px 0 0 0;
}

.grid-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

.card {
  border: 1px solid #E2E6EC;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 24px;
  border-bottom: 1px solid #E2E6EC;
}

.header-do {
  background-color: #F8F9FB;
}

.header-dont {
  background-color: #fff7ed;
}

.card-header .iconify {
  font-size: 20px;
}

.header-do .iconify {
  color: #0F2B46;
}

.header-dont .iconify {
  color: #F97316;
}

.card-title {
  font-family: 'Inter Tight', sans-serif;
  font-weight: 600;
  font-size: 18px;
  color: #0F2B46;
  margin: 0;
}

.card-body {
  display: flex;
  flex-direction: column;
}

.list-row {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 20px;
  border-bottom: 1px solid #E2E6EC;
  transition: background-color 0.2s ease;
}

.list-row:last-child {
  border-bottom: none;
}

.do-row:hover {
  background-color: #fff7ed;
}

.dont-row:hover {
  background-color: #F8F9FB;
}

.list-row .iconify {
  font-size: 16px;
  margin-top: 2px;
  flex-shrink: 0;
}

.do-row .iconify {
  color: #0F2B46;
}

.dont-row .iconify {
  color: #F97316;
}

.list-text {
  font-size: 14px;
  color: #4B5563;
  margin: 0;
  line-height: 1.625;
}

.iconify {
  display: inline-block;
  width: 1em;
  height: 1em;
  vertical-align: middle;
}

@media (min-width: 768px) {
  .dos-section {
    padding-top: 128px;
    padding-bottom: 128px;
  }

  .section-title {
    font-size: 48px;
  }

  .grid-layout {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
}

@media (min-width: 1024px) {
  .container {
    padding: 0 40px;
  }
}
</style>