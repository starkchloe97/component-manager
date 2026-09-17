<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useToast } from '../../composables/useToastCopy.js'

const { showToast } = useToast()
const progressAnimated = ref(false)

const handleSearch = () => {
  showToast('Starting your trademark search...')
}

const handleSeeHow = () => {
  document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' })
}

const stats = [
  { value: '50000', suffix: '+', label: 'Trademarks Filed' },
  { value: '190', suffix: '+', label: 'Countries Covered' },
  { value: '98', suffix: '%', label: 'Success Rate' },
]

const animatedValues = ref(stats.map(() => '0'))

const animateCounters = () => {
  stats.forEach((stat, index) => {
    const target = parseInt(stat.value)
    const duration = 2000
    const start = performance.now()

    function update(now) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(eased * target)

      animatedValues.value[index] = current.toLocaleString()

      if (progress < 1) requestAnimationFrame(update)
    }

    requestAnimationFrame(update)
  })
}

let statsObserver = null

onMounted(() => {
  setTimeout(() => {
    progressAnimated.value = true
  }, 1000)

  const heroVisual = document.querySelector('.hero-visual')

  if (heroVisual) {
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setTimeout(() => {
          progressAnimated.value = true
        }, 300)

        obs.disconnect()
      }
    }, { threshold: 0.3 })

    obs.observe(heroVisual)
  }

  const heroStats = document.querySelector('.hero-stats')

  if (heroStats) {
    statsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateCounters()
        statsObserver.disconnect()
      }
    }, { threshold: 0.5 })

    statsObserver.observe(heroStats)
  }
})

onUnmounted(() => {
  if (statsObserver) statsObserver.disconnect()
})
</script>

<template>
  <section class="hero v-two">
    <div class="hero-bg">
      <div class="hero-blob-1"></div>
      <div class="hero-blob-2"></div>
      <div class="hero-grid-pattern"></div>
    </div>

    <div class="hero-inner">
      <div class="hero-content">
        <div class="hero-badge">
          <div class="hero-badge-dot"><i class="fas fa-bolt"></i></div>
          Trusted by 50,000+ businesses worldwide
        </div>

        <h1 class="hero-title">
          Protect Your Brand<br>
          With <span class="highlight">Trademark Registration</span>
        </h1>

        <p class="hero-desc">
          Secure your intellectual property across 190+ countries. Fast, affordable, and fully managed trademark registration from start to finish.
        </p>

        <div class="hero-actions">
          <button class="btn-hero-primary" @click="handleSearch">
            <i class="fas fa-search"></i> Search Your Trademark
          </button>

          <button class="btn-hero-secondary" @click="handleSeeHow">
            <i class="fas fa-play-circle"></i> See How It Works
          </button>
        </div>

        <div class="hero-stats">
          <div
            v-for="(stat, index) in stats"
            :key="stat.label"
            class="hero-stat"
          >
            <div class="hero-stat-value">
              {{ animatedValues[index] }}{{ stat.suffix }}
            </div>

            <div class="hero-stat-label">
              {{ stat.label }}
            </div>
          </div>
        </div>
      </div>

      <div class="hero-visual">
        <div class="hero-card-main">
          <div class="hero-card-header">
            <div class="hero-card-status">
              <div class="dot"></div>
              In Progress
            </div>

            <div class="hero-card-id">#TM-2024-78432</div>
          </div>

          <div class="hero-tm-name">TechNova Solutions</div>

          <div class="hero-tm-class">
            Class 9 — Software & Technology
          </div>

          <div class="hero-progress-section">
            <div class="hero-progress-label">
              <span>Registration Progress</span>
              <span style="color: var(--accent); font-weight: 700;">72%</span>
            </div>

            <div class="hero-progress-bar">
              <div
                class="hero-progress-fill"
                :class="{ animated: progressAnimated }"
              ></div>
            </div>
          </div>

          <div class="hero-timeline">
            <div class="hero-timeline-item">
              <div class="hero-timeline-check done">
                <i class="fas fa-check"></i>
              </div>
              Trademark Search & Clearance
            </div>

            <div class="hero-timeline-item">
              <div class="hero-timeline-check done">
                <i class="fas fa-check"></i>
              </div>
              Application Filed
            </div>

            <div class="hero-timeline-item current-item">
              <div class="hero-timeline-check current">
                <i class="fas fa-circle" style="font-size:6px"></i>
              </div>
              Examination Phase
            </div>

            <div class="hero-timeline-item">
              <div class="hero-timeline-check pending">
                <i class="fas fa-circle" style="font-size:6px"></i>
              </div>
              Publication & Registration
            </div>
          </div>
        </div>

        <div class="hero-floating-card card-shield">
          <div class="floating-icon shield">
            <i class="fas fa-shield-alt"></i>
          </div>

          <div>
            <div class="floating-text">Fully Protected</div>
            <div class="floating-subtext">Legal coverage active</div>
          </div>
        </div>

        <div class="hero-floating-card card-globe">
          <div class="floating-icon globe">
            <i class="fas fa-globe-americas"></i>
          </div>

          <div>
            <div class="floating-text">190+ Countries</div>
            <div class="floating-subtext">Global protection</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 120px 24px 80px;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.v-two .hero-blob-1 {
  position: absolute;
  width: 600px;
  height: 600px;
  background: linear-gradient(135deg, rgba(26,35,126,0.07), rgba(57,73,171,0.04));
  top: -100px;
  right: -100px;
  animation: blob 12s ease-in-out infinite;
  filter: blur(40px);
}

.v-two .hero-blob-2 {
  position: absolute;
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, rgba(255,109,0,0.08), rgba(255,158,64,0.04));
  bottom: -50px;
  left: -50px;
  animation: blob 10s ease-in-out infinite reverse;
  filter: blur(40px);
}

.v-two .hero-grid-pattern {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(26,35,126,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(26,35,126,0.03) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse at 60% 40%, black 20%, transparent 70%);
  -webkit-mask-image: radial-gradient(ellipse at 60% 40%, black 20%, transparent 70%);
}

.v-two .hero-inner {
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  position: relative;
  z-index: 1;
}

.v-two .hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px 6px 8px;
  background: rgba(26,35,126,0.06);
  border: 1px solid rgba(26,35,126,0.1);
  border-radius: 100px;
  font-size: 13px;
  font-weight: 600;
  color: var(--primary);
  margin-bottom: 24px;
  animation: fadeInUp 0.8s 0.3s ease both;
}

.v-two .hero-badge-dot {
  width: 22px;
  height: 22px;
  background: linear-gradient(135deg, var(--accent), var(--accent-light));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 10px;
}

.v-two .hero-title {
  font-size: clamp(36px, 5vw, 58px);
  font-weight: 700;
  line-height: 1.08;
  letter-spacing: -2px;
  color: var(--text);
  margin-bottom: 20px;
  animation: fadeInUp 0.8s 0.4s ease both;
}

.v-two .hero-title .highlight {
  background: linear-gradient(135deg, var(--primary), var(--accent));
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradient-shift 4s ease infinite;
}

.v-two .hero-desc {
  font-size: 17px;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 32px;
  max-width: 500px;
  animation: fadeInUp 0.8s 0.5s ease both;
}

.v-two .hero-actions {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  margin-bottom: 40px;
  animation: fadeInUp 0.8s 0.6s ease both;
}

.v-two .btn-hero-primary {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 15px 32px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(135deg, var(--accent), #ff8f00);
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.3s ease;
  box-shadow: 0 4px 24px rgba(255, 109, 0, 0.3);
  position: relative;
  overflow: hidden;
}

.v-two .btn-hero-primary::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  animation: shimmer 3s infinite;
}

.v-two .btn-hero-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(255, 109, 0, 0.4);
}

.v-two .btn-hero-secondary {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 15px 28px;
  border-radius: 12px;
  border: 1.5px solid var(--border);
  background: rgba(255,255,255,0.8);
  backdrop-filter: blur(10px);
  color: var(--text);
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.3s ease;
}

.v-two .btn-hero-secondary:hover {
  border-color: var(--primary);
  color: var(--primary);
  background: rgba(26,35,126,0.03);
}

.v-two .hero-stats {
  display: flex;
  gap: 32px;
  animation: fadeInUp 0.8s 0.7s ease both;
}

.v-two .hero-stat {
  display: flex;
  flex-direction: column;
}

.v-two .hero-stat-value {
  font-size: 28px;
  font-weight: 800;
  color: var(--primary);
  letter-spacing: -1px;
}

.v-two .hero-stat-label {
  font-size: 12px;
  color: var(--text-muted);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 2px;
}

.v-two .hero-visual {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: scaleIn 1s 0.5s ease both;
}

.v-two .hero-card-main {
  width: 100%;
  max-width: 480px;
  background: var(--bg-card);
  border-radius: var(--radius-xl);
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-xl);
  padding: 32px;
  position: relative;
  z-index: 2;
}

.v-two .hero-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.v-two .hero-card-status {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  background: rgba(0, 137, 123, 0.08);
  border-radius: 100px;
  font-size: 12px;
  font-weight: 600;
  color: var(--teal);
}

.v-two .hero-card-status .dot {
  width: 7px;
  height: 7px;
  background: var(--teal);
  border-radius: 50%;
  position: relative;
}

.v-two .hero-card-status .dot::after {
  content: '';
  position: absolute;
  inset: -3px;
  border-radius: 50%;
  border: 2px solid var(--teal);
  animation: pulse-ring 2s infinite;
}

.v-two .hero-card-id {
  font-size: 13px;
  color: var(--text-muted);
  font-weight: 500;
}

.v-two .hero-tm-name {
  font-size: 22px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 4px;
}

.v-two .hero-tm-class {
  font-size: 13px;
  color: var(--text-muted);
  margin-bottom: 20px;
}

.v-two .hero-progress-section {
  margin-bottom: 24px;
}

.v-two .hero-progress-label {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 8px;
}

.v-two .hero-progress-bar {
  height: 8px;
  background: var(--bg-alt);
  border-radius: 100px;
  overflow: hidden;
}

.v-two .hero-progress-fill {
  height: 100%;
  width: 0%;
  background: linear-gradient(135deg, var(--accent), var(--accent-light));
  border-radius: 100px;
  transition: width 2s cubic-bezier(0.22, 1, 0.36, 1);
}

.v-two .hero-progress-fill.animated {
  width: 72%;
}

.v-two .hero-timeline {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.v-two .hero-timeline-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
  color: var(--text-secondary);
}

.v-two .hero-timeline-check {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  flex-shrink: 0;
}

.v-two .hero-timeline-check.done {
  background: rgba(0,137,123,0.1);
  color: var(--teal);
}

.v-two .hero-timeline-check.current {
  background: var(--accent-glow);
  color: var(--accent);
  position: relative;
}

.v-two .hero-timeline-check.current::after {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: 50%;
  border: 2px solid var(--accent);
  animation: pulse-ring 2s infinite;
}

.v-two .hero-timeline-check.pending {
  background: var(--bg-alt);
  color: var(--text-muted);
}

.v-two .hero-timeline-item.current-item {
  font-weight: 600;
  color: var(--text);
}

.v-two .hero-floating-card {
  position: absolute;
  background: var(--bg-card);
  border-radius: var(--radius);
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-lg);
  padding: 14px 18px;
  z-index: 3;
  animation: float 6s ease-in-out infinite;
}

.v-two .hero-floating-card.card-shield {
  top: -10px;
  right: -20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.v-two .hero-floating-card.card-globe {
  bottom: 20px;
  left: -30px;
  display: flex;
  align-items: center;
  gap: 10px;
  animation: floatReverse 5s ease-in-out infinite;
}

.v-two .floating-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}

.v-two .floating-icon.shield {
  background: rgba(0,137,123,0.1);
  color: var(--teal);
}

.v-two .floating-icon.globe {
  background: rgba(26,35,126,0.08);
  color: var(--primary);
}

.v-two .floating-text {
  font-size: 12px;
  font-weight: 600;
  color: var(--text);
}

.v-two .floating-subtext {
  font-size: 10px;
  color: var(--text-muted);
}

@media (max-width: 1024px) {
  .v-two .hero-inner {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .v-two .hero-visual {
    max-width: 480px;
    margin: 0 auto;
  }
}

@media (max-width: 768px) {
  .v-two .hero {
    padding: 100px 16px 60px;
    min-height: auto;
  }

  .v-two .hero-stats {
    gap: 20px;
  }

  .v-two .hero-stat-value {
    font-size: 22px;
  }

  .v-two .hero-floating-card {
    display: none;
  }
}

@media (max-width: 480px) {
  .v-two .hero-actions {
    flex-direction: column;
  }

  .v-two .hero-stats {
    flex-direction: column;
    gap: 12px;
  }
}

/* V-TWO */

.v-two *,
.v-two *::before,
.v-two *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.v-two {
  --primary: #1a237e;
  --accent: #ff6d00;
  --accent-light: #ff9e40;
  --accent-glow: rgba(255, 109, 0, 0.15);
  --teal: #00897b;
  --bg-card: #ffffff;
  --bg-alt: #f0f2ff;
  --text: #1a1a2e;
  --text-secondary: #5c6283;
  --text-muted: #8b90a8;
  --border: #e2e5f1;
  --border-light: #eef0f8;
  --shadow-lg: 0 8px 40px rgba(26,35,126,0.1);
  --shadow-xl: 0 16px 60px rgba(26,35,126,0.12);
  --radius: 12px;
  --radius-xl: 28px;
}

.v-two h1,
.v-two h2,
.v-two h3,
.v-two h4,
.v-two h5,
.v-two h6,
.v-two p,
.v-two span,
.v-two div,
.v-two button,
.v-two input,
.v-two label,
.v-two a,
.v-two li,
.v-two ul,
.v-two ol {
  font-family: 'Inter', sans-serif;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }

  100% {
    background-position: 200% 0;
  }
}

@keyframes blob {
  0%, 100% {
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  }

  25% {
    border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
  }

  50% {
    border-radius: 50% 60% 30% 60% / 30% 60% 70% 40%;
  }

  75% {
    border-radius: 60% 40% 60% 30% / 60% 40% 30% 70%;
  }
}
</style>