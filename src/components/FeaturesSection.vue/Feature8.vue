<script setup>
const cards = [
  {
    icon: 'fas fa-shield-alt',
    iconClass: 'c1',
    title: 'Legal Protection',
    desc: 'Get the legal right to sue anyone who uses your mark without permission. Registration provides prima facie evidence of ownership.'
  },
  {
    icon: 'fas fa-ban',
    iconClass: 'c2',
    title: 'Prevent Infringement',
    desc: 'Stop competitors from using confusingly similar marks. Your registered trademark acts as a powerful deterrent against copycats.'
  },
  {
    icon: 'fas fa-globe',
    iconClass: 'c3',
    title: 'Global Expansion',
    desc: 'A registered trademark is the foundation for international protection. Use it as a basis for filing in other countries under the Madrid Protocol.'
  },
  {
    icon: 'fas fa-gem',
    iconClass: 'c4',
    title: 'Asset Value',
    desc: 'Trademarks can be licensed, franchised, or sold. They are valuable intangible assets that appreciate as your brand grows.'
  },
  {
    icon: 'fas fa-search',
    iconClass: 'c5',
    title: 'Brand Recognition',
    desc: 'The ® symbol signals trust and authenticity to customers, giving your brand instant credibility in the marketplace.'
  },
  {
    icon: 'fas fa-infinity',
    iconClass: 'c6',
    title: 'Perpetual Protection',
    desc: 'Unlike patents, trademarks can be renewed indefinitely as long as they remain in use. Your brand protection can last forever.'
  }
]
</script>

<template>
  <section class="section why-section v-two">
    <div class="animate-on-scroll" style="text-align: center;">
      <div class="section-label" style="margin: 0 auto 16px;"><i class="fas fa-star"></i> Benefits</div>
      <div class="section-title" style="margin-left: auto; margin-right: auto;">Why Register Your Trademark?</div>
      <div class="section-desc" style="margin-left: auto; margin-right: auto;">Without registration, your brand is vulnerable. Here are the compelling reasons to act now.</div>
    </div>
    <div class="why-grid">
      <div v-for="(card, index) in cards" :key="card.title" class="why-card animate-on-scroll" :class="'delay-' + (index + 1)">
        <div class="why-icon c1"><i :class="card.icon"></i></div>
        <h3>{{ card.title }}</h3>
        <p>{{ card.desc }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>

.why-section {
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
.v-two .section {
  padding: 80px 24px;
  max-width: 1280px;
  margin: 0 auto;
}

.v-two .section-label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 5px 14px;
  background: rgba(26,35,126,0.05);
  border: 1px solid rgba(26,35,126,0.08);
  border-radius: 100px;
  font-size: 12px;
  font-weight: 700;
  color: var(--primary);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 16px;
}

.v-two .section-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(28px, 3.5vw, 40px);
  font-weight: 800;
  color: var(--text);
  letter-spacing: -1.5px;
  line-height: 1.15;
  margin-bottom: 16px;
}

.v-two .section-desc {
  font-size: 16px;
  color: var(--text-secondary);
  max-width: 600px;
  line-height: 1.7;
}

.v-two .why-section { background: var(--bg-card); border-radius: 0; }

.v-two .why-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 48px;
}

.v-two .why-card {
  padding: 28px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-light);
  background: #F6F4EF;
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  position: relative;
  overflow: hidden;
}

.v-two .why-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(135deg, var(--accent), var(--accent-light));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s ease;
}

.v-two .why-card:hover::before { transform: scaleX(1); }
.v-two .why-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-lg); border-color: transparent; }

.v-two .why-icon {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-bottom: 18px;
}

.v-two .why-icon.c1 { background: rgba(26,35,126,0.08); color: var(--primary); }
.v-two .why-icon.c2 { background: var(--accent-glow); color: var(--accent); }
.v-two .why-icon.c3 { background: rgba(0,137,123,0.08); color: var(--teal); }
.v-two .why-icon.c4 { background: rgba(121,134,203,0.1); color: var(--primary-lighter); }
.v-two .why-icon.c5 { background: rgba(255,109,0,0.06); color: #e65100; }
.v-two .why-icon.c6 { background: rgba(0,137,123,0.06); color: #00695c; }

.v-two .why-card h3 { font-size: 16px; font-weight: 700; color: var(--text); margin-bottom: 8px; }
.v-two .why-card p { font-size: 13px; color: var(--text-secondary); line-height: 1.65; }

@media (max-width: 1024px) {
  .v-two .why-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .v-two .section { padding: 60px 16px; }
  .v-two .why-grid { grid-template-columns: 1fr; }
}
</style>