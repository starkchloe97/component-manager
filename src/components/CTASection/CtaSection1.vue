<template>
  <section ref="sectionRef" class="cta">
    <div class="container">
      <div class="scroll-reveal cta-card">
        <div class="glow-1"></div>
        <div class="glow-2"></div>
        <div class="dots"></div>
        <div class="cta-inner">
          <div class="cta-badge">
            <span class="pulse-dot"></span>
            Free Trademark Search Included
          </div>
          <h2>Protect your brand<br />before someone else does</h2>
          <p>
            Every day you wait is a day someone else could register your mark.
            Start your trademark application in minutes.
          </p>
          <div class="cta-buttons">
            <a
              href="#"
              @click.prevent="
                showToast('Redirecting to your trademark application...')
              "
              class="btn-primary"
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
import { useScrollReveal } from "@/composables/VersionOne/useScrollReveal";
import { useToast } from "@/composables/VersionOne/useToast";
const sectionRef = ref(null);
useScrollReveal(sectionRef);
const { showToast } = useToast();
</script>

<style scoped>

.cta {
  --brand: #0b55b6;
  --brand-light: #e8f0fb;
  --brand-dark: #083d82;
  --brand-mid: #1a6fd4;
  --surface: #ffffff;
  --ink: #0f1d33;
  --muted: #5a6d85;
  --border: #d4e0f0;
  --font-display: "Inter Tight", sans-serif;
  --font-body: "Inter", sans-serif;
}
.cta {
  font-family: var(--font-body);
  color: var(--ink);
  background: var(--surface);
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

.cta {
  padding: 96px 0;
  background: var(--surface);
}
@media (min-width: 768px) {
   .cta {
    padding: 128px 0;
  }
}
 .container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
}
 .cta-card {
  position: relative;
  background: var(--ink);
  border-radius: 24px;
  padding: 48px;
  overflow: hidden;
  text-align: center;
}
@media (min-width: 768px) {
   .cta-card {
    padding: 80px;
  }
}
.glow-1 {
  position: absolute;
  top: 0;
  right: 0;
  width: 320px;
  height: 320px;
  border-radius: 50%;
  background: radial-gradient(circle, #0b55b6 0%, transparent 60%);
  filter: blur(60px);
  opacity: 0.1;
  transform: translate(30%, -30%);
}
 .glow-2 {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 240px;
  height: 240px;
  border-radius: 50%;
  background: radial-gradient(circle, #1a6fd4 0%, transparent 60%);
  filter: blur(60px);
  opacity: 0.1;
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
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--brand-mid);
  background: rgba(255, 255, 255, 0.05);
  padding: 8px 16px;
  border-radius: 9999px;
  /* margin-bottom: 32px; */
}
 .pulse-dot {
  position: relative;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--brand-mid);
}
.pulse-dot::before {
  content: "";
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 2px solid var(--brand-mid);
  animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
 .cta-inner h2 {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 30px;
  line-height: 0.95;
  letter-spacing: -0.04em;
  color: #fff;
  margin-bottom: 24px;
}
@media (min-width: 768px) {
 .cta-inner h2 {
    font-size: 48px;
  }
}
@media (min-width: 1024px) {
  .cta-inner h2 {
    font-size: 60px;
  }
}
.cta-inner p {
  font-size: 18px;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.5);
  max-width: 576px;
  margin: 0 auto 40px;
}
.cta-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
}
.btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--brand);
    color: #fff;
    font-size: 11px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    padding: 14px 32px;
    border-radius: 9999px;
    text-decoration: none;
    border: none;
    cursor: pointer;
    transition: transform 300ms ease, box-shadow 300ms ease;

}
.btn-primary:hover {
    transform: scale(1.05);
    box-shadow: 0 12px 32px -8px rgba(11, 85, 182, 0.45);
}

.btn-outline {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    border: 2px solid rgba(15, 29, 51, 0.15);
    color: var(--ink);
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    padding: 14px 32px;
    border-radius: 9999px;
    text-decoration: none;
    background: transparent;
    cursor: pointer;
    transition: all 300ms ease;
}
 .cta-outline {
  border-color: rgba(255, 255, 255, 0.2);
  color: #fff;
}
.cta-outline:hover {
  background: #fff;
  color: var(--ink);
  border-color: #fff;
}
 .cta-note {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.3);
  margin-top: 32px;
}
</style>



