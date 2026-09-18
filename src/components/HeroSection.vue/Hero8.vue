<template>
  <section class="hero">
    <div class="hero-grid-bg"></div>

    <div class="perspective-grid-wrap">
      <div class="perspective-grid"></div>
    </div>

    <div class="orb orb-1 float"></div>
    <div class="orb orb-2 float-delay"></div>

    <div class="container hero-content">
      <div class="hero-inner">
        <h1 class="reveal-up delay-1 hero-title">
          Grow your brand with a
          <span class="text-gradient">registered trademark.</span>
        </h1>

        <p class="reveal-up delay-2 hero-subtitle">
          Register your name, logo, or slogan in the United States for a low, flat fee. All handled by our expert trademark attorneys.
        </p>

        <div class="reveal-up delay-2 checklist">
          <div class="checklist-item">
            <span
              class="iconify check-icon"
              data-icon="lucide:check-circle"
              data-width="20"
            ></span>
            <span>Simple 3-step process with online form</span>
          </div>

          <div class="checklist-item">
            <span
              class="iconify check-icon"
              data-icon="lucide:check-circle"
              data-width="20"
            ></span>
            <span>Application prepared by a US licensed attorney</span>
          </div>

          <div class="checklist-item">
            <span
              class="iconify check-icon"
              data-icon="lucide:check-circle"
              data-width="20"
            ></span>
            <span>Trademark filed with the US Patent &amp; Trademark Office</span>
          </div>
        </div>

        <div class="reveal-up delay-3 hero-buttons">
          <PopUp
            buttonClass="btn-primary"
            trigger-text="Get Started"
            buttonPostIcon="lucide:arrow-right"
          />

          <a href="#process" class="btn-outline">
            Find out more
          </a>
        </div>

        <p
          class="reveal-up delay-2 footer-title"
          style="margin-top: 1rem;"
        >
          Trademark pricing start at $35 + USPTO fees
          <a href="#pricing">View Packages</a>
        </p>
      </div>

      <div class="child-2">
        <img class="main_hero" :src="header2" alt="" />
      </div>

      <SwiperBrandIcons />
    </div>
  </section>
</template>

<script setup>
import header2 from "@/assets/2.png";
import SwiperBrandIcons from "@/utils/FadeBrandIcons.vue";
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap");

.hero {
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

  position: relative;
  min-height: 90vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: var(--surface);
}

.hero-grid-bg {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(
      to right,
      rgba(11, 85, 182, 0.06) 1px,
      transparent 1px
    ),
    linear-gradient(
      to bottom,
      rgba(11, 85, 182, 0.06) 1px,
      transparent 1px
    );
  background-size: 48px 48px;
}

.perspective-grid-wrap {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 400px;
  overflow: hidden;
  pointer-events: none;
}

.perspective-grid {
  width: 100%;
  height: 100%;
  transform: perspective(800px) rotateX(55deg) scale(1.5);
  transform-origin: center center;
  mask-image: radial-gradient(
    ellipse at center,
    black 20%,
    transparent 70%
  );
  -webkit-mask-image: radial-gradient(
    ellipse at center,
    black 20%,
    transparent 70%
  );
  background-image:
    linear-gradient(
      to right,
      rgba(11, 85, 182, 0.12) 1px,
      transparent 1px
    ),
    linear-gradient(
      to bottom,
      rgba(11, 85, 182, 0.12) 1px,
      transparent 1px
    );
  background-size: 48px 48px;
}

.orb {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}

.orb-1 {
  top: 96px;
  right: 80px;
  width: 320px;
  height: 320px;
  background: radial-gradient(
    circle,
    #0b55b6 0%,
    transparent 70%
  );
  filter: blur(80px);
  opacity: 0.15;
}

.orb-2 {
  bottom: 128px;
  left: 40px;
  width: 256px;
  height: 256px;
  background: radial-gradient(
    circle,
    #1a6fd4 0%,
    transparent 70%
  );
  filter: blur(80px);
  opacity: 0.1;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
  width: 100%;
}

.hero-content {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  padding: 128px 0 0;
}

.hero-inner {
  max-width: 896px;
}

.hero-title {
  font-family: "Inter Tight", sans-serif;
  font-weight: 600;
  font-size: 48px;
  line-height: 0.9;
  letter-spacing: -0.04em;
  margin-bottom: 32px;
}

.hero-subtitle {
  font-size: 18px;
  font-weight: 300;
  line-height: 1.6;
  color: #5a6d85;
  max-width: 576px;
  margin-bottom: 48px;
}

.hero .checklist {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 25px;
  max-width: 520px;
}

.hero .checklist-item {
  display: flex;
  gap: 5px;
  font-size: 15px;
  font-weight: 400;
  color: rgba(15, 29, 51, 0.85);
}

.hero-buttons {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
}

.text-gradient {
  background: linear-gradient(
    135deg,
    #0b55b6,
    #1a6fd4,
    #083d82
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #0b55b6;
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

.btn-outline {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 2px solid rgba(15, 29, 51, 0.15);
  color: #0f1d33;
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

@keyframes floatDelay {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-12px);
  }
}

.reveal-up {
  opacity: 0;
  animation: revealUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.delay-1 {
  animation-delay: 0.1s;
}

.delay-2 {
  animation-delay: 0.2s;
}

.delay-3 {
  animation-delay: 0.3s;
}

.float {
  animation: float 6s ease-in-out infinite;
}

.float-delay {
  animation: floatDelay 6s ease-in-out 2s infinite;
}

.iconify {
  display: inline-block;
  vertical-align: middle;
  color: #0b55b6;
}

@media (min-width: 768px) {
  .hero-title {
    font-size: 72px;
  }

  .hero-subtitle {
    font-size: 20px;
  }
}

@media (min-width: 1024px) {
  .hero-title {
    font-size: 78px;
  }
}
</style>