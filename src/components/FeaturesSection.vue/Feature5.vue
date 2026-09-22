<template>
  <section id="benefits" ref="sectionRef" class="benefits v-one">
    <div class="container">
      <div class="header scroll-reveal">
        <span class="section-label">Why Register</span>
        <h2 class="section-title">The advantages of federal registration</h2>
        <p class="section-desc">
          Registration transforms your common law rights into powerful federal
          protections that can make or break your business.
        </p>
      </div>
      <div class="grid">
        <div
          v-for="(b, i) in benefits"
          :key="i"
          class="scroll-reveal card-hover card"
          :style="{ transitionDelay: `${i * 0.08}s` }"
        >
          <div class="card-glow"></div>
          <div class="card-inner">
            <div class="icon-box">
              <span class="iconify" :data-icon="b.icon" data-width="22"></span>
            </div>
            <h3>{{ b.title }}</h3>
            <p>{{ b.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useScrollReveal } from "../../composables/useScrollReveal";
const sectionRef = ref(null);
useScrollReveal(sectionRef);
const benefits = [
  {
    icon: "lucide:globe",
    title: "Nationwide Exclusive Rights",
    desc: "Common law rights are limited to where you do business. Federal registration gives you exclusive rights in all 50 states, even in markets you haven't entered yet.",
  },
  {
    icon: "lucide:scale",
    title: "Presumption of Validity",
    desc: "In any legal dispute, your registered trademark is presumed valid. The burden of proof shifts to the infringer, making it far easier and cheaper to defend your brand.",
  },
  {
    icon: "lucide:dollar-sign",
    title: "Recover Damages & Attorney Fees",
    desc: "Registered trademark owners can recover statutory damages up to $2 million per counterfeit mark and reasonable attorney fees—unavailable with unregistered marks.",
  },
  {
    icon: "lucide:ban",
    title: "Block Infringing Imports",
    desc: "Record your trademark with U.S. Customs and Border Protection to stop counterfeit goods from entering the country—a powerful tool unregistered mark owners don't have.",
  },
  {
    icon: "lucide:trending-up",
    title: "Increased Business Value",
    desc: "A registered trademark is an intangible asset that increases your company's valuation. It's essential for licensing, franchising, and attracting investors or buyers.",
  },
  {
    icon: "lucide:search",
    title: "Public Notice & Deterrence",
    desc: "Your registration appears in the USPTO's public database, putting others on constructive notice of your rights and deterring potential infringers before they even start.",
  },
];
</script>

<style scoped>
.benefits {
  padding: 96px 0;
  background: var(--surface);
}
@media (min-width: 768px) {
  .v-one .benefits {
    padding: 128px 0;
  }
}
.v-one .container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
}
.v-one .header {
  text-align: center;
  margin-bottom: 64px;
}
.v-one .section-label {
  display: block;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--brand);
  margin-bottom: 16px;
}
.v-one .section-title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 30px;
  line-height: 0.95;
  letter-spacing: -0.04em;
}
@media (min-width: 768px) {
  .v-one .section-title {
    font-size: 48px;
  }
}
@media (min-width: 1024px) {
  .v-one .section-title {
    font-size: 60px;
  }
}
.v-one .section-desc {
  font-size: 18px;
  font-weight: 300;
  color: var(--muted);
  margin-top: 16px;
  max-width: 672px;
  margin-left: auto;
  margin-right: auto;
}
.v-one .grid {
  display: grid;
  gap: 24px;
}
@media (min-width: 768px) {
  .v-one .grid {
    grid-template-columns: 1fr 1fr;
  }
}
@media (min-width: 1024px) {
  .v-one .grid {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
.v-one .card {
  position: relative;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 32px;
  overflow: hidden;
}
.v-one .card-glow {
  position: absolute;
  top: 0;
  right: 0;
  width: 112px;
  height: 112px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(11, 85, 182, 0.08) 0%,
    transparent 70%
  );
  transform: translate(30%, -30%);
  opacity: 0;
  transition: opacity 0.5s;
}
.v-one .card:hover .card-glow {
  opacity: 1;
}
.v-one .card-inner {
  position: relative;
}
.v-one .icon-box {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: var(--brand-light);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}
.v-one .icon-box .iconify {
  color: var(--brand);
}
.v-one .card h3 {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 18px;
  letter-spacing: -0.02em;
  margin-bottom: 12px;
}
.v-one .card p {
  font-size: 14px;
  font-weight: 300;
  color: var(--muted);
  line-height: 1.6;
}
</style>
