<template>
  <section ref="sectionRef" class="cta">
    <div class="container">
      <div class="cta-card">
        <div class="glow-1"></div>
        <div class="glow-2"></div>
        <div class="dots"></div>

        <div class="cta-inner">
          <div class="cta-badge">
            <span class="pulse-dot"></span>
            Free Trademark Search Included
          </div>

          <h2>
            Protect your brand<br />
            before someone else does
          </h2>

          <p>
            Every day you wait is a day someone else could register your mark.
            Start your trademark application in minutes.
          </p>

          <div class="cta-buttons">
            <a
              href="#"
              class="btn-primary"
              @click.prevent="
                showToast('Redirecting to your trademark application...')
              "
            >
              Start Your Application
              <ArrowRight :size="14" aria-hidden="true" />
            </a>

            <a href="#" class="btn-outline cta-outline">
              <Phone :size="14" aria-hidden="true" />
              Talk to an Attorney
            </a>
          </div>

          <div class="cta-note">
            No commitment required · Free trademark search · Attorney-reviewed
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { ArrowRight, Phone } from "@lucide/vue";
import { useScrollReveal } from "@/composables/useScrollReveal";
import { useToast } from "@/composables/useToast";
import { useComponentStyles } from "@/composables/useComponentStyles";
const sectionRef = ref(null);

useScrollReveal(sectionRef);

const { showToast } = useToast();

const styles = useComponentStyles("CtaSection1.vue", {
  primary: "#1a6fd4",
  background: "#0f1d33",
  pdtop: "96px",
  pdbottom: "96px",
  pdleft: "0px",
  pdright: "0px",
  fontSize: "60px",
  fontSizeBody: "18px",
  surface: "#ffffff",
  muted: "#0b55b6"
});

</script>

<style scoped>
.cta {
  --primary: v-bind("styles.primary");
  --muted: v-bind("styles.muted");
  --surface: v-bind("styles.surface");
  --bg: v-bind("styles.background");
  --pd-top: v-bind("styles.pdtop");
  --pd-bottom: v-bind("styles.pdbottom");
  --pd-left: v-bind("styles.pdleft");
  --pd-right: v-bind("styles.pdright");
  --font-size: v-bind("styles.fontSize");
  --font-size-body: v-bind("styles.fontSizeBody");
  padding-top: var(--pd-top);
  padding-bottom: var(--pd-bottom);
  padding-left: var(--pd-left);
  padding-right: var(--pd-right);
  color: var(--bg);
  background: var(--surface);
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
}

.cta-card {
  position: relative;
  padding: 48px;
  overflow: hidden;
  text-align: center;
  background: var(--bg);
  border-radius: 24px;
}

.glow-1,
.glow-2 {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.1;
}

.glow-1 {
  top: 0;
  right: 0;
  width: 320px;
  height: 320px;
  background: radial-gradient(circle, #0b55b6 0%, transparent 60%);
  transform: translate(30%, -30%);
}

.glow-2 {
  bottom: 0;
  left: 0;
  width: 240px;
  height: 240px;
  background: radial-gradient(circle, #1a6fd4 0%, transparent 60%);
  transform: translate(-30%, 30%);
}

.dots {
  position: absolute;
  inset: 0;
  opacity: 0.03;
  background-image: radial-gradient(
    circle at 1px 1px,
    white 1px,
    transparent 0
  );
  background-size: 24px 24px;
}

.cta-inner {
  position: relative;
}

.cta-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  margin-bottom: 24px;
  color: var(--primary);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 9999px;
}

.pulse-dot {
  width: 8px;
  height: 8px;
  background: var(--primary);
  border-radius: 50%;
}

.cta-inner h2 {
  margin-bottom: 24px;
  color: #fff;
  font-family: var(--font-display);
  font-size: 30px;
  font-weight: 600;
  line-height: 0.95;
  letter-spacing: -0.04em;
}

.cta-inner p {
  max-width: 576px;
  margin: 0 auto 40px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 18px;
  font-weight: 300;
}

.cta-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
}

.btn-primary,
.btn-outline {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 32px;
  font-size: 11px;
  text-decoration: none;
  text-transform: uppercase;
  border-radius: 9999px;
  cursor: pointer;
}

.btn-primary {
  color: #fff;
  font-weight: 500;
  letter-spacing: 0.06em;
  background: var(--muted);
  border: none;
  transition: transform 300ms ease, box-shadow 300ms ease;
}

.btn-primary:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 32px -8px rgba(11, 85, 182, 0.45);
}

.btn-outline {
  color: #fff;
  font-weight: 700;
  letter-spacing: 0.15em;
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.2);
  transition: all 300ms ease;
}

.btn-outline:hover {
  color: var(--bg);
  background: #fff;
  border-color: #fff;
}

.cta-note {
  margin-top: 32px;
  color: rgba(255, 255, 255, 0.3);
  font-size: 12px;
}

@media (min-width: 768px) {
  .cta {
    padding: 128px 0;
  }

  .cta-card {
    padding: 80px;
  }

  .cta-inner h2 {
    font-size: 48px;
  }
}

@media (min-width: 1024px) {
  .cta-inner h2 {
    font-size: var(--font-size);
  }
}
</style>



