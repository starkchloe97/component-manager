```vue
<script setup>
import { CheckCircle, ShieldCheck } from '@lucide/vue'

import twImage from "../../assets/tw.png"
import trustMobile from "../../assets/trust-mobile.png"
import maincc from "../../assets/main.webp"
</script>

<template>
  <header class="hero-section v-four">
    <div class="container hero-grid">
      <div class="hero-content">
        <div class="trust-badge">
          <a
            class="trust_desktop"
            href="https://www.trustpilot.com/review/trademarkatlas.com"
            target="_blank"
          >
            <img class="tw-class" :src="twImage" alt="Trustpilot" />
          </a>

          <a
            class="trust_mobile"
            href="https://www.trustpilot.com/review/trademarkatlas.com"
            target="_blank"
          >
            <img class="tw-mobile" :src="trustMobile" alt="Trustpilot" />
          </a>
        </div>

        <h1 class="hero-headline">
          Secure your brand's <br />
          <span class="text-gradient">
            Future.
            <svg
              class="underline-svg"
              viewBox="0 0 100 10"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 5 Q 25 0 50 5 T 100 5"
                fill="none"
                stroke="currentColor"
                stroke-width="4"
              />
            </svg>
          </span>
        </h1>

        <p class="hero-sub">
          Protect your legacy with expert USPTO filings. Strategic guidance,
          attorney-led review, and a seamless digital experience.
        </p>

        <div class="hero-actions">
          <button class="btn-primary btn-lg">
            Start Your Registration
          </button>

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
                class="avatar"
              />

              <div class="avatar avatar-count">+12k</div>
            </div>

            <span class="proof-text">
              Trusted by 12,000+ businesses
            </span>
          </div>
        </div>

        <div class="hero-checks">
          <div class="check-item">
            <CheckCircle :size="18" class="check-icon" />
            <span>Attorney-led USPTO filing</span>
          </div>

          <div class="check-item">
            <CheckCircle :size="18" class="check-icon" />
            <span>Simple 3-step process</span>
          </div>
        </div>
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

            <p class="badge-desc">
              Success Rate in Compliance
            </p>
          </div>
        </div>

        <div class="hero-deco hero-deco-1"></div>
        <div class="hero-deco hero-deco-2"></div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.v-four {
  --primary: #003dc7bd;
  --secondary: #081fecc1;
  --on-surface-variant: #44474f;
  --background: #faf8ff;

  --radius-3xl: 1.5rem;
  --radius-4xl: 2rem;
  --radius-pill: 9999px;
}

/* ─── HERO ─── */

.v-four.hero-section {
  position: relative;
  min-height: auto;
  display: flex;
  align-items: center;
  padding-top: 20px;
  overflow: hidden;
}

.v-four .hero-grid {
  display: grid;
  grid-template-columns: 7fr 5fr;
  gap: 40px;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.v-four .hero-content {
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
  /* gap: 10px; */
}

.v-four .trust-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 6px 14px;
  border-radius: var(--radius-pill);
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  width: fit-content;
}

.v-four .hero-headline {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 500;
  letter-spacing: -0.03em;
  line-height: 1;
}

.v-four .text-gradient {
  position: relative;
  background: linear-gradient(
    135deg,
    #003ec7 0%,
    #003ec7 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 200;
}

.v-four .underline-svg {
  position: absolute;
  bottom: -6px;
  left: 0;
  width: 100%;
  height: 12px;
  color: rgba(0, 62, 199, 0.2);
}

.v-four .hero-sub {
  font-size: clamp(0.875rem, 1.5vw, 1rem);
  color: rgba(68, 71, 79, 0.8);
  max-width: 540px;
  font-weight: 300;
  line-height: 1.7;
}

.v-four .hero-actions {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* ─── BUTTON ─── */

.v-four .btn-primary {
  background: var(--primary);
  color: #fff;
  font-weight: 500;
  border-radius: 7px;
  padding: 12px 26px;
  font-size: 0.875rem;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 6px 20px rgba(0, 62, 199, 0.2);
  display: inline-block;
  cursor: pointer;
  border: none;
  font-family: inherit;
}

.v-four .btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(0, 62, 199, 0.3);
}

.v-four .btn-primary:active {
  transform: scale(0.97);
}

.v-four .btn-lg {
  padding: 14px 36px;
  font-size: 0.95rem;
  width: 77%;
  margin: 10px 0;
}

/* ─── SOCIAL PROOF ─── */

.v-four .social-proof {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--on-surface-variant);
}

.v-four .avatars {
  display: flex;
}

.v-four .avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 3px solid var(--background);
  object-fit: cover;
  margin-left: -10px;
}

.v-four .avatars .avatar:first-child {
  margin-left: 0;
}

.v-four .avatar-count {
  background: var(--secondary);
  color: #fff;
  font-size: 9px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ─── CHECKS ─── */

.v-four .hero-checks {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  padding-top: 4px;
}

.v-four .check-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  font-weight: 600;
}

.v-four .check-icon {
  color: var(--secondary);
  background: rgba(0, 110, 42, 0.1);
  border-radius: 50%;
  padding: 3px;
}

/* ─── HERO VISUAL ─── */

.v-four .hero-visual {
  position: relative;
}

.v-four .hero-img-wrap {
  position: relative;
  margin-bottom: 40px;
}

.v-four .hero-img {
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  border-radius: var(--radius-4xl);
  box-shadow: 0 40px 80px -20px rgba(0, 0, 0, 0.15);
  transition: transform 0.7s ease;
}

.v-four .hero-img-wrap:hover .hero-img {
  transform: scale(1.02);
}

/* ─── BADGE ─── */

.v-four .glass {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.4);
}

.v-four .hero-badge {
  position: absolute;
  bottom: -22px;
  left: -22px;
  padding: 10px 20px;
  border-radius: var(--radius-3xl);
  box-shadow: 0 14px 36px rgba(0, 0, 0, 0.12);
  animation: float 3s ease-in-out infinite;
}

.v-four .badge-inner {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 5px;
}

.v-four .badge-icon-wrap {
  width: 32px;
  height: 32px;
  background: var(--secondary);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.v-four .badge-pct {
  font-weight: 700;
  font-size: 1rem;
  line-height: 1;
}

.v-four .badge-desc {
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 10px;
  color: var(--on-surface-variant);
}

/* ─── DECORATIONS ─── */

.v-four .hero-deco {
  position: absolute;
  border-radius: 50%;
  z-index: -1;
  pointer-events: none;
}

.v-four .hero-deco-1 {
  top: -30px;
  right: -30px;
  width: 110px;
  height: 110px;
  background: rgba(0, 62, 199, 0.1);
  filter: blur(40px);
}

.v-four .hero-deco-2 {
  bottom: 60px;
  left: -60px;
  width: 160px;
  height: 160px;
  background: rgba(0, 110, 42, 0.05);
  filter: blur(80px);
}

/* ─── TRUSTPILOT ─── */

.v-four .tw-class {
  height: 32px;
  margin: 24px 0 20px;
}

.v-four .tw-mobile {
  display: none;
  width: 100px;
  margin: 20px 0 5px;
}

/* ─── ANIMATION ─── */

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-8px);
  }
}

/* ─── RESPONSIVE ─── */

@media (max-width: 1024px) {
  .v-four .hero-grid {
    grid-template-columns: 1fr;
    padding-top: 20px;
  }

  .v-four .hero-visual {
    display: none;
  }

  .v-four .container {
    padding: 0 20px;
  }
}

@media (max-width: 640px) {
  .v-four.hero-section {
    padding-top: 15px;
  }

  .v-four .hero-content {
    gap: 16px;
  }

  .v-four .hero-checks {
    grid-template-columns: 1fr;
  }

  .v-four .trust_desktop {
    display: none;
  }

  .v-four .trust_mobile {
    display: block;
  }

  .v-four .container {
    padding: 0 16px;
  }
}
</style>
