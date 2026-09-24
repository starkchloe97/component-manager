<template>
  <section class="trust-bar">
    <div class="container">
      <div class="trust-label-row">
        <span class="trust-dash"></span>
        <p class="trust-label">Trusted by leading companies worldwide</p>
        <span class="trust-dash"></span>
      </div>

      <div class="marquee-wrapper">
        <div class="fade-left"></div>
        <div class="fade-right"></div>
        <div class="marquee-track">
          <div class="marquee-content">
            <span class="logo-item">TechFlow</span>
            <span class="logo-dot"></span>
            <span class="logo-item">NovaBrand</span>
            <span class="logo-dot"></span>
            <span class="logo-item">Meridian Co.</span>
            <span class="logo-dot"></span>
            <span class="logo-item">Apex Studio</span>
            <span class="logo-dot"></span>
            <span class="logo-item">BlueShift</span>
            <span class="logo-dot"></span>
            <span class="logo-item">Vertex Labs</span>
            <span class="logo-dot"></span>
            <span class="logo-item">CraftBrew</span>
            <span class="logo-dot"></span>
            <span class="logo-item">Luminar</span>
            <span class="logo-dot"></span>
          </div>
          <div class="marquee-content">
            <span class="logo-item">TechFlow</span>
            <span class="logo-dot"></span>
            <span class="logo-item">NovaBrand</span>
            <span class="logo-dot"></span>
            <span class="logo-item">Meridian Co.</span>
            <span class="logo-dot"></span>
            <span class="logo-item">Apex Studio</span>
            <span class="logo-dot"></span>
            <span class="logo-item">BlueShift</span>
            <span class="logo-dot"></span>
            <span class="logo-item">Vertex Labs</span>
            <span class="logo-dot"></span>
            <span class="logo-item">CraftBrew</span>
            <span class="logo-dot"></span>
            <span class="logo-item">Luminar</span>
            <span class="logo-dot"></span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup></script>

<style scoped>
.trust-bar {
  --brand-300: #fdba74;
  --brand-500: #f97316;
  --navy-800: #1e293b;
  --neutral-100: #f5f5f5;
  --neutral-200: #e5e5e5;
  --neutral-300: #d4d4d4;
  --border-light: #eef0f8;
  position: relative;
  z-index: 10;
  margin-top: -2rem;
  padding: 40px 0 8px 0;
  background: white;
}

.container {
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 24px;
}

.trust-label-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 32px;
}

.trust-dash {
  width: 28px;
  height: 1px;
  background: linear-gradient(to right, transparent, var(--brand-300));
}

.trust-label-row .trust-dash:last-child {
  background: linear-gradient(to left, transparent, var(--brand-300));
}

.trust-label {
  text-align: center;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--navy-800);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin: 0;
}

.marquee-wrapper {
  position: relative;
  overflow: hidden;
  border-top: 1px solid var(--neutral-100);
  border-bottom: 1px solid var(--neutral-100);
  padding: 20px 0;
}

.fade-left {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 6rem;
  background: linear-gradient(to right, white, transparent);
  z-index: 10;
}

.fade-right {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 6rem;
  background: linear-gradient(to left, white, transparent);
  z-index: 10;
}

.marquee-track {
  display: flex;
  animation: marquee 40s linear infinite;
  width: max-content;
}

.marquee-wrapper:hover .marquee-track {
  animation-play-state: paused;
}

.marquee-content {
  display: flex;
  align-items: center;
  gap: 28px;
  padding: 0 14px;
}

.logo-item {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--neutral-300);
  letter-spacing: -0.02em;
  white-space: nowrap;
  transition: color 0.25s ease;
  cursor: default;
}

.logo-item:hover {
  color: var(--brand-500);
}

.logo-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--neutral-200);
  flex-shrink: 0;
}

@media (min-width: 768px) {
  .logo-item {
    font-size: 1.5rem;
  }
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>