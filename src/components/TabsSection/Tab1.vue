<template>
  <section  id="packages" class="service-section" >
    <div class="orb orb--1"></div>
    <div class="orb orb--2"></div>
    <div class="orb orb--3"></div>
    <div class="grid-overlay"></div>

    <div class="container">
      <!-- Section Header -->
      <div class="section-header">
       <a href=""> <span class="section-tag">Trademark Services</span></a>
        <h2 class="section-title">
          Office Action
          <span class="title-accent">Response</span>
        </h2>
        <p class="section-sub">
          Expert attorney-drafted responses to USPTO Office Actions. Fast, accurate, and built to protect your trademark.
        </p>
      </div>

      <div class="layout">

        <!-- ───── Content Panel ───── -->
        <div class="content-panel">

          <!-- Pill Tabs -->
          <div class="pill-tabs" ref="pillTabs">
            <button
              v-for="(tab, idx) in tabs"
              :key="tab.id"
              :ref="el => { if (el) tabRefs[idx] = el }"
              :class="['pill', { active: activeTab === tab.id }]"
              @click="switchTab(tab.id, idx)"
            >
              {{ tab.label }}
            </button>
            <div class="pill-slider" :style="sliderStyle"></div>
          </div>

          <!-- Panel Body -->
          <div class="panel-body">
            <Transition name="panel" mode="out-in"> 
              <div :key="activeTab" class="panel-inner">

                <h2 class="panel-title">{{ activeTabData.title }}</h2>

                <p v-if="activeTabData.description" class="panel-desc">
                  {{ activeTabData.description }}
                </p>

                <!-- Vertical Timeline Steps -->
                <div v-if="activeTabData.steps" class="timeline">
                  <div
                    v-for="(step, i) in activeTabData.steps"
                    :key="i"
                    class="tl-step"
                  >
                    <div class="tl-rail">
                      <span class="tl-node">
                        <span class="tl-num">{{ i + 1 }}</span>
                      </span>
                      <span v-if="i < activeTabData.steps.length - 1" class="tl-line"></span>
                    </div>
                    <div class="tl-content">
                      <h4 class="tl-heading">{{ step.title }}</h4>
                      <p class="tl-text">{{ step.desc }}</p>
                    </div>
                  </div>
                </div>

              </div>
            </Transition>
          </div>

          <!-- Trust Indicators -->
          <div class="trust-bar">
            <div class="trust-item">
              <svg class="trust-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1L10.1 5.3L15 6L11.5 9.4L12.3 14.3L8 12.1L3.7 14.3L4.5 9.4L1 6L5.9 5.3L8 1Z" fill="#ff6d00"/>
              </svg>
              <span>4.9/5 Rating</span>
            </div>
            <div class="trust-divider"></div>
            <div class="trust-item">
              <svg class="trust-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1C4.1 1 1 4.1 1 8s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7zm3.2 5.6l-3.8 3.8c-.2.2-.5.2-.7 0l-1.9-1.9c-.2-.2-.2-.5 0-.7s.5-.2.7 0l1.5 1.5 3.5-3.5c.2-.2.5-.2.7 0s.2.5 0 .8z" fill="#ff6d00"/>
              </svg>
              <span>2,500+ Filed</span>
            </div>
            <div class="trust-divider"></div>
            <div class="trust-item">
              <svg class="trust-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1L2 5v6c0 3.3 2.6 6.4 6 7 3.4-.6 6-3.7 6-7V5L8 1z" fill="#ff6d00"/>
                <path d="M6.5 8L7.5 9L9.5 7" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>Licensed Attorneys</span>
            </div>
          </div>
        </div>

        <!-- ───── Pricing Card ───── -->
        <div class="pricing-card">
          <div class="card-corner card-corner--tl"></div>
          <div class="card-corner card-corner--br"></div>

          <div class="card-glow"></div>

          <div class="card-body">
            <div class="card-top">
              <span class="card-badge">
                <span class="badge-dot"></span>
                Most Popular
              </span>
            </div>

            <div class="price-block">
              <div class="price-row">
                <span class="price-dollar">$</span>
                <span class="price-num">1,999</span>
              </div>
              <p class="price-note">One-time fee · No hidden costs</p>
            </div>

            <div class="price-divider">
              <span class="divider-line"></span>
              <span class="divider-diamond"></span>
              <span class="divider-line"></span>
            </div>

            <div class="feat-list">
              <div
                v-for="(feat, i) in features"
                :key="i"
                class="feat-item"
              >
                <div class="feat-icon">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M11.5 3.5L5.25 9.75L2.5 7" stroke="#ff6d00" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                  <div class="feat-body">
                    <span class="feat-text">{{ feat.title }}</span>
                    <p class="feat-desc">{{ feat.desc }}</p>
                  </div>
              </div>
            </div>

            <a :href="`tel:${SITE_PHONE_RAW}`">
            <button class="cta-btn">
              <span>Get Started</span>
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                <path d="M3 8h10m0 0L9.5 4M13 8L9.5 11" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </a>
            

            <p class="cta-note">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 1L7.5 4.5L11 5L8.5 7.5L9 11L6 9.5L3 11L3.5 7.5L1 5L4.5 4.5L6 1Z" fill="rgba(26,35,126,0.2)"/>
              </svg>
              Free consultation included
            </p>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, computed, onMounted, nextTick, onBeforeUnmount } from 'vue'

const activeTab = ref('overview')
const tabRefs = ref([])
const pillTabs = ref(null)
const sliderLeft = ref(0)
const sliderWidth = ref(0)

const features = [
  {
    title: 'Attorney Assignment',
    desc: 'Have an attorney assigned to your application.'
  },
  {
    title: 'Draft Response',
    desc: 'Have the assigned attorney draft a response.'
  },
  {
    title: 'Review and Sign',
    desc: 'You will sign the response, and then we file it.'
  },
]

const tabs = reactive([
  {
    id: 'overview',
    label: 'Overview',
    title: 'Received an Office Action? Have an attorney draft a response.',
    description:
      'Most trademark applications receive an Office Action. Applications prepared by an attorney receive fewer Office actions. Since they have been dealing with trademark applications for years, they know how to avoid common trademark mistakes and can help you avoid getting Office ActionsYou have limited number of responses to contest an Office Action, so you need to be absolutely sure that the response is accurate and complete9 out of 10 people get it wrong the first time. Why waste time, money and chances when you can sit back and relax, while we draft a winning office action response for you.',
    steps: null
  },
  {
    id: 'Our process',
    label: 'Our process',
    title: 'How it works?.',
    description:'Once a United States federal trademark application is filed, it reaches an examining attorney about three to four months after the initial filing date. From there, the USPTO examining attorney will determine whether or not the application meets all of the requirements necessary for a registration. If it does not, the examining attorney will issue an Office action.',
    steps: [
      {
        title: 'Attorney Assignment',
        desc: 'To resolve the issue, we highly recommend you to let us assign a US licensed attorney to your trademark application.'
      },
      {
        title: 'Draft Response',
        desc: 'Attorney examines and drafts a response to the Office action.'
      },
      {
        title: 'Review & Submission',
        desc: 'You review the response and approve the filing of the Office action.'
      }
    ]
  },
])

const activeTabData = computed(() =>
  tabs.find(t => t.id === activeTab.value) || tabs[0]
)

const sliderStyle = computed(() => ({
  left: `${sliderLeft.value}px`,
  width: `${sliderWidth.value}px`
}))

function switchTab(id, idx) {
  activeTab.value = id
  moveSlider(idx)
}

function moveSlider(idx) {
  const el = tabRefs.value[idx]
  const parent = pillTabs.value
  if (!el || !parent) return
  const pRect = parent.getBoundingClientRect()
  const eRect = el.getBoundingClientRect()
  sliderLeft.value = eRect.left - pRect.left
  sliderWidth.value = eRect.width
}

let ro = null

onMounted(() => {
  const idx = tabs.findIndex(t => t.id === activeTab.value)
  nextTick(() => moveSlider(idx >= 0 ? idx : 0))
  if (window.ResizeObserver && pillTabs.value) {
    ro = new ResizeObserver(() => {
      const i = tabs.findIndex(t => t.id === activeTab.value)
      if (i >= 0) moveSlider(i)
    })
    ro.observe(pillTabs.value)
  }
})

onBeforeUnmount(() => ro?.disconnect())
</script>

<style scoped>
.service-section {
  scroll-margin-block: 0px;
  scroll-behavior: smooth;
}
/* ═══════════════════════════════════
   Design Tokens (Mapped to Global Theme)
   ═══════════════════════════════════ */
.service-section {
  --bg-card: #ffffff;
  --bg-alt: #f0f2ff;
  --surface: #f0f2ff;
  --surface-hover: #e6e9fc;
  --border: #e2e5f1;
  --accent: #ff6d00;
  --accent-light: #ff9e40;
  --accent-glow: rgba(255, 109, 0, 0.15);
  --text-primary: #1a1a2e;
  --text-secondary: #5c6283;
  --text-muted: #8b90a8;
  --shadow-md: 0 4px 16px rgba(26,35,126,0.08);
  --shadow-lg: 0 8px 40px rgba(26,35,126,0.1);

  position: relative;
  padding: 100px 0 96px;
  background: linear-gradient(135deg, #fafbff 0%, #f0f2ff 50%, #fff8f0 100%);
  overflow: hidden;
}

/* ═══════════════════════════════════
   Background Effects
   ═══════════════════════════════════ */
.orb {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(120px);
}
.orb--1 {
  width: 600px;
  height: 600px;
  top: -200px;
  right: -150px;
  background: radial-gradient(circle, rgba(255, 109, 0, 0.10), transparent 65%);
}
.orb--2 {
  width: 500px;
  height: 500px;
  bottom: -180px;
  left: -100px;
  background: radial-gradient(circle, rgba(57, 73, 171, 0.08), transparent 65%);
}
.orb--3 {
  width: 300px;
  height: 300px;
  top: 40%;
  left: 45%;
  background: radial-gradient(circle, rgba(0, 137, 123, 0.06), transparent 70%);
}

.grid-overlay {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(26, 35, 126, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(26, 35, 126, 0.03) 1px, transparent 1px);
  background-size: 72px 72px;
  mask-image: radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 100%);
  -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 100%);
  pointer-events: none;
}

.container {
  position: relative;
  z-index: 1;
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 24px;
}

/* ═══════════════════════════════════
   Section Header
   ═══════════════════════════════════ */
.section-header {
  text-align: center;
  margin-bottom: 64px;
}

.section-tag {
  display: inline-block;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: var(--accent);
  background: var(--accent-glow);
  padding: 6px 16px;
  border-radius: 100px;
  margin-bottom: 20px;
  border: 1px solid rgba(255, 109, 0, 0.2);
}

.section-title {
  font-size: 42px;
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1.15;
  letter-spacing: -.035em;
  margin: 0 0 16px;
}

.title-accent {
  background: linear-gradient(135deg, var(--accent), var(--accent-light));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-sub {
  font-size: 16px;
  line-height: 1.7;
  color: var(--text-secondary);
  max-width: 560px;
  margin: 0 auto;
}

/* ═══════════════════════════════════
   Grid Layout
   ═══════════════════════════════════ */
.layout {
  display: grid;
  grid-template-columns: 1fr 370px;
  gap: 48px;
  align-items: start;
}

@media (max-width: 960px) {
  .layout {
    grid-template-columns: 1fr;
    gap: 36px;
  }
}

@media (max-width: 600px) {
  .service-section { padding: 64px 0 72px; }
  .section-title { font-size: 30px; }
  .section-header { margin-bottom: 44px; }
}

/* ═══════════════════════════════════
   CONTENT PANEL
   ═══════════════════════════════════ */
.content-panel {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: border-color .3s ease, box-shadow .3s ease;
}
.content-panel:hover {
  border-color: rgba(255, 109, 0, 0.3);
  box-shadow: var(--shadow-lg);
}

/* ── Pill Tabs ── */
.pill-tabs {
  position: relative;
  display: inline-flex;
  gap: 2px;
  padding: 5px;
  margin: 24px 24px 0;
  background: var(--bg-alt);
  border-radius: 14px;
  border: 1px solid var(--border);
}

.pill {
  position: relative;
  z-index: 1;
  padding: 10px 22px;
  border: none;
  border-radius: 10px;
  background: transparent;
  font-size: 13.5px;
  font-weight: 500;
  font-family: inherit;
  color: var(--text-muted);
  cursor: pointer;
  white-space: nowrap;
  transition: color .3s ease;
}
.pill:hover { color: var(--text-secondary); }
.pill.active { color: var(--text-primary); font-weight: 600; }

/* Sliding background pill */
.pill-slider {
  position: absolute;
  top: 5px;
  height: calc(100% - 10px);
  background: rgba(255, 109, 0, 0.1);
  border: 1px solid rgba(255, 109, 0, 0.2);
  border-radius: 10px;
  transition: left .35s cubic-bezier(.4,0,.2,1), width .35s cubic-bezier(.4,0,.2,1);
  z-index: 0;
  box-shadow: 0 2px 8px rgba(255, 109, 0, 0.1);
}

/* ── Panel Body ── */
.panel-body {
  padding: 32px 28px 32px;
}

@media (max-width: 600px) {
  .pill-tabs { margin: 16px 16px 0; }
  .panel-body { padding: 24px 20px 28px; }
}

.panel-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.35;
  letter-spacing: -.02em;
  margin: 0 0 16px;
}
@media (max-width: 600px) {
  .panel-title { font-size: 20px; }
}

.panel-desc {
  font-size: 14.5px;
  line-height: 1.75;
  color: var(--text-secondary);
  margin: 0;
  max-width: 620px;
}

/* ── Vertical Timeline ── */
.timeline {
  margin-top: 32px;
  display: flex;
  flex-direction: column;
}

.tl-step {
  display: flex;
  gap: 18px;
  min-height: 80px;
}

.tl-rail {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 38px;
  flex-shrink: 0;
}

.tl-node {
  width: 38px;
  height: 38px;
  border-radius: 12px;
  background: var(--accent-glow);
  border: 1px solid rgba(255, 109, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background .3s, border-color .3s;
}
.tl-step:hover .tl-node {
  background: rgba(255, 109, 0, 0.2);
  border-color: rgba(255, 109, 0, 0.4);
}

.tl-num {
  font-size: 13px;
  font-weight: 700;
  color: var(--accent);
}

.tl-line {
  width: 1.5px;
  flex: 1;
  min-height: 28px;
  background: linear-gradient(to bottom, rgba(255, 109, 0, 0.25), transparent);
  margin-top: 8px;
}

.tl-content {
  padding-top: 6px;
  padding-bottom: 12px;
}
.tl-heading {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 6px;
}
.tl-text {
  font-size: 13.5px;
  line-height: 1.7;
  color: var(--text-secondary);
  margin: 0;
  max-width: 500px;
}

/* ── Trust Bar ── */
.trust-bar {
  display: flex;
  align-items: center;
  gap: 0;
  padding: 18px 28px;
  border-top: 1px solid var(--border);
  background: var(--bg-alt);
}

.trust-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12.5px;
  font-weight: 500;
  color: var(--text-secondary);
  white-space: nowrap;
  flex: 1;
}

.trust-icon {
  flex-shrink: 0;
}

.trust-divider {
  width: 1px;
  height: 20px;
  background: var(--border);
  flex-shrink: 0;
}

@media (max-width: 600px) {
  .trust-bar { flex-direction: column; gap: 12px; padding: 18px 20px; }
  .trust-divider { width: 40px; height: 1px; }
}

/* ═══════════════════════════════════
   PRICING CARD
   ═══════════════════════════════════ */
.pricing-card {
  position: sticky;
  top: 40px;
  border-radius: 20px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: border-color .4s ease, transform .4s ease, box-shadow .4s ease;
}
.pricing-card:hover {
  border-color: rgba(255, 109, 0, 0.3);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

/* Corner accents */
.card-corner {
  position: absolute;
  width: 48px;
  height: 48px;
  pointer-events: none;
}
.card-corner--tl {
  top: 0;
  left: 0;
  border-top: 2px solid var(--accent);
  border-left: 2px solid var(--accent);
  border-radius: 20px 0 0 0;
  opacity: .4;
}
.card-corner--br {
  bottom: 0;
  right: 0;
  border-bottom: 2px solid var(--accent);
  border-right: 2px solid var(--accent);
  border-radius: 0 0 20px 0;
  opacity: .4;
}

/* Internal glow */
.card-glow {
  position: absolute;
  top: -60px;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 120px;
  background: radial-gradient(ellipse, rgba(255, 109, 0, 0.12), transparent 70%);
  pointer-events: none;
}

.card-body {
  position: relative;
  padding: 32px 28px 28px;
  display: flex;
  flex-direction: column;
}

/* Badge */
.card-top {
  margin-bottom: 24px;
}
.card-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: var(--accent);
  background: var(--accent-glow);
  border: 1px solid rgba(255, 109, 0, 0.2);
  padding: 6px 14px;
  border-radius: 100px;
}

.badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  animation: pulse-dot 2s ease-in-out infinite;
}
@keyframes pulse-dot {
  0%, 100% { opacity: 1; }
  50% { opacity: .35; }
}

/* Price */
.price-block {
  margin-bottom: 24px;
}
.price-row {
  display: flex;
  align-items: flex-start;
  gap: 2px;
  margin-bottom: 6px;
}
.price-dollar {
  font-size: 26px;
  font-weight: 500;
  color: var(--text-muted);
  line-height: 1;
  margin-top: 10px;
}
.price-num {
  font-size: 58px;
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1;
  letter-spacing: -.04em;
}
.price-note {
  font-size: 13px;
  color: var(--text-muted);
  margin: 0;
}

/* Diamond divider */
.price-divider {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}
.divider-line {
  flex: 1;
  height: 1px;
  background: var(--border);
}
.divider-diamond {
  width: 6px;
  height: 6px;
  background: var(--accent);
  transform: rotate(45deg);
  opacity: .5;
  flex-shrink: 0;
}

/* ── Feature list ── */
.feat-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 0 0 28px;
}

.feat-item {
  display: flex;
  align-items: flex-start;
  gap: 9px;
  padding: 10px 14px;
  border-radius: 10px;
  transition: background .2s ease;
}
.feat-item:hover {
  background: var(--surface-hover);
}

.feat-icon {
 width: 15px;
    height: 15px;
    border-radius: 4px;
    background: var(--accent-glow);
    border: 1px solid rgba(255, 109, 0, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
        margin-top: 5px;
}
.feat-body {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.feat-desc {
  font-size: 12px;
  line-height: 1.5;
  color: var(--text-muted);
  margin: 0;
}
.feat-text {
  font-size: 14px;
  font-weight: 500;
  color:#000317
}

/* CTA */
.cta-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 16px 20px;
  border: none;
  border-radius: 12px;
  background: var(--accent);
  color: #ffffff;
  font-size: 14.5px;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  transition: background .25s, transform .15s, box-shadow .25s;
  box-shadow: 0 4px 16px rgba(255, 109, 0, 0.3);
}
.cta-btn:hover {
  background: #e56200;
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(255, 109, 0, 0.4);
}
.cta-btn:active { transform: translateY(0); }
.cta-btn svg {
  transition: transform .25s ease;
}
.cta-btn:hover svg { transform: translateX(3px); }

.cta-note {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 12px;
  color: var(--text-muted);
  margin: 14px 0 0;
}

/* ═══════════════════════════════════
   Panel Transition
   ═══════════════════════════════════ */
.panel-enter-active,
.panel-leave-active {
  transition: opacity .2s ease, transform .2s ease;
}
.panel-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.panel-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>