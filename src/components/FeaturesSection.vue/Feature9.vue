<script setup>
// import { Building2 } from '@lucide/vue';
const types = [
  {
    icon: 'fa-regular fa-address-card',
    iconClass: 't1',
    title: 'Business name',
    desc: 'Protects the brand name itself — the text, letters, or numbers that identify your goods or services.'
  },
  {
    icon: 'fa-solid fa-infinity',
    iconClass: 't2',
    title: 'Logo or symbol',
    desc: 'Protects the visual symbol or design element that represents your brand, independent of the word mark.'
  },
  {
    icon: 'fa-solid fa-tags',
    iconClass: 't3',
    title: 'Name of a product',
    desc: 'Protects the distinctive 3D shape of a product or its packaging that distinguishes it from competitors.'
  },
  {
    icon: 'fa-solid fa-file-signature',
    iconClass: 't4',
    title: 'Slogan or phrase',
    desc: 'Protects unique audio signatures like jingles, chimes, or tunes that consumers associate with your brand.'
  },
]
</script>

<template>
  <section class="section v-two">
    <div class="animate-on-scroll">
      <div class="section-label"><i class="fas fa-layer-group"></i> Categories</div>
      <div class="section-title">Types of Trademarks</div>
      <div class="section-desc">Different types of marks serve different purposes. Understanding them helps you protect the right aspects of your brand.</div>
    </div>
    <div class="types-grid">
      <div v-for="(type, index) in types" :key="type.title" class="type-card animate-on-scroll" :class="'delay-' + (index + 1)">
        <div class="type-card-icon t2"><i :class="type.icon"></i></div>
        <h3>{{ type.title }}</h3>
        <p>{{ type.desc }}</p>
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

.v-two .types-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-top: 48px;
}

.v-two .type-card {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: 28px 22px;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  cursor: default;
  position: relative;
}

.v-two .type-card:hover { transform: translateY(-8px); box-shadow: var(--shadow-xl); border-color: transparent; }

.v-two .type-card-icon {
  width: 50px;
  height: 50px;
  border-radius: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  margin: 0 auto 16px;
  transition: all 0.4s ease;
}

.v-two .type-card:hover .type-card-icon { transform: scale(1.1) rotate(-3deg); }

.v-two .type-card-icon.t1 { background: linear-gradient(135deg, rgba(26,35,126,0.1), rgba(26,35,126,0.03)); color: var(--primary); }
.v-two .type-card-icon.t2 { background: linear-gradient(135deg, var(--accent-glow), rgba(255,109,0,0.03)); color: var(--accent); }
.v-two .type-card-icon.t3 { background: linear-gradient(135deg, rgba(0,137,123,0.1), rgba(0,137,123,0.03)); color: var(--teal); }
.v-two .type-card-icon.t4 { background: linear-gradient(135deg, rgba(121,134,203,0.12), rgba(121,134,203,0.03)); color: var(--primary-lighter); }

.v-two .type-card h3 { font-size: 15px; font-weight: 700; color: var(--text); margin-bottom: 6px; }
.v-two .type-card p { font-size: 12px; color: var(--text-muted); line-height: 1.6; }

@media (max-width: 1024px) {
  .v-two .types-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .v-two .section { padding: 60px 16px; }
  .v-two .types-grid { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 480px) {
  .v-two .types-grid { grid-template-columns: 1fr; }
}
</style>