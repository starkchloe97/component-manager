<template>
  <section class="hero">
    <div class="hero-grid-bg"></div>
    <div class="glow-orange glow-1"></div>
    <div class="glow-blue glow-2"></div>
    <div class="dot dot-1 float-anim"></div>
    <div class="dot dot-2 float-anim-delay"></div>
    <div class="dot dot-3 float-anim"></div>

    <div class="container">
      <div class="hero-grid">
        <div class="hero-content">
          <h1 class="hero-title">
            <span class="gradient-text">Register your trademark</span>
            and protect your brand.
          </h1>

          <p class="hero-desc">
            Register a trademark for your business name, logo, or slogan and
            stop copycats from unauthorized use of your trademark.
          </p>

          <div class="hero-actions">
            <div class="btn-reviews">
              <a href="#cta" class="btn-main">
                File Your Trademark
                <ArrowRight class="btn-icon" />
              </a>

              <a href="#process" class="btn-secondary">
                <PlayCircle class="btn-icon-lg" />
                See How It Works
              </a>
            </div>

            <div class="social-proof">
              <div class="avatars">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBixEY8P3qTjmcctDqFDy7ryvrrgAY-VfvH4-tzel3GA9Hn1msfjmDovipFC2ZvnHSXCtpDwkF7bJrMvehTcU_VDZG78RkCu9xEe88qqyBaNiC0n35KyZHu5CKpyn5Nqs2Fd8952Ka1jUsNh-A_v0AGeHS3Cf01-hHkWS63cardDHVtB1MmKTILjrbvVz-3RnHGTa72PHOJpJRrjg-M1G4DfYyZTGWMidSjn3khq333eFyO6N5-a1s1QoaDiwX_Pe2_EhUS2hMDQc8"
                  alt="User"
                  class="avatar"
                />

                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDs2PSwsT3DOSFsu_vunNa-gg2YcqM5QaiOBwOp5elnMnd-iQgkYprq4AroZe7Ail0Z80vdrFPu-zPokHvAVzdOJKvz_-fMJT_YeXuAsVmBli9nGSVmp4yuctBFH0cXxdlHJgSw25KHwaEvcwVBp9mL-5urTOs2ygC1a_RL9kyWLTUy5XCA7Dgdygh1HVIFktwU71ov3Dj4RafVsFKtebTgU-oHmPgbMSCvHD9-0tHarb2pnK0LVhry2NNTXTSZL1mF5clnyrrnY1E"
                  alt="User"
                  class="avatar avatar-margin"
                />

                <div class="avatar avatar-count avatar-margin">
                  +12k
                </div>
              </div>

              <span class="proof-text">
                Trusted by 12,000+ businesses
              </span>
            </div>
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

        <div class="hero-visual desktop-only">
          <div class="visual-wrapper">
            <div class="image-glow"></div>

            <img
              :src="heroImage"
              alt="Professional Trademark Protection"
              class="hero-img"
            />

            <div class="img-float-badge float_card_one">
              <Shield class="badge-icon-svg" />

              <div>
                <div class="fc-title">Fully Protected</div>
                <div class="fc-sub">USPTO Registered</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bottom-gradient"></div>
  </section>
</template>

<script setup>
import { ArrowRight, PlayCircle, Shield } from '@lucide/vue'
import heroImage from '@/assets/hero_comprehensive.webp'
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap");

.hero {
  --brand-400: #fb923c;
  --brand-500: #f97316;
  --brand-600: #ea580c;
  --neutral-400: #a3a3a3;
  --neutral-500: #737373;
  --neutral-900: #171717;
  --blue-400: #60a5fa;

  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  background-color: #020617;
  color: var(--neutral-900);
  font-family: "Inter", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: hidden;
  margin: 0;
}

.hero-grid-bg {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(
      rgba(255, 255, 255, 0.03) 1px,
      transparent 1px
    ),
    linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.03) 1px,
      transparent 1px
    );
  background-size: 60px 60px;
}

.glow-1 {
  position: absolute;
  top: 25%;
  left: -8rem;
  width: 24rem;
  height: 24rem;
  opacity: 0.6;
}

.glow-2 {
  position: absolute;
  bottom: 25%;
  right: 0;
  width: 20rem;
  height: 20rem;
  opacity: 0.4;
}

.dot {
  position: absolute;
  border-radius: 50%;
}

.dot-1 {
  top: 5rem;
  right: 25%;
  width: 8px;
  height: 8px;
  background: var(--brand-500);
  opacity: 0.6;
}

.dot-2 {
  top: 33%;
  left: 33%;
  width: 6px;
  height: 6px;
  background: var(--brand-400);
  opacity: 0.4;
}

.dot-3 {
  bottom: 33%;
  right: 33%;
  width: 4px;
  height: 4px;
  background: var(--blue-400);
  opacity: 0.3;
}

.container {
  position: relative;
  max-width: 80rem;
  margin: 0 auto;
  padding: 128px 24px 80px;
  width: 100%;
}

.hero-grid {
  display: grid;
  align-items: center;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 64px;
}

.hero-title {
  font-size: 2.25rem;
  font-weight: 600;
  color: white;
  line-height: 1.1;
  letter-spacing: -0.025em;
  margin-bottom: 24px;
  font-family: Instrument Sans, sans-serif !important;
}

.gradient-text {
  display: block;
  margin-top: 8px;
  background: linear-gradient(
    to right,
    #fb923c,
    #f97316
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-desc {
  font-size: 1.125rem;
  color: var(--neutral-400);
  line-height: 1.625;
  margin-bottom: 40px;
  max-width: 32rem;
  font-family: Instrument Sans, sans-serif !important;
}

.hero-actions {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.btn-reviews {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.btn-main {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: var(--brand-500);
  color: white;
  font-weight: 500;
  padding: 16px 32px;
  border-radius: 9999px;
  text-decoration: none;
  transition: all 0.3s;
  font-size: 1rem;
}

.btn-main:hover {
  background: var(--brand-600);
  box-shadow: 0 20px 25px -5px rgba(249, 115, 22, 0.2);
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  font-weight: 500;
  padding: 16px 32px;
  border-radius: 9999px;
  text-decoration: none;
  transition: all 0.3s;
  font-size: 1rem;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
}

.btn-icon {
  width: 16px;
  height: 16px;
}

.btn-icon-lg {
  width: 20px;
  height: 20px;
}

.social-proof {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.8rem;
  font-weight: 500;
  color: white;
}

.avatars {
  display: flex;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 3px solid #ffffff42;
  object-fit: cover;
}

.avatar-margin {
  margin-left: -10px;
}

.avatar-count {
  background: #fb8e37;
  color: #fff;
  font-size: 9px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-stats {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-top: 40px;
  padding-top: 32px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
}

.stat-label {
  font-size: 0.75rem;
  color: var(--neutral-500);
  margin-top: 2px;
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
}

.hero-visual {
  position: relative;
  z-index: 2;
}

.visual-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 28rem;
  height: 28rem;
  background: radial-gradient(
    circle,
    rgba(249, 115, 22, 0.3) 0%,
    rgba(249, 115, 22, 0.05) 60%,
    transparent 70%
  );
  filter: blur(60px);
  z-index: 0;
  pointer-events: none;
}

.hero-img {
  position: relative;
  z-index: 1;
  max-width: 100%;
  height: auto;
  border-radius: 16px;
  mask-image: radial-gradient(
    circle at center,
    rgba(0, 0, 0, 1) 55%,
    rgba(0, 0, 0, 0.8) 75%,
    rgba(0, 0, 0, 0) 100%
  );
  -webkit-mask-image: radial-gradient(
    circle at center,
    rgba(0, 0, 0, 1) 55%,
    rgba(0, 0, 0, 0.8) 75%,
    rgba(0, 0, 0, 0) 100%
  );
  filter: drop-shadow(
    0 0 20px rgba(249, 115, 22, 0.15)
  );
}

.img-float-badge {
  position: absolute;
  top: -1rem;
  left: -1rem;
  z-index: 10;
}

.badge-icon-svg {
  width: 20px;
  height: 20px;
}

.fc-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: white;
}

.fc-sub {
  font-size: 0.75rem;
  color: var(--neutral-400);
}

.float_card_one {
  animation: float 6s ease-in-out infinite;
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

.bottom-gradient {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 8rem;
  background: linear-gradient(
    to top,
    #ffffff69,
    transparent
  );
}

.desktop-only {
  display: none;
}

@media (min-width: 768px) {
  .container {
    padding-top: 60px;
    padding-bottom: 128px;
  }

  .hero-title {
    font-size: 3rem;
  }

  .stat-value {
    font-size: 1.875rem;
  }

  .desktop-only {
    display: block;
  }
}

@media (min-width: 1024px) {
  .hero-title {
    font-size: 3.4rem;
  }
}

@media (max-width: 767px) {
  .hero-img {
    mask-image: none;
    -webkit-mask-image: none;
  }

  .image-glow {
    width: 16rem;
    height: 16rem;
  }
}
</style>