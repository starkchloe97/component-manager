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

          <h2 class="section-title">
            Let {{ SITE_NAME }} search your mark
          </h2>

          <p class="body-text">
            A search will help avoid obvious duplications of pre-existing marks.
          </p>

          <p class="body-text">
            If the USPTO rejects your application, the fees to {{ SITE_NAME }} and
            the USPTO are not refundable. If your company is just beginning, it's
            better to make name changes now rather than invest in building a brand
            only to learn that you have to change the name and lose all of your
            goodwill.
          </p>

          <div class="features">
            <div
              v-for="(item, i) in features"
              :key="i"
              class="feature-card"
            >
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

  <!-- Style Drawer -->
  <button
    class="style-trigger"
    type="button"
    @click="drawerOpen = true"
  >
    Customize
  </button>

  <aside
    class="style-drawer"
    :class="{ 'style-drawer--open': drawerOpen }"
  >
    <div class="drawer-header">
      <div>
        <h3>Section Styles</h3>
        <p>Customize this section</p>
      </div>

      <button
        class="drawer-close"
        type="button"
        @click="drawerOpen = false"
      >
        ×
      </button>
    </div>

    <div class="drawer-content">

      <!-- Colors -->
      <div class="drawer-group">
        <h4>Colors</h4>

        <div class="control">
          <label for="primary">Primary</label>

          <div class="color-control">
            <input
              id="primary"
              v-model="primary"
              type="color"
            />

            <input
              v-model="primary"
              type="text"
            />
          </div>
        </div>

        <div class="control">
          <label for="background">Background</label>

          <div class="color-control">
            <input
              id="background"
              v-model="background"
              type="color"
            />

            <input
              v-model="background"
              type="text"
            />
          </div>
        </div>

        <div class="control">
          <label for="surface">Surface</label>

          <div class="color-control">
            <input
              id="surface"
              v-model="surface"
              type="color"
            />

            <input
              v-model="surface"
              type="text"
            />
          </div>
        </div>

        <div class="control">
          <label for="muted">Body text</label>

          <div class="color-control">
            <input
              id="muted"
              v-model="muted"
              type="color"
            />

            <input
              v-model="muted"
              type="text"
            />
          </div>
        </div>
      </div>

      <!-- Spacing -->
      <div class="drawer-group">
        <h4>Spacing</h4>

        <div class="control">
          <label for="pdtop">Padding top</label>

          <input
            id="pdtop"
            v-model="pdtop"
            type="text"
            placeholder="96px"
          />
        </div>

        <div class="control">
          <label for="pdbottom">Padding bottom</label>

          <input
            id="pdbottom"
            v-model="pdbottom"
            type="text"
            placeholder="96px"
          />
        </div>

        <div class="control">
          <label for="pdleft">Padding left</label>

          <input
            id="pdleft"
            v-model="pdleft"
            type="text"
            placeholder="0px"
          />
        </div>

        <div class="control">
          <label for="pdright">Padding right</label>

          <input
            id="pdright"
            v-model="pdright"
            type="text"
            placeholder="0px"
          />
        </div>
      </div>

      <!-- Typography -->
      <div class="drawer-group">
        <h4>Typography</h4>

        <div class="control">
          <label for="fontSize">Heading size</label>

          <input
            id="fontSize"
            v-model="fontSize"
            type="text"
            placeholder="50px"
          />
        </div>

        <div class="control">
          <label for="fontSizeBody">Body size</label>

          <input
            id="fontSizeBody"
            v-model="fontSizeBody"
            type="text"
            placeholder="15px"
          />
        </div>
      </div>

    </div>
  </aside>

  <div
    v-if="drawerOpen"
    class="drawer-backdrop"
    @click="drawerOpen = false"
  />
</template>

<script setup>
import { ref } from "vue";
import { CheckCircle } from "@lucide/vue";
import { useScrollReveal } from "@/composables/useScrollReveal";
import { useComponentStyles } from "@/composables/useComponentStyles";

import Brand from "@/assets/images/BrandsHeroImages.jpg";
import { SITE_NAME } from "@/config/siteInfo.js";

const sectionRef = ref(null);

useScrollReveal(sectionRef);

const features = [
  {
    title: "Comprehensive Search",
    desc: "We search federal, state, and common-law databases for conflicts."
  },
  {
    title: "Expert Risk Analysis",
    desc: "Our attorneys evaluate your mark's approval likelihood before filing."
  },
  {
    title: "Save Time & Money",
    desc: "Avoid non-refundable USPTO fees by identifying issues early."
  },
  {
    title: "Strategic Guidance",
    desc: "Get recommendations to strengthen your application's chances."
  }
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
/* =========================================================
   SECTION
   ========================================================= */

.overview {
  /*
   * Vue reactive state → CSS custom properties
   */
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

@media (max-width: 768px) {
  .overview {
    padding: 60px 0;
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


/* =========================================================
   DRAWER
   ========================================================= */

.style-trigger {
  position: fixed;
  right: 24px;
  bottom: 24px;

  z-index: 1000;

  border: 0;
  border-radius: 10px;

  padding: 12px 18px;

  background: #111827;
  color: #fff;

  font-size: 14px;
  font-weight: 600;

  cursor: pointer;

  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.18);
}

.style-drawer {
  position: fixed;

  top: 0;
  right: 0;
  bottom: 0;

  width: 360px;
  max-width: 90vw;

  z-index: 1100;

  background: #fff;

  box-shadow: -10px 0 40px rgba(0, 0, 0, 0.15);

  transform: translateX(100%);
  transition: transform 0.25s ease;

  display: flex;
  flex-direction: column;
}

.style-drawer--open {
  transform: translateX(0);
}

.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 20px;

  border-bottom: 1px solid #e5e7eb;
}

.drawer-header h3 {
  margin: 0;

  font-size: 18px;
  font-weight: 700;
}

.drawer-header p {
  margin: 4px 0 0;

  font-size: 12px;
  color: #6b7280;
}

.drawer-close {
  width: 34px;
  height: 34px;

  border: 0;
  border-radius: 8px;

  background: #f3f4f6;

  font-size: 22px;
  line-height: 1;

  cursor: pointer;
}

.drawer-content {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.drawer-group {
  padding-bottom: 24px;
  margin-bottom: 24px;

  border-bottom: 1px solid #e5e7eb;
}

.drawer-group:last-child {
  border-bottom: 0;
}

.drawer-group h4 {
  margin: 0 0 16px;

  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #374151;
}

.control {
  margin-bottom: 16px;
}

.control:last-child {
  margin-bottom: 0;
}

.control label {
  display: block;

  margin-bottom: 7px;

  font-size: 12px;
  font-weight: 600;
  color: #374151;
}

.control > input[type="text"] {
  width: 100%;
  box-sizing: border-box;

  height: 38px;

  padding: 0 10px;

  border: 1px solid #d1d5db;
  border-radius: 7px;

  font-size: 13px;

  outline: none;
}

.control > input[type="text"]:focus {
  border-color: #6b7280;
}

.color-control {
  display: flex;
  gap: 8px;
}

.color-control input[type="color"] {
  width: 42px;
  height: 38px;

  padding: 2px;

  border: 1px solid #d1d5db;
  border-radius: 7px;

  background: #fff;

  cursor: pointer;
}

.color-control input[type="text"] {
  flex: 1;

  min-width: 0;

  height: 38px;
  box-sizing: border-box;

  padding: 0 10px;

  border: 1px solid #d1d5db;
  border-radius: 7px;

  font-size: 13px;

  outline: none;
}

.color-control input[type="text"]:focus {
  border-color: #6b7280;
}

.drawer-backdrop {
  position: fixed;
  inset: 0;

  z-index: 1050;

  background: rgba(0, 0, 0, 0.35);
}
</style>