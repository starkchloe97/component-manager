<template>
  <div class="trademark-page v-six">
    <!-- Background decorative elements -->
    <div class="bg-glow bg-glow-1"></div>
    <div class="bg-glow bg-glow-2"></div>
    <div class="bg-grid"></div>

    <div class="container">
      <div class="main-content">
        <!-- Left Section -->
        <div class="left-section">
          <div class="badge">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            Trusted by 50,000+ Businesses
          </div>

          <h1 class="hero-title">
            Trademark Registration
            <span class="highlight">Made Simple</span>
          </h1>

          <p class="hero-desc">
            Protect your brand identity across 190+ countries with our streamlined
            trademark registration process. Expert guidance from filing to approval.
          </p>

          <div class="btn-group">
            <button class="btn btn-primary">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              Search Your Trademark
            </button>

            <button class="btn btn-outline">
              Learn More
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Right Section - Image -->
        <div class="right-section">
          <div class="image-wrapper">
            <div class="image-glow"></div>

            <img
              src="https://picsum.photos/seed/trademark-brand/560/640.jpg"
              alt="Trademark Protection"
              class="hero-image"
            />

            <div class="image-overlay"></div>

            <!-- Floating badge on image -->
            <div class="floating-badge">
              <div class="floating-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>

              <div>
                <div class="floating-title">Brand Protected</div>
                <div class="floating-sub">190+ Countries</div>
              </div>
            </div>

            <!-- Floating stats card -->
            <div class="floating-stat">
              <div class="floating-stat-number">98%</div>
              <div class="floating-stat-label">Success Rate</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Stats -->
      <div class="stats-bar">
        <div
          class="stat-item"
          v-for="stat in stats"
          :key="stat.label"
        >
          <div class="stat-icon">
            <svg
              v-if="stat.icon === 'globe'"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path
                d="M12 2a15.3 15.3 0 0 1 4 10
                15.3 15.3 0 0 1-4 10
                15.3 15.3 0 0 1-4-10
                15.3 15.3 0 0 1 4-10z"
              />
            </svg>

            <svg
              v-else-if="stat.icon === 'file'"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M14 2H6a2 2 0 0 0-2 2v16
                a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
              />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>

            <svg
              v-else
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>

          <div class="stat-value">{{ stat.value }}</div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TrademarkRegistration',

  data() {
    return {
      stats: [
        {
          icon: 'globe',
          value: '190+',
          label: 'Countries Covered'
        },
        {
          icon: 'file',
          value: '50,000+',
          label: 'Trademarks Filed'
        },
        {
          icon: 'check',
          value: '98%',
          label: 'Success Rate'
        }
      ]
    }
  }
}
</script>

<style scoped>
/* ─── MAIN SECTION ─── */

.trademark-page {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px 0;

  background: linear-gradient(
    160deg,
    #060d1f 0%,
    #0a1a3a 40%,
    #0d2260 100%
  );

  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;

  color: #fff;
}

/* ─── BACKGROUND ─── */

.bg-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  pointer-events: none;
}

.bg-glow-1 {
  width: 600px;
  height: 600px;
  top: -200px;
  left: -150px;
  background: rgba(59, 130, 246, 0.12);
}

.bg-glow-2 {
  width: 500px;
  height: 500px;
  bottom: -150px;
  right: -100px;
  background: rgba(99, 102, 241, 0.1);
}

.bg-grid {
  position: absolute;
  inset: 0;
  pointer-events: none;

  background-image:
    linear-gradient(
      rgba(255, 255, 255, 0.02) 1px,
      transparent 1px
    ),
    linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.02) 1px,
      transparent 1px
    );

  background-size: 60px 60px;
}

/* ─── CONTAINER ─── */

.v-six .container {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
}

/* ─── MAIN CONTENT ─── */

.v-six .main-content {
  display: flex;
  align-items: center;
  gap: 64px;
}

/* ─── LEFT SECTION ─── */

.v-six .left-section {
  flex: 1;
  min-width: 0;
}

.v-six .badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  margin-bottom: 28px;

  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 100px;

  color: #93b4f5;
  font-size: 13px;
  font-weight: 500;
}

.v-six .hero-title {
  margin: 0 0 24px;
  color: #fff;
  font-size: 56px;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.03em;
}

.v-six .highlight {
  background: linear-gradient(
    135deg,
    #60a5fa,
    #818cf8,
    #a78bfa
  );

  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.v-six .hero-desc {
  max-width: 480px;
  margin: 0 0 36px;

  color: rgba(255, 255, 255, 0.55);
  font-size: 17px;
  line-height: 1.7;
}

/* ─── BUTTONS ─── */

.v-six .btn-group {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
}

.v-six .btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;

  padding: 14px 28px;

  border: none;
  border-radius: 12px;

  font-family: inherit;
  font-size: 15px;
  font-weight: 600;

  cursor: pointer;
  transition: all 0.25s ease;
}

.v-six .btn-primary {
  background: linear-gradient(
    135deg,
    #3b82f6,
    #6366f1
  );

  color: #fff;
  box-shadow: 0 4px 24px rgba(59, 130, 246, 0.35);
}

.v-six .btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(59, 130, 246, 0.45);
}

.v-six .btn-outline {
  background: transparent;
  color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.v-six .btn-outline:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.3);
  color: #fff;
}

/* ─── RIGHT SECTION ─── */

.v-six .right-section {
  flex-shrink: 0;
  width: 420px;
}

.v-six .image-wrapper {
  position: relative;
  overflow: hidden;
  border-radius: 24px;
}

.v-six .image-glow {
  position: absolute;
  inset: -40px;

  z-index: 0;
  pointer-events: none;

  background: radial-gradient(
    ellipse at center,
    rgba(99, 102, 241, 0.2) 0%,
    transparent 70%
  );
}

.v-six .hero-image {
  position: relative;
  z-index: 1;

  display: block;
  width: 100%;
  height: 520px;

  object-fit: cover;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;

  box-shadow:
    0 8px 60px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(255, 255, 255, 0.05) inset;
}

.v-six .image-overlay {
  position: absolute;
  inset: 0;

  z-index: 2;
  pointer-events: none;

  border-radius: 24px;

  background: linear-gradient(
    180deg,
    rgba(6, 13, 31, 0) 0%,
    rgba(6, 13, 31, 0) 40%,
    rgba(6, 13, 31, 0.6) 80%,
    rgba(6, 13, 31, 0.85) 100%
  );
}

/* ─── FLOATING BADGE ─── */

.v-six .floating-badge {
  position: absolute;
  bottom: 80px;
  left: 20px;

  z-index: 3;

  display: flex;
  align-items: center;
  gap: 12px;

  padding: 14px 18px;

  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);

  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;

  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);

  animation: float-up 3s ease-in-out infinite;
}

.v-six .floating-icon {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 42px;
  height: 42px;

  flex-shrink: 0;

  background: linear-gradient(
    135deg,
    #22c55e,
    #16a34a
  );

  border-radius: 12px;
  color: #fff;
}

.v-six .floating-title {
  color: #fff;
  font-size: 14px;
  font-weight: 700;
}

.v-six .floating-sub {
  margin-top: 1px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
}

/* ─── FLOATING STAT ─── */

.v-six .floating-stat {
  position: absolute;
  top: 24px;
  right: 20px;

  z-index: 3;

  padding: 14px 20px;

  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);

  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;

  text-align: center;

  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);

  animation: float-up 3s ease-in-out infinite 1.5s;
}

.v-six .floating-stat-number {
  font-size: 26px;
  font-weight: 800;
  line-height: 1.1;

  background: linear-gradient(
    135deg,
    #60a5fa,
    #818cf8
  );

  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.v-six .floating-stat-label {
  margin-top: 2px;

  color: rgba(255, 255, 255, 0.45);
  font-size: 11px;
  font-weight: 500;

  text-transform: uppercase;
  letter-spacing: 0.06em;
}

/* ─── ANIMATION ─── */

@keyframes float-up {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-6px);
  }
}

/* ─── STATS BAR ─── */

.v-six .stats-bar {
  display: flex;
  justify-content: center;
  gap: 64px;

  margin-top: 72px;
  padding: 36px 0;

  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.v-six .stat-item {
  display: flex;
  align-items: center;
  gap: 14px;
}

.v-six .stat-icon {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 48px;
  height: 48px;

  flex-shrink: 0;

  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 14px;

  color: #60a5fa;
}

.v-six .stat-value {
  color: #fff;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.v-six .stat-label {
  margin-top: 1px;
  color: rgba(255, 255, 255, 0.4);
  font-size: 13px;
}

/* ─── RESPONSIVE ─── */

@media (max-width: 960px) {
  .v-six .main-content {
    flex-direction: column;
    gap: 48px;
    text-align: center;
  }

  .v-six .hero-title {
    font-size: 40px;
  }

  .v-six .hero-desc {
    margin-right: auto;
    margin-left: auto;
  }

  .v-six .btn-group {
    justify-content: center;
  }

  .v-six .right-section {
    width: 100%;
    max-width: 420px;
  }

  .v-six .stats-bar {
    gap: 32px;
    flex-wrap: wrap;
  }
}

@media (max-width: 600px) {
  .v-six.trademark-page {
    padding: 32px 0;
  }

  .v-six .container {
    padding: 0 20px;
  }

  .v-six .hero-title {
    font-size: 32px;
  }

  .v-six .hero-desc {
    font-size: 15px;
  }

  .v-six .btn-group {
    flex-direction: column;
    align-items: center;
  }

  .v-six .btn {
    width: 100%;
    justify-content: center;
  }

  .v-six .stats-bar {
    flex-direction: column;
    align-items: center;
    gap: 24px;
  }

  .v-six .hero-image {
    height: 400px;
  }

  .v-six .floating-badge {
    bottom: 60px;
    left: 14px;
    padding: 10px 14px;
    gap: 10px;
  }

  .v-six .floating-icon {
    width: 36px;
    height: 36px;
  }

  .v-six .floating-title {
    font-size: 13px;
  }

  .v-six .floating-stat {
    top: 16px;
    right: 14px;
    padding: 10px 14px;
  }

  .v-six .floating-stat-number {
    font-size: 22px;
  }
}
</style>