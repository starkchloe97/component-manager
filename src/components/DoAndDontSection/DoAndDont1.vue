<script setup>
const dos = [
  { num: '01', title: 'Corporate Identities', desc: "Unique business names like McDonald's or Apple." },
  { num: '02', title: 'Visual Marks', desc: 'Iconic symbols like the Golden Arches or the Swoosh.' },
  { num: '03', title: 'Sonic & Textual Phrases', desc: `"I'm Lovin' It" and similar famous taglines.` },
]

const donts = [
  { num: '1', title: 'Creative Works', desc: 'Songs, books, and films. These require Copyright, not Trademark.' },
  { num: '2', title: 'Inventions', desc: 'Technical processes or machines. These are Patent territory.' },
]
</script>

<template>
  <section class="section-surface trademark-clarity scroll-reveal v-four">
    <div class="container">
      <h2 class="display-lg text-center tc-heading">Trademark Clarity</h2>
      <div class="tc-grid">
        <div class="tc-panel tc-dos bg-white">
          <div class="tc-glow tc-glow-green"></div>
          <div class="tc-inner">
            <div class="tc-header">
              <!-- <div class="tc-badge tc-badge-green">✓</div> -->
              <h3 class="tc-panel-title">The "Dos"</h3>
            </div>
            <ul class="tc-list">
              <li class="tc-item" v-for="item in dos" :key="item.title">
                <span class="tc-num">{{ item.num }}</span>
                <div>
                  <h4 class="tc-item-title">{{ item.title }}</h4>
                  <p class="tc-item-desc">{{ item.desc }}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="tc-panel tc-donts bg-surface-low">
          <div class="tc-glow tc-glow-red"></div>
          <div class="tc-inner">
            <div class="tc-header">
              <!-- <div class="tc-badge tc-badge-dark">×</div> -->
              <h3 class="tc-panel-title">The "Don'ts"</h3>
            </div>
            <ul class="tc-list">
              <li class="tc-item tc-item-donts" v-for="item in donts" :key="item.title">
                <div class="tc-circle">{{ item.num }}</div>
                <div>
                  <h4 class="tc-item-title">{{ item.title }}</h4>
                  <p class="tc-item-desc">{{ item.desc }}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.v-four *, .v-four *::before, .v-four *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: "Instrument Sans", sans-serif !important;
}
.display-lg {
    font-size: clamp(1.6rem, 3.2vw, 2.6rem);
    font-weight: 500;
    letter-spacing: -0.03em;
    line-height: 1.12;
    text-align: center;
}
.section-surface {
  --primary: #003dc7bd;
  --secondary: #081fecc1;
  --on-surface: #131b2e;
  --on-surface-variant: #44474f;
  --background: #faf8ff;
  --surface: #faf8ff;
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
.container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }

.v-four .bg-white {
    background: #fff;
}

.section-surface{
  font-family: "Instrument Sans", sans-serif !important;
  font-size: 15px;
  line-height: 1.6;
  color: var(--on-surface);
  background: var(--background);
  overflow-x: hidden;
}

.section-surface {
  background: var(--surface);
}

.trademark-clarity {
  padding: 96px 0;
}

.tc-heading {
  margin-bottom: 52px;
}

.tc-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border: 1px solid rgba(195,197,217,0.3);
  border-radius: var(--radius-card);
  overflow: hidden;
}

.v-four .tc-panel {
  position: relative;
  padding: 52px;
  overflow: hidden;
}

.v-four .tc-glow {
  position: absolute;
  width: 110px;
  height: 110px;
  filter: blur(36px);
  pointer-events: none;
}

.v-four .tc-glow-green {
  top: -28px;
  left: -28px;
  background: rgba(0,110,42,0.05);
}

.v-four .tc-glow-red {
  top: -28px;
  right: -28px;
  background: rgba(186,26,26,0.05);
}

.v-four .tc-inner {
  position: relative;
  z-index: 1;
}

.v-four .tc-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
}

.v-four .tc-badge {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  font-weight: 700;
  color: #fff;
  box-shadow: 0 5px 16px rgba(0,0,0,0.15);
  flex-shrink: 0;
}

.v-four .tc-badge-green {
  background: var(--secondary);
  box-shadow: 0 5px 16px rgba(0,110,42,0.2);
}

.v-four .tc-badge-dark {
  background: var(--on-surface);
}

.v-four .tc-panel-title {
  font-size: 1.4rem;
  font-weight: 900;
  letter-spacing: -0.02em;
}

.v-four .tc-list {
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 1rem;
  padding-left: 2rem;
}

.v-four .tc-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.v-four .tc-num {
  font-weight: 900;
  font-size: 2.5rem;
  color: var(--secondary);
  opacity: 0.2;
  line-height: 1;
  transition: opacity 0.3s;
  min-width: 48px;
}

.v-four .tc-item:hover .tc-num {
  opacity: 1;
}

.v-four .tc-item-donts {
  opacity: 0.8;
  transition: opacity 0.3s;
}

.v-four .tc-item-donts:hover {
  opacity: 1;
}

.v-four .tc-circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid rgba(19,27,46,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;
  font-size: 0.78rem;
}

.v-four .tc-item-title {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 3px;
}

.v-four .tc-item-desc {
  color: var(--on-surface-variant);
  line-height: 1.6;
  font-size: 0.82rem;
}

@media (max-width: 1024px) {
  .v-four .trademark-clarity {
    padding: 64px 0;
  }
  .v-four .tc-grid {
    grid-template-columns: 1fr;
  }
  .v-four .tc-panel {
    padding: 36px;
  }
}

@media (max-width: 640px) {
  .v-four .tc-panel {
    padding: 24px 20px;
  }
}
</style>
