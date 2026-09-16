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
          <span class="section-label">Why run a search?</span>
          <h2 class="section-title">Let {{ SITE_NAME }} search your mark</h2>
          <p class="body-text">A search will help avoid obvious duplications of pre-existing marks.</p>
          <p class="body-text">
            If the USPTO rejects your application, the fees to {{ SITE_NAME }} and the USPTO are not refundable. If your
            company is just beginning, it's better to make name changes now rather than invest in building a brand only
            to learn that you have to change the name and lose all of your goodwill.
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
import { useComponentStyles } from "@/composables/useComponentStyles";
import Brand from "@/assets/BrandsHeroImages.jpg";
import { SITE_NAME } from "@/config/siteInfo.js";

const sectionRef = ref(null);
useScrollReveal(sectionRef);

const features = [
  { title: "Comprehensive Search", desc: "We search federal, state, and common-law databases for conflicts." },
  { title: "Expert Risk Analysis", desc: "Our attorneys evaluate your mark's approval likelihood before filing." },
  { title: "Save Time & Money", desc: "Avoid non-refundable USPTO fees by identifying issues early." },
  { title: "Strategic Guidance", desc: "Get recommendations to strengthen your application's chances." }
];

const styles = useComponentStyles("TextImage1", {
  primary: "#0b55b6",
  background: "#FAFAFA",
  pdtop: "96px",
  pdbottom: "96px",
  pdleft: "0px",
  pdright: "0px",
  fontSize: "50px",
  fontSizeBody: "15px",
  surface: "#ffffff",
  muted: "#5a6d85"
});
</script>

<style scoped>
.overview {
  --primary: v-bind("styles.primary");
  --bg: v-bind("styles.background");
  --pd-top: v-bind("styles.pdtop");
  --pd-bottom: v-bind("styles.pdbottom");
  --pd-left: v-bind("styles.pdleft");
  --pd-right: v-bind("styles.pdright");
  --font-size: v-bind("styles.fontSize");
  --font-size-body: v-bind("styles.fontSizeBody");
  --surface: v-bind("styles.surface");
  --body-txt-color: v-bind("styles.muted");
  font-family: "Inter", sans-serif;
  background: var(--bg);
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
  padding-top: var(--pd-top);
  padding-bottom: var(--pd-bottom);
  padding-left: var(--pd-left);
  padding-right: var(--pd-right);
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
  color: var(--primary);
  margin-bottom: 16px;
}

.section-title {
  font-family: "Inter Tight", sans-serif;
  font-weight: 600;
  font-size: var(--font-size);
  line-height: 0.95;
  letter-spacing: -0.04em;
  margin-bottom: 32px;
}

@media (max-width: 768px) {
  .section-title {
    font-size: 26px;
    line-height: 32px;
  }
}

.body-text {
  font-size: var(--font-size-body);
  font-weight: 300;
  line-height: 1.6;
  color: var(--body-txt-color);
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

.feature-card {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  background: var(--surface);
  border-radius: 12px;
  border: 1px solid #d4e0f0;
}

.feature-check {
  color: var(--primary);
  margin-top: 2px;
  flex-shrink: 0;
}

.feature-title {
  font-weight: 500;
  font-size: 14px;
}

.feature-desc {
  font-size: 12px;
  color: var(--body-txt-color);
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
  background: var(--surface);
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid #d4e0f0;
  max-width: 200px;
}

.badge-text {
  font-size: 12px;
  color: var(--body-txt-color);
}
</style>
