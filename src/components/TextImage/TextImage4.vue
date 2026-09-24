<template>
  <section id="overview" ref="sectionRef" class="overview">
    <div class="container">
      <div class="grid">
        <div class="col-left scroll-reveal">
          <div class="image-wrap">
            <div class="image-box">
              <img :src="Brand" alt="Trademark protection concept" />
            </div>
          </div>
        </div>
        <div class="col-right scroll-reveal" style="transition-delay: 0.15s">
          <span class="section-label">Why work with us?</span>
          <h2 class="section-title">
            Set up your brand for success with {{ SITE_NAME }}
          </h2>
          <p class="body-text">
            Every day, our team of highly skilled trademark professionals do all the heavy lifting to file hundreds of applications correctly and efficiently for individuals and business owners across the nation.
          </p>
          <p class="body-text">
            We believe that building a brand and making sure it stays protected is one of the most important yet complicated tasks many small businesses face today. So we'll be with you every step of the way, helping you protect your business and celebrating with you when you accomplish every exciting milestone as you thrive.
          </p>
          <div class="features">
            <div v-for="(item, i) in features" :key="i" class="feature-card">
              <CheckCircle :size="18" class="feature-check" />
              <div>
                <div class="feature-title">{{ item.title }}</div>
                <div class="feature-desc">{{ item.desc }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { CheckCircle } from "@lucide/vue";
import { useScrollReveal } from "@/composables/useScrollReveal";
import Brand from "@/assets/tgirl1.png";

import { SITE_NAME } from "@/config/siteInfo.js";

const sectionRef = ref(null);
useScrollReveal(sectionRef);
const features = [
  { title: "Full USPTO Filing Support", desc: "We manage everything from A to Z." },
  { title: "Expert Application Review", desc: "Fewer rejections, faster approval." },
  { title: "End-to-End Guidance", desc: "We're here at every step of the way." },
  { title: "50-State Brand Protection", desc: "Federal enforcement rights included." },
];
</script>

<style scoped>

@import url("https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap");

.overview {
  --brand: #0b55b6;
  --surface: #ffffff;
  --ink: #0f1d33;
  --muted: #5a6d85;
  --border: #d4e0f0;
  --font-display: "Inter Tight", sans-serif;
  --font-body: "Inter", sans-serif;
}

/* .overview {
  --primary: #0b55b6;
  --brand-light: #e8f0fb;
  --brand-dark: #083d82;
  --brand-mid: #1a6fd4;
  --surface: #ffffff;
  --ink: #0f1d33;
  --muted: #5a6d85;
  --border: #d4e0f0;
  --font-display: "Inter Tight", sans-serif;
  --font-body: "Inter", sans-serif;
} */


.overview {
  font-family: var(--font-body);
  color: var(--ink);
  background: var(--surface);
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

.overview {
  padding: 96px 0;
  background: rgba(232, 240, 251, 0.4);
}
@media (min-width: 768px) {
  .overview {
    padding: 128px 0;
  }
}
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
}
.grid {
  display: grid;
  gap: 48px;
  align-items: center;
}
@media (min-width: 768px) {
  .grid {
    grid-template-columns: 5fr 7fr;
    gap: 64px;
  }
}
.section-label {
  display: block;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--brand);
  margin-bottom: 16px;
}
.section-title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 30px;
  line-height: 0.95;
  letter-spacing: -0.04em;
  margin-bottom: 32px;
}
@media (min-width: 768px) {
  .section-title {
    font-size: 48px;
  }
  
}
@media (min-width: 1024px) {
  .section-title {
    font-size: 48px;
  }
}
.body-text {
  font-size: 16px;
  font-weight: 300;
  line-height: 1.6;
  color: var(--muted);
  margin-bottom: 24px;
}
.features {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  margin-top: 32px;
}
@media (min-width: 640px) {
  .features {
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 768px) {
  .col-right .section-title{
    font-size: 26px;
    line-height: 32px;

  }
    .container{
    padding: 0 20px;
  }
  
}

.feature-card {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  background: #fff;
  border-radius: 12px;
  border: 1px solid var(--border);
}
.feature-check {
  color: var(--brand);
  margin-top: 2px;
  flex-shrink: 0;
}
.feature-title {
  font-weight: 500;
  font-size: 14px;
}
.feature-desc {
  font-size: 12px;
  color: var(--muted);
  margin-top: 2px;
}
.image-wrap {
  position: relative;
}
.image-box {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
}
.image-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.badge-overlay {
  position: absolute;
  bottom: -24px;
  left: -24px;
  background: #fff;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--border);
  max-width: 200px;
}
.badge-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}
.badge-header .iconify {
  color: var(--brand);
}
.badge-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 14px;
  color: var(--brand);
}
.badge-text {
  font-size: 12px;
  color: var(--muted);
}
.symbol-overlay {
  position: absolute;
  top: -16px;
  right: -16px;
  background: var(--brand);
  color: #fff;
  padding: 7px 15px;
  border-radius: 42px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 24px;
  letter-spacing: -0.04em;
}
</style>
