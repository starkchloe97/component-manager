<template>
  <section id="pricing" ref="sectionRef" class="pricing">
    <div class="container">
      <div class="header scroll-reveal">
        <span class="section-label">Pricing</span>
        <h2 class="section-title">Our trademark registration package features</h2>
        <p class="section-desc">
          No hidden fees. No surprises. USPTO filing fees included in all
          packages.
        </p>
      </div>
      <div class="tiers">
        <div
          v-for="(tier, i) in tiers"
          :key="i"
          class="scroll-reveal card-hover tier"
          :class="{ featured: tier.featured, recommended: tier.recommended }"
          :style="{ transitionDelay: `${i * 0.1}s` }"
        >
          <div v-if="tier.featured" class="popular-badge">
            <span class="iconify" data-icon="lucide:crown" data-width="14"></span>
            Most Popular
          </div>
          <div v-if="tier.recommended" class="recommended-badge">
            <span>Recommended</span>
          </div>
          <div class="tier-body">
            <div class="tier-name" :class="{ light: tier.featured }">
              {{ tier.name }}
            </div>
            <div class="tier-price">
              <span class="price" :class="{ light: tier.featured }"
                >${{ tier.price }}</span
              >
              <span class="price-note" :class="{ light: tier.featured }"
                >+ federal fees ($450/class)</span
              >
            </div>
            <p class="tier-subtitle" :class="{ light: tier.featured }">
              {{ tier.subtitle }}
            </p>
            <ul class="tier-features">
              <li
                v-for="(f, fi) in tier.features"
                :key="fi"
                :class="{
                  muted: !f.included,
                  light: tier.featured && f.included,
                  'light-muted': tier.featured && !f.included,
                }"
              >
                <span
                  class="iconify"
                  :data-icon="f.included ? 'lucide:check' : 'lucide:x'"
                  data-width="18"
                ></span>
                {{ f.text }}
              </li>
            </ul>
          </div>
          <!-- Original PopUp component retained for reference; it is not registered in this project:
          <PopUp
            :buttonClass="['tier-btn', tier.featured ? 'btn-primary' : 'btn-outline']"
            :trigger-text="tier.name"
            hoverClass="hover-scale"
            confirm-button-text="Get Started"
          />
          -->
          <button
            type="button"
            class="tier-btn"
            :class="tier.featured ? 'btn-primary' : 'btn-outline'"
          >
            {{ tier.name }}
          </button>
        </div>
      </div>
      <div class="scroll-reveal fee-note">
        <p>
          USPTO filing fees are $250–$350 per class depending on the filing
          basis. <a href="#">Learn more about USPTO fees</a>
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useScrollReveal } from "@/composables/useScrollReveal";
const sectionRef = ref(null);
useScrollReveal(sectionRef);

const tiers = [
  {
    name: "Basic Package",
    price: "35",
    subtitle: "For first-time applicants & early-stage brands beginning their trademark journey",
    featured: false,
    recommended: false,
    features: [
      { text: "Preliminary search to check availability", included: true },
      { text: "Trademark classes selected by a paralegal", included: true },
      { text: "Digital clearance report with all your trademark details", included: true },
      { text: "Filing of your trademark application with the USPTO", included: true },
      { text: "Trademark serial number issued in 10 days", included: true },
    ],
  },
  {
    name: "Deluxe Package",
    price: "199",
    subtitle: "For growing businesses who want legal care for trademark protection",
    featured: true,
    recommended: false,
    features: [
      { text: "Federal & common law search to check availability", included: true },
      { text: "Trademark classes selected by an attorney", included: true },
      { text: "Cease-and-desist letter upon infringement", included: true },
      { text: "Free 30-minute consultation with an attorney", included: true },
      { text: "Exclusive trademark portal for easy management", included: true },
      { text: "Trademark serial number issued in 5 days", included: true },
    ],
  },
  {
    name: "Premium Package",
    price: "299",
    subtitle: "For established businesses who want premium legal support for best success",
    featured: false,
    recommended: true,
    features: [
      { text: "Trademark review by a team of attorneys to minimize chances of rejection", included: true },
      { text: "1-year trademark monitoring infringement alerts", included: true },
      { text: "Lifetime post-filing alerts to avoid losing your trademark", included: true },
      { text: "24-hr expedited processing", included: true },
      { text: "Expedited legal support with priority access to attorney", included: true },
      { text: "Trademark serial number issued in 24 hours", included: true },
    ],
  },
];
</script>

<style scoped>
.pricing {
  padding: 96px 0;
  background: var(--surface);
}

.container {
  max-width: 1520px;
  margin: 0 auto;
  padding: 0 24px;
}

.header {
  text-align: center;
  margin-bottom: 64px;
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
}
@media (max-width: 768px) {
  .section-title {
    font-size: 48px;
  }
  .container {
    padding: 0 20px;
  }
}
@media (min-width: 1024px) {
  .section-title {
    font-size: 48px;
  }
}
@media (max-width: 768px) {
  .section-title {
    font-size: 26px;
    line-height: 32px;
  }
}
.section-desc {
  font-size: 18px;
  font-weight: 300;
  color: var(--muted);
  margin-top: 16px;
  line-height: 1.6;
  margin-left: auto;
  margin-right: auto;
}

/* --- Grid: wider, and every card stretches to the same height --- */
.tiers {
  display: grid;
  gap: 28px;
  max-width: 1400px;
  margin: 0 auto;
  align-items: stretch;
}

@media (min-width: 768px) {
  .tiers {
    grid-template-columns: repeat(3, 1fr);
  }
}

.tier {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 40px 30px;
}

@media (min-width: 768px) {
  .tier {
    padding: 48px 40px;
  }
}

.tier-body {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* --- Featured / Most Popular: genuinely premium treatment --- */
.tier.featured {
  background: linear-gradient(160deg, var(--brand) 0%, var(--brand-dark) 100%);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow:
    0 40px 80px -24px rgba(11, 85, 182, 0.6),
    0 0 0 1px rgba(11, 85, 182, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
}

.tier.featured::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 20px;
  padding: 1px;
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

@media (min-width: 768px) {
  .tier.featured {
    transform: scale(1.06);
    z-index: 2;
  }
  .tier.featured:hover {
    transform: scale(1.06) translateY(-6px);
  }
}

.popular-badge {
    position: absolute;
    top: -18px;
    left: 50%;
    transform: translateX(-50%);
    display: inline-flex;
    align-items: center;
    gap: 7px;
    background: #fff;
    color: var(--brand-dark);
    font-size: 10px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: em;
    padding: 9px 20px;
    border-radius: 9999px;
    box-shadow: 0 10px 24px -6px rgba(11, 85, 182, 0.5);
    z-index: 3;
}

.popular-badge .iconify {
  color: #d4a017;
}

.recommended-badge {
  position: absolute;
  top: 0;
  right: 0;
  width: 150px;
  height: 150px;
  overflow: hidden;
  z-index: 3;
  pointer-events: none;
}

.recommended-badge span {
  position: absolute;
  top: 26px;
  right: -60px;
  width: 200px;
  padding: 8px 0;
  background: rgb(17, 170, 94);
  color: #ffffff;
  font-size: 10px;
  font-weight: 400;
  text-transform: capitalize;
  letter-spacing: 0.7px;
  text-align: center;
  transform: rotate(45deg);
  box-shadow: 0 6px 16px -4px rgba(0, 0, 0, 0.25);
}

.recommended-badge span::before,
.recommended-badge span::after {
  content: "";
  position: absolute;
  bottom: -6px;
  width: 0;
  height: 0;
  border-style: solid;
}

.recommended-badge span::before {
  left: 0;
  border-width: 6px 6px 0 0;
  border-color: rgb(10, 110, 60) transparent transparent transparent;
}

.recommended-badge span::after {
  right: 0;
  border-width: 6px 0 0 6px;
  border-color: rgb(10, 110, 60) transparent transparent transparent;
}

.tier-name {
  font-size: 17px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--muted);
  margin-bottom: 18px;
}

.tier-name.light {
  color: rgba(255, 255, 255, 0.7);
}

.tier-price {
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin-bottom: 6px;
}

.price {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 52px;
  letter-spacing: -0.04em;
  color: var(--ink);
}

.price.light {
  color: #fff;
}

.price-note {
  font-size: 15px;
  color: var(--muted);
}
.price-note.light {
  color: rgba(255, 255, 255, 0.55);
}

.tier-subtitle {
  font-size: 16px;
  line-height: 1.6;
  color: var(--muted);
  margin-bottom: 32px;
}

.tier-subtitle.light {
  color: rgba(255, 255, 255, 0.65);
}

.tier-features {
  list-style: none;
  padding-left: 0px;
  flex: 1;
}

.tier-features li{
    display: flex;
    align-items: flex-start;
    gap: 5px;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    margin-bottom: 16px;
}

.tier-features li .iconify {
  flex-shrink: 0;
  margin-top: 2px;
}

.tier-features li:not(.muted) {
  color: rgba(15, 29, 51, 0.85);
}

.tier-features li:not(.muted) .iconify {
  color: var(--brand);
}

.tier-features li.muted {
  color: rgba(15, 29, 51, 0.45);
}

.tier-features li.muted .iconify {
  color: rgba(15, 29, 51, 0.25);
}

.tier-features li.light {
  color: rgba(255, 255, 255, 0.94);
}

.tier-features li.light .iconify {
  color: #fff;
}

.tier-features li.light-muted {
  color: rgba(255, 255, 255, 0.55);
}

.tier-features li.light-muted .iconify {
  color: rgba(255, 255, 255, 0.35);
}

.tier-btn{
    width: 100%;
    text-align: center;
    margin: 0px auto;
    margin-top: 24px;
    align-items: center;
    align-content: center;
    font-size: 14px;
    font-weight: 600;
    padding-top: 1rem;
    padding-bottom: 1rem;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    border-radius: 50px;
}

button.tier-btn.btn-primary {
  box-shadow: 0 16px 36px -8px rgba(0, 0, 0, 0.25);
  background: #fff;
  color: #0b55b6;
}

button.tier-btn.btn-primary:hover {
  box-shadow: 0 20px 40px -8px rgba(0, 0, 0, 0.3);
  background: #fff;
  color: #0b55b6;
}

button.tier-btn.btn-outline {
  border: 2px solid rgba(15, 29, 51, 0.15);
  background: transparent;
  color: var(--ink);
  cursor: pointer;
  transition: all 300ms ease;
}

button.tier-btn.btn-outline:hover {
  background: var(--brand);
  border-color: var(--brand);
  color: #fff;
}

.fee-note {
  margin-top: 56px;
  text-align: center;
}

.fee-note p {
  font-size: 13px;
  color: var(--muted);
}

.fee-note a {
  color: var(--brand);
  text-decoration: none;
}

.fee-note a:hover {
  text-decoration: underline;
}

</style>