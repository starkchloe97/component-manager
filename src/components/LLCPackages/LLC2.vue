<template>
  <section id="pricing" class="pricing-section">
    <div class="container">
      <div class="section-header">
        <!-- <div class="accent-bar"></div> -->
        <span class="section-label">Pricing Ledger</span>
        <h2 class="section-title">
          Our LLC Formation package includes:
        </h2>
      </div>

      <div class="single-package-wrapper">
        <div class="single-package">
          <div class="package-header">
            <p class="plan-name">LLC Formation</p>
          </div>

          <div class="features-list">
            <div
              v-for="(feature, index) in features"
              :key="index"
              class="feature-item"
              :class="index % 2 === 0 ? 'feature-white' : 'feature-alt'"
            >
              <div class="feature-content">
                <div class="feature-info">
                  <p class="feature-title">{{ feature.name }}</p>
                  <p class="feature-description">{{ feature.description }}</p>
                </div>
                <span class="iconify check-icon" data-icon="lucide:check"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p class="table-footer">
        + USPTO government filing fee, charged per class of goods or services.
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const features = ref([
  {
    name: "Articles of Organization",
    description: "Preparing & Filing the Articles of Organization.",
    included: true
  },
  {
    name: "Statement of Organizer",
    description: "A document that passes ownership of the LLC to the owners of the company.",
    included: true
  },
  {
    name: "Operating Agreement",
    description: "This outlines the internal operations of the business how finances and decisions are made.",
    included: true
  },
  {
    name: "Employer Identification Number (EIN)",
    description: "Your EIN, allocated by the IRS, is needed to file LLC taxes and open business bank accounts, even if you don't have employees.",
    included: true
  },
  {
    name: "Lifetime Phone & Email Support",
    description: "We're here for you for the life of your business. Your success is our goal.",
    included: true
  }
]);
</script>

<style scoped>
.pricing-section {
  --brand-100: #ffedd5;
  --brand-500: #f97316;
  --neutral-50: #fafafa;
  --neutral-100: #f5f5f5;
  --neutral-200: #e5e5e5;
  --neutral-300: #d4d4d4;
  --neutral-400: #a3a3a3;
  --neutral-500: #737373;
  --neutral-700: #404040;
  --blue-400: #60a5fa;
  --blue-500: #3b82f6;
  padding-top: 96px;
  padding-bottom: 96px;
  border-top: 1px solid var(--neutral-200);
  border-bottom: 1px solid var(--neutral-200);
}
.section-label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--brand-600);
  margin-bottom: 18px;
  padding: 5px 12px;
  background: #fff1ec;
  border: 1px solid var(--brand-100);
  border-radius: 100px;
}

.container {
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 24px;
}

.section-header {
  text-align: center;
  margin-bottom: 64px;
}

.accent-bar {
  height: 3px;
  width: 48px;
  background-color: var(--brand-500);
  margin: 0 auto 16px auto;
  border-radius: 2px;
}

.eyebrow {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--brand-500);
  display: block;
}

.section-title {
  font-family: 'Inter Tight', sans-serif;
  font-weight: 600;
  font-size: 36px;
  line-height: 0.95;
  letter-spacing: -0.04em;
  color: var(--neutral-700);
  margin: 16px 0 0 0;
}

.single-package-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
}

.single-package {
  width: 100%;
  max-width: 720px;
  background-color: var(--neutral-50);
  border: 1px solid var(--neutral-200);
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.06);
  transition: box-shadow 0.3s ease;
}

.single-package:hover {
  box-shadow: 0 8px 24px rgba(249, 115, 22, 0.12);
}

.package-header {
  background-color: var(--brand-500);
  text-align: center;
  padding: 32px 24px;
}

.plan-name {
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.95);
  margin: 0;
}

.feature-item {
  border-bottom: 1px solid var(--neutral-200);
  transition: background-color 0.2s ease;
}

.feature-item:last-child {
  border-bottom: none;
}

.feature-white {
  background-color: var(--neutral-50);
}

.feature-alt {
  background-color: var(--neutral-100);
}

.feature-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  gap: 24px;
}

.feature-info {
  flex: 1;
}

.feature-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--neutral-700);
  margin: 0 0 8px 0;
}

.feature-description {
  font-size: 14px;
  font-weight: 400;
  color: var(--neutral-500);
  margin: 0;
  line-height: 1.5;
}

.check-icon {
  color: var(--brand-500);
  font-size: 24px;
  flex-shrink: 0;
}

.table-footer {
  font-size: 12px;
  color: var(--neutral-400);
  text-align: center;
  margin-top: 16px;
}

.iconify {
  display: inline-block;
  width: 1em;
  height: 1em;
}

@media (min-width: 768px) {
  .pricing-section {
    padding-top: 128px;
    padding-bottom: 128px;
  }
  .section-title {
    font-size: 48px;
  }
  .package-header {
    padding: 40px 32px;
  }
  .plan-name {
    font-size: 16px;
  }
  .feature-content {
    padding: 28px 32px;
  }
  .feature-title {
    font-size: 18px;
  }
  .feature-description {
    font-size: 15px;
  }
}

@media (min-width: 1024px) {
  .container {
    padding: 0 40px;
  }
}

@media (max-width: 767px) {
  .pricing-section {
    background-color: transparent !important;
  }
}
</style>
