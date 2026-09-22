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