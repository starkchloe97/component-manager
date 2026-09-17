<template>
  <section class="hero v-one">
    <div class="hero-grid-bg"></div>
    <div class="perspective-grid-wrap">
      <div class="perspective-grid"></div>
    </div>
    <div class="orb orb-1 float"></div>
    <div class="orb orb-2 float-delay"></div>

    <div class="container hero-content">
      <div class="hero-inner">
        <div class="reveal-up">
          <span class="badge">
            <span
              class="iconify"
              data-icon="lucide:shield-check"
              data-width="12"
            ></span>
            Trusted by 50,000+ Businesses
          </span>
        </div>
        <h1 class="reveal-up delay-1 hero-title">
          Trademark<br />
          <span class="text-gradient">Registration</span><br />
          Made Simple
        </h1>
        <p class="reveal-up delay-2 hero-subtitle">
          Protect your brand name, logo, and slogan with federal trademark
          registration. We handle the entire process—from search to filing to
          approval.
        </p>
        <div class="reveal-up delay-3 hero-buttons">
          <a href="#pricing" class="btn-primary">
            Start Your Application
            <span
              class="iconify"
              data-icon="lucide:arrow-right"
              data-width="14"
            ></span>
          </a>
          <a href="#process" class="btn-outline"> See How It Works </a>
        </div>

        <div class="reveal-up delay-4 stats">
          <div class="stat">
            <div class="stat-num">50K+</div>
            <div class="stat-label">Trademarks Filed</div>
          </div>
          <div class="stat">
            <div class="stat-num">99.7%</div>
            <div class="stat-label">Approval Rate</div>
          </div>
          <div class="stat">
            <div class="stat-num">4.9★</div>
            <div class="stat-label">Customer Rating</div>
          </div>
          <div class="stat">
              <div class="stat-num">All 50</div>
              <div class="stat-label">States Covered</div>
            </div>
        </div>
    </div>
    <div class="child-2">
        <img class="main_hero" :src="CorpGirl" alt="" />
    </div>
    <SwiperBrandIcons />
</div>
</section>
</template>

<script setup>
import CorpGirl from "../../assets/hero_girl.png";
import SwiperBrandIcons from '../../components/SwiperBrandIcons.vue'
</script>

<style scoped>

@import url("https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap");

.main_hero {
  width: 65%;
}
.v-one .text-gradient {
    background: linear-gradient(135deg, #0b55b6, #1a6fd4, #083d82);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
} 

.hero {
  position: relative;
  min-height: 90vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: var(--surface);
}
.v-one .hero-grid-bg {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(to right, rgba(11, 85, 182, 0.06) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(11, 85, 182, 0.06) 1px, transparent 1px);
  background-size: 48px 48px;
}
.v-one .perspective-grid-wrap {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 400px;
  overflow: hidden;
  pointer-events: none;
}
.v-one .perspective-grid {
  width: 100%;
  height: 100%;
  transform: perspective(800px) rotateX(55deg) scale(1.5);
  transform-origin: center center;
  mask-image: radial-gradient(ellipse at center, black 20%, transparent 70%);
  -webkit-mask-image: radial-gradient(
    ellipse at center,
    black 20%,
    transparent 70%
  );
  background-image:
    linear-gradient(to right, rgba(11, 85, 182, 0.12) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(11, 85, 182, 0.12) 1px, transparent 1px);
  background-size: 48px 48px;
}
.v-one .orb {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}
.v-one .orb-1 {
  top: 96px;
  right: 80px;
  width: 320px;
  height: 320px;
  background: radial-gradient(circle, #0b55b6 0%, transparent 70%);
  filter: blur(80px);
  opacity: 0.15;
}
.v-one .orb-2 {
  bottom: 128px;
  left: 40px;
  width: 256px;
  height: 256px;
  background: radial-gradient(circle, #1a6fd4 0%, transparent 70%);
  filter: blur(80px);
  opacity: 0.1;
}
.v-one .container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
  width: 100%;
}
.v-one .hero-content {
  display: grid;
  grid-template-columns: 1.5fr 1fr;

  padding: 128px 0 0px 0;
}
.v-one .hero-inner {
  max-width: 896px;
}
.v-one .badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #0b55b6;
  background: #e8f0fb;
  padding: 8px 16px;
  border-radius: 9999px;
  margin-bottom: 32px;
}
.v-one .hero-title {
  font-family: "Inter Tight", sans-serif;
  font-weight: 600;
  font-size: 48px;
  line-height: 0.9;
  letter-spacing: -0.04em;
  margin-bottom: 32px;
}
@media (min-width: 768px) {
  .v-one .hero-title {
    font-size: 72px;
  }
}
@media (min-width: 1024px) {
  .v-one .hero-title {
    font-size: 78px;
  }
}
.v-one .hero-subtitle {
  font-size: 18px;
  font-weight: 300;
  line-height: 1.6;
  color:#5a6d85;
  max-width: 576px;
  margin-bottom: 48px;
}
@media (min-width: 768px) {
  .v-one .hero-subtitle {
    font-size: 20px;
  }
}
.v-one .hero-buttons {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
}
.v-one .stats {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  margin-top: 80px;
  padding-top: 40px;
  border-top: 1px solid var(--border);
  display: none;
}
.v-one .stat-num {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 32px;
  letter-spacing: -0.04em;
  color: var(--brand);
}
@media (min-width: 768px) {
  .v-one .stat-num {
    font-size: 40px;
  }
}

/* V-ONE */


.v-one {
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
}

.v-one * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Shared animations */
@keyframes revealUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
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

@keyframes pulse-ring {
  0% {
    transform: scale(1);
    opacity: 0.4;
  }
  100% {
    transform: scale(1.8);
    opacity: 0;
  }
}

/* Reveal-up (hero) */
.v-one .reveal-up {
  opacity: 0;
  animation: revealUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
.v-one .delay-1 {
  animation-delay: 0.1s;
}
.v-one .delay-2 {
  animation-delay: 0.2s;
}
.v-one .delay-3 {
  animation-delay: 0.3s;
}
.v-one .delay-4 {
  animation-delay: 0.4s;
}

/* Float utilities */
.v-one .float {
  animation: float 6s ease-in-out infinite;
}
.v-one .float-delay {
  animation: floatDelay 6s ease-in-out 2s infinite;
}

/* Perspective grid */
.v-one .perspective-grid {
  transform: perspective(800px) rotateX(55deg) scale(1.5);
  transform-origin: center center;
  mask-image: radial-gradient(ellipse at center, black 20%, transparent 70%);
  -webkit-mask-image: radial-gradient(
    ellipse at center,
    black 20%,
    transparent 70%
  );
}

/* Buttons */
.v-one .btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--brand);
  color: #fff;
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 14px 32px;
  border-radius: 9999px;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition:
    transform 300ms ease,
    box-shadow 300ms ease;
}
.v-one .btn-primary:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 32px -8px rgba(11, 85, 182, 0.45);
}
.v-one .btn-primary:active {
  transform: scale(0.97);
}

.v-one .btn-outline {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 2px solid rgba(15, 29, 51, 0.15);
  color: var(--ink);
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  padding: 14px 32px;
  border-radius: 9999px;
  text-decoration: none;
  background: transparent;
  cursor: pointer;
  transition: all 300ms ease;
}
.v-one .btn-outline:hover {
  background-color: var(--brand);
  color: #fff;
  border-color: var(--brand);
}

/* Iconify inline fix */
.v-one .iconify {
  display: inline-block;
  vertical-align: middle;
}

</style>
