<template>
  <section id="pricing" ref="sectionRef" class="pricing v-one">
    <div class="container">
      <div class="header scroll-reveal">
        <span class="section-label">Pricing</span>
        <h2 class="section-title">Transparent, flat-fee pricing</h2>
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
          :class="{ featured: tier.featured }"
          :style="{ transitionDelay: `${i * 0.1}s` }"
        >
          <div v-if="tier.featured" class="popular-badge">
            Most Popular 
          </div>

          <div class="tier-name" :class="{ light: tier.featured }">
            {{ tier.name }}
          </div>

          <div class="tier-price">
            <span class="price" :class="{ light: tier.featured }">
              ${{ tier.price }}
            </span>

            <span class="price-note" :class="{ light: tier.featured }">
              + USPTO fees
            </span>
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
                data-width="16"
              ></span>

              {{ f.text }}
            </li>
          </ul>

          <button
            @click="
              showToast(
                `${tier.name} package selected! Redirecting to application...`,
              )
            "
            class="tier-btn"
            :class="{
              'btn-primary': tier.featured,
              'btn-outline': !tier.featured,
            }"
          >
            Get Started
          </button>
        </div>
      </div>

      <div class="scroll-reveal fee-note">
        <p>
          USPTO filing fees are $250–$350 per class depending on the filing
          basis.
          <a href="#">Learn more about USPTO fees</a>
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useScrollReveal } from "../../composables/useScrollReveal";
import { useToast } from "../../composables/useToast";

const sectionRef = ref(null);

useScrollReveal(sectionRef);

const { showToast } = useToast();

const tiers = [
  {
    name: "Essential",
    price: "199",
    subtitle: "For businesses that want basic protection",
    featured: false,
    features: [
      { text: "Comprehensive trademark search", included: true },
      { text: "Application preparation", included: true },
      { text: "USPTO filing (1 class)", included: true },
      { text: "Filing receipt", included: true },
      { text: "Office action responses", included: false },
      { text: "Attorney consultation", included: false },
    ],
  },
  {
    name: "Professional",
    price: "499",
    subtitle: "Complete protection with attorney support",
    featured: true,
    features: [
      { text: "Everything in Essential", included: true },
      { text: "1 office action response", included: true },
      { text: "30-min attorney consultation", included: true },
      { text: "Priority email support", included: true },
      { text: "Application monitoring", included: true },
      { text: "Statement of Use filing", included: false },
    ],
  },
  {
    name: "Enterprise",
    price: "899",
    subtitle: "Full-service protection from start to finish",
    featured: false,
    features: [
      { text: "Everything in Professional", included: true },
      { text: "Unlimited office actions", included: true },
      { text: "Statement of Use filing", included: true },
      { text: "Dedicated attorney", included: true },
      { text: "Opposition monitoring", included: true },
      { text: "1 year enrollment in watch service", included: true },
    ],
  },
];
</script>

<style scoped>

.pricing{
  --brand: #0b55b6;
  --brand-dark: #083d82;
  --surface: #ffffff;
  --ink: #0f1d33;
  --muted: #5a6d85;
  --border: #d4e0f0;
  --font-display: "Inter Tight", sans-serif;
}

.pricing {
  padding: 96px 0;
  background: var(--surface);
  margin: 0 auto;
}

@media (min-width: 768px) {
  .pricing {
    padding: 128px 0;
  }
}

.container {
  max-width: 1400px;
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
  margin: 25px;
}

@media (min-width: 768px) {
  .section-title {
    font-size: 48px;
  }
}

@media (min-width: 1024px) {
  .section-title {
    font-size: 60px;
  }
}

.section-desc {
  font-size: 18px;
  font-weight: 300;
  color: var(--muted);
  margin-top: 16px;
  max-width: 576px;
  margin-left: auto;
  margin-right: auto;
}

.tiers {
  display: grid;
  gap: 24px;
  max-width: 1100px;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .tiers {
    grid-template-columns: repeat(3, 1fr);
  }
}

.tier {
  position: relative;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 32px;
}

@media (min-width: 768px) {
  .tier {
    padding: 40px;
  }
}

.tier.featured {
  background: linear-gradient(to bottom, var(--brand), var(--brand-dark));
  border-color: rgba(11, 85, 182, 0.5);
}

.popular-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  color: var(--brand);
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  padding: 6px 16px;
  border-radius: 9999px;
}

.tier-name {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--muted);
  margin-bottom: 16px;
}

.tier-name.light {
  color: rgba(255, 255, 255, 0.6);
}

.tier-price {
  display: flex;
  align-items: baseline;
  gap: 4px;
  margin-bottom: 4px;
}

.price {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 48px;
  letter-spacing: -0.04em;
  color: var(--ink);
}

.price.light {
  color: #fff;
}

.price-note {
  font-size: 14px;
  color: var(--muted);
}

.price-note.light {
  color: rgba(255, 255, 255, 0.5);
}

.tier-subtitle {
  font-size: 14px;
  color: var(--muted);
  margin-bottom: 32px;
}

.tier-subtitle.light {
  color: rgba(255, 255, 255, 0.5);
}

.tier-features {
  list-style: none;
  margin-bottom: 40px;
}

.tier-features li {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  margin-bottom: 12px;
}

.tier-features li .iconify {
  flex-shrink: 0;
}

.tier-features li:not(.muted) {
  color: rgba(15, 29, 51, 0.8);
}

.tier-features li:not(.muted) .iconify {
  color: var(--brand);
}

.tier-features li.muted {
  color: rgba(15, 29, 51, 0.4);
}

.tier-features li.muted .iconify {
  color: rgba(15, 29, 51, 0.2);
}

.tier-features li.light {
  color: rgba(255, 255, 255, 0.9);
}

.tier-features li.light .iconify {
  color: #fff;
}

.tier-features li.light-muted {
  color: rgba(255, 255, 255, 0.5);
}

.tier-features li.light-muted .iconify {
  color: rgba(255, 255, 255, 0.3);
}

.tier-btn {
  width: 100%;
  text-align: center;
  margin: 0 auto;
  letter-spacing: 0.1em;
  padding-top: 1.2rem;
  padding-bottom: 1.2rem;
  display: flex;
  flex-direction: column;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
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

.btn-primary:active {
  transform: scale(0.97);
}

.btn-outline {
  display: inline-flex;
  align-items: center;
  justify-content: center;
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

.btn-outline:hover {
  background-color: var(--brand);
  color: #fff;
  border-color: var(--brand);
}

.fee-note {
  margin-top: 32px;
  text-align: center;
}

.fee-note p {
  font-size: 12px;
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