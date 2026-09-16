<script setup>
import ctaImage from "@/assets/cta-img.png";
import { useComponentStyles } from "@/composables/useComponentStyles";

const styles = useComponentStyles("CtaSection4", {
  primary: "#003dc7bd",
  background: "#131b2e",
  surface: "#ffffff",
  pdtop: "64px",
  pdbottom: "64px",
  pdleft: "0px",
  pdright: "0px",
  fontSize: "clamp(1.6rem, 3.2vw, 2.6rem)",
  fontSizeBody: "1rem",
  muted: "rgba(255, 255, 255, 0.6)"
});
</script>

<template>
  <section class="section-cta scroll-reveal v-four">
    <div class="cta-wrap">
      <div class="cta-img-wrap">
        <img
          :src="ctaImage"
          alt="Executive Portrait"
          class="cta-img"
        />
        <div class="cta-overlay"></div>
      </div>

      <div class="cta-content">
        <h2 class="display-lg text-white cta-heading">
          Ready to secure <br />your legacy?
        </h2>

        <p class="cta-sub">
          Join the elite brands that trust Atlas for their intellectual
          property foundation.
        </p>

        <div class="cta-actions">
          <button class="btn-primary">Get Started</button>
          <button class="btn-ghost-white">Consultation</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.v-four {
  --primary: v-bind("styles.primary");
  --bg: v-bind("styles.background");
  --surface: v-bind("styles.surface");
  --font-size: v-bind("styles.fontSize");
  --font-size-body: v-bind("styles.fontSizeBody");
  --muted: v-bind("styles.muted");
  --pd-top: v-bind("styles.pdtop");
  --pd-bottom: v-bind("styles.pdbottom");
  --pd-left: v-bind("styles.pdleft");
  --pd-right: v-bind("styles.pdright");
}

/* ─── TYPOGRAPHY ─── */

.v-four .display-lg {
  font-size: var(--font-size);
  font-weight: 500;
  letter-spacing: -0.03em;
  line-height: 1.12;
}

.v-four .text-white {
  color: #fff;
}

/* ─── BUTTONS ─── */

.v-four button {
  cursor: pointer;
  border: none;
  background: none;
  font-family: inherit;
}

.v-four .btn-primary {
  display: inline-block;
  padding: 12px 26px;
  background: var(--primary);
  color: #fff;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 7px;
  box-shadow: 0 6px 20px rgba(0, 62, 199, 0.2);
  transition: transform 0.2s, box-shadow 0.2s;
}

.v-four .btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(0, 62, 199, 0.3);
}

.v-four .btn-primary:active {
  transform: scale(0.97);
}

.v-four .btn-ghost-white {
  padding: 12px 26px;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-weight: 500;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 7px;
  transition: background 0.2s;
}

.v-four .btn-ghost-white:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* ─── CTA ─── */

.section-cta {
  max-width: 1440px;
  margin: 0 auto;
  padding: 72px 16px;
}

.v-four .cta-wrap {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 360px;
  padding: 64px;
  overflow: hidden;
  background: var(--on-surface);
  border-radius: 3rem;
}

.v-four .cta-img-wrap {
  position: absolute;
  inset: 0;
}

.v-four .cta-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.3;
  filter: grayscale(1);
  transition: transform 20s ease;
}

.v-four .cta-wrap:hover .cta-img {
  transform: scale(1.05);
}

.v-four .cta-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    var(--bg),
    rgba(19, 27, 46, 0.9)
  );
}

.v-four .cta-content {
  position: relative;
  z-index: 1;
  max-width: 580px;
}

.v-four .cta-heading {
  margin-bottom: 12px;
}

.v-four .cta-sub {
  margin-bottom: 28px;
  color: var(--muted);
  font-size: var(--font-size-body);
  font-weight: 300;
}

.v-four .cta-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

/* ─── RESPONSIVE ─── */

@media (max-width: 768px) {
  .section-cta {
    padding: 48px 16px;
  }

  .v-four .cta-wrap {
    padding: 44px;
    border-radius: 1.5rem;
  }
}

@media (max-width: 640px) {
  .v-four .cta-wrap {
    padding: 28px 20px;
  }

  .v-four .cta-actions {
    flex-direction: column;
  }

  .v-four .cta-actions .btn-primary,
  .v-four .cta-actions .btn-ghost-white {
    width: 100%;
    text-align: center;
  }
}
</style>
