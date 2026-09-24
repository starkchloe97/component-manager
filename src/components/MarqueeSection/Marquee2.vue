<script setup>
const items = [
  'Free Trademark Search',
  '190+ Countries',
  'Expert Attorneys',
  '98% Success Rate',
  'No Hidden Fees',
  'Money-Back Guarantee',
  'Real-Time Tracking',
  'Free Consultation'
]
</script>

<template>
  <div class="marquee-section v-two">
    <div class="marquee-track">
      <div v-for="(item, index) in [...items, ...items]" :key="index" class="marquee-item-wrapper">
        <div class="marquee-item"><i class="fas fa-check-circle"></i> {{ item }}</div>
        <div class="marquee-divider"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.marquee-section {
  --border-light: #eef0f8;
  --border: #d4e0f0;
  --primary-lighter: #7986cb;
  --text-muted: #8b90a8;
  padding: 24px 0;
  border-top: 1px solid var(--border-light);
  border-bottom: 1px solid var(--border-light);
  background: rgba(255, 255, 255, 0.6);
  overflow: hidden;
}

.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee 30s linear infinite;
}

.marquee-track:hover {
  animation-play-state: paused;
}

.marquee-item-wrapper {
  display: flex;
  align-items: center;
}

.marquee-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 40px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-muted);
  white-space: nowrap;
}

.marquee-item i {
  color: var(--primary-lighter);
  font-size: 16px;
}

.marquee-divider {
  width: 6px;
  height: 6px;
  background: var(--border);
  border-radius: 50%;
  flex-shrink: 0;
}

@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
</style>