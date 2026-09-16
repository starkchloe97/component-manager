<template>
  <section id="cta" class="cta v-five">
    <div class="bg-grid"></div>
    <div class="glow"></div>

    <div class="container">
      <div class="cta-content fade-up">
        <div class="cta-badge">
          <span class="badge-text">Start protecting your brand today</span>
        </div>

        <h2 class="cta-title">
          Ready to Register<br />
          Your Trademark?
        </h2>

        <p class="cta-desc">
          Don't wait until someone else claims your brand. File now and secure
          your legal rights from day one.
        </p>

        <div class="cta-actions">
          <button @click="handleSearch" class="btn-main">
            Search Your Trademark
            <Search class="btn-icon" />
          </button>

          <button @click="handleConsult" class="btn-secondary">
            Free Consultation
            <Calendar class="btn-icon" />
          </button>
        </div>

        <div class="cta-trust">
          <span class="trust-item">
            <ShieldCheck class="trust-icon green" />
            Attorney-Reviewed
          </span>

          <span class="trust-item">
            <Clock class="trust-icon orange" />
            3-Day Filing
          </span>

          <span class="trust-item">
            <RefreshCcw class="trust-icon blue" />
            Money-Back Guarantee
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useComponentStyles } from "@/composables/useComponentStyles";
import { inject } from "vue";
import {
  Search,
  RefreshCcw,
  Clock,
  ShieldCheck,
  Calendar,
} from "@lucide/vue";

const showToast = inject("showToast");

function handleSearch() {
  showToast("Redirecting to trademark search tool...", "success");
}

function handleConsult() {
  showToast("Scheduling a free consultation...", "info");
}

const styles = useComponentStyles("CtaSection5", {
  primary: "#fb923c",
  background: "linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);",
  mainbackground:"#0f172a",
  mainbackgroundtwo:"#1e293b",
  surface: "#ffffff",
  fontSize: " 3rem",
  fontSizeBody: "1.125rem",
});

</script>

<style scoped>  

.cta{
  --primary: v-bind("styles.primary");
  --bg: v-bind("styles.background");
  --bgone: v-bind("styles. mainbackground");
  --bgtwo: v-bind("styles.mainbackgroundtwo");
  --surface: v-bind("styles.surface");
  --font-size: v-bind("styles.fontSize");
  --font-size-body: v-bind("styles.fontSizeBody");
  --pd-top: v-bind("styles.pdtop");
  --pd-bottom: v-bind("styles.pdbottom");
  --pd-left: v-bind("styles.pdleft");
  --pd-right: v-bind("styles.pdright");
}

.v-five {
  /* --brand-400: #fb923c; */
  --brand-500: #f97316;
  --brand-600: #ea580c;

  /* --navy-800: #1e293b;
  --navy-900: #0f172a; */

  --neutral-400: #a3a3a3;
  --neutral-500: #737373;

  --green-400: #4ade80;
  --blue-400: #60a5fa;
}

/* ─── CTA ─── */

.v-five.cta {
  position: relative;
  padding: 96px 0;
  overflow: hidden;
  background: linear-gradient(
    135deg,
    var(--bgone) 0%,
    var(--bgtwo) 100%
  );
}

@media (min-width: 768px) {
  .v-five.cta {
    padding: 128px 0;
  }
}

/* ─── BACKGROUND GRID ─── */

.v-five .bg-grid {
  position: absolute;
  inset: 0;
  background-image:
   var(--bg);
  background-size: 60px 60px;
}

/* ─── GLOW ─── */

.v-five .glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 600px;
  height: 600px;
  background: radial-gradient(
    ellipse at center,
    rgba(249, 115, 22, 0.15) 0%,
    transparent 70%
  );
  opacity: 0.2;
  transform: translate(-50%, -50%);
}

/* ─── CONTAINER ─── */

.v-five .container {
  position: relative;
  max-width: 56rem;
  margin: 0 auto;
  padding: 0 24px;
  text-align: center;
}

/* ─── CONTENT ─── */

.v-five .cta-content {
  position: relative;
  z-index: 1;
}

/* ─── BADGE ─── */

.v-five .cta-badge {
  display: inline-flex;
  align-items: center;
  padding: 6px 16px;
  margin-bottom: 16px;
  color: var( --primary);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  background: rgba(249, 115, 22, 0.1);
  border: 1px solid rgba(249, 115, 22, 0.2);
  border-radius: 9999px;
}

/* ─── TITLE ─── */

.v-five .cta-title {
  margin-bottom: 24px;
  color: #fff;
  font-size: 1.875rem;
  font-weight: 500;
  line-height: 1.1;
  letter-spacing: -0.025em;
}

@media (min-width: 768px) {
  .v-five .cta-title {
    font-size: var(--font-size);
  }
}

/* ─── DESCRIPTION ─── */

.v-five .cta-desc {
  max-width: 42rem;
  margin: 0 auto 40px;
  color: var(--neutral-400);
  font-size: var(--font-size-body);
  line-height: 1.625;
}

/* ─── ACTIONS ─── */

.v-five .cta-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 48px;
}

@media (min-width: 640px) {
  .v-five .cta-actions {
    flex-direction: row;
  }
}

/* ─── MAIN BUTTON ─── */

.v-five .btn-main {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 16px 40px;
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
  background: var(--brand-500);
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.3s;
}

.v-five .btn-main:hover {
  background: var(--brand-600);
  box-shadow: 0 20px 25px -5px rgba(249, 115, 22, 0.2);
}

/* ─── SECONDARY BUTTON ─── */

.v-five .btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 16px 40px;
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.3s;
}

.v-five .btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
}

/* ─── BUTTON ICON ─── */

.v-five .btn-icon {
  width: 20px;
  height: 20px;
}

/* ─── TRUST ITEMS ─── */

.v-five .cta-trust {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 24px;
  color: var(--neutral-500);
  font-size: 0.875rem;
}

.v-five .trust-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.v-five .trust-icon {
  width: 16px;
  height: 16px;
}

.v-five .trust-icon.green {
  color: var(--green-400);
}

.v-five .trust-icon.orange {
  color: var( --primary);
}

.v-five .trust-icon.blue {
  color: var(--blue-400);
}

/* ─── ANIMATION ─── */

.v-five .fade-up {
  opacity: 1;
  transform: translateY(0);
}
</style>
