<script setup>
import { ChartLine, Gavel, Info, LockKeyhole } from '@lucide/vue'
import main from "@/assets/VersionTwo/main.webp";

const features = [
  {
    icon: LockKeyhole,
    iconClass: 'orange',
    title: 'Exclusive Rights',
    desc: 'Sole ownership to use the mark for registered goods/services'
  },
  {
    icon: Gavel,
    iconClass: 'orange',
    title: 'Legal Protection',
    desc: 'Ability to take legal action against infringers'
  },
  {
    icon: ChartLine,
    iconClass: 'orange',
    title: 'Business Value',
    desc: 'Trademarks are intangible assets that increase company valuation'
  }
]
</script>

<template>
  <section class="section">
    <div class="animate-on-scroll">
      <div class="section-label"><Info :size="16" /> Overview</div>
      <div class="section-title">What Is Trademark Registration?</div>
      <div class="section-desc">Trademark registration is the legal process of securing exclusive rights to your brand identity.</div>
    </div>
    <div class="what-tm-grid">
      <div class="what-tm-text">
        <div class="animate-on-scroll delay-1">
          <p>A trademark is a recognizable sign, design, or expression that identifies products or services of a particular source from those of others. Registering your trademark gives you the exclusive legal right to use it and prevents others from using a similar mark.</p>
          <p>Trademark registration provides legal protection for your brand name, logo, slogan, or any distinctive sign that represents your business. It is one of the most important steps in building and protecting your brand identity.</p>
        </div>
        <div class="what-tm-features">
          <div v-for="feature in features" :key="feature.title" class="what-tm-feature animate-on-scroll" :class="feature.delay">
            <div class="what-tm-feature-icon" :class="feature.iconClass">
              <component :is="feature.icon" :size="18" />
            </div>
            <div class="what-tm-feature-text">
              <h4>{{ feature.title }}</h4>
              <p>{{ feature.desc }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="what-tm-visual animate-on-scroll delay-3">
        <img :src="main" alt="Trademark Registration" style="max-height: 500px; width: 100%; object-fit: cover;">
      </div>
    </div>
  </section>
</template>

<style scoped>

.section {
    --primary: #1a237e;
    --primary-light: #3949ab;
    --primary-lighter: #7986cb;
    --accent: #ff6d00;
    --accent-light: #ff9e40;
    --accent-glow: rgba(255, 109, 0, 0.15);
    --teal: #00897b;
    --teal-light: #4db6ac;
    --bg: #fafbff;
    --bg-card: #ffffff;
    --bg-alt: #f0f2ff;
    --bg-gradient: linear-gradient(135deg, #fafbff 0%, #f0f2ff 50%, #fff8f0 100%);
    --text: #1a1a2e;
    --text-secondary: #5c6283;
    --text-muted: #8b90a8;
    --border: #e2e5f1;
    --border-light: #eef0f8;
    --shadow-sm: 0 1px 3px rgba(26, 35, 126, 0.06);
    --shadow-md: 0 4px 16px rgba(26, 35, 126, 0.08);
    --shadow-lg: 0 8px 40px rgba(26, 35, 126, 0.1);
    --shadow-xl: 0 16px 60px rgba(26, 35, 126, 0.12);
    --radius: 12px;
    --radius-lg: 20px;
    --radius-xl: 28px;
}

.section {
    font-family: "Inter", sans-serif;
    background-color: #ffffff;
    color: var(--neutral-900);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
}

.animate-on-scroll.visible {
    opacity: 1;
    transform: translateY(0);

}
.v-two *::before, .v-two *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  
  }
 .section {
  padding: 80px 24px;
  max-width: 1280px;
  margin: 0 auto;
}
.section-label {
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
.section-title {
  /* font-family: 'Space Grotesk', sans-serif !important; */
  font-size: clamp(28px, 3.5vw, 40px);
  font-weight: 800 ;
  color: var(--text);
  letter-spacing: -1.5px;
  line-height: 1.15;
  margin-bottom: 16px;
}
.section-desc {
  font-size: 16px;
  color: var(--text-secondary);
  max-width: 600px;
  line-height: 1.7;
}

.what-tm-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
  margin-top: 48px;
}
.what-tm-text p {
  font-size: 15px;
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 16px;
}
.what-tm-features {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 24px;
}
.what-tm-feature {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 18px;
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius);
  transition: all 0.3s ease;
}
.what-tm-feature:hover {
  border-color: rgba(26,35,126,0.15);
  box-shadow: var(--shadow-sm);
  transform: translateX(4px);
}
.what-tm-feature-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  flex-shrink: 0;
}
.what-tm-feature-icon.blue { background: rgba(26,35,126,0.08); color: var(--primary); }.what-tm-feature-icon.orange { background: var(--accent-glow); color: var(--accent); }.what-tm-feature-icon.teal { background: rgba(0,137,123,0.08); color: var(--teal); }
.what-tm-feature-text h4 { font-size: 14px; font-weight: 700; color: var(--text); margin-bottom: 2px; margin-top: 0px;}.what-tm-feature-text p { font-size: 13px; color: var(--text-muted); line-height: 1.5; margin: 0; }
.what-tm-visual {
  position: relative;
}
.what-tm-visual img {
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
}

@media (max-width: 1024px) {
.what-tm-grid { grid-template-columns: 1fr; }
}

@media (max-width: 768px) {
.section { padding: 60px 16px; }
}
</style>
