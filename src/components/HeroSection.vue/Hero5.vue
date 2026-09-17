<script setup>
import {
  ArrowRight,
  PlayCircle,
  CheckCircle2,
  FileBadge,
  Shield
} from '@lucide/vue'
</script>

<template>
  <section class="hero v-five">
    <div class="hero-grid-bg"></div>
    <div class="glow-orange glow-1"></div>
    <div class="glow-blue glow-2"></div>
    <div class="dot dot-1 float-anim"></div>
    <div class="dot dot-2 float-anim-delay"></div>
    <div class="dot dot-3 float-anim"></div>

    <div class="container">
      <div class="hero-grid">
        <div class="hero-content fade-up">
          <div class="badge">
            <span class="pulse-dot"></span>
            <span class="badge-text">Trusted by 50,000+ businesses</span>
          </div>

          <h1 class="hero-title">
            Protect Your Brand
            <span class="gradient-text">With Trademark Registration</span>
          </h1>

          <p class="hero-desc">
            Secure exclusive legal rights to your brand name, logo, and slogan.
            Fast, affordable, and handled by experienced trademark attorneys.
          </p>

          <div class="hero-actions">
            <a href="#cta" class="btn-main">
              File Your Trademark
              <ArrowRight class="btn-icon" />
            </a>

            <a href="#process" class="btn-secondary">
              <PlayCircle class="btn-icon-lg" />
              See How It Works
            </a>
          </div>

          <div class="hero-stats">
            <div class="stat">
              <div class="stat-value">98.7%</div>
              <div class="stat-label">Success Rate</div>
            </div>

            <div class="stat-divider"></div>

            <div class="stat">
              <div class="stat-value">3–5 Day</div>
              <div class="stat-label">Filing Speed</div>
            </div>

            <div class="stat-divider"></div>

            <div class="stat">
              <div class="stat-value">180+</div>
              <div class="stat-label">Countries</div>
            </div>
          </div>
        </div>

        <div class="hero-visual fade-up desktop-only">
          <div class="visual-wrapper">
            <div class="floating-card card-top float_card_one">
              <div class="fc-inner">
                <div class="fc-icon green">
                  <CheckCircle2 class="fc-svg" />
                </div>

                <div>
                  <div class="fc-title">Application Filed</div>
                  <div class="fc-sub">Just now</div>
                </div>
              </div>
            </div>

            <div class="main-card">
              <div class="mc-header">
                <div class="mc-icon">
                  <FileBadge class="mc-svg" />
                </div>

                <div>
                  <div class="mc-title">Trademark Application</div>
                  <div class="mc-sub">USPTO Filing</div>
                </div>
              </div>

              <div class="mc-rows">
                <div class="mc-row">
                  <span class="mc-label">Status</span>

                  <span class="mc-status">
                    <span class="status-dot"></span>
                    Under Review
                  </span>
                </div>

                <div class="mc-row">
                  <span class="mc-label">Filing Number</span>
                  <span class="mc-mono">TM-2024-847291</span>
                </div>

                <div class="mc-row">
                  <span class="mc-label">Class</span>
                  <span class="mc-value">25 — Apparel</span>
                </div>

                <div class="mc-row">
                  <span class="mc-label">Attorney</span>
                  <span class="mc-value">Assigned ✓</span>
                </div>
              </div>

              <div class="mc-progress">
                <div class="progress-header">
                  <span class="ph-label">Progress</span>
                  <span class="ph-value">Step 2 of 5</span>
                </div>

                <div class="progress-bar">
                  <div class="progress-fill" style="width: 40%"></div>
                </div>
              </div>
            </div>

            <div class="floating-card card-bottom float_card_two">
              <div class="fc-inner">
                <div class="fc-icon orange">
                  <Shield class="fc-svg" />
                </div>

                <div>
                  <div class="fc-title">® Protected</div>
                  <div class="fc-sub">Legal Coverage Active</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bottom-gradient"></div>
  </section>
</template>

<style scoped>
/* ─── V-FIVE HERO ─── */

.hero.v-five {
  --brand-400: #fb923c;
  --brand-500: #f97316;
  --brand-600: #ea580c;

  --navy-950: #020617;

  --neutral-400: #a3a3a3;
  --neutral-500: #737373;

  --green-400: #4ade80;
  --blue-400: #60a5fa;
  --amber-400: #fbbf24;

  position: relative;
  overflow: hidden;
  margin: 0;
  font-family: "Inter", sans-serif;
  background-color: var(--navy-950);
  color: #fff;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* ─── BACKGROUND ─── */

.hero-grid-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.35;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.04) 1px,
      transparent 1px),
    linear-gradient(90deg,
      rgba(255, 255, 255, 0.04) 1px,
      transparent 1px);
  background-size: 60px 60px;
}

.glow-orange,
.glow-blue {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(80px);
}

.glow-orange {
  width: 500px;
  height: 500px;
  opacity: 0.18;
}

.glow-blue {
  width: 450px;
  height: 450px;
  opacity: 0.15;
}

.glow-1 {
  top: -250px;
  right: -150px;
  background: radial-gradient(circle,
      rgba(249, 115, 22, 0.8) 0%,
      transparent 70%);
}

.glow-2 {
  bottom: -250px;
  left: -150px;
  background: radial-gradient(circle,
      rgba(96, 165, 250, 0.7) 0%,
      transparent 70%);
}

.dot {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  pointer-events: none;
}

.dot-1 {
  top: 20%;
  left: 8%;
}

.dot-2 {
  top: 65%;
  left: 45%;
}

.dot-3 {
  top: 30%;
  right: 12%;
}

/* ─── CONTAINER ─── */

.container {
  position: relative;
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  padding: 128px 24px 80px;
}

/* ─── HERO GRID ─── */

.hero-grid {
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  gap: 60px;
  min-height: 760px;
  padding: 100px 0;
}

/* ─── HERO CONTENT ─── */

.hero-content {
  max-width: 650px;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 24px;
  padding: 8px 14px;
  border: 1px solid rgba(249, 115, 22, 0.25);
  border-radius: 999px;
  background: rgba(249, 115, 22, 0.08);
}

.pulse-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--brand-500);
  animation: pulse 2s ease-in-out infinite;
}

.badge-text {
  color: #fed7aa;
  font-size: 13px;
  font-weight: 600;
}

.hero-title {
  margin: 0;
  color: #fff;
  font-size: 64px;
  line-height: 1.05;
  font-weight: 800;
  letter-spacing: -2px;
}

.gradient-text {
  display: block;
  background: linear-gradient(135deg,
      #fff 0%,
      var(--brand-400) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-desc {
  max-width: 600px;
  margin: 28px 0 0;
  color: rgba(255, 255, 255, 0.65);
  font-size: 18px;
  line-height: 1.7;
}

/* ─── ACTIONS ─── */

.hero-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 34px;
}

.btn-main,
.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-decoration: none;
  font-weight: 700;
  transition: all 0.25s ease;
}

.btn-main {
  padding: 15px 22px;
  border: 1px solid var(--brand-500);
  border-radius: 10px;
  background: var(--brand-500);
  color: #fff;
  box-shadow: 0 10px 30px rgba(249, 115, 22, 0.2);
}

.btn-main:hover {
  background: var(--brand-600);
  transform: translateY(-2px);
}

.btn-secondary {
  padding: 14px 18px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.04);
  color: #fff;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.08);
}

.btn-icon {
  width: 18px;
  height: 18px;
}

.btn-icon-lg {
  width: 20px;
  height: 20px;
}

/* ─── STATS ─── */

.hero-stats {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-top: 48px;
}

.stat-value {
  color: #fff;
  font-size: 22px;
  font-weight: 800;
}

.stat-label {
  margin-top: 4px;
  color: var(--neutral-400);
  font-size: 12px;
}

.stat-divider {
  width: 1px;
  height: 38px;
  background: rgba(255, 255, 255, 0.12);
}

/* ─── HERO VISUAL ─── */

.desktop-only {
  display: none;
}

.visual-wrapper {
  position: relative;
  width: 100%;
  max-width: 520px;
  margin: 0 auto;
}

.main-card {
  position: relative;
  z-index: 2;
  padding: 28px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 20px;
  background: rgba(15, 23, 42, 0.85);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(16px);
}

.mc-header {
  display: flex;
  align-items: center;
  gap: 14px;
  padding-bottom: 22px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.mc-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  border-radius: 12px;
  background: rgba(249, 115, 22, 0.12);
  color: var(--brand-400);
}

.mc-svg {
  width: 24px;
  height: 24px;
}

.mc-title {
  color: #fff;
  font-size: 15px;
  font-weight: 700;
}

.mc-sub {
  margin-top: 4px;
  color: var(--neutral-500);
  font-size: 12px;
}

.mc-rows {
  padding: 20px 0;
}

.mc-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 12px 0;
}

.mc-label {
  color: var(--neutral-400);
  font-size: 13px;
}

.mc-value,
.mc-mono {
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  text-align: right;
}

.mc-mono {
  font-family: monospace;
}

.mc-status {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: #86efac;
  font-size: 13px;
  font-weight: 600;
}

.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--green-400);
}

.mc-progress {
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.progress-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.ph-label {
  color: var(--neutral-400);
  font-size: 12px;
}

.ph-value {
  color: var(--blue-400);
  font-size: 12px;
  font-weight: 600;
}

.progress-bar {
  width: 100%;
  height: 7px;
  overflow: hidden;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
}

.progress-fill {
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg,
      var(--brand-500),
      var(--amber-400));
}

/* ─── FLOATING CARDS ─── */

.floating-card {
  position: absolute;
  z-index: 3;
  padding: 14px 16px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 14px;
  background: rgba(15, 23, 42, 0.9);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(14px);
}

.card-top {
  top: -30px;
  left: -45px;
}

.card-bottom {
  right: -40px;
  bottom: -30px;
}

.fc-inner {
  display: flex;
  align-items: center;
  gap: 12px;
}

.fc-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 10px;
}

.fc-icon.green {
  background: rgba(74, 222, 128, 0.1);
  color: var(--green-400);
}

.fc-icon.orange {
  background: rgba(249, 115, 22, 0.1);
  color: var(--brand-400);
}

.fc-svg {
  width: 19px;
  height: 19px;
}

.fc-title {
  color: #fff;
  font-size: 12px;
  font-weight: 700;
}

.fc-sub {
  margin-top: 3px;
  color: var(--neutral-500);
  font-size: 10px;
}

/* ─── BOTTOM GRADIENT ─── */

.bottom-gradient {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 120px;
  pointer-events: none;
  background: linear-gradient(to top,
      rgba(2, 6, 23, 0.9),
      transparent);
}

/* ─── ANIMATIONS ─── */

@keyframes pulse {

  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }

  50% {
    opacity: 0.5;
    transform: scale(1.25);
  }
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-12px);
  }
}

.float-anim {
  animation: float 6s ease-in-out infinite;
}

.float-anim-delay {
  animation: float 6s ease-in-out 2s infinite;
}

.float_card_one {
  animation: float 5s ease-in-out infinite;
}

.float_card_two {
  animation: float 5s ease-in-out 2s infinite;
}

/* ─── RESPONSIVE ─── */

@media (min-width: 768px) {
  .container {
    padding: 0 40px;
  }

  .hero-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 65px;
  }

  .desktop-only {
    display: block;
  }
}

@media (max-width: 767px) {
  .hero-grid {
    min-height: auto;
    padding: 80px 0;
  }

  .hero-title {
    font-size: 44px;
    letter-spacing: -1.5px;
  }

  .hero-desc {
    font-size: 16px;
  }

  .hero-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .hero-stats {
    gap: 16px;
  }

  .stat-value {
    font-size: 18px;
  }

  .floating-card {
    display: none;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 18px;
  }

  .hero-title {
    font-size: 38px;
  }

  .hero-stats {
    gap: 12px;
  }

  .stat-divider {
    height: 32px;
  }
}
</style>