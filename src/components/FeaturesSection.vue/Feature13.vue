<script setup>
import { ArrowRight } from "@lucide/vue";

import tmImage from "@/assets/tm.svg";
import tmSearchImage from "@/assets/tm-search-light.svg";
import monitorImage from "@/assets/monitor.svg";
import officeActionImage from "@/assets/office-action.svg";
import copyrightImage from "@/assets/copyright.svg";
import businessImage from "@/assets/business-light.svg";

const services = [
  {
    to: "trademark-registration/",
    icon: tmImage,
    num: "01",
    title: "Trademark Registration",
    desc: "Protect your rights to a name, logo, or slogan that identifies your business and stop competitors from copying your brand.",
    featured: true,
  },
  {
    to: "comprehensive-search/",
    icon: tmSearchImage,
    num: "02",
    title: "Trademark Search",
    desc: "Make sure your anticipated name, logo, or slogan is up for grabs before you apply, so you don't waste time and money.",
  },
  {
    to: "trademark-monitoring/",
    icon: monitorImage,
    num: "03",
    title: "Trademark Monitoring",
    desc: "Get notified when someone files a potentially infringing trademark, so you can enforce your rights right away.",
  },
  {
    to: "office-action-response/",
    icon: officeActionImage,
    num: "04",
    title: "Office Action Response",
    desc: "Got an office action? We'll carefully address and resolve the issues raised by the examining attorney.",
  },
  {
    to: "copyright-registration/",
    icon: copyrightImage,
    num: "05",
    title: "Copyright Registration",
    desc: "Protect your creative work against piracy, and freely license or exploit your creation on your own terms.",
  },
  {
    to: "llc/",
    icon: businessImage,
    num: "06",
    title: "LLC Formation",
    desc: "No matter the business type, we can help you form your new company. Every day, people from all over the nation rely on us to help them form their company.",
  },
];
</script>

<template>
  <section class="services-section">
    <div class="container">
      <div class="services-header">
        <span class="eyebrow">What we offer</span>
        <h2 class="display-lg">
          One-stop solution for your <br>
          <span class="text-gradient">business protection</span>
        </h2>
        <p class="services-subtitle">
          We're here to make sure your business is protected.
        </p>
      </div>

      <div class="services-grid">
        <RouterLink
          v-for="service in services"
          :key="service.to"
          :to="service.to"
          class="service-card"
          :class="{ featured: service.featured }"
        >
          <span v-if="service.featured" class="featured-badge">Most popular</span>

          <span class="service-num">{{ service.num }}</span>

          <div class="service-icon">
            <img :src="service.icon" :alt="service.title" loading="lazy" decoding="async" />
          </div>

          <h3 class="service-title">{{ service.title }}</h3>
          <p class="service-desc">{{ service.desc }}</p>

          <span class="service-more">
            Learn more
            <ArrowRight :size="15" />
          </span>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>

.services-section {
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

.services-section {
  padding: 96px 0;
  background: var(--background);
}
.eyebrow {
    display: block;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.4em;
    color: var(--primary);
    margin-bottom: 14px;
}
.display-lg {
    font-size: clamp(1.6rem, 3.2vw, 2.6rem);
    font-weight: 500;
    letter-spacing: -0.03em;
    line-height: 1.12;
}
.text-gradient {
    background: linear-gradient(135deg, #003ec7 0%, #003ec7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 200;
}

.container{
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
}

.services-header {
  text-align: center;
  max-width: 620px;
  margin: 0 auto 52px auto;
}

.services-subtitle {
  margin-top: 14px;
  color: var(--on-surface-variant);
  font-size: 15px;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.service-card {
  position: relative;
  background: var(--surface-container-low);
  border: none;
  border-radius: var(--radius-card);
  padding: 30px 26px 26px 26px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow: hidden;
  text-decoration: none;
  transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease, background 0.25s ease;
}

.service-card:hover {
  background: #fff;
  box-shadow: 0 24px 56px rgba(19, 27, 46, 0.1);
  transform: translateY(-5px);
}

.service-card.featured {
  background: var(--on-surface);
  color: #fff;
}

.service-card.featured:hover {
  transform: translateY(-5px);
  box-shadow: 0 24px 56px rgba(19, 27, 46, 0.28);
  border-color: transparent;
}

.featured-badge {
  position: absolute;
  top: 22px;
  right: 24px;
  background: var(--primary);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.03em;
  padding: 5px 12px;
  border-radius: var(--radius-pill);
}

.service-num {
  position: absolute;
  top: 0px;
  right: 12px;
  font-size: 72px;
  font-weight: 700;
  line-height: 1;
  color: var(--surface-container-high);
  z-index: 0;
  user-select: none;
}

.service-card.featured .service-num {
  color: rgba(255, 255, 255, 0.08);
}

.service-icon {
  position: relative;
  z-index: 1;
  width: 50px;
  height: 50px;
  border-radius: var(--radius-2xl);
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 22px;
  box-shadow: 0 6px 16px rgba(19, 27, 46, 0.06);
}

.service-card.featured .service-icon {
  background: rgba(255, 255, 255, 0.1);
  box-shadow: none;
}

.service-icon img {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.service-title {
  position: relative;
  z-index: 1;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--on-surface);
  margin-bottom: 10px;
}

.service-card.featured .service-title {
  color: #fff;
}

.service-desc {
  position: relative;
  z-index: 1;
  font-size: 14px;
  line-height: 1.65;
  color: var(--on-surface-variant);
  margin-bottom: 22px;
  flex: 1;
}

.service-card.featured .service-desc {
  color: rgba(255, 255, 255, 0.65);
}

.service-more {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13.5px;
  font-weight: 600;
  color: var(--primary);
}

.service-card.featured .service-more {
  color: #fff;
}

.service-more svg {
  transition: transform 0.25s ease;
}

.service-card:hover .service-more svg {
  transform: translateX(3px);
}

@media (max-width: 900px) {
  .services-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 640px) {
  .services-section {
    padding: 60px 0;
  }
  .services-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }
  .service-card {
    padding: 26px 22px 22px 22px;
  }
  .service-num {
    font-size: 56px;
  }
}
</style>