<template>
  <section class="stats-marquee v-three">
    <div class="marquee-track">
      <span class="stat-item"><span class="stat-value">50,000+</span> Trademarks Filed</span>
      <span class="stat-sep">•</span>
      <span class="stat-item"><span class="stat-value">99.8%</span> Approval Rate</span>
      <span class="stat-sep">•</span>
      <span class="stat-item"><span class="stat-value">4.9★</span> Customer Rating</span>
      <span class="stat-sep">•</span>
      <span class="stat-item"><span class="stat-value">150+</span> Countries Covered</span>
      <span class="stat-sep">•</span>
      <span class="stat-item"><span class="stat-value">24/7</span> Expert Support</span>
      <span class="stat-sep">•</span>
      <span class="stat-item"><span class="stat-value">50,000+</span> Trademarks Filed</span>
      <span class="stat-sep">•</span>
      <span class="stat-item"><span class="stat-value">99.8%</span> Approval Rate</span>
      <span class="stat-sep">•</span>
      <span class="stat-item"><span class="stat-value">4.9★</span> Customer Rating</span>
      <span class="stat-sep">•</span>
      <span class="stat-item"><span class="stat-value">150+</span> Countries Covered</span>
      <span class="stat-sep">•</span>
      <span class="stat-item"><span class="stat-value">24/7</span> Expert Support</span>
    </div>
  </section>
</template>

<style scoped>
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.stats-marquee {
  border-top: 1px solid #f1f5f9;
  border-bottom: 1px solid #f1f5f9;
  background: white; padding: 1rem 0; overflow: hidden;
}

.marquee-track {
  display: flex; align-items: center; gap: 3rem;
  white-space: nowrap;
  animation: marquee 30s linear infinite;
  width: max-content;
}

.v-three .stat-item {
  display: flex; align-items: center; gap: 0.5rem;
  font-size: 0.875rem; color: #94a3b8; font-weight: 500;
}
.v-three .stat-value { color: #06c4ac; font-weight: 700; font-size: 1rem; }
.v-three .stat-sep { color: #e2e8f0; }
</style>