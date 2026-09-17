<script setup>
import { ShieldCheck } from '@lucide/vue'
import maincc from "@/assets/main.webp"
import { SITE_NAME } from "@/config/siteInfo.js";
</script>

<template>
  <header class="hero-section">
    <div class="container hero-grid">
      <div class="hero-content">

        <h1 class="hero-headline">
          About <span class="text-gradient">
            {{ SITE_NAME }}
          </span>
        </h1>

        <p class="hero-sub">
          {{ SITE_NAME }} was started by experienced attorneys and
          high-tech experts to bring trademark services to individuals and
          business owners. We provide efficient and economical approaches to
          protect customers brands, businesses, and ideas worldwide.
        </p>

        <p class="hero-sub">
          {{ SITE_NAME }} has deep knowledge of business processes and
          branding that allows us to deliver effective, affordable
          solutions tailored to your company's unique needs. Our attorneys
          have helped thousands clients including first-time
          entrepreneurs, small businesses, and sophisticated corporations.
        </p>
      </div>

      <div class="hero-visual">
        <div class="hero-img-wrap">
          <img
            :src="maincc"
            alt="Professional entrepreneur"
            class="hero-img"
          />

          <div class="glass hero-badge">
            <div class="badge-inner">
              <div class="badge-icon-wrap">
                <ShieldCheck :size="18" />
              </div>
              <span class="badge-pct">100%</span>
            </div>

            <p class="badge-desc">Success Rate in Compliance</p>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.hero-section {
  position: relative;
  min-height: auto;
  display: flex;
  align-items: center;
  padding-top: 20px;
  overflow: hidden;
}

.hero-grid {
  display: grid;
  grid-template-columns: 7fr 5fr;
  gap: 40px;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.hero-content {
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
  gap: 10px;
}

.hero-headline {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 500;
  letter-spacing: -0.03em;
  line-height: 1;
}

.hero-sub {
  font-size: clamp(0.875rem, 1.5vw, 1rem);
  color: rgba(68, 71, 79, 0.8);
  max-width: 540px;
  font-weight: 300;
  line-height: 1.7;
}

/* Hero Visual */
.hero-visual {
  position: relative;
}

.hero-img-wrap {
  position: relative;
  margin-bottom: 40px;
}

.hero-img {
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  border-radius: 2rem;
  box-shadow: 0 40px 80px -20px rgba(0, 0, 0, 0.15);
  transition: transform 0.7s ease;
}

.hero-img-wrap:hover .hero-img {
  transform: scale(1.02);
}

.hero-badge {
  position: absolute;
  bottom: -22px;
  left: -22px;
  padding: 10px 20px;
  border-radius: 1.5rem;
  box-shadow: 0 14px 36px rgba(0, 0, 0, 0.12);
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-8px);
  }
}

.badge-inner {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 5px;
}

.badge-icon-wrap {
  width: 32px;
  height: 32px;
  background: #081fecc1;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.badge-pct {
  font-weight: 700;
  font-size: 1rem;
  line-height: 1;
}

.badge-desc {
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 10px;
  color: #44474f;
}

@media (max-width: 1024px) {
  .hero-grid {
    grid-template-columns: 1fr;
    padding-top: 20px;
  }

  .hero-visual {
    display: none;
  }
}

@media (max-width: 640px) {
  .hero-grid {
    padding: 0;
  }

  .hero-section {
    padding: 0;
  }

  .hero-content {
    gap: 16px;
  }
}
</style>